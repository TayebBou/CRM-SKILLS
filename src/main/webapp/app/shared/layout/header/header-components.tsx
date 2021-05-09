import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PanelMenu } from 'primereact/panelmenu';
import appConfig from 'app/config/constants';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = props => (
  <></>
);

export const Home = withRouter((props: any, panel = true) => {
  
  const onClick = () => {props.history.push('/'); props.onHide() };

  return (
    <PanelMenu model={[
        {
          label: translate('global.menu.home'),
          icon: 'pi pi-fw pi-home',
          command: () => onClick()
        }
      ]} />
)});

export const EnterCollabFile = (props, panel = true) => (
  <PanelMenu model={panel ? [
    {
      label: <Link className="d-flex align-items-center" to={`/collaborator/new`}>
        <FontAwesomeIcon icon="plus" />
      &nbsp;
      <Translate contentKey="global.menu.completeRegister.enterCollabFile" />
      </Link>,
    },
  ] : [
      {
        label: translate('global.menu.completeRegister.enterCollabFile'),
      }
    ]} />
);
