import { apiCheckCompanyCode,apiLogin } from '@/services/network';
import API_ENDPOINT from '../endpoint';
export interface CheckCompanyCodePayload {
    customerCode: string;
}

export interface CheckCompanyCodeResponse {
    message?: string;
    responseStatus?: number;
    env:string;
    app:Object;
    screen:[]
}

export interface LoginPayload {
    username: string;
    password: string;
    deviceId: string;
    appType:string;
    fcmToken:string;

}

export interface RefreshToken{
    createdAt:string;
    createdByIp:string;
    expires:string;
    id:number;
    isActive:boolean;
    isExpired:boolean;
    isRevoked:boolean,
    token:string,
    userId:string,

}
export interface User {
    avatar:string;
    employeeId:number;
    fullName:string;
    id:string;
    isAdmin:boolean;
    token:string;
    userName:string;
    userGroupId:number;
    refreshToken:RefreshToken;
}
export interface LoginResponse {
    statusCode:number;
    innerBody:User

}

const authService = {
    checkCompanyCode: async(payload: CheckCompanyCodePayload): Promise<CheckCompanyCodeResponse> => {
        return (await apiCheckCompanyCode.getAxiosInstance().get<CheckCompanyCodeResponse>(API_ENDPOINT.CHECK_COMPANY_CODE, { params: payload })).data;
    },
    login: async(payload: LoginPayload): Promise<LoginResponse> => {
        return (await apiLogin.getAxiosInstance().post<LoginResponse>(API_ENDPOINT.LOGIN,payload)).data;
    },


};
export default authService
