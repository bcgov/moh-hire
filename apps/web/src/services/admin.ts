import axios from 'axios';
import { User } from '@ehpr/common';

export const approveUser = async (id: string) => {
  const { data } = await axios.patch<{ data: User }>(`/admin/${id}/approve`);
  return data?.data;
};

export const revokeUser = async (id: string) => {
  const { data } = await axios.patch<{ data: User }>(`/admin/${id}/revoke`);
  return data?.data;
};
