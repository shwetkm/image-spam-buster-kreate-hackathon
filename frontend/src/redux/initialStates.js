import { applicationContextProps } from '../constants/constants';

const initialStates = {
    applicationContext: {
        [applicationContextProps.LANGUAGE]: 'hi',
        [applicationContextProps.LEARNING_MODEL]: 'image_classifier',
        [applicationContextProps.LOCALES]: [],
    },
};

export default initialStates;
