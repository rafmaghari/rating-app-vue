import {http} from "@/common/http";
import {AxiosResponse} from "axios";

export default class Item {
    getAllItems(): Promise<AxiosResponse> {
        return http.get('items');
    }

    topTenRated(): Promise<AxiosResponse> {
        return http.get('items-top-rated');
    }

    add(param: any): Promise<AxiosResponse> {
        return http.post('items', param);
    }

    byId(id: number): Promise<AxiosResponse> {
        return http.get (`items/${id}`);
    }
}