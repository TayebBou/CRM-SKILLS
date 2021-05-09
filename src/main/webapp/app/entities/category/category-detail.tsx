import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Translate, translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './category.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Button } from 'primereact/button';

export interface ICategoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CategoryDetail = (props: ICategoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { categoryEntity } = props;
  return (
    <Row>
      <Col md="8" className="ml-3">
        <h2 style={{paddingLeft: '0px'}}>
          <Translate contentKey="crm-skillsApp.category.detail.title">Category</Translate> [<b>{categoryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="label">
              <Translate contentKey="crm-skillsApp.category.label">Label</Translate>
            </span>
          </dt>
          <dd>{categoryEntity.label}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="crm-skillsApp.category.code">Code</Translate>
            </span>
          </dt>
          <dd>{categoryEntity.code}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="crm-skillsApp.category.description">Description</Translate>
            </span>
          </dt>
          <dd>{categoryEntity.description}</dd>
        </dl>
        <Button onClick={props.history.goBack} className="p-button-outlined p-button-secondary mt-2"
          label={translate('entity.action.back')}
          icon="pi pi-arrow-left" />
        &nbsp;
        <Button onClick={() => props.history.push(`/category/${categoryEntity.id}/edit`)} className="p-button-outlined p-button-primary"
          label={translate('entity.action.edit')}
          icon="pi pi-pencil" />
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ category }: IRootState) => ({
  categoryEntity: category.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail);
