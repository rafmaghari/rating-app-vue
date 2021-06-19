import {http} from "@/common/http";
import {AxiosResponse} from "axios";

export default class Rating {
    voteItem(param: any): Promise<AxiosResponse> {
        return http.post('ratings',param);
    }
}