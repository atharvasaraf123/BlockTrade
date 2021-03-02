import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loadUser, login, clearError, clearMsg } from '../actions/auth';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Login = ({
  auth: { user, msg, error, isAuthenticated },
  history,
  login,
  loadUser,
  clearError,
  clearMsg,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState('error');
  const [message, setMessage] = React.useState('');
  useEffect(() => {
    if (isAuthenticated && user) {
      setMessage('Login Successful');
      setVariant('success');
      setOpen(true);
      clearMsg();
      if (user) {
        if (user.companyName === '') {
          history.push('/company-info');
        } else if (user.kycStatus === false) {
          history.push('/kyc');
        } else {
          history.push('/dashboard');
        }
      }
    } else {
      if (error) {
        setMessage(error);
        setVariant('error');
        setOpen(true);
        clearError();
      }
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);
  useEffect(() => {
    if (localStorage.token && !user) {
      loadUser();
    }
  }, []);
  const handleLogin = (event) => {
    if (event.key === 'Enter') {
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setMessage('Please fill all the fields');
      setVariant('warning');
      setOpen(true);
    } else {
      const formData = { username, password };
      await login({ formData, loadUser });
      if (isAuthenticated) {
        setMessage('Login Successful');
        setVariant('success');
        setOpen(true);
        if (user.companyName === '') {
          history.push('/company-info');
        } else if (user.kycStatus === false) {
          history.push('/kyc');
        } else {
          history.push('/dashboard');
        }
      } else {
        setMessage(error);
        setVariant('error');
        setOpen(true);
      }
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };
  return (
    <div>
      <div className='d-flex align-items-center auth px-0'>
        <div className='row w-100 mx-0'>
          <div className='col-lg-4 mx-auto'>
            <div className='auth-form-light text-left py-5 px-4 px-sm-5'>
              <div className='brand-logo'>
                <img
                  style={{ display: 'block', margin: 'auto' }}
                  src={require('../../assets/images/712160ae-335c-4b6d-90d6-4c818afb16b2.jpeg')}
                  alt='logo'
                />
              </div>
              <h4>Hello Traders! let's get started</h4>
              <h6 className='font-weight-light'>Sign in to continue.</h6>
              <Form className='pt-3'>
                <Form.Group className='d-flex search-field'>
                  <Form.Control
                    type='text'
                    placeholder='Username'
                    size='lg'
                    className='h-auto'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className='d-flex search-field'>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    size='lg'
                    className='h-auto'
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </Form.Group>
                <div className='mt-3'>
                  <button
                    className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                    onClick={onSubmit}
                    //onKeyDown={handleLogin}
                  >
                    LOGIN
                  </button>
                </div>
                <div className='my-2 d-flex justify-content-between align-items-center'>
                  <div className='form-check'>
                    <label className='form-check-label text-muted'>
                      <input type='checkbox' className='form-check-input' />
                      <i className='input-helper'></i>
                      Keep me signed in
                    </label>
                  </div>
                  <a
                    href='!#'
                    onClick={(event) => event.preventDefault()}
                    className='auth-link text-black'
                  >
                    Forgot password?
                  </a>
                </div>
                <div className='text-center mt-4 font-weight-light'>
                  Don't have an account?
                  <Link to='/register' className='text-primary'>
                    Create
                  </Link>
                </div>
              </Form>
              <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Alert onClose={handleClose} severity={variant}>
                  {message}
                </Alert>
              </Snackbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  login,
  clearError,
  clearMsg,
  loadUser,
})(Login);
