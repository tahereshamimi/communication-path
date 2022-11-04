import {
  Telegram,
  Instagram,
  Twitter,
  LinkedIn,
  Facebook,
  Public,
} from "@mui/icons-material";

export enum TypeNames {
  Twitter = "TWITTER",
  Instagram = "INSTAGRAM",
  Facebook = "FACEBOOK",
  Telegram = "TELEGRAM",
  Linkedin = "LINKEDIN",
  Website = "WEBSITE",
}
export interface Type {
  icon: any;
  title: string;
  key: TypeNames;
}

export const types: Type[] = [
  {
    icon: Twitter,
    title: "تویئتر",
    key: TypeNames.Twitter,
  },
  {
    icon: Instagram,
    title: "اینستاگرام",
    key: TypeNames.Instagram,
  },
  {
    icon: Facebook,
    title: "فیسبوک",
    key: TypeNames.Facebook,
  },
  {
    icon: Telegram,
    title: "تلگرام",
    key: TypeNames.Telegram,
  },
  {
    icon: LinkedIn,
    title: "لینکدین",
    key: TypeNames.Linkedin,
  },
  {
    icon: Public,
    title: "وبسایت",
    key: TypeNames.Website,
  },
];
export interface LinkDataType {
  id: string;
  link: string;
  type: string;
}
export interface Inputs {
  linkType: string;
  linkAddress: string;
}
