import Http from "../Http";

export const AccountEtpService = {
  getAll: async (name, page, size) => {
    return await Http.get(
      `/account-enterprises/all?name=${name}&page=${page}&size=${size}`
    );
  },
  getAccountEnterpriseNeedAccept: async () => {
    return await Http.get("/account-enterprises/accept");
  },
  getByPhoneNumber: async (phoneNumber) => {
    return await Http.get(`/account-enterprises/sdt/${phoneNumber}`);
  },
  getByEmail: async (email) => {
    return await Http.get(`/account-enterprises/email/${email}`);
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
  sendOTP: async (email, content) => {
    return await Http.post(`/email/send?email=${email}&content=${content}`);
  },
  verifyOTP: async (email, otp) => {
    return await Http.post(`/email/validate?email=${email}&otp=${otp}`);
  },
  resetPasswordE: async (serviceType, email, phone) => {
    const params = new URLSearchParams({ serviceType, email, phone });
    return await Http.patch(
      `/account-enterprises/reset-password?${params.toString()}`
    );
  },
  validateContact: async (serviceType, email, phone) => {
    const params = new URLSearchParams({ serviceType, email, phone });
    return await Http.get(
      `/account-enterprises/validate-contact?${params.toString()}`
    );
  },
  detail: async () => {
    return await Http.get(`/account-enterprises/detail`);
  },
  uploadImage: async (formData) => {
    return await Http.post(`/account-enterprises/upload`, formData);
  },
  verifyPasswordEtp: async (password) => {
    return await Http.get(
      `/account-enterprises/verify-password?password=${password}`
    );
  },
  update: async (data) => {
    return await Http.put(`/account-enterprises/update`, data);
  },
};

export default AccountEtpService;
