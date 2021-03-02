import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TradeForm1 from './TradeForm1';
import TradeForm2 from './TradeForm2';
import TradeForm3 from './TradeForm3';
import TradeForm4 from './TradeForm4';
import TradeForm5 from './TradeForm5';
import { connect } from 'react-redux';
import { finalUpload } from '../../actions/tradeDeal';
import { loadUser } from '../../actions/auth';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
function getSteps() {
  return [
    <TradeForm1 />,
    <TradeForm2 />,
    <TradeForm3 />,
    <TradeForm4 />,
    <TradeForm5 />,
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Enter Seller Info';
    case 1:
      return 'Enter Receiver Info';
    case 2:
      return 'Logistics Details';
    case 3:
      return 'Product Details';
    case 4:
      return 'Final Bill';
    default:
      return 'Unknown stepIndex';
  }
}

const TestFrom = ({
  history,
  tradeDeal,
  loadUser,
  finalUpload,
  auth,
  conn,
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  useEffect(() => {
    loadUser();
  }, []);

  const {
    sellerInfo,
    receiverInfo,
    logisticsInfo,
    descOfConsign,
    finalBill,
  } = tradeDeal;
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // history.push('/tradedeal');
      const data = {
        expUser: auth.user.username,
        impUser: tradeDeal.selectedImpId,
        inco: tradeDeal.receiverInfo.inco,
        amount: tradeDeal.finalBill.tradeTotal,
        creditPeriod: tradeDeal.sellerInfo.creditP,
        paymentType: tradeDeal.sellerInfo.paymentType,
        invoiceDate: tradeDeal.sellerInfo.invoiceDate,
      };
      const ipfsData = {
        sellerInfo,
        receiverInfo,
        logisticsInfo,
        descOfConsign,
        finalBill,
      };
      console.log(conn);
      finalUpload({ data, ipfsData, conn });
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    localStorage.setItem('flag', true);
  };
  const disable = () => {
    const d = localStorage.getItem('flag');
    return d == 'true' ? true : false;
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    history.push('/dashboard');
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          var labelStep = getStepContent(index);
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{labelStep}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {steps[activeStep]}
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions} align='center'>
              All steps completed - Trade Initiated successfully
            </Typography>
            <Button
              onClick={handleReset}
              className={classes.button}
              align='center'
            >
              Finish
            </Button>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                className={classes.button}
                //disabled={disable()}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tradeDeal: state.tradeDeal,
  auth: state.auth,
  conn: state.conn,
});

export default connect(mapStateToProps, { finalUpload, loadUser })(TestFrom);
