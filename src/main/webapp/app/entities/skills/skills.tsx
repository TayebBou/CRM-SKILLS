import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './skills.reducer';
import { ISkills } from 'app/shared/model/skills.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


export interface ISkillsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Skills = (props: ISkillsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const categoriesBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.category
          ? <Link to={`category/${rowData.category.id}`}>{rowData.category.label}</Link>
          : null}
      </>
    )
  }

  const { skillsList, match, loading } = props;

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
      <h2 id="skills-heading">
        <Translate contentKey="crm-skillsApp.skills.home.title">Skills</Translate>
        <Link to={`${match.url}/new`} className="float-right jh-create-entity text-decoration-none">
          <Button className="p-button-outlined p-button-primary" label={translate('crm-skillsApp.skills.home.createLabel')} icon="pi pi-plus" />
        </Link>
      </h2>

      {skillsList && skillsList.length > 0 ? (
        <div className="datatable-responsive-demo mt-5">
          <DataTable value={skillsList} className="p-datatable-responsive-demo" paginator rows={10}>
            <Column field="label" header={translate('crm-skillsApp.skills.label')} />
            <Column field="code" header={translate('crm-skillsApp.skills.code')} />
            <Column field="category.label" header={translate('crm-skillsApp.skills.category')} body={categoriesBodyTemplate} />
            <Column field="activated" header="Actions" body={actionsBodyTemplate} />
          </DataTable>
        </div>
      ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="crm-skillsApp.skills.home.notFound">No Skills found</Translate>
            </div>
          )
        )}
    </React.Fragment>
  );
};

const mapStateToProps = ( storeState : IRootState) => ({
  skillsList: storeState.skills.entities,
  loading: storeState.skills.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
