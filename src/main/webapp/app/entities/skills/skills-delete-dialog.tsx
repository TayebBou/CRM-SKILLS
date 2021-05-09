import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Translate, translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ISkills } from 'app/shared/model/skills.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './skills.reducer';
import { Button } from 'primereact/button';

export interface ISkillsDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SkillsDeleteDialog = (props: ISkillsDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/skills');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.skillsEntity.id);
  };

  const { skillsEntity } = props;
  return (
    <Modal isOpen toggle={props.history.goBack}>
      <ModalHeader toggle={props.history.goBack}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="crm-skillsApp.skills.delete.question">
        <Translate contentKey="crm-skillsApp.skills.delete.question" interpolate={{ id: skillsEntity.id }}>
          Are you sure you want to delete this Skills?
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

const mapStateToProps = ({ skills }: IRootState) => ({
  skillsEntity: skills.entity,
  updateSuccess: skills.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SkillsDeleteDialog);
