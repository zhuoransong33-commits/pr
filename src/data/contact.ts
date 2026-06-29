import { Language } from '../../types';

export interface SocialLinks {
  wechat: string;
  phone: string;
}

export interface ContactContent {
  baseLabel: string;
  locationValue: string;
  contactLabel: string;
  emailMeLabel: string;
  email: string;
  hello: string;
  intro: string;
  socials: SocialLinks;
  tooltip?: string;
  githubLabel: string;
  footerDesign: string;
}

export const CONTACT_DATA: Record<Language, ContactContent> = {
  zh: {
    baseLabel: "BASE",
    locationValue: "中国, 江苏",
    contactLabel: "联系我",
    emailMeLabel: "发邮件给我",
    email: "1404782347@QQ.com",
    hello: "你好 ;-)",
    intro: "欢迎探讨与合作。",
    socials: {
      wechat: "Bday23330000",
      phone: "+86 16638843378"
    },
    githubLabel: "GitHub",
    footerDesign: "Powered by Chat GPT 4.0"
  },
  en: {
    baseLabel: "BASE",
    locationValue: "Jiangsu, China",
    contactLabel: "Get in touch",
    emailMeLabel: "Email Me!!!",
    email: "1404782347@QQ.com",
    hello: "Hello ;-)",
    intro: "Welcome to discuss & cooperate.",
    socials: {
      wechat: "YourWeChatID",
      phone: "16638843378"
    },
    githubLabel: "GitHub",
    footerDesign: "Powered by Chat GPT 4.0"
  }
};
