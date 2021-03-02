import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Spinner from '../app/shared/spinner';
import PrivateRouter from './routers/PrivateRouter';
import PublicRouter from './routers/PublicRouter';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Error404 = lazy(() => import('./user-pages/Error404'));
const Error500 = lazy(() => import('./user-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));

const MyTrade = lazy(() => import('./components/mytrade/MyTrade'));
const Wallet = lazy(() => import('./components/mywallet/Wallet'));
const ActivateForm = lazy(() => import('./components/auth/Activate'));
const CompanyInfo = lazy(() => import('./user-pages/CompanyInfo'));
const Kyc = lazy(() => import('./components/kyc/Kyc'));
const Blankpage = lazy(() => import('./user-pages/BlankPages'));

const TradeForm1 = lazy(() => import('./components/tradeForm/TradeForm1'));
const TradeForm2 = lazy(() => import('./components/tradeForm/TradeForm2'));
const TradeForm3 = lazy(() => import('./components/tradeForm/TradeForm3'));
const TradeForm4 = lazy(() => import('./components/tradeForm/TradeForm4'));
const TradeForm5 = lazy(() => import('./components/tradeForm/TradeForm5'));
const TradeDeal = lazy(() => import('./components/tradeForm/TradeDeal'));
const TestForm = lazy(() => import('./components/tradeForm/TestForm'));
const UserProfile = lazy(() => import('./components/user/user-profile'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <PrivateRouter exact path='/dashboard' component={Dashboard} />
        <PrivateRouter exact path='/my-wallet' component={Wallet} />
        <PrivateRouter exact path='/my-trade' component={MyTrade} />

        <PublicRouter path='/login' component={Login} />
        <PublicRouter path='/register' component={Register1} />
        <PrivateRouter path='/company-info' component={CompanyInfo} />
        <PrivateRouter path='/kyc' component={Kyc} />
        <PrivateRouter path='/tradeform1' component={TradeForm1} />
        <PrivateRouter path='/tradeform2' component={TradeForm2} />
        <PrivateRouter path='/tradeform3' component={TradeForm3} />
        <PrivateRouter path='/tradeform4' component={TradeForm4} />
        <PrivateRouter path='/tradeform5' component={TradeForm5} />
        <PrivateRouter path='/tradedeal' component={TradeDeal} />
        <PrivateRouter path='/testform' component={TestForm} />
        <PrivateRouter path='/user-profile' component={UserProfile} />

        <PublicRouter path='/activate/:token' component={ActivateForm} />

        <PublicRouter path='/error-404' component={Error404} />
        <PublicRouter path='/error-500' component={Error500} />
        <PublicRouter path='/blank-page' component={Blankpage} />
        <Redirect to='/dashboard' />
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
