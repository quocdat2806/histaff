import DeviceInfo from 'react-native-device-info';
export const getDeviceId = async () => {
  const deviceId = await DeviceInfo.getUniqueId();
  return deviceId;
};
