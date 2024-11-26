import Http from "../Http";

export const FeedbackService = {
  getAllFeedbacks: async () => {
    const response = await Http.get(`/feedbacks/all`);
    console.log(response.data);
    return response.data;
  },
};
