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
    { value: 'ensemble_classifier', title: 'Ensemble Classifier' },
    { value: 'image_classifier', title: 'Image Classifier' },
    { value: 'heuristic_classifier', title: 'Heuristic Classifier' },
    { value: 'text_classifier', title: 'Text Classifier' },
];