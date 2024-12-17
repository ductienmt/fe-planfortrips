export const validatePlateNumber = (plateNumber) => {
  const regex =
    /^[0-9]{2}[A-Z]-[0-9]{3}(\.[0-9]{2})?$|^[0-9]{2}[A-Z]-[0-9]{5}$/;
  return regex.test(plateNumber);
};
