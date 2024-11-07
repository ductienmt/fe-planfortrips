import Http from "../Http";

export const FeedbackService = {
  getAllFeedbacks: async () =>{
    const response = await Http.get(`api/v1/feedbacks/all`);
    console.log(response.data);
    return response.data;
  }
};
