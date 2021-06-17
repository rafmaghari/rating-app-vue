import {http} from "@/common/http";
import {AxiosResponse} from "axios";

export default class Item {
    getAllItems(): Promise<AxiosResponse> {
        return http.get('items');
    }
}