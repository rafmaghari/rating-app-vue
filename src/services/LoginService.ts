import {Authenticate} from "@/API/Authenticate";
import {ILoginInterface} from "@/API/Authenticate";

interface APIResponseInterface {
    data: {
        user: null,
        token: null
    },
    success: boolean,
}

export class LoginService implements ILoginInterface{
    email = "";
    password = "";

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public async validate() {
        const auth = new Authenticate(this.email, this.password);
        const response = await auth.getLoginCredentials()
        return response.data as APIResponseInterface;
    }
}