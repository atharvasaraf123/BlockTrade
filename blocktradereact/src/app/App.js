/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';

const store = configureStore();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = (props) => {
  const [state, setState] = useState({
    isFullPageLayout: false,
  });

  // eslint-disable-next-line no-unused-vars
  let navbarComponent;
  let sidebarComponent;
  let footerComponent;
  useEffect(() => {
    onRouteChanged();
    navbarComponent = !state.isFullPageLayout ? <Navbar /> : '';
    sidebarComponent = !state.isFullPageLayout ? <Sidebar /> : '';
    footerComponent = !state.isFullPageLayout ? <Footer /> : '';
    // eslint-disable-next-line
  }, [props.history.location.pathname]);

  const onRouteChanged = () => {
    console.log('ROUTE CHANGED');
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = [
      '/login',
      '/register',
      '/activate',
      '/kyc',
      '/error-404',
      'error-500',
      '/general-pages/landing-page',
      '/company-info',
      '/blank-page',
    ];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (props.location.pathname === fullPageLayoutRoutes[i]) {
        setState({
          isFullPageLayout: true,
        });
        document
          .querySelector('.page-body-wrapper')
          .classList.add('full-page-wrapper');
        break;
      } else if (props.location.pathname.split('/')[1] === 'activate') {
        setState({
          isFullPageLayout: true,
        });
        document
          .querySelector('.page-body-wrapper')
          .classList.add('full-page-wrapper');
        break;
      } else {
        setState({
          isFullPageLayout: false,
        });
        document
          .querySelector('.page-body-wrapper')
          .classList.remove('full-page-wrapper');
      }
    }
  };
  return (
    <div id='block-trade'>
      <Provider store={store}>
        <div className='container-scroller'>
          {!state.isFullPageLayout && <Navbar />}
          <div className='container-fluid page-body-wrapper'>
            {!state.isFullPageLayout && <Sidebar />}
            <div className='main-panel'>
              <div className='content-wrapper'>
                <AppRoutes />
              </div>
              {!state.isFullPageLayout && <Footer />}
            </div>
          </div>
        </div>
      </Provider>
    </div>
  );
};

export default withRouter(App);
