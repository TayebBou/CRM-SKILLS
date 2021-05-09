import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { AvForm, AvField, AvGroup, AvFeedback } from 'availity-reactstrap-validation';
import { Row, Col, Alert, Button, Label } from 'reactstrap';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { IRootState } from 'app/shared/reducers';
import { handleRegister, reset } from './register.reducer';

export interface IRegisterProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RegisterPage = (props: IRegisterProps) => {
  const [password, setPassword] = useState('');

  useEffect(
    () => () => {
      props.reset();
    },
    []
  );

  const handleValidSubmit = (event, values) => {
    props.handleRegister(values.firstName, values.lastName, values.username, values.email, values.firstPassword, props.currentLocale);
    event.preventDefault();
    props.history.push('/login');
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col md="8">
          <h1 id="register-title">
            <Translate contentKey="register.title">Registration</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
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
              />
              <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
            </AvGroup>
            <AvField
              name="username"
              label={translate('global.form.username.label')}
              placeholder={translate('global.form.username.placeholder')}
              validate={{
                required: { value: true, errorMessage: translate('register.messages.validate.login.required') },
                pattern: {
                  value: '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$',
                  errorMessage: translate('register.messages.validate.login.pattern'),
                },
                minLength: { value: 1, errorMessage: translate('register.messages.validate.login.minlength') },
                maxLength: { value: 50, errorMessage: translate('register.messages.validate.login.maxlength') },
              }}
            />
            <AvField
              name="email"
              label={translate('global.form.email.label')}
              placeholder={translate('global.form.email.placeholder')}
              type="email"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') },
              }}
            />
            <AvField
              name="firstPassword"
              label={translate('global.form.newpassword.label')}
              placeholder={translate('global.form.newpassword.placeholder')}
              type="password"
              onChange={updatePassword}
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') },
              }}
            />
            <PasswordStrengthBar password={password} />
            <AvField
              name="secondPassword"
              label={translate('global.form.confirmpassword.label')}
              placeholder={translate('global.form.confirmpassword.placeholder')}
              type="password"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                match: { value: 'firstPassword', errorMessage: translate('global.messages.error.dontmatch') },
              }}
            />
            <Button id="register-submit" color="primary" type="submit">
              <Translate contentKey="register.form.button">Register</Translate>
            </Button>
          </AvForm>
          <p>&nbsp;</p>
          <Alert color="warning">
            <span>
              <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
            </span>
            <a className="alert-link">
              <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
            </a>
            <span>
              <Translate contentKey="global.messages.info.authenticated.suffix">
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </Translate>
            </span>
          </Alert>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const mapStateToProps = ({ locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
});

const mapDispatchToProps = { handleRegister, reset };
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
