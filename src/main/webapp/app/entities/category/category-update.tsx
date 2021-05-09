import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './category.reducer';
import { Button } from 'primereact/button';

export interface ICategoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CategoryUpdate = (props: ICategoryUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { categoryEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/category');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...categoryEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crm-skillsApp.category.home.createOrEditLabel" style={{paddingLeft: '0px'}}>
            <Translate contentKey="crm-skillsApp.category.home.createOrEditLabel">Create or edit a Category</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : categoryEntity} onSubmit={saveEntity}>
              <AvGroup>
                <Label id="labelLabel" for="category-label">
                  <Translate contentKey="crm-skillsApp.category.label">Label</Translate>
                </Label>
                <AvField
                  id="category-label"
                  type="text"
                  name="label"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="category-code">
                  <Translate contentKey="crm-skillsApp.category.code">Code</Translate>
                </Label>
                <AvField
                  id="category-code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="category-description">
                  <Translate contentKey="crm-skillsApp.category.description">Description</Translate>
                </Label>
                <AvInput id="category-description" type="textarea" name="description" />
              </AvGroup>
              <Button id="cancel-save" onClick={props.history.goBack} className="p-button-outlined p-button-secondary mt-3"
                label={translate('entity.action.back')} 
                type="button"
                icon="pi pi-arrow-left" />
              &nbsp;
              <Button className="p-button-outlined p-button-primary" id="save-entity"
                type="submit"
                label={translate('entity.action.save')}
                disabled={updating}
                icon="pi pi-save" />
            </AvForm>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  categoryEntity: storeState.category.entity,
  loading: storeState.category.loading,
  updating: storeState.category.updating,
  updateSuccess: storeState.category.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoryUpdate);
