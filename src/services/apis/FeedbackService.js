import Http from "../Http";

export const FeedbackService = {
  getAllFeedbacks: async () => {
    const response = await Http.get(`/feedbacks/all`);
    console.log(response.data);
    return response.data;
  },
  getFeedBackByEnterpriseId: async (id) => {
    const response = await Http.get(`/feedbacks/enterpriseById/${id}`);
    console.log(response.data);
    return response.data;
  },
  createFeedback: async (form) => {
    const response = await Http.post(`/feedbacks/create`,form);
    console.log(response.data);
    return response.data;
  },
};
