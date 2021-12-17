import { OptionType } from '@components';
import { getHas, getHsdasByHaId, getLhasByHsdaId, HaId } from '@ehpr/common';

export interface PreferencesType {
  preferencesFoo: string;
}

export const preferencesDefaultValues = {
  preferencesFoo: '',
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
