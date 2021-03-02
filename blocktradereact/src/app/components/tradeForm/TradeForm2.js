import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setReceiverInfo } from '../../actions/tradeDeal';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
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
const TradeForm2 = ({ history, setReceiverInfo, tradeDeal }) => {
  const classes = useStyles();
  const [receiverFirm, setReceiverFirm] = useState('');
  const [receiverAddr, setReceiverAddr] = useState('');
  const [receiverCont, setReceiverCont] = useState('');
  const [receiverTel, setReceiverTel] = useState('');
  const [receiverEmail, setReceiverEmail] = useState('');
  const [dutyPay, setDutyPay] = useState('');
  const [inco, setInco] = useState('');
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
    const { receiverInfo } = tradeDeal;
    if (receiverInfo) {
      setReceiverFirm(receiverInfo.receiverFirm);
      setReceiverAddr(receiverInfo.receiverAddr);
      setReceiverCont(receiverInfo.receiverCont);
      setReceiverTel(receiverInfo.receiverTel);
      setReceiverEmail(receiverInfo.receiverTel);
      setDutyPay(receiverInfo.dutyPay);
      setInco(receiverInfo.inco);
    }
    checkCondition();
  }, []);

  const nextForm = () => {
    const receiverInfo = {
      receiverFirm,
      receiverAddr,
      receiverCont,
      receiverTel,
      receiverEmail,
      dutyPay,
      inco,
    };
    console.log(receiverInfo);
    setReceiverInfo(receiverInfo);
    //history.push('/tradeform3');
  };
  const checkCondition = () => {
    if (
      receiverFirm &&
      receiverAddr &&
      receiverCont &&
      receiverTel &&
      receiverEmail &&
      dutyPay &&
      inco
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
          Receiver/Consignee Information
        </h3>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id='receiverFirm'
              label='receiverFirm'
              type='text'
              variant='outlined'
              value={receiverFirm}
              onChange={(e) => {
                setReceiverFirm(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={receiverFirm === '' ? true : false}
              helperText={
                receiverFirm === '' ? 'Receiver Firm is required' : ''
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='receiverAddr'
              label='Receiver Address'
              variant='outlined'
              value={receiverAddr}
              onChange={(e) => {
                setReceiverAddr(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={receiverAddr === '' ? true : false}
              helperText={
                receiverAddr === '' ? 'Receiver Address is required' : ''
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='receiverCont'
              label='Receiver Contact'
              variant='outlined'
              value={receiverCont}
              onChange={(e) => {
                setReceiverCont(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={receiverCont === '' ? true : false}
              helperText={
                receiverCont === '' ? 'Receiver Contact is required' : ''
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='receiverTel'
              label='Receiver Telephone'
              variant='outlined'
              value={receiverTel}
              onChange={(e) => {
                setReceiverTel(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={receiverTel === '' ? true : false}
              helperText={
                receiverTel === '' ? 'Receiver Telephone is required' : ''
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='receiverEmail'
              label='Receiver Email'
              variant='outlined'
              value={receiverEmail}
              onChange={(e) => {
                setReceiverEmail(e.target.value);
                checkCondition();
              }}
              style={{ width: '100%' }}
              error={receiverEmail === '' ? true : false}
              helperText={
                receiverEmail === '' ? 'Receiver Email is required' : ''
              }
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              variant='outlined'
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <InputLabel id='Taxes & Duty Payable By'>
                Taxes & duty payable by
              </InputLabel>
              <Select
                value={dutyPay}
                onChange={(e) => {
                  setDutyPay(e.target.value);
                  checkCondition();
                }}
                label='Taxes & Duty Payable By'
                error={dutyPay === '' ? true : false}
                helperText={dutyPay === '' ? 'Duty Pay is required' : ''}
                required
              >
                <MenuItem value={'exporter'}>Exporter</MenuItem>
                <MenuItem value={'importer'}>Importer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              variant='outlined'
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <InputLabel id='inco'>IncoTerms</InputLabel>
              <Select
                value={inco}
                onChange={(e) => {
                  setInco(e.target.value);
                  checkCondition();
                }}
                label='Incoterms'
                error={inco === '' ? true : false}
                helperText={inco === '' ? 'Incoterms is required' : ''}
                required
              >
                <MenuItem value='' disabled selected>
                  IncoTerms
                </MenuItem>
                <MenuItem value='EXW'>EXW - EX WORKS</MenuItem>
                <MenuItem value='FCA'>FCA - FREE CARRIER</MenuItem>
                <MenuItem value='FAS'>FAS - FREE ALONGSIDE SHIP</MenuItem>
                <MenuItem value='FOB'>FOB - FREE ON BOARD</MenuItem>
                <MenuItem value='CFR'>CFR - COST AND FREIGHT</MenuItem>
                <MenuItem value='CIF'>
                  CIF - COST, INSURANCE AND FREIGHT
                </MenuItem>
                <MenuItem value='CPT'>CPT - CARRIAGE PAID TO</MenuItem>
                <MenuItem value='CIP'>
                  CIP - CARRIAGE AND INSURANCE PAID TO
                </MenuItem>
                <MenuItem value='DAF'>DAF - DELIVERED AT FRONTIER</MenuItem>
                <MenuItem value='DES'>DES - DELIVERED EX SHIP</MenuItem>
                <MenuItem value='DEQ'>
                  DEQ - DELIVERED EX QUAY (DUTY PAID)
                </MenuItem>
                <MenuItem value='DDU'>DDU - DELIVERED DUTY UNPAID</MenuItem>
                <MenuItem value='DDP'>DDP - DELIVERED Duty PAID</MenuItem>
              </Select>
            </FormControl>
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
  setReceiverInfo: (receiverInfo) => dispatch(setReceiverInfo(receiverInfo)),
});

const mapStateToProps = (state) => ({
  tradeDeal: state.tradeDeal,
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeForm2);
