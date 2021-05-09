import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Table } from 'reactstrap';
import { byteSize, Translate, ICrudGetAllAction, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSession } from 'app/shared/reducers/authentication';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './level.reducer';
import { ILevel } from 'app/shared/model/level.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILevelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Level = (props: ILevelProps) => {
  useEffect(() => {
    props.getSession();
    props.getEntities();
  }, []);

  const { levelList, match, loading } = props;

  function actionsBodyTemplate(rowData) {
    return (
      <>
        <Link to={`${match.url}/${rowData.id}`} className="mr-2">
          <Button icon="pi pi-eye" className="p-button-rounded p-button-outlined" />
        </Link>

        <Link to={`${match.url}/${rowData.id}/edit`} className="mr-2">
          <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-button-outlined" />
        </Link>
        <Link to={`${match.url}/${rowData.id}/delete`} className="mr-2">
          <Button icon="pi pi-trash" className="p-button-rounded p-button-warning p-button-outlined" />
        </Link>
      </>
    )
  }
  return (
    <React.Fragment>
      <h2 id="level-heading">
        <Translate contentKey="crm-skillsApp.level.home.title">Levels</Translate>
        <Link to={`${match.url}/new`} className="float-right jh-create-entity text-decoration-none">
          <Button className="p-button-outlined p-button-primary" label={translate('crm-skillsApp.level.home.createLabel')} icon="pi pi-plus" />
        </Link>
      </h2>
      {levelList && levelList.length > 0 ? (
        <div className="datatable-responsive-demo mt-5">
          <DataTable value={levelList} className="p-datatable-responsive-demo" paginator rows={10}>
            <Column field="label" header={translate('crm-skillsApp.level.label')} />
            <Column field="code" header={translate('crm-skillsApp.level.code')} />
            <Column field="description" header={translate('crm-skillsApp.level.description')} />
            <Column field="activated" header="Actions" body={actionsBodyTemplate} />
          </DataTable>
        </div>
      ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="crm-skillsApp.level.home.notFound">No Levels found</Translate>
            </div>
          )
        )}
    </React.Fragment>
  );
};

const mapStateToProps = ( storeState : IRootState) => ({
  levelList: storeState.level.entities,
  loading: storeState.level.loading,
});

const mapDispatchToProps = {
  getEntities,
  getSession
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Level);
