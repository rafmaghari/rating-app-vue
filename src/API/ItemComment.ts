import {http} from "@/common/http";
import {AxiosResponse} from "axios";

export default class ItemComment {
    comment(param: any): Promise<AxiosResponse> {
        return http.post('item-comments',param);
    }
}