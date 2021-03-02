import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { Icon, InlineIcon } from '@iconify/react';
import handshakeIcon from '@iconify/icons-mdi/handshake';
import walletIcon from '@iconify/icons-entypo/wallet';
import baselineDashboard from '@iconify/icons-ic/baseline-dashboard';
import settingsSolid from '@iconify/icons-clarity/settings-solid';
import bxsUser from '@iconify/icons-bx/bxs-user';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  getUserId,
  filterName,
  setImpId,
  clearFilter,
} from '../actions/tradeDeal';
import { Form } from 'react-bootstrap';

const Sidebar = ({
  auth,
  location,
  getUserId,
  tradeDeal,
  filterName,
  setImpId,
  clearFilter,
  history,
}) => {
  const [username, setUsername] = useState('');

  const [state, setState] = useState({
    isOpen: false,
    value: 'defaultvalue',
  });
  useEffect(() => {
    onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const toggleModal = () => {
    setState({
      isOpen: !state.isOpen,
    });
    getUserId();
  };
  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };
  const toggleModalClose = () => {
    setState({
      isOpen: false,
      value: 'defaultvalue',
    });
  };
  const handleNameChange = (e) => {
    e.preventDefault();
    if (e.target.value !== '') {
      filterName({ text: e.target.value });
    }
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    tradeDeal.filtered &&
      tradeDeal.filtered.map((fil) => {
        if (fil.username == username) {
          setImpId({ username: fil.username });
          history.push('/testform');
        }
      });
    clearFilter();
  };

  useEffect(() => {
    onRouteChanged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const onRouteChanged = () => {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(state).forEach((i) => {
      setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
    ];

    dropdownPaths.forEach((obj) => {
      if (isPathActive(obj.path)) {
        setState({ [obj.state]: true });
      }
    });
  };
  return (
    <nav className='sidebar sidebar-offcanvas' id='sidebar'>
      <div className='text-center sidebar-brand-wrapper d-flex align-items-center'>
        <a className='sidebar-brand brand-logo' href='index.html'>
          <img
            src={require('../../assets/images/712160ae-335c-4b6d-90d6-4c818afb16b2.jpeg')}
            alt='logo'
            style={{
              width: '100%',
              height: '80%',
              marginTop: '4rem',
            }}
          />
        </a>
        <a className='sidebar-brand brand-logo-mini pt-3' href='index.html'>
          <img src={require('../../assets/images/logo-mini.svg')} alt='logo' />
        </a>
      </div>
      <ul className='nav' style={{ marginTop: '100px' }}>
        <li className='nav-item nav-profile not-navigation-link'>
          <div className='nav-link'>
            <Dropdown>
              <Dropdown.Toggle className='nav-link user-switch-dropdown-toggler p-0 toggle-arrow-hide bg-transparent border-0 w-100'>
                <div className='d-flex justify-content-between align-items-start'>
                  <div className='profile-image'>
                    <img
                      src={require('../../assets/images/circle-cropped.png')}
                      alt='profile'
                    />
                  </div>
                  <div className='text-left ml-3'>
                    <p className='profile-name'>
                      {auth.user && auth.user.username}
                    </p>
                    <small className='designation text-muted text-small'>
                      {auth.user && auth.user.country}
                    </small>
                    <span className='status-indicator online'></span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className='preview-list navbar-dropdown'>
                <Dropdown.Item
                  className='dropdown-item p-0 preview-item d-flex align-items-center'
                  href='!#'
                  onClick={(evt) => evt.preventDefault()}
                >
                  <div className='d-flex'>
                    <div className='py-3 px-4 d-flex align-items-center justify-content-center'>
                      <i className='mdi mdi-bookmark-plus-outline mr-0'></i>
                    </div>
                    <div className='py-3 px-4 d-flex align-items-center justify-content-center border-left border-right'>
                      <i className='mdi mdi-account-outline mr-0'></i>
                    </div>
                    <div className='py-3 px-4 d-flex align-items-center justify-content-center'>
                      <i className='mdi mdi-alarm-check mr-0'></i>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  className='dropdown-item preview-item d-flex align-items-center text-small'
                  onClick={(evt) => evt.preventDefault()}
                >
                  Manage Accounts
                </Dropdown.Item>
                <Dropdown.Item
                  className='dropdown-item preview-item d-flex align-items-center text-small'
                  onClick={(evt) => evt.preventDefault()}
                >
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item
                  className='dropdown-item preview-item d-flex align-items-center text-small'
                  onClick={(evt) => evt.preventDefault()}
                >
                  Check Inbox
                </Dropdown.Item>
                <Dropdown.Item
                  className='dropdown-item preview-item d-flex align-items-center text-small'
                  onClick={(evt) => evt.preventDefault()}
                >
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <button className='btn btn-success btn-block' onClick={toggleModal}>
              New Trade <i className='mdi mdi-plus'></i>
            </button>
            <Modal
              show={state.isOpen}
              onClose={toggleModalClose}
              aria-labelledby='contained-modal-title-vcenter'
              centered
            >
              <Modal.Header
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Modal.Title id='contained-modal-title-vcenter'>
                  Choose importer.Enter username
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className='pt-3'>
                  <Form.Group className='d-flex search-field'>
                    <Form.Control
                      type='text'
                      placeholder='Username'
                      size='lg'
                      className='h-auto'
                      value={username}
                      onChange={handleNameChange}
                    />
                  </Form.Group>
                </Form>
                {tradeDeal.filtered &&
                  tradeDeal.filtered.length > 0 &&
                  tradeDeal.filtered.map(
                    (fil) =>
                      fil.username !== auth.user.username && (
                        <p>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              setUsername(fil.username);
                            }}
                            key={fil.username}
                          >
                            {fil.username}
                          </Link>
                        </p>
                      )
                  )}
                <div className='mt-3'>
                  <button
                    className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                    onClick={onSubmit}
                  >
                    Submit
                  </button>
                </div>
              </Modal.Body>
              <Modal.Footer
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  onClick={toggleModalClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </li>
        <li
          className={
            isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'
          }
        >
          <Link className='nav-link' to='/dashboard'>
            <Icon
              icon={baselineDashboard}
              color='#979797'
              width='1.5rem'
              height='1.5rem'
            />
            <span className='menu-title'>
              &nbsp;&nbsp;&nbsp;&nbsp;Dashboard
            </span>
          </Link>
        </li>
        <li
          className={isPathActive('/my-trade') ? 'nav-item active' : 'nav-item'}
        >
          <Link className='nav-link' to='/my-trade'>
            <Icon
              icon={handshakeIcon}
              width='1.5rem'
              height='1.5rem'
              color='#979797'
            />
            <span className='menu-title'>&nbsp;&nbsp;&nbsp;&nbsp;My Trade</span>
          </Link>
        </li>
        <li
          className={
            isPathActive('/my-wallet') ? 'nav-item active' : 'nav-item'
          }
        >
          <Link className='nav-link' to='/my-wallet'>
            <Icon
              icon={walletIcon}
              color='#979797'
              width='1.5rem'
              height='1.5rem'
            />
            <span className='menu-title'>
              &nbsp;&nbsp;&nbsp;&nbsp;My Wallet
            </span>
          </Link>
        </li>
        <li
          className={
            isPathActive('/user-profile') ? 'nav-item active' : 'nav-item'
          }
        >
          <Link className='nav-link' to='/user-profile'>
            <Icon
              icon={bxsUser}
              color='#979797'
              width='1.5rem'
              height='1.5rem'
            />
            <span className='menu-title'>
              &nbsp;&nbsp;&nbsp;&nbsp;User Profile
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  tradeDeal: state.tradeDeal,
  auth: state.auth,
});
export default withRouter(
  connect(mapStateToProps, { getUserId, filterName, setImpId, clearFilter })(
    Sidebar
  )
);
