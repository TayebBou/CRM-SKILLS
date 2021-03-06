import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Translate, translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ICategory } from 'app/shared/model/category.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './category.reducer';
import { Button } from 'primereact/button';

export interface ICategoryDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CategoryDeleteDialog = (props: ICategoryDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/category');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.categoryEntity.id);
  };

  const { categoryEntity } = props;
  return (
    <Modal isOpen toggle={props.history.goBack}>
      <ModalHeader toggle={props.history.goBack}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="crm-skillsApp.category.delete.question">
        <Translate contentKey="crm-skillsApp.category.delete.question" interpolate={{ id: categoryEntity.id }}>
          Are you sure you want to delete this Category?
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

const mapStateToProps = ({ category }: IRootState) => ({
  categoryEntity: category.entity,
  updateSuccess: category.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDeleteDialog);
