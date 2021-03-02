import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { activateUser, clearError } from '../../actions/auth';
import M from 'materialize-css/dist/js/materialize.min.js';

const ActivateForm = ({
  auth: { msg, error },
  history,
  match,
  activateUser,
}) => {
  const onActivate = async () => {
    await activateUser({ token: match.params.token });
    if (!error) {
      history.push('/login');
    }
  };

  useEffect(() => {
    if (error !== null) {
      M.toast({ html: error, classes: 'red' });
      clearError();
    }
  }, [error]);

  return (
    <div>
      <div className='d-flex align-items-center auth px-0'>
        <div className='row w-100 mx-0'>
          <div className='col-lg-4 mx-auto' style={{ marginTop: '2rem' }}>
            <div className='auth-form-light text-left py-5 px-4 px-sm-5'>
              <div className='brand-logo'>
                <img
                  style={{ display: 'block', margin: 'auto' }}
                  src={require('./../../../assets/images/712160ae-335c-4b6d-90d6-4c818afb16b2.jpeg')}
                  alt='logo'
                />
              </div>
              <div className='card-content' style={{ textAlign: 'center' }}>
                <span className='card-title'>Account activation</span>
                <p>
                  Welcome to BlockTrade. Be a part of our family and start
                  trading in a secure and faster way.
                </p>
              </div>
              <button
                disabled={error !== null}
                onClick={onActivate}
                className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
              >
                Activate
              </button>
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

export default connect(mapStateToProps, { activateUser })(ActivateForm);
