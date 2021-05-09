import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Badge } from 'reactstrap';
import { Translate, TextFormat, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { languages } from 'app/config/translation';
import { getUser } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';

export interface IUserManagementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> { }

export const UserManagementDetail = (props: IUserManagementDetailProps) => {
  useEffect(() => {
    props.getUser(props.match.params.login);
  }, []);

  const { user } = props;
  return (
    <React.Fragment>
      <Link to="/admin/user-management" className=" text-decoration-none">
        <Button label={translate('entity.action.back')} icon="pi pi-arrow-left" />
      </Link>

      <div className="profile border mt-2">
        <div className="top-profile p-5"></div>
        <div className="bottom-profile px-3 py-2">
          <div className="div-img">
            <img className="img-fluid" src="content/images/0.jpg" alt="" />
          </div>
          <div className="div-profile row">
            <div className="col-md-6">
              <div className="name">{user.firstName} {user.lastName}</div>
              <div className="poste">Ingénieur Développeur Full-Stack</div>
              <div className="adresse">Adress</div>
            </div>
            <div className="col-md-6">
              <div className="strength-profile">
                <h3>Force du profil</h3>
                <Rating value={5} readOnly stars={10} cancel={false} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="infos-perso border mt-2">
        <div className="accordion-demo">
          <div className="card">
            <Accordion activeIndex={0}>
              <AccordionTab header="Informations personnelles">
                <div className="datascroller-demo">
                  <div className="card">
                    <dl className="jh-entity-details">
                      <dt>
                        <Translate contentKey="userManagement.login">Login</Translate>
                      </dt>
                      <dd>
                        <span>{user.login}</span>&nbsp;
            {user.activated ? (
                          <Badge color="success">
                            <Translate contentKey="userManagement.activated">Activated</Translate>
                          </Badge>
                        ) : (
                            <Badge color="danger">
                              <Translate contentKey="userManagement.deactivated">Deactivated</Translate>
                            </Badge>
                          )}
                      </dd>
                      <dt>
                        <Translate contentKey="userManagement.firstName">First Name</Translate>
                      </dt>
                      <dd>{user.firstName}</dd>
                      <dt>
                        <Translate contentKey="userManagement.lastName">Last Name</Translate>
                      </dt>
                      <dd>{user.lastName}</dd>
                      <dt>
                        <Translate contentKey="userManagement.email">Email</Translate>
                      </dt>
                      <dd>{user.email}</dd>
                      <dt>
                        <Translate contentKey="userManagement.langKey">Lang Key</Translate>
                      </dt>
                      <dd>{user.langKey ? languages[user.langKey].name : undefined}</dd>
                      <dt>
                        <Translate contentKey="userManagement.createdBy">Created By</Translate>
                      </dt>
                      <dd>{user.createdBy}</dd>
                      <dt>
                        <Translate contentKey="userManagement.createdDate">Created Date</Translate>
                      </dt>
                      <dd>{user.createdDate ? <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}</dd>
                      <dt>
                        <Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate>
                      </dt>
                      <dd>{user.lastModifiedBy}</dd>
                      <dt>
                        <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
                      </dt>
                      <dd>
                        {user.lastModifiedDate ? (
                          <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                        ) : null}
                      </dd>
                      <dt>
                        <Translate contentKey="userManagement.profiles">Profiles</Translate>
                      </dt>
                      <dd>
                        <ul className="list-unstyled">
                          {user.authorities
                            ? user.authorities.map((authority, i) => (
                              <li key={`user-auth-${i}`}>
                                <Badge color="info">{authority}</Badge>
                              </li>
                            ))
                            : null}
                        </ul>
                      </dd>
                    </dl>
                  </div>
                </div>
              </AccordionTab>
              <AccordionTab header="Expériences">
                <p>Expériences</p>
              </AccordionTab>
              <AccordionTab header="Formations">
                <p>Formations</p>
              </AccordionTab>
              <AccordionTab header="Compétences">
                <p>Compétences</p>
              </AccordionTab>
              <AccordionTab header="prevision">
                <p>prevision de congé</p>
              </AccordionTab>
            </Accordion>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
});

const mapDispatchToProps = { getUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementDetail);
