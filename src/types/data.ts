export interface CountrySummary {
  flags: FlagsClass | string;
  name: NameClass | string;
  capital: string[] | string;
  region: Region;
  population: number;
  cca3: string;
}

export interface FlagsClass {
  png: string;
  svg: string;
  alt: string;
}

export interface NameClass {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
}

export interface NativeName {
  official: string;
  common: string;
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}
