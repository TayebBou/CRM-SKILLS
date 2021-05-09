import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Translate, translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICollaborator } from 'app/shared/model/collaborator.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './collaborator.reducer';
import { Button } from 'primereact/button';

export interface ICollaboratorDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CollaboratorDeleteDialog = (props: ICollaboratorDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/collaborator' + props.location.search);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.collaboratorEntity.id);
  };

  const { collaboratorEntity } = props;
  return (
    <Modal isOpen toggle={props.history.goBack}>
      <ModalHeader toggle={props.history.goBack}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="crm-skillsApp.collaborator.delete.question">
        <Translate contentKey="crm-skillsApp.collaborator.delete.question" interpolate={{ id: collaboratorEntity.id }}>
          Are you sure you want to delete this Collaborator?
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

const mapStateToProps = ({ collaborator }: IRootState) => ({
  collaboratorEntity: collaborator.entity,
  updateSuccess: collaborator.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorDeleteDialog);
