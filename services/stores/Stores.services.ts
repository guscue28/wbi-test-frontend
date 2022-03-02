import { Stores } from '../../interfaces/Stores.interfaces';
import { Api } from '../api/api';
import { $axios } from '../Axios';

export const requestStores = async (): Promise<Stores[]> => {
  const url: string = `${Api.requesAllStores}`;
  const { data } = await $axios.get(url);
  console.log('data', data);
  return data
}