import axios from 'axios';
import { InviteUserDTO, RegistrantFilterDTO, RegistrantRO, User } from '@ehpr/common';
import { convertToParams } from '../util';

export const inviteUser = async (payload: InviteUserDTO) => {
  const { data } = await axios.post<{ data: User }>('/admin/invite', payload);
  return data?.data as User;
};

export const approveUser = async (id: string) => {
  const { data } = await axios.patch<{ data: User }>(`/admin/${id}/approve`);
  return data?.data as User;
};

export const revokeUser = async (id: string) => {
  const { data } = await axios.patch<{ data: User }>(`/admin/${id}/revoke`);
  return data?.data as User;
};

export const extractSubmissions = async () => {
  const response = await axios.get<{ data: string }>('/admin/extract-submissions');
  return response?.data?.data;
};

export const getRegistrants = async (filter: RegistrantFilterDTO) => {
  const response = await axios.get<{ data: [RegistrantRO[], number] }>(
    `/admin?${convertToParams(filter)}`,
  );

  if (Array.isArray(response?.data?.data)) {
    const [data, count] = response.data.data;
    return { data, count };
  }
  return { data: [], count: 0 };
};
