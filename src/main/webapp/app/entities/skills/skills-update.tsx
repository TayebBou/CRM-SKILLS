import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICollaborator } from 'app/shared/model/collaborator.model';
import { getEntities as getCollaborators } from 'app/entities/collaborator/collaborator.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { getEntity, updateEntity, createEntity, reset } from './skills.reducer';
import { ISkills } from 'app/shared/model/skills.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { Button } from 'primereact/button';

export interface ISkillsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SkillsUpdate = (props: ISkillsUpdateProps) => {
  const [collaboratorsId, setCollaboratorsId] = useState('0');
  const [categoryId, setCategoryId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { skillsEntity, collaborators, categories, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/skills');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCollaborators();
    props.getCategories();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...skillsEntity,
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
          <h2 id="crm-skillsApp.skills.home.createOrEditLabel" style={{paddingLeft: '0px'}}>
            <Translate contentKey="crm-skillsApp.skills.home.createOrEditLabel">Create or edit a Skills</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : skillsEntity} onSubmit={saveEntity}>
              <AvGroup>
                <Label id="labelLabel" for="skills-label">
                  <Translate contentKey="crm-skillsApp.skills.label">Label</Translate>
                </Label>
                <AvField
                  id="skills-label"
                  type="text"
                  name="label"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="skills-code">
                  <Translate contentKey="crm-skillsApp.skills.code">Code</Translate>
                </Label>
                <AvField
                  id="skills-code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="skills-category">
                  <Translate contentKey="crm-skillsApp.skills.category">Category</Translate>
                </Label>
                <AvInput id="skills-category" type="select" className="form-control" name="category.id">
                  <option value="" key="0" />
                  {categories
                    ? categories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.label}
                        </option>
                      ))
                    : null}
                </AvInput>
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
  collaborators: storeState.collaborator.entities,
  categories: storeState.category.entities,
  skillsEntity: storeState.skills.entity,
  loading: storeState.skills.loading,
  updating: storeState.skills.updating,
  updateSuccess: storeState.skills.updateSuccess,
});

const mapDispatchToProps = {
  getCollaborators,
  getCategories,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SkillsUpdate);
