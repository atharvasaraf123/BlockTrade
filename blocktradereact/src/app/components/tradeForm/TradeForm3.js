import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setLogisticsInfo } from '../../actions/tradeDeal';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const TradeForm3 = ({ history, setLogisticsInfo, tradeDeal }) => {
  const classes = useStyles();
  const [poc, setPOC] = useState('');
  const [collDate, setCollDate] = useState('');
  const [collTime, setCollTime] = useState('');
  const [pod, setPOD] = useState('');
  const [deptDate, setDeptDate] = useState('');
  const [deptTime, setDeptTime] = useState('');
  const [placeofd, setPlaceofd] = useState('');
  const [shippingm, setShippingm] = useState('');
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = useState(false);
  const [flag, setFlag] = useState(true);
  const timer = React.useRef();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleButtonClick = (e) => {
    e.preventDefault();

    if (!loading) {
      nextForm();
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
    localStorage.setItem('flag', flag);
  };
  useEffect(() => {
    const { logisticsInfo } = tradeDeal;
    if (logisticsInfo) {
      setPOC(logisticsInfo.poc);
      setCollDate(logisticsInfo.collDate);
      setCollTime(logisticsInfo.collTime);
      setPOD(logisticsInfo.pod);
      setDeptDate(logisticsInfo.deptDate);
      setDeptTime(logisticsInfo.deptTime);
      setPlaceofd(logisticsInfo.placeofd);
      setShippingm(logisticsInfo.shippingm);
    }
  }, []);

  const nextForm = () => {
    const logisticsInfo = {
      placeofColl: poc,
      collDate,
      collTime,
      placeofDis: pod,
      deptDate,
      deptTime,
      placeofDeal: placeofd,
      shippingm,
    };
    console.log(logisticsInfo);
    setLogisticsInfo(logisticsInfo);
    //history.push('/tradeform4')
  };
  const checkCondition = () => {
    if (
      poc &&
      collDate &&
      collTime &&
      pod &&
      deptDate &&
      deptTime &&
      placeofd &&
      shippingm
    ) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  };
  return (
    <div
      className={classes.root}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth='sm'>
        <h3 style={{ alignItems: 'center', fontSize: '2vw' }}>
          Logistics Details
        </h3>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id='poc'
              label='Place of Collection'
              type='text'
              variant='outlined'
              value={poc}
              onChange={(e) => {
                setPOC(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={poc === '' ? true : false}
              helperText={poc === '' ? 'Place of Collection is required' : ''}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin='normal'
                id='collDate'
                label='Collection Date'
                format='MM/dd/yyyy'
                inputVariant='outlined'
                value={collDate}
                onChange={(e) => {
                  setCollDate(e);
                  checkCondition();
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                style={{ width: '100%' }}
                error={collDate === '' ? true : false}
                helperText={
                  collDate === '' ? 'Collection Date is required' : ''
                }
                required
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                margin='normal'
                id='collTime'
                inputVariant='outlined'
                label='Collection Time'
                value={collTime}
                onChange={(e) => {
                  setCollTime(e);
                  checkCondition();
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
                style={{ width: '100%' }}
                error={collTime === '' ? true : false}
                helperText={
                  collTime === '' ? 'Collection Time is required' : ''
                }
                required
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='pod'
              label='Place of Discharge'
              type='text'
              variant='outlined'
              value={pod}
              onChange={(e) => {
                setPOD(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={pod === '' ? true : false}
              helperText={pod === '' ? 'Place of Departure is required' : ''}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin='normal'
                id='deptDate'
                label='Departure Date'
                inputVariant='outlined'
                format='MM/dd/yyyy'
                value={deptDate}
                onChange={(e) => {
                  setDeptDate(e);
                  checkCondition();
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                style={{ width: '100%' }}
                error={deptDate === '' ? true : false}
                helperText={deptDate === '' ? 'Departure Date is required' : ''}
                required
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                margin='normal'
                id='deptTime'
                label='Departure Time'
                inputVariant='outlined'
                value={deptTime}
                onChange={(e) => {
                  setDeptTime(e);
                  checkCondition();
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
                style={{ width: '100%' }}
                error={deptTime === '' ? true : false}
                helperText={deptTime === '' ? 'Departure Time is required' : ''}
                required
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='placeofd'
              label='Place of Delivery'
              type='text'
              variant='outlined'
              value={placeofd}
              onChange={(e) => {
                setPlaceofd(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={placeofd === '' ? true : false}
              helperText={
                placeofd === '' ? 'Place of Departure is required' : ''
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='shippingm'
              label='Shipping Marks'
              type='text'
              variant='outlined'
              value={shippingm}
              onChange={(e) => {
                setShippingm(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={shippingm === '' ? true : false}
              helperText={
                shippingm === '' ? 'Place of Departure is required' : ''
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div className={classes.wrapper}>
                <Fab
                  aria-label='save'
                  color='primary'
                  className={buttonClassname}
                  onClick={handleButtonClick}
                  //disabled={flag}
                >
                  {success ? <CheckIcon /> : <SaveIcon />}
                </Fab>
                {loading && (
                  <CircularProgress size={68} className={classes.fabProgress} />
                )}
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setLogisticsInfo: (logisticsInfo) =>
    dispatch(setLogisticsInfo(logisticsInfo)),
});

const mapStateToProps = (state) => ({
  tradeDeal: state.tradeDeal,
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeForm3);
