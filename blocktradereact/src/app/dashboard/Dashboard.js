import React, { Fragment, useEffect } from 'react';
import { Sparklines, SparklinesBars } from 'react-sparklines';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loadUser } from '../actions/auth';
import { getAllTrades, checkStatus } from '../actions/trade';
import RecentTrades from '../components/trades/RecentTrades';
import { getAllConn } from '../actions/connection';

const Dashboard = ({
  trade,
  loadUser,
  auth,
  getAllTrades,
  getAllConn,
  conn,
  checkStatus,
}) => {
  useEffect(() => {
    loadUser();
  }, []);
  useEffect(() => {
    // Get all connections

    // Call to smart contract to check the status of document verification
    if (auth.user) {
      getAllConn();
      getAllTrades();
    }
  }, [auth.user]);

  useEffect(() => {
    if (trade.trades && conn) {
      console.log(conn);
      checkStatus({ conn, trades: trade.trades });
    }
  }, [trade.trades, conn]);

  const { trades } = trade;
  return (
    <Fragment>
      {trades && (
        <Fragment>
          <div className='row'>
            <div className='col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin'>
              <h3>Recent trades</h3>
            </div>
          </div>
          <RecentTrades />
        </Fragment>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  trade: state.trade,
  conn: state.conn,
});

export default connect(mapStateToProps, {
  loadUser,
  getAllTrades,
  getAllConn,
  checkStatus,
})(Dashboard);
