import Http from "../Http";

export const AdminService = {
  findAdminUsername: async (userName) =>{
    const response = await Http.get(`api/v1/admins/all?userName=${userName}`);
    console.log(response);
    
    return response.data;
  }
};
