import Item from "@/API/Item";
import {ApiResponseInterface} from "@/models/types/ApiResponseInterface";

export  default  class ItemService {
    public async getAll(): Promise<ApiResponseInterface> {
        const item = new Item();
        const response = await item.getAllItems();
        return response.data as ApiResponseInterface
    }

    public async getTopRated(): Promise<ApiResponseInterface> {
        const item = new Item();
        const response = await item.topTenRated();
        return response.data as ApiResponseInterface
    }

    public async add(param: any): Promise<ApiResponseInterface> {
        const item = new Item();
        const response = await item.add(param);
        return response.data as ApiResponseInterface;
    }

    public async getItemById(id: number): Promise<ApiResponseInterface> {
        const item = new Item();
        const response = await item.byId(id);
        return response.data as ApiResponseInterface;
    }
}