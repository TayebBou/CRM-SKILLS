import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PrivateRoute from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

import Collaborator from './collaborator';
import Skills from './skills';
import Category from './category';
import Level from './level';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <React.Fragment>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}collaborator`} component={Collaborator} />
      <ErrorBoundaryRoute path={`${match.url}skills`} component={Skills} />
      <PrivateRoute path={`${match.url}category`} hasAnyAuthorities={[AUTHORITIES.ADMIN]} component={Category} />
      <PrivateRoute path={`${match.url}level`} hasAnyAuthorities={[AUTHORITIES.ADMIN]} component={Level} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </React.Fragment>
);

export default Routes;
