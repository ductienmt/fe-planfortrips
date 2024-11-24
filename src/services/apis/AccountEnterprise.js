import Http from "../Http";

export const AccountEtpService = {
  getAll: async () => {
    return await Http.get("/account-enterprises/all");
  },
  toggleStage: async (id) => {
    return await Http.patch(`/account-enterprises/stage/${id}`);
  },
};

export default AccountEtpService;
