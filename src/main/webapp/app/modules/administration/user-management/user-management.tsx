import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Table, Row, Badge } from 'reactstrap';
import { Translate, translate, TextFormat, JhiPagination, JhiItemCount, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getUsers, updateUser } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export interface IUserManagementProps extends StateProps, DispatchProps, RouteComponentProps<{}> { }

export const UserManagement = (props: IUserManagementProps) => {
  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  useEffect(() => {
    props.getUsers(pagination.activePage - 1, pagination.itemsPerPage, `${pagination.sort},${pagination.order}`);
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });

  const handlePagination = currentPage =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const toggleActive = user => () =>
    props.updateUser({
      ...user,
      activated: !user.activated,
    });

  function statusBodyTemplate(rowData) {
    if (rowData.activated) {
      return (
        <>
          <Button label={translate('userManagement.activated')} className="p-button-rounded p-button-success" onClick={toggleActive(rowData)} />
        </>
      );
    } else {
      return (
        <>
          <Button label={translate('userManagement.deactivated')} className="p-button-rounded p-button-danger" onClick={toggleActive(rowData)} />
        </>
      );
    }
  }

  function profilesBodyTemplate(rowData) {
    return (
      <>
        {rowData.authorities
          ? rowData.authorities.map((authority, j) => (
            <div key={`user-auth-${j}`}>
              <Badge color="info">{authority}</Badge>
            </div>
          ))
          : null}
      </>
    )
  }


  const { users, account, match, totalItems } = props;

  function actionsBodyTemplate(rowData) {
    return (
      <>
        <Link to={`${match.url}/${rowData.login}`} className="mr-2">
          <Button icon="pi pi-eye" className="p-button-rounded p-button-outlined" />
        </Link>

        <Link to={`${match.url}/${rowData.login}/edit`} className="mr-2">
          <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-button-outlined" />
        </Link>

        {account.login === rowData.login ?
          <Link to={`#`} className="mr-2" >
            <Button disabled icon="pi pi-trash" className="p-button-rounded p-button-warning p-button-outlined"></Button>
          </Link>
          : <Link to={`${match.url}/${rowData.login}/delete`} className="mr-2" >
            <Button disabled={account.login === rowData.login} icon="pi pi-trash" className="p-button-rounded p-button-warning p-button-outlined"></Button>
          </Link>
        }

      </>
    )
  }
  return (
    <React.Fragment>
      <h2 id="user-management-page-heading">
        <Translate contentKey="userManagement.home.title">Users</Translate>
        <Link to={`${match.url}/new`} className="float-right jh-create-entity text-decoration-none">
          <Button className="p-button-outlined p-button-primary" label={translate('userManagement.home.createLabel')} icon="pi pi-plus" />
        </Link>
      </h2>
      <div className="datatable-responsive-demo mt-5">
        <DataTable value={users} className="p-datatable-responsive-demo" paginator rows={10}>
          <Column field="login" header={translate('userManagement.login')} />
          <Column field="email" header={translate('userManagement.email')} />
          <Column field="activated" body={statusBodyTemplate} />
          <Column field="langKey" header={translate('userManagement.langKey')} />
          <Column field="authorities" header={translate('userManagement.profiles')} body={profilesBodyTemplate} />
          <Column field="activated" header="Actions" body={actionsBodyTemplate} />
        </DataTable>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  totalItems: storeState.userManagement.totalItems,
  account: storeState.authentication.account,
});

const mapDispatchToProps = { getUsers, updateUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
