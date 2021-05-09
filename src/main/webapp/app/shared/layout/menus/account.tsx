import React from 'react';
import { withRouter, NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { SplitButton } from 'primereact/splitbutton';
import './account.scss';


export const AccountMenu = withRouter(({ isAuthenticated = false, history } : any) => 
isAuthenticated ? (
    <SplitButton label={translate('global.menu.account.main')} icon="pi pi-user" model={[
        {
          label: translate('global.menu.account.settings'),
          icon: 'pi pi-fw pi-user',
          command: () => history.push('/account/settings')
        },
        {
          label: translate("global.menu.account.password"),
          icon: 'pi pi-fw pi-ellipsis-h',
          command: () => history.push('/account/password')
        },
        {
          label: translate("global.menu.account.logout"),
          icon: 'pi pi-fw pi-sign-out',
          command: () => history.push('/logout')
        }
      ]}>
    </SplitButton>
) : (
    <SplitButton label={translate('global.menu.account.main')} icon="pi pi-user" model={[
        {
          label: translate("global.menu.account.login"),
          icon: 'pi pi-fw pi-sign-in',
          command: () => history.push('/login')
        },
        {
          label: translate("global.menu.account.register"),
          icon: 'pi pi-fw pi-user-plus',
          command: () => history.push('/account/register')
        }
      ]}>
    </SplitButton>
));
