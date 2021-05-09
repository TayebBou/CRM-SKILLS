import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Label, Row, Col } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField, AvFeedback } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { locales, languages } from 'app/config/translation';
import { getUser, getRoles, updateUser, createUser, reset } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';
import { Button } from 'primereact/button';

export interface IUserManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export const UserManagementUpdate = (props: IUserManagementUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.login);

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getUser(props.match.params.login);
    }
    props.getRoles();
    return () => {
      props.reset();
    };
  }, []);

  const handleClose = () => {
    props.history.goBack();
  };

  const { user, loading, updating, roles } = props;

  const saveUser = (event, values) => {
    if (isNew) {
      props.match.url === "/admin/user-management/collaborator/new" ? values.authorities = ["ROLE_USER"] : null;
      props.createUser(values);
    } else {
      props.updateUser({...values, id : user.id});
    }
    handleClose();
  };

  const isInvalid = false;
  

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 style={{paddingLeft: '0px'}}>
          {props.match.url === "/admin/user-management/collaborator/new" ? (
            <Translate contentKey="crm-skillsApp.collaborator.home.createLabel">Create a new Collaborator</Translate>
          ) : (
            <Translate contentKey="userManagement.home.createOrEditLabel">Create or edit a User</Translate>
          )}
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm onValidSubmit={saveUser}>
              <AvGroup>
                <Label for="login">
                  <Translate contentKey="userManagement.login">Login</Translate>
                </Label>
                <AvField
                  type="text"
                  className="form-control"
                  name="login"
                  validate={{
                    required: {
                      value: true,
                      errorMessage: translate('register.messages.validate.login.required'),
                    },
                    pattern: {
                      value: '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$',
                      errorMessage: translate('register.messages.validate.login.pattern'),
                    },
                    minLength: {
                      value: 1,
                      errorMessage: translate('register.messages.validate.login.minlength'),
                    },
                    maxLength: {
                      value: 50,
                      errorMessage: translate('register.messages.validate.login.maxlength'),
                    },
                  }}
                  value={user.login}
                />
              </AvGroup>
              <AvGroup>
                <Label for="firstName">
                  <Translate contentKey="userManagement.firstName">First Name</Translate>
                </Label>
                <AvField
                  type="text"
                  className="form-control"
                  name="firstName"
                  validate={{
                    maxLength: {
                      value: 50,
                      errorMessage: translate('entity.validation.maxlength', { max: 50 }),
                    },
                  }}
                  value={user.firstName}
                />
              </AvGroup>
              <AvGroup>
                <Label for="lastName">
                  <Translate contentKey="userManagement.lastName">Last Name</Translate>
                </Label>
                <AvField
                  type="text"
                  className="form-control"
                  name="lastName"
                  validate={{
                    maxLength: {
                      value: 50,
                      errorMessage: translate('entity.validation.maxlength', { max: 50 }),
                    },
                  }}
                  value={user.lastName}
                />
                <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
              </AvGroup>
              <AvGroup>
                <AvField
                  name="email"
                  label={translate('global.form.email.label')}
                  placeholder={translate('global.form.email.placeholder')}
                  type="email"
                  validate={{
                    required: {
                      value: true,
                      errorMessage: translate('global.messages.validate.email.required'),
                    },
                    email: {
                      errorMessage: translate('global.messages.validate.email.invalid'),
                    },
                    minLength: {
                      value: 5,
                      errorMessage: translate('global.messages.validate.email.minlength'),
                    },
                    maxLength: {
                      value: 254,
                      errorMessage: translate('global.messages.validate.email.maxlength'),
                    },
                  }}
                  value={user.email}
                />
              </AvGroup>
              <AvGroup check>
                <Label>
                  <AvInput type="checkbox" name="activated" value={user.activated} checked={user.activated} disabled={!user.id} />{' '}
                  <Translate contentKey="userManagement.activated">Activated</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="langKey">
                  <Translate contentKey="userManagement.langKey">Language Key</Translate>
                </Label>
                <AvField type="select" className="form-control" name="langKey" value={user.langKey || locales[0]}>
                  {locales.map(locale => (
                    <option value={locale} key={locale}>
                      {languages[locale].name}
                    </option>
                  ))}
                </AvField>
              </AvGroup>
              { props.match.url !== "/admin/user-management/collaborator/new" ? (
                <AvGroup>
                  <Label for="authorities">
                    <Translate contentKey="userManagement.profiles">Profiles</Translate>
                  </Label>
                  <AvInput type="select" className="form-control" name="authorities" value={user.authorities} multiple>
                    {roles.map(role => (
                      <option value={role} key={role}>
                        {role}
                      </option>
                    ))}
                  </AvInput>
                </AvGroup>
              ) : null}
              <Button onClick={props.history.goBack} className="p-button-outlined p-button-secondary mt-3"
                label={translate('entity.action.back')} 
                type="button"
                icon="pi pi-arrow-left" />
              &nbsp;
              <Button className="p-button-outlined p-button-primary"
                type="submit"
                label={translate('entity.action.save')}
                disabled={isInvalid || updating}
                icon="pi pi-save" />
            </AvForm>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
  roles: storeState.userManagement.authorities,
  loading: storeState.userManagement.loading,
  updating: storeState.userManagement.updating,
});

const mapDispatchToProps = { getUser, getRoles, updateUser, createUser, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementUpdate);
