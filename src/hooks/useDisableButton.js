import { useState, useEffect } from "react";

export default (dependency, userState, img) => {
  const [buttonDisable, setButtonDisable] = useState(true);

  useEffect(() => {
    if (img || dependency) {
      setButtonDisable(false);
    }
  }, [userState, img]);

  return [buttonDisable];
};

export const useDisableSettings = (dependency) => {
  const [buttonDisable, setButtonDisable] = useState(true);

  useEffect(() => {
    if (dependency) {
      setButtonDisable(false);
    }
  }, [dependency]);

  return [buttonDisable];
};
