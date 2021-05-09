import './header.scss';

import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand, EnterCollabFile } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import { Sidebar } from 'primereact/sidebar';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
  // isCollaboratorComplete: boolean;
}

const Header = (props: IHeaderProps) => {
  const [show, setShow] = useState(false);

  const handleLocaleChange = lang => {
    Storage.session.set('locale', lang);
    props.onLocaleChange(lang);
  };

  const onHide = () => setShow(false);

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header" className="clearfix header-crm-skills">
      <div className="float-left">
        {/* {renderDevRibbon()} */}
        <LoadingBar className="loading-bar" />
        
        <Sidebar visible={show} baseZIndex={1000000} onHide={onHide}>
          <ScrollPanel style={{width: '100%', height: 'calc(100vh - 61.75px)'}}  className="custom">
            <Brand/>
            <Home onHide={onHide}/>
            {props.isAuthenticated && !props.isAdmin /* && !props.isCollaboratorComplete */ ?
                (
                  <EnterCollabFile />
                ) : /* props.isAuthenticated && !props.isAdmin && props.isCollaboratorComplete ?
                  (
                    <Link icon="asterisk" to={`/collaborator`}>
                      <Translate contentKey="global.menu.completeRegister.editCollabFile" />
                    </Link>
                  ): */ null}
            {props.isAuthenticated && props.isAdmin && <EntitiesMenu isAdmin={props.isAdmin} onHide={onHide}/>}
            {props.isAuthenticated && props.isAdmin && <AdminMenu showSwagger={props.isSwaggerEnabled} onHide={onHide}/>}
            <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} onHide={onHide} />
            <div style={{ height: '50px', width: '100%' }}></div>
          </ScrollPanel>
        </Sidebar>
        
        <Button icon="pi pi-bars" onClick={() => setShow(true)} className="p-mr-2" />
      </div>
      <div className="float-right">
        <AccountMenu isAuthenticated={props.isAuthenticated} />
      </div>
    </div>
  );
};

export default Header;
