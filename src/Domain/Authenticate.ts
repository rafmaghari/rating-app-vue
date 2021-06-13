import {http} from "@/common/http";
import {User} from "@/models/User";
import {AxiosResponse} from "axios";

export interface ILoginInterface {
    email: string;
    password: string;
}

interface APIResponseInterface {
    data: {
        user: null,
        token: null
    },
    success: boolean,
}


export class Authenticate implements ILoginInterface {
    static URI = "auth/login";
    email = "";
    password = "";

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    getLoginCredentials(): Promise<AxiosResponse> {
        const params = {
            "email": this.email,
            "password": this.password
        }
        return http.post(Authenticate.URI, params);
    }
}