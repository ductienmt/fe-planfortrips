import Http from "../Http";

export const TagService = {
  getTags: async (page, limit) => {
    const response = await Http.get(`/tags/all?page=${page}&limit=${limit}`);
    return response.data;
  },
  createTag: async (data) => {
    try {
      const response = await Http.post(`/tags/create`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating Tag:", error);
      return {
        success: false,
        message: error.response?.data || "An unknown error occurred",
      };
    }
  },
};
