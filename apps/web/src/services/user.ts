import axios from 'axios';
import { User } from '@ehpr/common';

export const getUser = async (id: string) => {
  const { data } = await axios.get<{ data: User }>(`/users/${id}`);
  return data?.data;
};

export const getUsers = async () => {
  const { data } = await axios.get<{ data: User[] }>('/users');
  return data?.data;
};
