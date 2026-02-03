import apiService from "@/services/network";
import API_ENDPOINT from "../endpoint";


interface CountRegisterPayload {
    types: string[];
}
interface CountRegisterResponse {

}
const homeService = {
    getCountRegister: async (payload: CountRegisterPayload) => {
        return (await apiService.getAxiosInstance().post<CountRegisterResponse>(API_ENDPOINT.COUNT_REGISTER, payload)).data;
    }
}

export default homeService;