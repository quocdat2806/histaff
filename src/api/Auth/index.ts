import apiService from '@/services/network';
import API_ENDPOINT from '@/api/endpoint';
interface LoginPayload {
    companyCode: string;
}

interface LoginResponse {

}

const authService = {
    login: (payload: LoginPayload): Promise<LoginResponse> => {
        return apiService.getAxiosInstance().post<LoginResponse>(API_ENDPOINT.LOGIN, payload);
    },
};
export default authService
