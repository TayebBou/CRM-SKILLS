import './home.scss';

import React, { useEffect, useState } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import { login } from 'app/shared/reducers/authentication';
import { IRootState } from 'app/shared/reducers';
import LoginModal from '../login/login-modal';
import { Chart } from 'primereact/chart';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{}> { }

export const Home = (props: IHomeProp) => {
  const chartData = {
    labels: ['Angular 2+', 'reactjs', 'PHP', 'spring boot', '.net'],
    datasets: [
      {
        data: [20, 30, 5, 10, 3],
        backgroundColor: [
          "#b81a1a",
          "#20a3d6",
          "#FFA726",
          "#6fc21d",
          "#9e19b3"
        ],
        hoverBackgroundColor: [
          "#e35959",
          "#95d5ed",
          "#FFB74D",
          "#ade378",
          "#cc7cd9",
        ]
      }
    ]
  };

  const lightOptions = {
    legend: {
      labels: {
        fontColor: 'black'
      }
    }
  };

  const basicData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: translate("home.barChart.firstDataset"),
        backgroundColor: '#42A5F5',
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: translate("home.barChart.secondDataset"),
        backgroundColor: '#FFA726',
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

  const { account, isAdmin } = props;
  const [showModal, setShowModal] = useState(props.showModal);
  useEffect(() => {
    setShowModal(true);
  }, []);
  const handleLogin = (username, password, rememberMe = false) => props.login(username, password, rememberMe);
  const handleClose = () => {
    setShowModal(false);
    props.history.push('/');
  };

  function getLightTheme() {
    const basicOptions = {
      legend: {
        labels: {
          fontColor: '#495057'
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: '#495057'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: '#495057'
          }
        }]
      }
    };
    return {
      basicOptions
    }
  }
  return (
    <React.Fragment>
      {/* <Col md="9"> */}
      <h2>
        <Translate contentKey="home.title">Welcome, to CRM-SKILLS</Translate>
      </h2>

      {account && account.login && !isAdmin ? (
          <Alert color="danger">
            <Translate contentKey="global.menu.completeRegister.message">Please complete your registration by entering your collaborator file !</Translate>
          </Alert>
      ) : null}
      {account && account.login ? (
        <React.Fragment>
          <Alert color="success" className="mb-5">
            <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
              You are logged in as user {account.login}.
              </Translate>
          </Alert>
          { isAdmin ? (
            <Row>
              <Col md="6">
                <h4 style={{ textAlign: 'center', marginBottom: '25px'}}>
                  <Translate contentKey="home.pieChart.title">Welcome, to CRM-SKILLS</Translate>
                </h4>
                <Chart type="pie" data={chartData} options={lightOptions} />
              </Col>
              <Col md="6">
                <h4 style={{ textAlign: 'center', marginBottom: '25px'}}>
                  <Translate contentKey="home.barChart.title">Welcome, to CRM-SKILLS</Translate>
                </h4>
                <Chart type="bar" data={basicData} options={getLightTheme} />
              </Col>
            </Row>
          ) : (
              <p></p>
            )}
        </React.Fragment>

      ) : (
          <Row>
            <Col md="9"></Col>
            <Col md="3">
              <LoginModal showModal={showModal} handleLogin={handleLogin} handleClose={handleClose} loginError={props.loginError} />
            </Col>
          </Row>
        )}
    </React.Fragment>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  loginError: storeState.authentication.loginError,
  showModal: storeState.authentication.showModalLogin,
  isAdmin: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.ADMIN]),
});

const mapDispatchToProps = { login };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);