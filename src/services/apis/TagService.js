import Http from "../Http";

export const TagService = {
  getTags: async (page, limit) => {
    const response = await Http.get(
      `api/v1/tags/all?page=${page}&limit=${limit}`
    );
    console.log(response);
    return response.data;
  },
  createTag: async (data) => {
    try {
      const response = await Http.post(`/api/v1/tags/create`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating Tag:", error);
      return null;
    }
  },
};
