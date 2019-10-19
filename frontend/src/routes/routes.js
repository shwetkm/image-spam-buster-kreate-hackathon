import React from "react";
import AppContainer from "../containers/AppContainer";
import { Route, Switch, withRouter } from "react-router";
import LandingPage from "../page/LandingPage";
import { routes } from '../constants/constants';
import SettingPage from '../page/SettingPage';

export const Routes = props => (
    <AppContainer {...props}>
        <Switch>
            <Route exact path={routes.rootPage} component={LandingPage} />
            <Route exact path={routes.home} component={LandingPage} />
            <Route exact path={routes.history} component={LandingPage} />
            <Route exact path={routes.analytics} component={LandingPage} />
            <Route exact path={routes.setting} component={SettingPage} />
        </Switch>
    </AppContainer>
);

export default withRouter(Routes);