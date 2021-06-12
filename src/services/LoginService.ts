import {Authenticate} from "@/Infrastructure/Authenticate";
import {ILoginInterface} from "@/Infrastructure/Authenticate";
import {User} from "@/models/User";


export class LoginService implements ILoginInterface{
    email = "";
    password = "";

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public async validate(): Promise<User> {
        const auth = new Authenticate(this.email, this.password);
        const resp = await auth.getLoginCredentials()
        return resp.data;
    }
}