import axios from "axios";

export const GetAllProvinces = async () => {
  const response = await axios.get(
    "https://vapi.vnappmob.com/api/v2/province/"
  );
  console.log(response.data.results);
  return response.data.results;
};

export const GetAllDistrictByProvinceId = async (province_id) => {
  const response = await axios.get(
    `https://vapi.vnappmob.com/api/province/district/${province_id}`
  );
  console.log(response.data);
  return response.data;
};

export const GetAllWardByDistTrictId = async (district_id) => {
  const response = await axios.get(
    `https://vapi.vnappmob.com/api/province/ward/${district_id}`
  );
  console.log(response);
  return response.data;
};
