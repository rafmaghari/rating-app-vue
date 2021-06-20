import {http} from "@/common/http";
import {AxiosResponse} from "axios";

export default class Category {
    all(): Promise<AxiosResponse> {
        return http.get('categories');
    }
}