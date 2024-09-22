import Cookies from 'universal-cookie';

import ae from '../../../public/locales/ae.json';
import da from '../../../public/locales/da.json';
import de from '../../../public/locales/de.json';
import el from '../../../public/locales/el.json';
import en from '../../../public/locales/en.json';
import es from '../../../public/locales/es.json';
import fr from '../../../public/locales/fr.json';
import hu from '../../../public/locales/hu.json';
import it from '../../../public/locales/it.json';
import ja from '../../../public/locales/ja.json';
import pl from '../../../public/locales/pl.json';
import pt from '../../../public/locales/pt.json';
import ru from '../../../public/locales/ru.json';
import sv from '../../../public/locales/sv.json';
import tr from '../../../public/locales/tr.json';
import zh from '../../../public/locales/zh.json';

type LocaleType = Record<string, string>;

const langObj: Record<string, LocaleType> = {
  en,
  ae,
  da,
  de,
  el,
  es,
  fr,
  hu,
  it,
  ja,
  pl,
  pt,
  ru,
  sv,
  tr,
  zh,
};

const getLang = (): string => {
  if (typeof window !== 'undefined') {
    const cookies = new Cookies();
    return cookies.get('i18nextLng') || 'en';
  }
  return 'en';
};

export const getTranslation = () => {
  const lang = getLang();
  const data = langObj[lang] || langObj.en;

  const t = (key: string): string => {
    return data[key] || key;
  };

  const initLocale = (themeLocale: string) => {
    const lang = getLang();
    i18n.changeLanguage(lang || themeLocale);
  };

  const i18n = {
    language: lang,
    changeLanguage: (lang: string) => {
      if (typeof window !== 'undefined') {
        const cookies = new Cookies();
        cookies.set('i18nextLng', lang, { path: '/' });
      }
    },
  };

  return { t, i18n, initLocale };
};
