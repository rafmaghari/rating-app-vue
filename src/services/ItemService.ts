import Item from "@/API/Item";

interface ApiResponseInterface {
    data: string[],
    success: boolean,
}

export  default  class ItemService{
    public async getAll(): Promise<ApiResponseInterface> {
        const item = new Item();
        const response = await item.getAllItems();
        return response.data as ApiResponseInterface
    }
}