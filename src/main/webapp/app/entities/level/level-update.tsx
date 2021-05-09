import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './level.reducer';
import { ILevel } from 'app/shared/model/level.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { Button } from 'primereact/button';

export interface ILevelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LevelUpdate = (props: ILevelUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { levelEntity, loading, updating } = props;

  const { description } = levelEntity;

  const handleClose = () => {
    props.history.push('/level');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...levelEntity,
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
          <h2 id="crm-skillsApp.level.home.createOrEditLabel" style={{paddingLeft: '0px'}}>
            <Translate contentKey="crm-skillsApp.level.home.createOrEditLabel">Create or edit a Level</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : levelEntity} onSubmit={saveEntity}>
              <AvGroup>
                <Label id="labelLabel" for="level-label">
                  <Translate contentKey="crm-skillsApp.level.label">Label</Translate>
                </Label>
                <AvField
                  id="level-label"
                  type="text"
                  name="label"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="level-code">
                  <Translate contentKey="crm-skillsApp.level.code">Code</Translate>
                </Label>
                <AvField
                  id="level-code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="level-description">
                  <Translate contentKey="crm-skillsApp.level.description">Description</Translate>
                </Label>
                <AvInput id="level-description" type="textarea" name="description" />
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
  levelEntity: storeState.level.entity,
  loading: storeState.level.loading,
  updating: storeState.level.updating,
  updateSuccess: storeState.level.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(LevelUpdate);
