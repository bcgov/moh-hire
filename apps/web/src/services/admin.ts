import axios from 'axios';
import { User } from '@ehpr/common';

export const approveUser = async (id: string) => {
  try {
    const { data } = await axios.patch<{ data: User }>(`/admin/${id}/approve`);
    return data?.data as User;
  } catch (e) {
    return null;
  }
};

export const revokeUser = async (id: string) => {
  try {
    const { data } = await axios.patch<{ data: User }>(`/admin/${id}/revoke`);
    return data?.data as User;
  } catch (e) {
    return null;
  }
};

export const extractSubmissions = async () => {
  try {
    const response = await axios.get<{ data: string }>('/admin/extract-submissions');
    return response?.data?.data;
  } catch (e) {
    return null;
  }
};
