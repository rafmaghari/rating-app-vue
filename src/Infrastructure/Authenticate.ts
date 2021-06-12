import {http} from "@/common/http";
import {User} from "@/models/User";
import {AxiosResponse} from "axios";

export interface ILoginInterface {
    email: string;
    password: string;
}


export class Authenticate implements ILoginInterface {
    static URI = "auth/login";
    email = "";
    password = "";

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    getLoginCredentials(): Promise<AxiosResponse<User>> {
        const params = {
            "email": this.email,
            "password": this.password
        }
        return http.post<User>(Authenticate.URI, params);
    }
}