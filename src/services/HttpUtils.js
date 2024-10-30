import Http from "./Http";

export const axiosUtil = {
  get: async (url, params = {}, config = {}) => {
    try {
      const response = await Http.get(url, {
        ...config,
        params,
      });
      return response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await Http.post(url, data, config);
      return response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await Http.put(url, data, config);
      return response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await Http.delete(url, config);
      return response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};
