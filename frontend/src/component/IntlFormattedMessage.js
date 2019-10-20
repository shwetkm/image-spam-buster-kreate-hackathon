import React from 'react';
import { FormattedMessage } from 'react-intl';


const getIntlFormattedMessage = ({id, defaultMessage}) => (
    <FormattedMessage
        id={id}
        defaultMessage={defaultMessage}
    />
);

export default getIntlFormattedMessage;
