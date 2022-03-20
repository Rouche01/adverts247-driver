import { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { customNavigate } from "../navigationRef";

export default () => {
  const {
    state: { user, loggedIn, errorMessage },
    getUser,
  } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const { driversValidId, profilePhoto } = user;

      if (driversValidId && profilePhoto) {
        customNavigate("mainFlow");
      } else if (driversValidId) {
        customNavigate("ProfilePhoto");
      } else {
        customNavigate("UploadId");
      }
    }
  }, [loggedIn, user]);

  const localSigninAndNavigate = (signinFunc) => {
    signinFunc(getUser);
    // console.log(loggedIn, 1);
  };

  return [localSigninAndNavigate, errorMessage];
};
