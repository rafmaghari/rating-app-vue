import Item from "@/API/Item";
import Rating from "@/API/Rating";
import {ApiResponseInterface} from "@/models/Interfaces/ApiResponseInterface";

export  default  class RatingService{
    public async vote(param: any): Promise<ApiResponseInterface> {
        const rating = new Rating();
        const response = await rating.voteItem(param);
        return response.data as ApiResponseInterface
    }
}