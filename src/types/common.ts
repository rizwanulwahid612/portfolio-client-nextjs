export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
  status?: any;
  message?: any;
  success?: any;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
export type IFramework = {
  image: string;
  category: string;
  description: string;
  rating: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type IProject = {
  image: string;
  name: string;
  title: string;
  category: string;
  frontend: string;
  backend: string;
  description: string;
  techonology: string;
  ownername: string;
  gitClient: string;
  gitServer: string;
  liveproject: string;
  liveServer: string;
  videoLink: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type Iimgs = {
  imgs?: string;
  public_id?: string;
  secure_url?: string;
};
export type IUser = {
  _id: any;
  id: string;
  role: string;
  name: string;
  email: string;
  imagess?: Iimgs[];
  back: string;
  cv: string;
  features: string;
  framework: string;
  front: string;
  resume: string;
  technologyFor: string;
  tool: string;
  trainningcenter: string;
  facebook?: string;
  youtube?: string;
  instagram?: string;
  tools?: string;
  discord?: string;
  language?: string;
  twitter?: String;
  gender?: string;
  contact?: string;
  title: string;
  skills?: string;
  aboutme?: string;
  fathersname?: string;
  mothersname?: string;
  marriedstatus?: string;
  nid?: string;
  birth?: string;
  blood?: string;
  height?: string;
  weight?: string;
  ssc?: string;
  hsc?: string;
  institute: string;
  degree: string;
  passingyear?: string;
  masters?: string;
  phd?: string;
  presentaddress?: string;
  parmanentaddress?: string;
  frontend?: string;
  backend?: string;
  linkedin?: string;
  whatsapp?: string;
  github?: string;
  website?: string;
  experience1?: string;
  experience2?: string;
  experience3?: string;
  experience4?: string;
  experience5?: string;
  experience6?: string;
  experience7?: string;
  experience8?: string;
  experience9?: string;
  experience10?: string;
  extracurriculam?: string;
  achivement?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type IReview = {
  customerId: string;
  categoryId: string;
  rating: string;
  comment: string;
};
export type ISkill = {
  name: string;
};
export type IAchivement = {
  date?: string;
  category?: string;
  certificate?: string;
  description?: string;
  get?: string;
};
export type IExperiance = {
  title?: string;
  description?: string;
  startdate?: string;
  enddate?: string;
  present?: string;
  company?: string;
};
