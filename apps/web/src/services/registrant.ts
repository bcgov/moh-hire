import axios from 'axios';
import { EmailTemplateDTO, RegistrantFilterDTO, RegistrantRO } from '@ehpr/common';
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

export const sendMassEmail = async (payload: EmailTemplateDTO): Promise<void> => {
  await axios.post('/registrants/send-mass-email', payload);
};
