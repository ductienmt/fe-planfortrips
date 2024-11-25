import Http from "../Http";

export const AccountEtpService = {
  getAll: async () => {
    return await Http.get("/account-enterprises/all");
  },
  toggleStage: async (id) => {
    return await Http.patch(`/account-enterprises/stage/${id}`);
  },
  create: async (data) => {
    return await Http.post("/account-enterprises/create", data);
  },
  checkUsername: async (username) => {
    const params = new URLSearchParams({ username });
    return await Http.post(
      `/account-enterprises/validate-username?${params.toString()}`
    );
  },
  checkEmail: async (email) => {
    const params = new URLSearchParams({ email });
    return await Http.post(
      `/account-enterprises/validate-email?${params.toString()}`
    );
  },
  checkPhone: async (phone) => {
    const params = new URLSearchParams({ phone });
    return await Http.post(
      `/account-enterprises/validate-phone?${params.toString()}`
    );
  },
};

export default AccountEtpService;
