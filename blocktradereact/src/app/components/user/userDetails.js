import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import { loadUser } from '../../actions/auth';
import { getAllConn } from '../../actions/connection';
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress,
} from 'shards-react';
import { getAvatar } from '../../actions/profile';
import Modal from 'react-bootstrap/Modal';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const UserDetails = ({ auth, loadUser, getAvatar, getAllConn }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (auth.user) {
      getAllConn();
      getAvatar({ fileName: auth.user.avatar });
    }
  }, [auth.user]);
  return (
    <Fragment>
      {auth.user && (
        <Card small className='mb-4 pt-3'>
          <CardHeader className='border-bottom text-center'>
            <div className='mb-3 mx-auto'>
              <img
                className='rounded-circle'
                src={require('../../../assets/images/circle-cropped.png')}
                alt='user-profile'
                width='110'
              />
            </div>
            <h4 className='mb-0'>{auth.user.username}</h4>
            <span className='text-muted d-block mb-2'>
              {auth.user.companyName}
            </span>
            <span className='text-muted d-block mb-2'>
              {auth.user.city} , {auth.user.country}
            </span>
            <label htmlFor='icon-button-file'>
              <IconButton
                color='primary'
                aria-label='upload picture'
                component='span'
                onClick={handleOpen}
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <Modal
              size='md'
              show={open}
              onHide={handleClose}
              aria-labelledby='example-modal-sizes-title-sm'
              dialogClassName='modal-30w'
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id='example-modal-sizes-title-sm'>
                  Choose Profile Picture
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  type='file'
                  id='avatar'
                  name='avatar'
                  accept='image/png, image/jpeg'
                  style={{ marginBottom: '0.5rem' }}
                />
                <br />
                <div style={{ justifyContent: 'center' }}>
                  <Button style={{ margin: '0 auto', display: 'block' }}>
                    Upload
                  </Button>
                </div>
              </Modal.Body>
            </Modal>
          </CardHeader>
          <ListGroup flush>
            <ListGroupItem className='px-4'>
              <div className='progress-wrapper'>
                <strong className='text-muted d-block mb-2'>
                  {auth.user.email}
                </strong>
                <strong className='text-muted d-block mb-2'>
                  {auth.user.mobileNo}
                </strong>
              </div>
            </ListGroupItem>
            <ListGroupItem className='p-4'>
              <strong className='text-muted d-block mb-2'>
                {auth.user.companyEmail}
              </strong>
              <strong className='text-muted d-block mb-2'>
                {auth.user.companyAddress}
              </strong>
            </ListGroupItem>
          </ListGroup>
        </Card>
      )}
    </Fragment>
  );
};

UserDetails.propTypes = {
  /**
   * The user details object.
   */
  userDetails: PropTypes.object,
};

UserDetails.defaultProps = {
  userDetails: {
    name: 'Sierra Brooks',
    avatar: require('../../../assets/images/circle-cropped.png'),
    jobTitle: 'Project Manager',
    performanceReportTitle: 'Workload',
    performanceReportValue: 74,
    metaTitle: 'Description',
    metaValue:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eaque, quidem, commodi soluta qui quae minima obcaecati quod dolorum sint alias, possimus illum assumenda eligendi cumque?',
  },
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default withRouter(
  connect(mapStateToProps, {
    loadUser,
    getAvatar,
    getAllConn,
  })(UserDetails)
);
