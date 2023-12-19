import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enGB from './en/en-GB.json';
import zhTW from './zh/zh-TW.json';

export const defaultNS = 'ns1';
export const resources = {
    en: {
        ns1: enGB
    },
    zh: {
        ns1: zhTW
    }
  } as const;

i18next.use(initReactI18next).init({
    debug: true,
    // default language folder
    // if you're using a language detector, 
    // do not define the lng option
    lng: 'en',
    fallbackLng: "en",
    interpolation: {
        // 是否要讓字詞 escaped 來防止 xss 攻擊，
        // 這裡因為 React.js 已經做了，就設成 false即可
        escapeValue: false,
     },
    resources,
    defaultNS,
  });
