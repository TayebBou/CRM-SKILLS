import React from 'react';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';

class PageNotFound extends React.Component {
  render() {
    return (
      <Alert color="danger">
        <Translate contentKey="error.http.404">The page does not exist.</Translate>
      </Alert>
    );
  }
}

export default PageNotFound;
