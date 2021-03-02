import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setFinalBill } from '../../actions/tradeDeal';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
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

const TradeForm5 = ({ history, setFinalBill, tradeDeal }) => {
  const classes = useStyles();
  const [adjTotal, setAdjTotal] = useState('');
  const [devAmount, setDevAmount] = useState('');
  const [packingChg, setPackingChg] = useState('');
  const [handChg, setHandChg] = useState('');
  const [otherChg, setOtherChg] = useState('');
  const [insurAmount, setInsurAmount] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [preTaxAmount, setPreTaxAmount] = useState('');
  const [tradeTotal, setTradeTotal] = useState(0);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = useState(false);
  const [flag, setFlag] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState('error');
  const [message, setMessage] = React.useState('');
  const timer = React.useRef();
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleButtonClick = (e) => {
    e.preventDefault();

    if (!loading) {
      console.log(history);
      nextForm({ history });
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
    localStorage.setItem('flag', flag);
    setMessage('New Trade initiated successfully');
    setVariant('success');
    setOpen(true);
  };
  useEffect(() => {
    const { billDetails } = tradeDeal;
    if (billDetails) {
      setAdjTotal(billDetails.adjTotal);
      setDevAmount(billDetails.devAmount);
      setPackingChg(billDetails.packingChg);
      setHandChg(billDetails.handChg);
      setOtherChg(billDetails.otherChg);
      setInsurAmount(billDetails.insurAmount);
      setTaxAmount(billDetails.taxAmount);
      setPreTaxAmount(billDetails.preTaxAmount);
      setTradeTotal(billDetails.tradeTotal);
    }
  }, []);
  const nextForm = ({ history }) => {
    const finalBill = {
      adjTotal,
      devAmount,
      packingChg,
      handChg,
      otherChg,
      taxAmount,
      preTaxAmount,
      tradeTotal: tradeTotal * 0.4,
    };
    console.log(finalBill);
    setFinalBill(finalBill);
    // history.push('/tradedeal');
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
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
        <h3 style={{ alignItems: 'center', fontSize: '2vw' }}>Bill Details</h3>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id='adjTotal'
              label='Adjusted Total'
              type='text'
              variant='outlined'
              value={adjTotal}
              onChange={(e) => {
                setAdjTotal(e.target.value);
              }}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='devAmount'
              label='Dev Amount'
              type='text'
              variant='outlined'
              value={devAmount}
              onChange={(e) => {
                setDevAmount(e.target.value);
              }}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='packingChg'
              label='Packing Charges'
              type='text'
              variant='outlined'
              value={packingChg}
              onChange={(e) => {
                setPackingChg(e.target.value);
              }}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='handChg'
              label='Handling Charges'
              type='text'
              variant='outlined'
              value={handChg}
              onChange={(e) => {
                setHandChg(e.target.value);
              }}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='otherChg'
              label='Other Charges'
              type='text'
              variant='outlined'
              value={otherChg}
              onChange={(e) => {
                setOtherChg(e.target.value);
              }}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='insurAmount'
              label='Insurance Amount'
              type='text'
              variant='outlined'
              value={insurAmount}
              onChange={(e) => {
                setInsurAmount(e.target.value);
              }}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='taxAmount'
              label='Tax Amount'
              type='text'
              variant='outlined'
              value={taxAmount}
              onChange={(e) => {
                setTaxAmount(e.target.value);
              }}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='preTaxAmount'
              label='Pre-Tax Amount'
              type='text'
              variant='outlined'
              value={preTaxAmount}
              onChange={(e) => {
                setPreTaxAmount(e.target.value);
              }}
              style={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='tradeTotal'
              label='Trade Total'
              type='number'
              variant='outlined'
              value={tradeTotal}
              onChange={(e) => {
                setTradeTotal(e.target.value);
              }}
              style={{ width: '100%' }}
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

const mapDispatchToProps = (dispatch) => ({
  setFinalBill: (finalBill) => dispatch(setFinalBill(finalBill)),
});

const mapStateToProps = (state) => ({
  tradeDeal: state.tradeDeal,
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeForm5);
