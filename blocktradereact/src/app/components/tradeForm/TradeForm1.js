import React, { useState, useEffect } from 'react';
import { setSellerInfo } from '../../actions/tradeDeal';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveOutlined from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
}));
const TradeForm1 = ({ history, setSellerInfo, tradeDeal }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [err, setErr] = useState(false);
  const [flag, setFlag] = useState(true);

  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = async (e) => {
    e.preventDefault();

    if (!loading) {
      console.log(invoiceDate);
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
  const [sellerFirm, setSellerFirm] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [invoiceDue, setInvoiceDue] = useState(new Date());
  const [sellerAddr, setSellerAddr] = useState('');
  const [purposeShip, setPurposeShip] = useState('');
  const [party, setParty] = useState('');
  const [sellerCont, setSellerCont] = useState('');
  const [sellerTel, setSellerTel] = useState('');
  const [sellerEmail, setSellerEmail] = useState('');
  const [payType, setPayType] = useState('');
  const [creditP, setCreditP] = useState(0);
  //const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  useEffect(() => {
    const { sellerInfo } = tradeDeal;
    if (sellerInfo) {
      setSellerFirm(sellerInfo.sellerFirm);
      setInvoiceNo(sellerInfo.invoiceNo);
      setInvoiceDate(sellerInfo.invoiceDate);
      setInvoiceDue(sellerInfo.invoiceDue);
      setSellerAddr(sellerInfo.sellerAddr);
      setPurposeShip(sellerInfo.purposeShip);
      setParty(sellerInfo.party);
      setSellerCont(sellerInfo.sellerCont);
      setSellerTel(sellerInfo.sellerTel);
      setSellerEmail(sellerInfo.sellerEmail);
      setFlag(false);
      localStorage.setItem('flag', flag);
    }
    checkCondition();
  }, []);

  const nextForm = () => {
    const sellerInfo = {
      sellerFirm,
      invoiceNo,
      invoiceDate,
      paymentType: payType,
      creditPeriod: creditP,
      sellerAddr,
      purposeShip,
      party,
      sellerCont,
      sellerTel,
      sellerEmail,
    };
    setSellerInfo(sellerInfo);
    console.log(sellerInfo);

    //history.push('/tradeform2')
  };

  const checkCondition = () => {
    if (
      sellerAddr &&
      sellerEmail &&
      sellerCont &&
      payType &&
      party &&
      purposeShip &&
      sellerTel &&
      sellerFirm &&
      invoiceNo &&
      invoiceDate
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
        <h3
          style={{
            alignItems: 'center',
            fontSize: '2.5vw',
            marginBottom: '1rem',
          }}
        >
          Seller Information
        </h3>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id='sellerfirm'
              label='Seller Firm'
              type='text'
              variant='outlined'
              value={sellerFirm}
              style={{ width: '100%' }}
              onChange={(e) => {
                setSellerFirm(e.target.value);
                checkCondition();
              }}
              error={sellerFirm === '' ? true : false}
              helperText={sellerFirm === '' ? 'Seller Firm is required' : ''}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id='invoice'
              label='Invoice Number'
              variant='outlined'
              value={invoiceNo}
              onChange={(e) => {
                setInvoiceNo(e.target.value);
                checkCondition();
              }}
              error={invoiceNo === '' ? true : false}
              helperText={invoiceNo === '' ? 'Invoice Number is required' : ''}
              required
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ padddingTop: 0 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                inputVariant='outlined'
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                label='Invoice Date'
                value={invoiceDate}
                onChange={(e) => {
                  const d = new Date(e);
                  const ye = new Intl.DateTimeFormat('en', {
                    year: 'numeric',
                  }).format(d);
                  const mo = new Intl.DateTimeFormat('en', {
                    month: 'numeric',
                  }).format(d);
                  const da = new Intl.DateTimeFormat('en', {
                    day: '2-digit',
                  }).format(d);
                  setInvoiceDate(`${ye}/${mo}/${da}`);
                  checkCondition();
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              variant='outlined'
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <InputLabel id='paymentType'>Payment Type</InputLabel>
              <Select
                value={payType}
                onChange={(e) => {
                  setPayType(e.target.value);
                  checkCondition();
                }}
                label='Payment Type'
                required
              >
                <MenuItem value={'PL'}>PL</MenuItem>
                <MenuItem value={'PA'}>PA</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {payType === 'PA' && (
            <Grid item xs={6}>
              <TextField
                id='credit'
                label='Credit Period'
                type='number'
                variant='outlined'
                value={creditP}
                onChange={(e) => {
                  setCreditP(e.target.value);
                  checkCondition();
                }}
                error={creditP === '' ? true : false}
                helperText={creditP === '' ? 'Credit Period is required' : ''}
                required
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              id='outlined-multiline-static'
              label='Seller Address'
              multiline
              rows={4}
              variant='outlined'
              value={sellerAddr}
              onChange={(e) => {
                setSellerAddr(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={sellerAddr === '' ? true : false}
              helperText={sellerAddr === '' ? 'Seller Address is required' : ''}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id='purpose'
              label='Purpose of shipment'
              variant='outlined'
              value={purposeShip}
              onChange={(e) => {
                setPurposeShip(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={purposeShip === '' ? true : false}
              helperText={
                purposeShip === '' ? 'Purpose of shipment is required' : ''
              }
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id='party'
              label='Party to transaction'
              variant='outlined'
              value={party}
              onChange={(e) => {
                setParty(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={party === '' ? true : false}
              helperText={
                party === '' ? 'Party to transaction is required' : ''
              }
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id='sellercont'
              label='Seller Contact'
              variant='outlined'
              value={sellerCont}
              onChange={(e) => {
                setSellerCont(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={sellerCont === '' ? true : false}
              helperText={sellerCont === '' ? 'Seller Contact is required' : ''}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id='sellertel'
              label='Seller Telephone'
              variant='outlined'
              value={sellerTel}
              onChange={(e) => {
                setSellerTel(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={sellerTel === '' ? true : false}
              helperText={
                sellerTel === '' ? 'Seller Telephone is required' : ''
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='selleremail'
              label='Seller Email'
              variant='outlined'
              value={sellerEmail}
              onChange={(e) => {
                setSellerEmail(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={sellerEmail === '' ? true : false}
              helperText={sellerEmail === '' ? 'Seller Email is required' : ''}
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
                  {success ? <CheckIcon /> : <SaveOutlined />}
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
  setSellerInfo: (sellerInfo) => dispatch(setSellerInfo(sellerInfo)),
});

const mapStateToProps = (state) => ({
  tradeDeal: state.tradeDeal,
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeForm1);
