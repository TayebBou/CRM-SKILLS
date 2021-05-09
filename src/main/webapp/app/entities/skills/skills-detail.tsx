import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Translate, translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './skills.reducer';
import { ISkills } from 'app/shared/model/skills.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Button } from 'primereact/button';

export interface ISkillsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SkillsDetail = (props: ISkillsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { skillsEntity } = props;
  return (
    <Row>
      <Col md="8" className="ml-3">
        <h2 style={{paddingLeft: '0px'}}>
          <Translate contentKey="crm-skillsApp.skills.detail.title">Skills</Translate> [<b>{skillsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="label">
              <Translate contentKey="crm-skillsApp.skills.label">Label</Translate>
            </span>
          </dt>
          <dd>{skillsEntity.label}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="crm-skillsApp.skills.code">Code</Translate>
            </span>
          </dt>
          <dd>{skillsEntity.code}</dd>
          <dt>
            <Translate contentKey="crm-skillsApp.skills.category">Category</Translate>
          </dt>
          <dd>{skillsEntity.category ? skillsEntity.category.label : ''}</dd>
        </dl>
        <Button onClick={props.history.goBack} className="p-button-outlined p-button-secondary mt-2"
          label={translate('entity.action.back')}
          icon="pi pi-arrow-left" />
        &nbsp;
        <Button onClick={() => props.history.push(`/skills/${skillsEntity.id}/edit`)} className="p-button-outlined p-button-primary"
          label={translate('entity.action.edit')}
          icon="pi pi-pencil" />
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ skills }: IRootState) => ({
  skillsEntity: skills.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SkillsDetail);
