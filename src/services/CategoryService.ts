import {ApiResponseInterface} from "@/models/types/ApiResponseInterface";
import Category from "@/API/Category";

export  default  class CategoryService{
    public async getAllCategories(): Promise<ApiResponseInterface> {
        const category = new Category();
        const response = await category.all();
        return response.data as ApiResponseInterface
    }
}