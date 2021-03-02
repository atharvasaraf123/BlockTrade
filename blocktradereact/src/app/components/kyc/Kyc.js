import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { kycDl, kycPass } from '../../actions/kyc';
import { Card, Button, Form } from 'react-bootstrap';
import { loadUser, clearError, clearMsg } from '../../actions/auth';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Kyc = ({
  kycDl,
  kycPass,
  kyc,
  history,
  loadUser,
  auth: { error, msg },
  clearError,
  clearMsg,
}) => {
  const [meth, setMeth] = useState('');
  const [toggler, setToggler] = useState(false);
  const [no, setNo] = useState('');
  const [cc, setCc] = useState('');
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState('error');
  const [message, setMessage] = React.useState('');
  useEffect(() => {
    if (kyc.kycStatus === true) {
      history.push('/dashboard');
    }
  }, [history, kyc.kycStatus]);

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (cc === '' || no === '') {
      setMessage('Please fill all the fields');
      setVariant('warning');
      setOpen(true);
    } else {
      if (meth === 'dl') {
        const formData = {
          dl_no: no,
          cc,
        };
        kycDl(formData);
      } else {
        const formData = {
          passport_no: no,
          cc,
        };
        kycPass(formData);
      }
    }
  };

  useEffect(() => {
    if (error) {
      setMessage(error);
      setVariant('error');
      setOpen(true);
      clearError();
    } else if (msg) {
      setMessage('KYC Verified');
      setVariant('success');
      setOpen(true);
      history.push('/dashboard');
      clearMsg();
    }
  }, [error, msg]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };
  return (
    <div style={{ backgroundColor: '#2853C3', textAlign: 'center' }}>
      {kyc.msg && <p>{kyc.msg}</p>}
      <Card style={{ width: '40rem', margin: 'auto' }} className='text-center'>
        <Card.Img variant='top' src='/kycPend.gif' alt='image' />
        {!toggler && (
          <Card.Body style={{ backgroundColor: '#2853C3' }}>
            <Button
              variant='light outline-dark'
              size='lg'
              onClick={(e) => {
                e.preventDefault();
                setMeth('dl');
                setToggler(true);
              }}
            >
              Kyc using DL
            </Button>
            <hr style={{ backgroundColor: 'white' }}></hr>
            <Button
              variant='light outline-dark'
              size='lg'
              onClick={(e) => {
                e.preventDefault();
                setMeth('pass');
                setToggler(true);
              }}
            >
              Kyc using passport
            </Button>
          </Card.Body>
        )}
        {toggler && (
          <Card.Body style={{ backgroundColor: '#2853C3' }}>
            <Form className='pt-3'>
              <Form.Group className='d-flex search-field'>
                <select
                  className='form-control form-control-sm'
                  id='exampleFormControlSelect2'
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                >
                  <option value=''>Country code</option>
                  <option value='AU'>AU</option>
                  <option value='AG'>AG</option>
                  <option value='IN'>IN</option>
                  <option value='BG'>BG</option>
                  <option value='AS'>AS</option>
                  <option value='CO'>CO</option>
                  <option value='CA'>CA</option>
                </select>
              </Form.Group>
              <Form.Group className='d-flex search-field'>
                <Form.Control
                  type='text'
                  placeholder={
                    meth == 'dl' ? 'Driving License No.' : 'Passport No.'
                  }
                  size='lg'
                  className='h-auto'
                  value={no}
                  onChange={(e) => setNo(e.target.value)}
                />
              </Form.Group>

              <div className='mt-3'>
                <Button variant='light' size='lg' onClick={onSubmit}>
                  Verify
                </Button>
              </div>
            </Form>
          </Card.Body>
        )}
      </Card>
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
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  kyc: state.kyc,
});
export default connect(mapStateToProps, {
  kycDl,
  kycPass,
  loadUser,
  clearError,
  clearMsg,
})(Kyc);
