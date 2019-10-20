import { applicationContextProps } from '../constants/constants';

const initialStates = {
    applicationContext: {
        [applicationContextProps.LANGUAGE]: 'hi',
        [applicationContextProps.LEARNING_MODEL]: 'heuristic_classifier',
        [applicationContextProps.LOCALES]: [],
    },
};

export default initialStates;
