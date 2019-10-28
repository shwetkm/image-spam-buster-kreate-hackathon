import getIntlFormattedMessage from '../component/IntlFormattedMessage';
import messages from './messages';

export const routes = {
    rootPage: '/',
    home: '/home',
    history: '/history',
    setting: '/setting',
    analytics: '/analytics',
};

export const intlJsonsMap = {
    en: 'locales/en.json',
    hi: 'locales/hi.json',
};

export const applicationContextProps = {
    LEARNING_MODEL: 'learningModel',
    LANGUAGE: 'language',
    LOCALES: 'locales',
};
export const AI_MODEL_CLASSIFIERS = [
    { value: 'ensemble_classifier', title: getIntlFormattedMessage(messages.ensembleClassifierLabel) },
    { value: 'image_classifier', title: getIntlFormattedMessage(messages.imageClassifierLabel) },
    { value: 'heuristic_classifier', title: getIntlFormattedMessage(messages.heuristicClassifierLabel) },
    { value: 'text_classifier', title: getIntlFormattedMessage(messages.textClassifierLabel) },
];