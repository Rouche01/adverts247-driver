import * as Permissions from "expo-permissions";

export const getCameraPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

  console.log(status);
  return status;
};

export const getLocationPermission = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  return status;
};

export const checkCameraPermission = async () => {
  const { status } = await Permissions.getAsync(Permissions.MEDIA_LIBRARY);
  if (status === "granted") {
    return true;
  } else {
    return false;
  }
};

export const checkLocationPermission = async () => {
  const { status } = await Permissions.getAsync(Permissions.LOCATION);
  if (status === "granted") {
    return true;
  } else {
    return false;
  }
};
