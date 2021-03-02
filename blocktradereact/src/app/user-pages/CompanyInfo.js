import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { companyInfo, loadUser } from '../actions/auth';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const CompanyInfo = ({
  auth: { msg, error },
  history,
  companyInfo,
  loadUser,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [country, setCompanyCountry] = useState('');
  const [city, setCompanyCity] = useState('');
  const [companyTelNo, setTelNo] = useState('');
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState('error');
  const [message, setMessage] = React.useState('');
  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      companyName === '' ||
      companyEmail === '' ||
      country === '' ||
      city === '' ||
      companyTelNo === '' ||
      companyAddress === ''
    ) {
      setMessage('Please fill all the fields');
      setVariant('warning');
      setOpen(true);
    } else {
      const companyFormData = {
        companyName,
        companyEmail,
        companyAddress,
        country,
        city,
        companyTelNo,
      };
      setMessage('Company Info Added Successfully');
      setVariant('Success');
      setOpen(true);
      await companyInfo(companyFormData);
      history.push('/kyc');
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
              <h4>Company Info</h4>
              <p>Please Fill Company information to proceed further!</p>
              <form className='pt-3'>
                <div className='form-group'>
                  <input
                    required={true}
                    type='text'
                    className='form-control form-control-lg'
                    id='companyName'
                    placeholder='Company Name'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    required={true}
                    type='email'
                    className='form-control form-control-lg'
                    id='companyEmail1'
                    placeholder='Company Email'
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    required={true}
                    type='text'
                    className='form-control form-control-lg'
                    id='companyAddress'
                    placeholder='Company Address'
                    rows='3'
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                  ></textarea>
                </div>
                <div className='form-group'>
                  <select
                    className='form-control form-control-lg'
                    id='companyCountry'
                    value={country}
                    onChange={(e) => setCompanyCountry(e.target.value)}
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
                    required={true}
                    type='text'
                    className='form-control form-control-lg'
                    id='companyCity'
                    placeholder='City'
                    value={city}
                    onChange={(e) => setCompanyCity(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    className='form-control form-control-lg'
                    id='telNo'
                    placeholder='TelNo: '
                    required={true}
                    value={companyTelNo}
                    onChange={(e) => setTelNo(e.target.value)}
                  />
                </div>
                <div className='mt-3'>
                  <button
                    className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                    onClick={onSubmit}
                  >
                    Continue
                  </button>
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
export default connect(mapStateToProps, { companyInfo, loadUser })(CompanyInfo);
