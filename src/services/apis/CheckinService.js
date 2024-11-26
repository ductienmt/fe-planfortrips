import axios from "axios";
import Http from "../Http";

export const CheckinService = {
  getCheckins: async () => {
    const response = await Http.get(`/check-in/all`);
    return response.data;
  },
  getImageById: async (id) => {
    const response = await Http.get(`/check-in/getImages?checkinId=${id}`);
    return response.data;
  },
  createCheckIn: async (formData) => {
    const response = await Http.post(`/check-in/create`, formData);
    console.log(response);
    return response.data;
  },
  updateCheckIn: async (id, formData) => {
    const response = await Http.put(`/check-in/update?id=${id}`, formData);
    console.log(response);
    return response.data;
  },
  uploadImage: async (id, formData) => {
    const response = await Http.post(
      "/check-in/upload-image?checkinId=" + id,
      formData
    );
    return response.data;
  },
  getImageAll: async () => {
    const response = await Http.get(`/check-in/all`);
    return response.data;
  },
  getCheckInByCityId: async (id) => {
    const response = await Http.get(`/check-in/getByCityId?cityId=${id}`);
    return response.data;
  },
};
