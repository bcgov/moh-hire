import { AvailabilityDTO } from '@ehpr/common';
import { OptionType } from '@components';
import { getHas, getHsdasByHaId, getLhasByHsdaId, HaId } from '@ehpr/common';

export { PersonalInformationDTO } from '@ehpr/common';

export const preferencesDefaultValues: Partial<AvailabilityDTO> = {
  deployAnywhere: undefined,
  deploymentLocations: [],
};

export const haOptions = getHas().map(({ id, name }) => ({
  value: id,
  label: name,
}));

export const getHsdaOptions = (haSelection: HaId): OptionType[] => {
  const hsdas = getHsdasByHaId(haSelection);

  return hsdas.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
};

export const getLhaOptions = (hsdaSelection: string): OptionType[] => {
  const lhas = getLhasByHsdaId(hsdaSelection);

  return lhas.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
};
