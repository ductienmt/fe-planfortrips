import Http from "../Http";

export const UserService = {
  findUserById: async (id) => {
    const response = await Http.get(`api/v1/users/getDetail?id=${id}`);
    return response.data;
  },
  findUserByUsername:async(userName)=>{
    const response = await Http.get(`api/v1/users/findByUsername?username=${userName}`);
    return response.data;
  }
};
