export interface Authority {
  condensedName: string;
  name: string;
  domains: string[];
}

export enum AuthoritiesFull {
  FRASER_HEALTH_AUTHORITY = 'Fraser Health Authority',
  VANCOUVER_ISLAND_HEALTH_AUTHORITY = 'Vancouver Island Health Authority',
  VANCOUVER_COASTAL_HEALTH_AUTHORITY = 'Vancouver Coastal Health Authority',
  INTERIOR_HEALTH_AUTHORITY = 'Interior Health Authority',
  NORTHERN_HEALTH_AUTHORITY = 'Northern Health Authority',
  PROVIDENCE_HEALTH_CARE_SOCIETY = 'Providence Health Care Society',
  FIRST_NATIONS_HEALTH_AUTHORITY = 'First Nations Health Authority',
}

export const Authorities: Record<string, Authority> = {
  MOH: {
    condensedName: 'MOH',
    name: 'Ministry of Health',
    domains: ['gov.bc.ca'],
  },
  FNHA: {
    condensedName: 'FNHA',
    name: 'First Nations Health Authority',
    domains: ['fnha.ca'],
  },
  PHC: {
    condensedName: 'providence',
    name: 'Providence Health Care Society',
    domains: ['providencehealth.bc.ca'],
  },
  PHSA: {
    condensedName: 'provincialHsa',
    name: 'Provincial Health Services Authority',
    domains: ['phsa.ca'],
  },
  FHA: {
    condensedName: 'fraser',
    name: AuthoritiesFull.FRASER_HEALTH_AUTHORITY,
    domains: ['fraserhealth.ca'],
  },
  IHA: {
    condensedName: 'interior',
    name: AuthoritiesFull.INTERIOR_HEALTH_AUTHORITY,
    domains: ['interiorhealth.ca'],
  },
  VIHA: {
    condensedName: 'vancouverIsland',
    name: AuthoritiesFull.VANCOUVER_ISLAND_HEALTH_AUTHORITY,
    domains: ['islandhealth.ca'],
  },
  NHA: {
    condensedName: 'northern',
    name: AuthoritiesFull.NORTHERN_HEALTH_AUTHORITY,
    domains: ['northernhealth.ca'],
  },
  VCHA: {
    condensedName: 'vancouverCoastal',
    name: AuthoritiesFull.VANCOUVER_COASTAL_HEALTH_AUTHORITY,
    domains: ['vch.ca'],
  },
};

// for comparing purposes in query filters
// submissions are saved as these condensed versions without spaces
export const FraserRegionLocations = [
  'Hope',
  'Chilliwack',
  'Abbotsford',
  'Mission',
  'AgassizHarrison',
  'NewWestminster',
  'Burnaby',
  'MapleRidgePittMeadows',
  'TriCities',
  'Langley',
  'Delta',
  'Surrey',
  'SouthSurreyWhiteRock',
];

export const VancouverCoastalRegionLocations = [
  'Richmond',
  'Vancouver',
  'NorthVancouver',
  'WestVancouverBowenIsland',
  'SunshineCoast',
  'PowellRiver',
  'HoweSound',
  'BellaCoolaValley',
  'CentralCoast',
];

export const VancouverIslandRegionLocations = [
  'GreaterVictoria',
  'WesternCommunities',
  'SaanichPeninsula',
  'SouthernGulfIslands',
  'CowichanValleySouth',
  'CowichanValleyWest',
  'CowichanValleyNorth',
  'GreaterNanaimo',
  'Oceanside',
  'AlberniClayoquot',
  'ComoxValley',
  'GreaterCampbellRiver',
  'VancouverIslandWest',
  'VancouverIslandNorth',
];

export const InteriorRegionLocations = [
  'Fernie',
  'Cranbrook',
  'Kimberley',
  'Windermere',
  'Creston',
  'Golden',
  'KootenayLake',
  'Nelson',
  'Castlegar',
  'ArrowLakes',
  'Trail',
  'GrandForks',
  'KettleValley',
  'SouthernOkanagan',
  'Penticton',
  'Keremeos',
  'Princeton',
  'ArmstrongSpallumcheen',
  'Vernon',
  'CentralOkanagan',
  'Summerland',
  'Enderby',
  'Revelstoke',
  'SalmonArm',
  'Kamloops',
  '100MileHouse',
  'NorthThompson',
  'CaribooChilcotin',
  'Lillooet',
  'SouthCariboo',
  'Merritt',
];

export const NorthernRegionLocations = [
  'HaidaGwaii',
  'SnowCountry',
  'PrinceRupert',
  'UpperSkeena',
  'Smithers',
  'Kitimat',
  'Stikine',
  'Terrace',
  'Nisgaa',
  'TelegraphCreek',
  'Quesnel',
  'BurnsLake',
  'Nechako',
  'PrinceGeorge',
  'PeaceRiverSouth',
  'PeaceRiverNorth',
  'FortNelson',
];

export const FirstNationsHealthAuthorityLocations = [
  'Gitgaat',
  'Gitxaala',
  'Kitasoo',
  'Kwadacha',
  'LaxKwAlaams',
  'Tahltan',
  'TseyKehDene',
  'Ulkatcho',
];

export const CondensedRegionLocations = {
  [AuthoritiesFull.FRASER_HEALTH_AUTHORITY]: FraserRegionLocations,
  [AuthoritiesFull.VANCOUVER_ISLAND_HEALTH_AUTHORITY]: VancouverIslandRegionLocations,
  [AuthoritiesFull.VANCOUVER_COASTAL_HEALTH_AUTHORITY]: VancouverCoastalRegionLocations,
  [AuthoritiesFull.INTERIOR_HEALTH_AUTHORITY]: InteriorRegionLocations,
  [AuthoritiesFull.NORTHERN_HEALTH_AUTHORITY]: NorthernRegionLocations,
  [AuthoritiesFull.PROVIDENCE_HEALTH_CARE_SOCIETY]: [''],
  [AuthoritiesFull.FIRST_NATIONS_HEALTH_AUTHORITY]: FirstNationsHealthAuthorityLocations,
};
