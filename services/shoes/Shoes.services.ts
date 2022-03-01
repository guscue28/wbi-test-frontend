import { Api } from '../api/api';
import { $axios } from '../Axios';

export const requestShoes = async (): Promise<void> => {
  const url: string = `${Api.requestCharacters}`;
  const { data } = await $axios.get(url);
  return data
} 