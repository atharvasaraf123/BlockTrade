import React from 'react';

const BlankPage = () => {
  return (
    <div>
      <div className='d-flex align-items-center auth px-0'>
        <div className='row w-100 mx-0'>
          <div className='col-lg-4 mx-auto'>
            <div
              className='auth-form-light text-left py-5 px-4 px-sm-5'
              style={{ marginTop: '10rem' }}
            >
              <div className='brand-logo'>
                <img
                  style={{ display: 'block', margin: 'auto' }}
                  src={require('../../assets/images/712160ae-335c-4b6d-90d6-4c818afb16b2.jpeg')}
                  alt='logo'
                />
              </div>
              <div
                style={{ display: 'grid', height: '100%', textAlign: 'center' }}
              >
                <h6 style={{ margin: 'auto' }}>
                  An Activation link has been sent to your email. Kindly check
                  your email to proceed further.
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlankPage;
