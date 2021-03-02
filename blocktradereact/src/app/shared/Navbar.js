import React, { Component, useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  getUserId,
  filterName,
  setImpId,
  clearFilter,
} from '../actions/tradeDeal';
const Navbar = ({
  auth,
  location,
  getUserId,
  tradeDeal,
  filterName,
  setImpId,
  clearFilter,
  history,
}) => {
  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  };
  const renderSwitch = (param) => {
    switch (param) {
      case 'dashboard':
        return 'Dashboard';
      case 'my-wallet':
        return 'MyWallet';
      case 'my-trade':
        return 'MyTrade';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };
  const returnParam = (url) => {
    var arr = url.split('/');
    console.log(arr[4]);
    return arr[4];
  };
  return (
    <nav className='navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row'>
      <div className='navbar-menu-wrapper d-flex align-items-center justify-content-between'>
        <a
          className='navbar-brand brand-logo-mini align-self-center d-lg-none'
          href='!#'
          onClick={(evt) => evt.preventDefault()}
        >
          <img src={require('../../assets/images/logo-mini.svg')} alt='logo' />
        </a>
        <button
          className='navbar-toggler navbar-toggler align-self-center'
          type='button'
          onClick={() => document.body.classList.toggle('sidebar-icon-only')}
        >
          <i className='mdi mdi-menu'></i>
        </button>
        <h3 style={{ marginLeft: 'auto' }}>
          {renderSwitch(returnParam(window.location.href))}
        </h3>
        <ul className='navbar-nav navbar-nav-right ml-lg-auto '>
          <li className='nav-item  nav-profile border-0 pl-4 d-none d-sm-block'>
            <Dropdown alignRight>
              <Dropdown.Toggle className='nav-link count-indicator p-0 toggle-arrow-hide bg-transparent'>
                <i className='mdi mdi-bell-outline'></i>
                <span className='count bg-success'>4</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className='navbar-dropdown preview-list'>
                <Dropdown.Item
                  className='dropdown-item py-3 d-flex align-items-center'
                  href='!#'
                  onClick={(evt) => evt.preventDefault()}
                >
                  <p className='mb-0 font-weight-medium float-left'>
                    You have 4 new notifications{' '}
                  </p>
                  <span className='badge badge-pill badge-primary float-right'>
                    View all
                  </span>
                </Dropdown.Item>
                <div className='dropdown-divider'></div>
                <Dropdown.Item
                  className='dropdown-item preview-item d-flex align-items-center'
                  href='!#'
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className='preview-thumbnail'>
                    <i className='mdi mdi-alert m-auto text-primary'></i>
                  </div>
                  <div className='preview-item-content py-2'>
                    <h6 className='preview-subject font-weight-normal text-dark mb-1'>
                      Application Error
                    </h6>
                    <p className='font-weight-light small-text mb-0'>
                      {' '}
                      Just now{' '}
                    </p>
                  </div>
                </Dropdown.Item>
                <div className='dropdown-divider'></div>
                <Dropdown.Item
                  className='dropdown-item preview-item d-flex align-items-center'
                  href='!#'
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className='preview-thumbnail'>
                    <i className='mdi mdi-settings m-auto text-primary'></i>
                  </div>
                  <div className='preview-item-content py-2'>
                    <h6 className='preview-subject font-weight-normal text-dark mb-1'>
                      Settings
                    </h6>
                    <p className='font-weight-light small-text mb-0'>
                      {' '}
                      Private message{' '}
                    </p>
                  </div>
                </Dropdown.Item>
                <div className='dropdown-divider'></div>
                <Dropdown.Item
                  className='dropdown-item preview-item d-flex align-items-center'
                  href='!#'
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className='preview-thumbnail'>
                    <i className='mdi mdi-airballoon m-auto text-primary'></i>
                  </div>
                  <div className='preview-item-content py-2'>
                    <h6 className='preview-subject font-weight-normal text-dark mb-1'>
                      New user registration
                    </h6>
                    <p className='font-weight-light small-text mb-0'>
                      {' '}
                      2 days ago{' '}
                    </p>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className='nav-item  nav-profile border-0 d-none d-sm-block'>
            <Dropdown alignRight>
              <Dropdown.Toggle className='nav-link count-indicator bg-transparent'>
                <span className='profile-text'>
                  {auth.user && auth.user.username}
                </span>
                <img
                  className='img-xs rounded-circle'
                  src={require('../../assets/images/circle-cropped.png')}
                  alt='Profile'
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className='preview-list navbar-dropdown pb-3'>
                <Dropdown.Item
                  className='dropdown-item preview-item d-flex align-items-center border-0'
                  onClick={(evt) => evt.preventDefault()}
                >
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item
                  className='dropdown-item preview-item d-flex align-items-center border-0'
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                  }}
                >
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <button
          className='navbar-toggler navbar-toggler-right d-lg-none align-self-center'
          type='button'
          onClick={toggleOffcanvas}
        >
          <span className='mdi mdi-menu'></span>
        </button>
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  tradeDeal: state.tradeDeal,
  auth: state.auth,
});
export default withRouter(
  connect(mapStateToProps, { getUserId, filterName, setImpId, clearFilter })(
    Navbar
  )
);
