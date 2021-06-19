import {ApiResponseInterface} from "@/models/Interfaces/ApiResponseInterface";
import ItemComment from "@/API/ItemComment";

export  default  class ItemCommentService{
    public async comment(param: any): Promise<ApiResponseInterface> {
        const itemComment = new ItemComment();
        const response = await itemComment.comment(param);
        return response.data as ApiResponseInterface
    }
}