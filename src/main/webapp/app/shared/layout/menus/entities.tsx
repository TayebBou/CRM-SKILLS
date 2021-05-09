import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { withRouter, NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';
import { PanelMenu } from 'primereact/panelmenu';

export const EntitiesMenu = withRouter(({isAdmin, history, onHide} : any) => {
  
  const redirect = (link : string) => {
    history.push(link);
    onHide();
  }

  const expanded = () => {
    const linkParent = (history.location.pathname.substring(1)).split("/", 1);
    switch (linkParent[0]) {
      case 'collaborator':
        return true;
      case 'skills':
        return true;
      case 'category':
        return true;
      case 'level':
        return true;
      default:
        return false;
    }
  }
  
  return isAdmin ? 
    <PanelMenu model={[
      {
        label: translate('global.menu.entities.main'),
        expanded: expanded(),
        items: [
          {
            label: translate('global.menu.entities.collaborator'),
            icon: 'pi pi-fw pi-users',
            command: () => redirect('/collaborator')
          },
          {
            label: translate('global.menu.entities.skills'),
            icon: 'pi pi-fw pi-star-o',
            command: () => redirect('/skills')
          },
          {
            label: translate('global.menu.entities.category'),
            icon: 'pi pi-fw pi-share-alt',
            command: () => redirect('/category')
          },
          {
            label: translate('global.menu.entities.level'),
            icon: 'pi pi-fw pi-sitemap',
            command: () => redirect('/level')
          },
        ],
      }
    ]} /> : null});
