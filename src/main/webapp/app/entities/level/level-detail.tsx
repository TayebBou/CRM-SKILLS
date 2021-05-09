import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Translate, translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './level.reducer';
import { ILevel } from 'app/shared/model/level.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Button } from 'primereact/button';

export interface ILevelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LevelDetail = (props: ILevelDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { levelEntity } = props;
  return (
    <Row>
      <Col md="8" className="ml-3">
        <h2 style={{paddingLeft: '0px'}}>
          <Translate contentKey="crm-skillsApp.level.detail.title">Level</Translate> [<b>{levelEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="label">
              <Translate contentKey="crm-skillsApp.level.label">Label</Translate>
            </span>
          </dt>
          <dd>{levelEntity.label}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="crm-skillsApp.level.code">Code</Translate>
            </span>
          </dt>
          <dd>{levelEntity.code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="crm-skillsApp.level.description">Description</Translate>
            </span>
          </dt>
          <dd>{levelEntity.description}</dd>
        </dl>
        <Button onClick={props.history.goBack} className="p-button-outlined p-button-secondary mt-2"
          label={translate('entity.action.back')}
          icon="pi pi-arrow-left" />
        &nbsp;
        <Button onClick={() => props.history.push(`/level/${levelEntity.id}/edit`)} className="p-button-outlined p-button-primary"
          label={translate('entity.action.edit')}
          icon="pi pi-pencil" />
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ level }: IRootState) => ({
  levelEntity: level.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LevelDetail);
