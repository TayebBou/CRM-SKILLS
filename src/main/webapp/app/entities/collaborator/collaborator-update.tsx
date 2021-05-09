import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntities as getLevels } from 'app/entities/level/level.reducer';
import { ISkills } from 'app/shared/model/skills.model';
import { getEntities as getSkills } from 'app/entities/skills/skills.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './collaborator.reducer';
import { ICollaborator } from 'app/shared/model/collaborator.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export interface ICollaboratorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CollaboratorUpdate = (props: ICollaboratorUpdateProps) => {
  const [idsskills, setIdsskills] = useState([]);
  const [accountId, setAccountId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { collaboratorEntity, users, isAdmin, collaboratorLocal, levels, skills, loading, updating } = props;

  const { avatar, avatarContentType } = collaboratorEntity;

  const handleClose = () => {
    props.history.goBack();
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
    
    props.getLevels();
    props.getUsers();
    props.getSkills();
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
      const entity = !isAdmin ? {
        ...collaboratorEntity,
        ...values,
        account: {id: collaboratorLocal.id},
        skills: mapIdList(values.skills),
      } : {
        ...collaboratorEntity,
        ...values,
        skills: mapIdList(values.skills),
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
          <h2 id="crm-skillsApp.collaborator.home.createOrEditLabel">
            <Translate contentKey="crm-skillsApp.collaborator.home.createOrEditLabel">Create or edit a Collaborator</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : collaboratorEntity} onSubmit={saveEntity}>
              <AvGroup>
                <Label id="registerNumberLabel" for="collaborator-registerNumber">
                  <Translate contentKey="crm-skillsApp.collaborator.registerNumber">Register Number</Translate>
                </Label>
                <AvField
                  id="collaborator-registerNumber"
                  type="text"
                  name="registerNumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="familySituationLabel" for="collaborator-familySituation">
                  <Translate contentKey="crm-skillsApp.collaborator.familySituation">Family Situation</Translate>
                </Label>
                <AvField
                  id="collaborator-familySituation"
                  type="select"
                  className="form-control"
                  name="familySituation"
                  value={(!isNew && collaboratorEntity.familySituation) || null}
                  required
                  errorMessage={translate('entity.validation.required')}
                >
                  <option value={null} style={{ color: '#CCCECD' }}>{translate('crm-skillsApp.collaborator.selectFamilySituation')}</option>
                  <option value="CELIBATE">{translate('crm-skillsApp.FamilySituation.CELIBATE')}</option>
                  <option value="MARRIED">{translate('crm-skillsApp.FamilySituation.MARRIED')}</option>
                  <option value="WINDOWER">{translate('crm-skillsApp.FamilySituation.WINDOWER')}</option>
                  <option value="DIVORCED">{translate('crm-skillsApp.FamilySituation.DIVORCED')}</option>
                </AvField>
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="collaborator-phone">
                  <Translate contentKey="crm-skillsApp.collaborator.phone">Phone</Translate>
                </Label>
                <AvField
                  id="collaborator-phone"
                  type="text"
                  name="phone"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateOfBirthLabel" for="collaborator-dateOfBirth">
                  <Translate contentKey="crm-skillsApp.collaborator.dateOfBirth">Date Of Birth</Translate>
                </Label>
                <AvField
                  id="collaborator-dateOfBirth"
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="startDateLabel" for="collaborator-startDate">
                  <Translate contentKey="crm-skillsApp.collaborator.startDate">Start Date</Translate>
                </Label>
                <AvField
                  id="collaborator-startDate"
                  type="date"
                  className="form-control"
                  name="startDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="avatarLabel" for="avatar">
                    <Translate contentKey="crm-skillsApp.collaborator.avatar">Avatar</Translate>
                  </Label>
                  <br />
                  {avatar ? (
                    <React.Fragment>
                      {avatarContentType ? (
                        <a onClick={openFile(avatarContentType, avatar)}>
                          <img src={`data:${avatarContentType};base64,${avatar}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {avatarContentType}, {byteSize(avatar)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('avatar')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </React.Fragment>
                  ) : null}
                  <input id="file_avatar" type="file" onChange={onBlobChange(true, 'avatar')} accept="image/*" />
                  <AvInput
                    type="hidden"
                    name="avatar"
                    value={avatar}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                    }}
                  />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="lineManagerLabel" for="collaborator-lineManager">
                  <Translate contentKey="crm-skillsApp.collaborator.lineManager">Line Manager</Translate>
                </Label>
                <AvField
                  id="collaborator-lineManager"
                  type="text"
                  name="lineManager"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="availabilityDateLabel" for="collaborator-availabilityDate">
                  <Translate contentKey="crm-skillsApp.collaborator.availabilityDate">Availability Date</Translate>
                </Label>
                <AvField id="collaborator-availabilityDate" type="date" className="form-control" name="availabilityDate" />
              </AvGroup>
              {isAdmin ? (
                <AvGroup>
                  <Label for="collaborator-account">
                    <Translate contentKey="crm-skillsApp.collaborator.account">Account</Translate>
                  </Label>
                  <AvField id="collaborator-account" type="select" className="form-control" name="account.id" required
                    errorMessage={translate('entity.validation.required')}>
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.firstName + ' ' + otherEntity.lastName}
                          </option>
                        ))
                      : null}
                  </AvField>
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="collaborator-skills">
                  <Translate contentKey="crm-skillsApp.collaborator.skills">Skills</Translate>
                </Label>
                <AvField
                  id="collaborator-skills"
                  type="select"
                  multiple
                  className="form-control"
                  name="skills"
                  value={collaboratorEntity.skills && collaboratorEntity.skills.map(e => e.id)}
                  required
                  errorMessage={translate('entity.validation.required')}
                >
                  <option value="" key="0" />
                  {skills
                    ? skills.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.label}
                        </option>
                      ))
                    : null}
                </AvField>
              </AvGroup>
              <Button tag={Link} id="cancel-save" onClick={props.history.goBack} replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  skills: storeState.skills.entities,
  levels: storeState.level.entities,
  collaboratorEntity: storeState.collaborator.entity,
  loading: storeState.collaborator.loading,
  updating: storeState.collaborator.updating,
  updateSuccess: storeState.collaborator.updateSuccess,
  isAdmin: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.ADMIN]),
  collaboratorLocal: storeState.authentication.account
});

const mapDispatchToProps = {
  getUsers,
  getSkills,
  getLevels,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorUpdate);
