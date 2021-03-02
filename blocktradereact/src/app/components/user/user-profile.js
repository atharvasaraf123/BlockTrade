import React from 'react';
import { Container, Row, Col } from 'shards-react';
import UserDetails from './userDetails';
import UserAccountDetails from './userAccountDetails';
import classNames from 'classnames';

const UserProfileLite = () => {
  const classes = classNames(
    'ml-sm-auto mr-sm-auto',
    'text-center',
    'text-md-left',
    'mb-sm-0'
  );
  return (
    <Container fluid className='main-content-container px-4'>
      <Row noGutters className='page-header py-4'>
        <Col xs='12' sm='4' className={classes} md='12'>
          <span className='text-uppercase page-subtitle'>Overview</span>
          <h3 className='page-title'>User Profile</h3>
        </Col>
      </Row>
      <Row>
        <Col lg='4'>
          <UserDetails />
        </Col>
        <Col lg='8'>
          <UserAccountDetails />
        </Col>
      </Row>
    </Container>
  );
};
export default UserProfileLite;
