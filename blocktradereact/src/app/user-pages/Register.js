import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup, clearError, clearMsg } from '../actions/auth';
import { Toast } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Register = ({
  auth: { msg, error },
  history,
  signup,
  clearError,
  clearMsg,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [mobileNo, setMobileNo] = useState('');
  const [walletAddr,setWalletAddr] = useState('');
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState('error');
  const [message, setMessage] = React.useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      name === '' ||
      username === '' ||
      password === '' ||
      email === '' ||
      mobileNo === ''
    ) {
      setMessage('Please fill all the fields');
      setVariant('warning');
      setOpen(true);
    } else {
      const formData = {
        name,
        username,
        email,
        password,
        mobileNo,
        walletAddr
      };
      
      await signup({formData});
      
      //setShow(true);
      //clearError();
      //clearMsg();
      //setTimeout(setShow(false),3000);
    }

    //setShow(false);
  };

  useEffect(() => {
    if (error) {
      setMessage(error);
      setVariant('error');
      setOpen(true);
      clearError();
    }else if(msg){
      setMessage('Registration Successful');
      setVariant('success');
      setOpen(true);
      history.push('/blank-page');
      clearMsg();
    }
  },[error,msg]);
  
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
            <h4>New here?</h4>
            <h6 className='font-weight-light'>
              Signing up is easy. It only takes a few steps
            </h6>
            <form className='pt-3'>
              <div className='form-group'>
                <input
                  required={true}
                  type='text'
                  value={name}
                  className='form-control form-control-lg'
                  id='exampleInputUsername1'
                  placeholder='Name'
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <input
                  required={true}
                  type='email'
                  className='form-control form-control-lg'
                  id='exampleInputEmail1'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <input
                  required={true}
                  type='text'
                  value={username}
                  className='form-control form-control-lg'
                  id='exampleInputUsername1'
                  placeholder='Username'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <input
                  required={true}
                  type='text'
                  value={mobileNo}
                  className='form-control form-control-lg'
                  id='mobileno'
                  placeholder='Mobile No'
                  onChange={(e) => setMobileNo(e.target.value)}
                  style={{ color: '#000000' }}
                />
              </div>
              <div className='form-group'>
                <select
                  className='form-control form-control-lg'
                  id='exampleFormControlSelect2'
                  style={{ color: '#bdb8c3' }}
                >
                  <option>Country</option>
                  <option>United States of America</option>
                  <option>United Kingdom</option>
                  <option>India</option>
                  <option>Germany</option>
                  <option>Argentina</option>
                </select>
              </div>
              <div className='form-group'>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  className='form-control form-control-lg'
                  id='exampleInputPassword1'
                  placeholder='Password'
                  required={true}
                />
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  value={walletAddr}
                  onChange={(e) => setWalletAddr(e.target.value)}
                  className='form-control form-control-lg'
                  id='exampleInputPassword1'
                  placeholder='Wallet Address'
                  required={true}
                />
              </div>
              <div className='mb-4'>
                <div className='form-check'>
                  <label className='form-check-label text-muted'>
                    <input
                      required={true}
                      type='checkbox'
                      className='form-check-input'
                    />
                    <i className='input-helper'></i>I agree to all Terms &
                    Conditions
                  </label>
                </div>
              </div>
              <div className='mt-3'>
                <button
                  onClick={onSubmit}
                  className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                >
                  SIGN UP
                </button>
              </div>
              <div className='text-center mt-4 font-weight-light'>
                Already have an account?{' '}
                <Link to='/login' className='text-primary'>
                  Login
                </Link>
              </div>
            </form>
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
export default connect(mapStateToProps, { signup, clearError, clearMsg })(
  Register
);