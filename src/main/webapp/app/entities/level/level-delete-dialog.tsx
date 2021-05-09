import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Translate, translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ILevel } from 'app/shared/model/level.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './level.reducer';
import { Button } from 'primereact/button';

export interface ILevelDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LevelDeleteDialog = (props: ILevelDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/level');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.levelEntity.id);
  };

  const { levelEntity } = props;
  return (
    <Modal isOpen toggle={props.history.goBack}>
      <ModalHeader toggle={props.history.goBack}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="crm-skillsApp.level.delete.question">
        <Translate contentKey="crm-skillsApp.level.delete.question" interpolate={{ id: levelEntity.id }}>
          Are you sure you want to delete this Level?
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

const mapStateToProps = ({ level }: IRootState) => ({
  levelEntity: level.entity,
  updateSuccess: level.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LevelDeleteDialog);
