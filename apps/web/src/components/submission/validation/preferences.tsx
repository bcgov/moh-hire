import { AvailabilityDTO } from '@ehpr/common';
import { OptionType } from '@components';
import { getHas, getHsdasByHaId, getLhasByHsdaId, HaId } from '@ehpr/common';

export { PersonalInformationDTO } from '@ehpr/common';

export const preferencesDefaultValues: Partial<AvailabilityDTO> = {
  deployAnywhere: undefined,
  deploymentLocations: [],
  placementOptions: [],
  hasImmunizationTraining: undefined,
  deploymentDuration: undefined,
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

export const HaPdfSizeMap: Record<HaId, { size: number; url: string }> = {
  VancouverRegion: {
    size: 1.4,
    url: 'https://www2.gov.bc.ca/assets/gov/data/geographic/land-use/administrative-boundaries/health-boundaries/3_vancouver_coastal_health_authority.pdf',
  },
  FraserRegion: {
    size: 2,
    url: 'https://www2.gov.bc.ca/assets/gov/data/geographic/land-use/administrative-boundaries/health-boundaries/2_fraser_health_authority.pdf',
  },
  VancouverIslandRegion: {
    size: 2.3,
    url: 'https://www2.gov.bc.ca/assets/gov/data/geographic/land-use/administrative-boundaries/health-boundaries/4_vancouver_island_health_authority.pdf',
  },
  InteriorRegion: {
    size: 1.8,
    url: 'https://www2.gov.bc.ca/assets/gov/data/geographic/land-use/administrative-boundaries/health-boundaries/1_interior_health_authority.pdf',
  },
  NorthernRegion: {
    size: 1.3,
    url: 'https://www2.gov.bc.ca/assets/gov/data/geographic/land-use/administrative-boundaries/health-boundaries/5_northern_health_authority.pdf',
  },
};
