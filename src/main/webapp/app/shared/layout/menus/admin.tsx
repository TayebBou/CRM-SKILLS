import React from 'react';
import { withRouter, NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { PanelMenu } from 'primereact/panelmenu';

export const AdminMenu = withRouter(({ showSwagger, history, onHide } : any) => {

  const redirect = (link : string) => {
    history.push(link);
    onHide();
  }

  const expanded = () => {
    const linkParent = (history.location.pathname.substring(1)).split("/", 2);
    switch (linkParent[1]) {
      case 'user-management':
        return true;
      case 'metrics':
        return true;
      case 'health':
        return true;
      case 'configuration':
        return true;
      case 'audits':
        return true;
      case 'logs':
        return true;
      case 'docs':
        return true;
      default:
        return false;
    }
  }

  return showSwagger ?
    <PanelMenu model={[
      {
        label: translate('global.menu.admin.main'),
        expanded: expanded(),
        items: [
          {
            label: translate('global.menu.admin.userManagement'),
            icon: 'pi pi-fw pi-user-edit',
            command: () => redirect('/admin/user-management')
          },
          {
            label: translate('global.menu.admin.metrics'),
            icon: 'pi pi-fw pi-sliders-h',
            command: () => redirect('/admin/metrics')
          },
          {
            label: translate('global.menu.admin.health'),
            icon: 'pi pi-fw pi-check-circle',
            command: () => redirect('/admin/health')
          },
          {
            label: translate('global.menu.admin.configuration'),
            icon: 'pi pi-fw pi-cog',
            command: () => redirect('/admin/configuration')
          },
          {
            label: translate('global.menu.admin.audits'),
            icon: 'pi pi-fw pi-list',
            command: () => redirect('/admin/audits')
          },
          {
            label: translate('global.menu.admin.logs'),
            icon: 'pi pi-fw pi-book',
            command: () => redirect('/admin/logs')
          },
          {
            label: translate('global.menu.admin.apidocs'),
            icon: 'pi pi-fw pi-slack',
            command: () => redirect('/admin/docs')
          }
        ],
      }
    ]} /> : null});

export default AdminMenu;
