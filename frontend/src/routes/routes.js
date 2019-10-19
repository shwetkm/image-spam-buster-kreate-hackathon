import React from "react";
import AppContainer from "../AppContainer";
import { Route, Switch, withRouter } from "react-router";
import LandingPage from "../page/LandingPage";
import { routes } from '../constants/constants';

export const Routes = () => (
    <AppContainer>
        <Switch>
            <Route path={routes.rootPage} component={LandingPage} />
        </Switch>
    </AppContainer>
);

export default withRouter(Routes);