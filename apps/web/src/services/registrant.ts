import axios from 'axios';
import { RegistrantFilterDTO, RegistrantRO } from '@ehpr/common';
import { convertToParams } from '../util';

export const getRegistrants = async (filter: RegistrantFilterDTO) => {
  const response = await axios.get<{ data: [RegistrantRO[], number] }>(
    `/registrants?${convertToParams(filter)}`,
  );

  if (Array.isArray(response?.data?.data)) {
    const [data, count] = response.data.data;
    return { data, count };
  }
  return { data: [], count: 0 };
};

export const getAllRegistrantsEmails = async () => {
  const response = await axios.get<{ data: string[] }>(`/admin/registrant-emails`);
  return response?.data?.data;
};
