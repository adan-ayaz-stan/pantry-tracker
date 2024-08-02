export interface Recipe {
  from: number;
  to: number;
  count: number;
  _links: Links;
  hits: Hit[];
}

export interface Links {
  next: Next;
}

export interface Next {
  href: string;
  title: string;
}

export interface Hit {
  recipe: Recipe;
  _links: Links2;
}

export interface Recipe {
  uri: string;
  label: string;
  image: string;
  images: Images;
  source: string;
  url: string;
  shareAs: string;
  yield: number;
  dietLabels: string[];
  healthLabels: string[];
  cautions: string[];
  ingredientLines: string[];
  ingredients: Ingredient[];
  calories: number;
  totalCO2Emissions: number;
  co2EmissionsClass: string;
  totalWeight: number;
  totalTime: number;
  cuisineType: string[];
  mealType: string[];
  dishType?: string[];
  totalNutrients: TotalNutrients;
  totalDaily: TotalDaily;
  digest: Digest[];
  tags?: string[];
}

export interface Images {
  THUMBNAIL: Thumbnail;
  SMALL: Small;
  REGULAR: Regular;
  LARGE?: Large;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Small {
  url: string;
  width: number;
  height: number;
}

export interface Regular {
  url: string;
  width: number;
  height: number;
}

export interface Large {
  url: string;
  width: number;
  height: number;
}

export interface Ingredient {
  text: string;
  quantity: number;
  measure?: string;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image?: string;
}

export interface TotalNutrients {
  ENERC_KCAL: EnercKcal;
  FAT: Fat;
  FASAT: Fasat;
  FATRN: Fatrn;
  FAMS: Fams;
  FAPU: Fapu;
  CHOCDF: Chocdf;
  "CHOCDF.net"?: ChocdfNet;
  FIBTG: Fibtg;
  SUGAR: Sugar;
  PROCNT: Procnt;
  CHOLE: Chole;
  NA: Na;
  CA: Ca;
  MG: Mg;
  K: K;
  FE: Fe;
  ZN: Zn;
  P: P;
  VITA_RAE: VitaRae;
  VITC: Vitc;
  THIA: Thia;
  RIBF: Ribf;
  NIA: Nia;
  VITB6A: Vitb6A;
  FOLDFE: Foldfe;
  FOLFD: Folfd;
  FOLAC: Folac;
  VITB12: Vitb12;
  VITD: Vitd;
  TOCPHA: Tocpha;
  VITK1: Vitk1;
  WATER: Water;
  "SUGAR.added"?: SugarAdded;
}

export interface EnercKcal {
  label: string;
  quantity: number;
  unit: string;
}

export interface Fat {
  label: string;
  quantity: number;
  unit: string;
}

export interface Fasat {
  label: string;
  quantity: number;
  unit: string;
}

export interface Fatrn {
  label: string;
  quantity: number;
  unit: string;
}

export interface Fams {
  label: string;
  quantity: number;
  unit: string;
}

export interface Fapu {
  label: string;
  quantity: number;
  unit: string;
}

export interface Chocdf {
  label: string;
  quantity: number;
  unit: string;
}

export interface ChocdfNet {
  label: string;
  quantity: number;
  unit: string;
}

export interface Fibtg {
  label: string;
  quantity: number;
  unit: string;
}

export interface Sugar {
  label: string;
  quantity: number;
  unit: string;
}

export interface Procnt {
  label: string;
  quantity: number;
  unit: string;
}

export interface Chole {
  label: string;
  quantity: number;
  unit: string;
}

export interface Na {
  label: string;
  quantity: number;
  unit: string;
}

export interface Ca {
  label: string;
  quantity: number;
  unit: string;
}

export interface Mg {
  label: string;
  quantity: number;
  unit: string;
}

export interface K {
  label: string;
  quantity: number;
  unit: string;
}

export interface Fe {
  label: string;
  quantity: number;
  unit: string;
}

export interface Zn {
  label: string;
  quantity: number;
  unit: string;
}

export interface P {
  label: string;
  quantity: number;
  unit: string;
}

export interface VitaRae {
  label: string;
  quantity: number;
  unit: string;
}

export interface Vitc {
  label: string;
  quantity: number;
  unit: string;
}

export interface Thia {
  label: string;
  quantity: number;
  unit: string;
}

export interface Ribf {
  label: string;
  quantity: number;
  unit: string;
}

export interface Nia {
  label: string;
  quantity: number;
  unit: string;
}

export interface Vitb6A {
  label: string;
  quantity: number;
  unit: string;
}

export interface Foldfe {
  label: string;
  quantity: number;
  unit: string;
}

export interface Folfd {
  label: string;
  quantity: number;
  unit: string;
}

export interface Folac {
  label: string;
  quantity: number;
  unit: string;
}

export interface Vitb12 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Vitd {
  label: string;
  quantity: number;
  unit: string;
}

export interface Tocpha {
  label: string;
  quantity: number;
  unit: string;
}

export interface Vitk1 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Water {
  label: string;
  quantity: number;
  unit: string;
}

export interface SugarAdded {
  label: string;
  quantity: number;
  unit: string;
}

export interface TotalDaily {
  ENERC_KCAL: EnercKcal2;
  FAT: Fat2;
  FASAT: Fasat2;
  CHOCDF: Chocdf2;
  FIBTG: Fibtg2;
  PROCNT: Procnt2;
  CHOLE: Chole2;
  NA: Na2;
  CA: Ca2;
  MG: Mg2;
  K: K2;
  FE: Fe2;
  ZN: Zn2;
  P: P2;
  VITA_RAE: VitaRae2;
  VITC: Vitc2;
  THIA: Thia2;
  RIBF: Ribf2;
  NIA: Nia2;
  VITB6A: Vitb6A2;
  FOLDFE: Foldfe2;
  VITB12: Vitb122;
  VITD: Vitd2;
  TOCPHA: Tocpha2;
  VITK1: Vitk12;
}

export interface EnercKcal2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Fat2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Fasat2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Chocdf2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Fibtg2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Procnt2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Chole2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Na2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Ca2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Mg2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface K2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Fe2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Zn2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface P2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface VitaRae2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Vitc2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Thia2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Ribf2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Nia2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Vitb6A2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Foldfe2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Vitb122 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Vitd2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Tocpha2 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Vitk12 {
  label: string;
  quantity: number;
  unit: string;
}

export interface Digest {
  label: string;
  tag: string;
  schemaOrgTag?: string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
  sub?: Sub[];
}

export interface Sub {
  label: string;
  tag: string;
  schemaOrgTag?: string;
  total: number;
  hasRDI: boolean;
  daily: number;
  unit: string;
}

export interface Links2 {
  self: Self;
}

export interface Self {
  href: string;
  title: string;
}
