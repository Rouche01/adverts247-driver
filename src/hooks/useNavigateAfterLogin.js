import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { customNavigate } from "../navigationRef";

export default (email, password) => {
  const {
    state: { user },
    getUser,
  } = useContext(AuthContext);

  useEffect(() => {
    const { driversValidId, profilePhoto } = user;

    if (driversValidId && profilePhoto) {
      customNavigate("mainFlow");
    } else if (driversValidId) {
      customNavigate("ProfilePhoto");
    } else {
      customNavigate("UploadId");
    }
  }, [user]);

  const signInAndNavigate = (signinFunc) => {
    signinFunc({ email, password }, getUser);
  };

  return [signInAndNavigate];
};
