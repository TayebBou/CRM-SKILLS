import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUser, deleteUser } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';
import { Button } from 'primereact/button';

export interface IUserManagementDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export const UserManagementDeleteDialog = (props: IUserManagementDeleteDialogProps) => {
  useEffect(() => {
    props.getUser(props.match.params.login);
  }, []);

  const handleClose = event => {
    event.stopPropagation();
    props.history.push('/admin/user-management');
  };

  const confirmDelete = event => {
    props.deleteUser(props.user.login);
    handleClose(event);
  };

  const { user } = props;

  return (
    <Modal isOpen toggle={props.history.goBack}>
      <ModalHeader toggle={props.history.goBack}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody>
        <Translate contentKey="userManagement.delete.question" interpolate={{ login: user.login }}>
          Are you sure you want to delete this User?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.history.goBack} className="p-button-outlined p-button-secondary"
          label={translate('entity.action.cancel')}
          icon="pi pi-ban" />
        &nbsp;
        <Button onClick={confirmDelete} className="p-button-outlined p-button-danger"
          id="jhi-confirm-delete-transversalSkill"
          label={translate('entity.action.delete')}
          icon="pi pi-trash" />
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
});

const mapDispatchToProps = { getUser, deleteUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementDeleteDialog);
