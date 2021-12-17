import data from '../data/location_data.json';

export type Ha = { id: string; name: string; hsdas: string[] };
export type Hsda = { id: string; name: string; lhas: string[] };
export type Lha = { id: string; name: string };

type LocationData = {
  has: {
    byId: Record<string, Ha>;
    allIds: string[];
  };
  hsdas: {
    byId: Record<string, Hsda>;
    allIds: string[];
  };
  lhas: {
    byId: Record<string, Lha>;
    allIds: string[];
  };
};

const locationData: LocationData = data;

export type HaId = keyof typeof locationData.has.byId;
export type HsdaId = keyof typeof locationData.hsdas.byId;
export type LhaId = keyof typeof locationData.lhas.byId;

const { has, hsdas, lhas } = locationData;

export const validHaIds = has.allIds;
export const validHsdaIds = hsdas.allIds;
export const validLhaIds = lhas.allIds;

export const getHaById = (id: HaId) => has.byId[id];
export const getHsdaById = (id: HsdaId) => hsdas.byId[id];
export const getLhaById = (id: LhaId) => lhas.byId[id];

export const getHas = () => Object.values(has.byId);

export const getHsdasByHaId = (haId: HaId): Hsda[] => {
  const ha = getHaById(haId);
  return ha.hsdas.map(hsdaId => getHsdaById(hsdaId));
};

export const getLhasByHsdaId = (hsdaId: HsdaId): Lha[] => {
  const hsda = getHsdaById(hsdaId);
  return hsda.lhas.map(LhaId => getLhaById(LhaId));
};

export const getLhasbyHaId = (haId: HaId): Lha[] => {
  const ha = getHaById(haId);
  const lhas: Lha[] = [];
  ha.hsdas.forEach(hsdaId => {
    const hsda = getHsdaById(hsdaId);
    lhas.push(...hsda.lhas.map(LhaId => getLhaById(LhaId)));
  });
  return lhas;
};
