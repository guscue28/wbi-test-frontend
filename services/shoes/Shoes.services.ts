import { ShoesData } from '../../interfaces/Shoes.interfaces';
import { Api } from '../api/api';
import { $axios } from '../Axios';

export const requestShoes = async (sorts:any): Promise<ShoesData> => {
  const url: string = `${Api.requestAllShoes}`;
  const { data } = await $axios.get(url, {
    params: {
      searchKey: sorts.searchKey,
      itemsPerPage: sorts.itemsPerPage,
      page: sorts.page,
      store: sorts.store,
      releaseAt: sorts.releaseAt
    }
  });
  return data
} 