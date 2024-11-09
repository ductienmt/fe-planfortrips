import Http from "../Http";

export const AccountEtpService = {
    getAll : async () => {
        return await Http.get('/api/v1/account-enterprises/all');
    },
    toggleStage : async (id) => {
        return await Http.patch(`/api/v1/account-enterprises/stage/${id}`) 
    }
}

export default AccountEtpService;