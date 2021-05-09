import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './collaborator.reducer';
import { ICollaborator } from 'app/shared/model/collaborator.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Rating } from 'primereact/rating';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Button } from 'primereact/button';
export interface ICollaboratorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const CollaboratorDetail = (props: ICollaboratorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { collaboratorEntity } = props;
  return (
    <React.Fragment>
      <div className="clearfix">
        <div className="float-left">

          <Link to="/collaborator" className=" text-decoration-none">
            <Button label={translate('entity.action.back')} icon="pi pi-arrow-left" />
          </Link>
        </div>
        <div className="float-right">

          <Button className="mx-3" label="DT" icon="pi pi-file-pdf" />
          <Button label="Mini CV" icon="pi pi-file-pdf" />
        </div>
      </div>

      <div className="profile border mt-2">
        <div className="top-profile p-5"></div>
        <div className="bottom-profile px-3 py-2">
          <div className="div-img">
            <img
              src={`data:${collaboratorEntity.avatarContentType};base64,${collaboratorEntity.avatar}`}
            />
          </div>
          <div className="div-profile row">
            <div className="col-md-6">
              <div className="name">{collaboratorEntity.account ? collaboratorEntity.account.firstName : null} {collaboratorEntity.account ? collaboratorEntity.account.lastName : null}</div>
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
                <React.Fragment>
                  <h2><Translate contentKey="crm-skillsApp.collaborator.registerNumber">Register Number</Translate></h2>
                  <p>{collaboratorEntity.registerNumber}</p>
                </React.Fragment>

                <React.Fragment>
                  <h2><Translate contentKey="crm-skillsApp.collaborator.familySituation">Family Situation</Translate></h2>
                  <p>{collaboratorEntity.familySituation}</p>
                </React.Fragment>

                <React.Fragment>
                  <h2><Translate contentKey="crm-skillsApp.collaborator.phone">Phone</Translate></h2>
                  <p>{collaboratorEntity.phone}</p>
                </React.Fragment>

                <React.Fragment>
                  <h2><Translate contentKey="crm-skillsApp.collaborator.dateOfBirth">Date Of Birth</Translate></h2>
                  <p>{collaboratorEntity.dateOfBirth}</p>
                </React.Fragment>

                <React.Fragment>
                  <h2><Translate contentKey="crm-skillsApp.collaborator.dateOfBirth">Date Of Birth</Translate></h2>
                  <p>
                    {collaboratorEntity.dateOfBirth ? (
                      <TextFormat value={collaboratorEntity.dateOfBirth} type="date" format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </p>
                </React.Fragment>

                <React.Fragment>
                  <h2><Translate contentKey="crm-skillsApp.collaborator.startDate">Start Date</Translate></h2>
                  <p>{collaboratorEntity.startDate ? (
                    <TextFormat value={collaboratorEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
                  ) : null}</p>
                </React.Fragment>

                <React.Fragment>
                  <h2><Translate contentKey="userManagement.login">Login</Translate></h2>
                  <p>{collaboratorEntity.account ? collaboratorEntity.account.login : null}</p>
                </React.Fragment>

                <React.Fragment>
                  <h2><Translate contentKey="userManagement.email">Email</Translate></h2>
                  <p>{collaboratorEntity.account ? collaboratorEntity.account.email : null}</p>
                </React.Fragment>

                <React.Fragment>
                  <h2><Translate contentKey="crm-skillsApp.collaborator.lineManager">Line Manager</Translate></h2>
                  <p>{collaboratorEntity.lineManager}</p>
                </React.Fragment>

                <React.Fragment>
                  <h2><Translate contentKey="crm-skillsApp.collaborator.availabilityDate">Availability Date</Translate></h2>
                  <p>
                    {collaboratorEntity.availabilityDate ? (
                      <TextFormat value={collaboratorEntity.availabilityDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </p>
                </React.Fragment>

                <React.Fragment>
                  <h2><Translate contentKey="crm-skillsApp.collaborator.skills">Skills</Translate></h2>
                  <p>
                    {collaboratorEntity.skills
                      ? collaboratorEntity.skills.map((val, i) => (
                        <span key={val.id}>
                          <a>{val.label}</a>
                          {collaboratorEntity.skills && i === collaboratorEntity.skills.length - 1 ? '' : ', '}
                        </span>
                      ))
                      : null}
                  </p>
                </React.Fragment>
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

const mapStateToProps = ({ collaborator }: IRootState) => ({
  collaboratorEntity: collaborator.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorDetail);
