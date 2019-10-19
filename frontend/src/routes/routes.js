import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router';
import { addLocaleData } from 'react-intl';
import localeEn from 'react-intl/locale-data/en';
import { connect } from 'react-redux';
import ConnectedIntlProvider from '../containers/ConnectedIntlProvider/ConnectedIntlProvider';
import AppContainer from '../AppContainer';
import LandingPage from '../pages/LandingPage/LandingPage';
import { intlJsonsMap, routes } from '../constants/constants';

addLocaleData([...localeEn]);

class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            intlJson: {},
        };
    }

    componentDidMount() {
        this.fetchLanguageJSONS(this.props.language);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.language !== this.props.language) {
            this.fetchLanguageJSONS(nextProps.language);
        }
    }

    fetchLanguageJSONS = (language) => {
        fetch(intlJsonsMap[language], {
            credentials: 'same-origin',
        })
            .then(resp => resp.json())
            .then((json) => {
                this.setState({
                    intlJson: json,
                });
            })
            .catch((error) => {
                // this.props.dispatch(errorMessage(
                //     'Error While Fetching Language Jsons',
                // ));
                console.error(
                    `There has been a problem with your fetch operation:${error.message}`,
                );
                // this.props.dispatch(hideSpinner());
            });
    };

    render() {
        const { intlJson } = this.state;
        const { language } = this.props;
        console.log('asd[aksopdasd,sa', this.state.languages);
        return (
            <ConnectedIntlProvider locale={language} messages={intlJson}>
                <React.Fragment>
                    <AppContainer>
                        <Switch>
                            <Route path={routes.rootPage} exact component={LandingPage} />
                        </Switch>
                    </AppContainer>
                </React.Fragment>
            </ConnectedIntlProvider>
        );
    }
}
Routes.propTypes = {
    // dispatch: PropTypes.func,
    language: PropTypes.string,
};

Routes.defaultProps = {
    language: 'en',
    // dispatch: () => {},
};

const mapStateToProps = state => ({
    appConfiguration: state.appConfiguration,
    language: state.language,
});
export default withRouter(connect(mapStateToProps)(Routes));

