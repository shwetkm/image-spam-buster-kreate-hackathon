import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import AppContainer from '../containers/AppContainer';
import { Route, Switch, withRouter } from 'react-router';
import LandingPage from '../page/LandingPage';
import { applicationContextProps, intlJsonsMap, routes } from '../constants/constants';
import SettingPage from '../page/SettingPage';
import { IntlProvider } from 'react-intl';
import { getStringFromObject } from '../constants/CommonUtil';
import { updateApplicationContextAction } from '../redux/modules/applicationContext/applicatioContext-actions';

class Routes extends React.Component {
    componentDidMount() {
        this.fetchLocalJsons(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== this.props.language) {
            this.fetchLocalJsons(nextProps);
        }
    }

    fetchLocalJsons = (props) => {
        const { language, dispatch, locales } = props;
        console.log('dajdaklda', language, locales);
        axios.get(intlJsonsMap[language])
            .then((response) => {
                dispatch(updateApplicationContextAction(
                    applicationContextProps.LOCALES,
                    {
                        ...locales,
                        [language]: response.data,
                    }
                ));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const { language, locales } = this.props;
        console.log('dajdaklda', language, locales);
        return (
            <IntlProvider locale={language} messages={locales[language]}>
                <AppContainer {...this.props}>
                    <Switch>
                        <Route exact path={routes.rootPage} component={LandingPage} />
                        <Route exact path={routes.home} component={LandingPage} />
                        <Route exact path={routes.history} component={LandingPage} />
                        <Route exact path={routes.analytics} component={LandingPage} />
                        <Route exact path={routes.setting} component={SettingPage} />
                    </Switch>
                </AppContainer>
            </IntlProvider>
        );
    }
}

Routes.propTypes = {
    language: PropTypes.string.isRequired,
    locales: PropTypes.object,
};

Routes.defaultProps = {
    locales: {},
};

const mapStateToProps = state => ({
    language: getStringFromObject(applicationContextProps.LANGUAGE, state.applicationContext),
    locales: getStringFromObject(applicationContextProps.LOCALES, state.applicationContext, {}),
});

export default withRouter(connect(mapStateToProps)(Routes));