import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Col, Row, Table, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import {
  openFile,
  byteSize,
  Translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount,
  translate
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputText } from 'primereact/inputtext';
import { IRootState } from 'app/shared/reducers';
import { getEntities as getCollaborators, getEntitiesBySkills } from './collaborator.reducer';
import { getEntities as getSkills } from 'app/entities/skills/skills.reducer';
import { ICollaborator } from 'app/shared/model/collaborator.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import './collaborator.scss';

export interface ICollaboratorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Collaborator = (props: ICollaboratorProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const [searchState, setSearchState] = useState({ search: '', values: [] });

  const [selectedSkillsState, setSelectedSkillsState] = useState({ selectedSkills: null });

  const idsSelected = [];


  const getAllEntities = () => {
    searchState.search === '' ?
      props.getCollaborators(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`)
      : props.getEntitiesBySkills(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`, searchState.values);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
    props.getSkills();
  }, []);

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  // Input multiple filter event
  const updatesearchFilterMultiple = () => {
    setSearchState({
      search: 'bySkills',
      values: idsSelected,
    });
    if (idsSelected[0] === "" && idsSelected.length === 1 || idsSelected.length === 0) { // when user click on the empty option value of select multiple skills od don't click at all
      props.getCollaborators(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
      setSearchState({
        search: '',
        values: [],
      });
    } else {
      props.getEntitiesBySkills(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`, idsSelected);
    }
  };

  const { collaboratorList, skills, match, loading, totalItems } = props;

  function avatarBodyTemplate(rowData) {
    return (
      <>
        {rowData.avatar ? (
          <React.Fragment>
            {rowData.avatarContentType ? (
              <a onClick={openFile(rowData.avatarContentType, rowData.avatar)}>
                <img
                  src={`data:${rowData.avatarContentType};base64,${rowData.avatar}`}
                  style={{ maxHeight: '30px' }}
                />
                            &nbsp;
              </a>
            ) : null}
          </React.Fragment>
        ) : null}
      </>
    )
  }

  function fullNameBodyTemplate(rowData) {
    return (
      <>
        {rowData.account ? rowData.account.firstName + ' ' + rowData.account.lastName : ''}
      </>
    )
  }

  function loginBodyTemplate(rowData) {
    return (
      <>
        {rowData.account ? rowData.account.login : ''}
      </>
    )
  }

  function skillsBodyTemplate(rowData) {
    return (
      <>
        {rowData.skills
          ? rowData.skills.map((val, j) => (
            <span key={j}>
              <Link to={`skills/${val.id}`}>{val.label}</Link>
              {j === rowData.skills.length - 1 ? '' : ', '}
            </span>
          ))
          : null}
      </>
    )
  }

  function actionsBodyTemplate(rowData) {
    return (
      <>
        <Link to={`${match.url}/${rowData.id}`} className="mr-2">
          <Button icon="pi pi-eye" className="p-button-rounded p-button-outlined" />
        </Link>
        {/* <Link to={`${match.url}/${rowData.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`} className="mr-2">
          <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" />
        </Link> */}
        <Link to={`${match.url}/${rowData.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`} className="mr-2">
          <Button icon="pi pi-trash" className="p-button-rounded p-button-warning p-button-outlined" />
        </Link>
      </>
    )
  }

  function skillTemplate(option) {
    return (
      <div className="skill-item">
        <React.Fragment>{option.label}</React.Fragment>
      </div>
    );
  }

  function selectedSkillsTemplate(option) {
    if (option) {
      idsSelected.push(option.id);
      return (
        <div className="skill-item skill-item-value">
          <React.Fragment>{option.label}</React.Fragment>
        </div>
      );
    }
    return (
      <React.Fragment>Séléction des compténces</React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <h2 id="collaborator-heading">
        <Translate contentKey="crm-skillsApp.collaborator.home.title">Collaborators</Translate>
        <Link to={`/account/register`} className="float-right jh-create-entity text-decoration-none">
          <Button className="p-button-outlined p-button-primary" label={translate('userManagement.home.createLabel')} icon="pi pi-plus" />
        </Link>
      </h2>

      <div className="multiselect-demo mt-3">
        <MultiSelect value={selectedSkillsState.selectedSkills} options={skills} onChange={(e) => setSelectedSkillsState({ ...selectedSkillsState, selectedSkills: e.value })} optionLabel="name" placeholder="Select Countries" filter className="multiselect-custom"
          itemTemplate={skillTemplate} selectedItemTemplate={selectedSkillsTemplate} />

        <InputText placeholder="Nom" className="ml-2"/>

        <Button label="Rechercher" className=" ml-2" icon="pi pi-search" onClick={updatesearchFilterMultiple} />
      </div>

      {collaboratorList && collaboratorList.length > 0 ? (
        <div className="datatable-responsive-demo mt-5">
          <DataTable value={collaboratorList} className="p-datatable-responsive-demo" paginator rows={10} rowsPerPageOptions={[10, 20, 50]}>
            <Column field="avatar" header={translate('crm-skillsApp.collaborator.avatar')} body={avatarBodyTemplate} />
            <Column field="fullName" header={translate('crm-skillsApp.collaborator.fullName')} body={fullNameBodyTemplate} />
            <Column field="login" header={translate('userManagement.login')} body={loginBodyTemplate} />
            <Column field="skills" header={translate('crm-skillsApp.collaborator.skills')} body={skillsBodyTemplate} />
            <Column header="Actions" body={actionsBodyTemplate} />
          </DataTable>
        </div>
      ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="crm-skillsApp.collaborator.home.notFound">No Collaborators found</Translate>
            </div>
          )
        )}
      {/* {props.totalItems ? (
        <div className={collaboratorList && collaboratorList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
          ''
        )} */}
    </React.Fragment>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  collaboratorList: storeState.collaborator.entities,
  loading: storeState.collaborator.loading,
  totalItems: storeState.collaborator.totalItems,
  skills: storeState.skills.entities,
});

const mapDispatchToProps = {
  getCollaborators,
  getSkills,
  getEntitiesBySkills
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Collaborator);
