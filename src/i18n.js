import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import EN from './assets/translations/en-US/common.json';
import VN from './assets/translations/vi-VN/common.json';
import TextEN from './assets/translations/en-US/text.json';
import TextVN from './assets/translations/vi-VN/text.json';

const resources = {
    en: {
        common: EN, // common: ns, EN: lang
        text: TextEN
    },
    vi: {
        common: VN,
        text: TextVN
    }
};
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'vi', // Default language
        fallbackLng: 'vi', // When specified language translation not present
        debug: true,
        ns: ['common', 'text'],
        defaultNS: 'common',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        }
    });

export default i18n;