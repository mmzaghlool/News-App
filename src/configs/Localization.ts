// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

let Localization = new LocalizedStrings({
  en: {
    language: 'Language',
    appearance: 'Appearance',
    changeLanguage: 'Change language',
    changeLanguageMessage: 'The application needs to restart to change the app language',
    OK: 'OK',
    cancel: 'Cancel',
    settings: 'Settings',
    news: 'News',
    latestNews: 'Latest News',
    noNewsAvailable: 'No news available',
    search: 'Search',
    source: 'Source',
  },
  fr: {
    language: 'Langue',
    appearance: 'Apparence',
    changeLanguage: 'Changer de langue',
    changeLanguageMessage: "L'application doit redémarrer pour changer la langue de l'application",
    OK: "D'accord",
    cancel: 'Annuler',
    settings: 'Réglages',
    news: 'Nouvelles',
    latestNews: 'Dernières nouvelles',
    noNewsAvailable: 'Aucune actualité disponible',
    search: 'Chercher',
    source: 'La source',
  },
});

export default Localization;
