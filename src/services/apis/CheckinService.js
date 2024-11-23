import axios from "axios";
import Http from "../Http";

export const CheckinService = {
  
  getCheckins: async () => {
    const response = await Http.get(
      `api/v1/check-in/all`
    );
    return response.data;
  },
  getImageById: async (id) => {
    const response = await Http.get(
      `api/v1/check-in/getImages?checkinId=${id}`
    );
    return response.data;
  },
  createCheckIn: async (formData) => {
    const response = await Http.post(`api/v1/check-in/create`, formData);
    console.log(response);
    return response.data;
  },
  updateCheckIn: async (id, formData) => {
    const response = await Http.put(
      `api/v1/check-in/update?id=${id}`,
      formData
    );
    console.log(response);
    return response.data;
  },
  uploadImage: async (id, formData) => {
    const response = await Http.post(
      "api/v1/check-in/upload-image?checkinId=" + id,
      formData
    );
    return response.data;
  },
  getImageAll: async () => {
    const response = await Http.get(`api/v1/check-in/all`);
    return response.data;
  },
};
