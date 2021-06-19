import Item from "@/API/Item";
import {ApiResponseInterface} from "@/models/Interfaces/ApiResponseInterface";

export  default  class ItemService{
    public async getAll(): Promise<ApiResponseInterface> {
        const item = new Item();
        const response = await item.getAllItems();
        return response.data as ApiResponseInterface
    }
}