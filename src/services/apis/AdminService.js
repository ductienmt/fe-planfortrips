import Http from "../Http";

export const AdminService = {
  findAdminUsername: async (userName) =>{
    const response = await Http.get(`api/v1/admins/all?userName=${userName}`);
    console.log(response);
    
    return response.data;
  },
  login : async (username, password) => {
    const response = await Http.post('api/v1/auth/admin/login',{
      userName : username,
      password : password
    });
    console.log(response);
    return response.data;
  }
};
