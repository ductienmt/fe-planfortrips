import axiosUtil from "../AxiosUtil";

export const getHotels = async (page, limit) => {
  try {
    const response = await axiosUtil.get(`hotels?page=${page}&limit=${limit}`);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get hotels");
    }
  } catch (error) {
    console.error("Error in get hotels: ", error);
    throw error;
  }
};
export const findHotelById = async (hotelId) => {
  try {
    const response = await axiosUtil.get(`/hotels/${hotelId}`);
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to get hotels");
    }
  } catch (error) {
    console.error("Error in get hotels: ", error);
    throw error;
  }
};
