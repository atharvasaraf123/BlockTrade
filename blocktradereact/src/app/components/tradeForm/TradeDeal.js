import React from 'react';
import { connect } from 'react-redux';
import { finalUpload } from '../../actions/tradeDeal';

const TradeDeal = ({ tradeDeal, auth, finalUpload }) => {
  const {
    sellerInfo,
    receiverInfo,
    logisticsInfo,
    descOfConsign,
    finalBill,
  } = tradeDeal;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      expUser: auth.user.username,
      impUser: tradeDeal.selectedImpId,
      inco: tradeDeal.receiverInfo.inco,
      amount: `${tradeDeal.finalBill.curr}.${tradeDeal.finalBill.tradeTotal}`,
      dueDate: tradeDeal.sellerInfo.invoiceDue,
    };
    const ipfsData = {
      sellerInfo,
      receiverInfo,
      logisticsInfo,
      descOfConsign,
      finalBill,
    };
    finalUpload({ data, ipfsData });
  };
  return (
    <div>
      <h1 className='center'>Trade Deal</h1>
      <div className='divider'></div>
      <h2 className='center'>Seller Info</h2>
      <div className='row'>
        <div className='col s4'>
          <p>Seller Firm: {sellerInfo.sellerFirm}</p>
          <p>Seller Contact: {sellerInfo.sellerCont}</p>
          <p>Seller Tel: {sellerInfo.sellerTel}</p>
          <p>Seller Email: {sellerInfo.sellerEmail}</p>
          <p>Purpose of shipment: {sellerInfo.purposeShip}</p>
        </div>
        <div className='col s8'>
          <p>Seller Address: {sellerInfo.sellerAddr}</p>
          <p>Invoice Number: {sellerInfo.invoiceNo}</p>
          <p>Invoice Date: {sellerInfo.invoiceDate}</p>
          <p>Invoice Due: {sellerInfo.invoiceDue}</p>
          <p>Party: {sellerInfo.party}</p>
        </div>
      </div>
      <h2 className='center'>Receiver Info</h2>
      <div className='row'>
        <div className='col s4'>
          <p>Receiver Firm: {receiverInfo.receiverFirm}</p>
          <p>Receiver Contact: {receiverInfo.receiverCont}</p>
          <p>Receiver Tel: {receiverInfo.receiverTel}</p>
          <p>Receiver Email: {receiverInfo.receiverEmail}</p>
          <p>Receiver Address: {receiverInfo.receiverAddr}</p>
        </div>
        <div className='col s8'>
          <p>Duty and taxes payable by: {receiverInfo.dutyPay}</p>
          <p>Payment Method: {receiverInfo.payMeth}</p>
          <p>Invoice Currency: {receiverInfo.incurr}</p>
          <p>Incoterms: {receiverInfo.inco}</p>
        </div>
      </div>
      <h2 className='center'>Logistics Info</h2>
      <div className='row'>
        <div className='col s4'>
          <p>Place of Collection: {logisticsInfo.poc}</p>
          <p>Collection Date: {logisticsInfo.collDate}</p>
          <p>Collection Time: {logisticsInfo.collTime}</p>
          <p>Place of Discharge: {logisticsInfo.pod}</p>
        </div>
        <div className='col s8'>
          <p>Departure Date: {logisticsInfo.deptDate}</p>
          <p>Departure Time: {logisticsInfo.deptTime}</p>
          <p>Place of delivery: {logisticsInfo.placeofd}</p>
          <p>Shipping Marks: {logisticsInfo.shippingm}</p>
        </div>
      </div>
      <h2 className='center'>Description of Consignment</h2>
      {descOfConsign.products.length > 0 &&
        descOfConsign.products.map((product) => (
          <div className='row'>
            <div className='col s6'>
              <p>Product ID: {product.pid}</p>
              <p>FX Rate: {product.fxRate}</p>
              <p>Desciption/Package:{product.description}</p>
              <p>Sell Price: {product.sellPrice}</p>
            </div>
            <div className='col s6'>
              <p>Tax% : {product.tax} %</p>
              <p>Item Price: {product.itemPrice}</p>
              <p>Units in pk: {product.unitsPk}</p>
              <p>Quantity: {product.qty}</p>
              <p>Amount: {product.amount}</p>
            </div>
          </div>
        ))}
      <div className='row'>
        <p>Total Amount: {descOfConsign.totalAmount}</p>
        <div className='col s6'>
          <p>Total Net Wt.: {descOfConsign.totalNetWt}</p>
          <p>Curr Disc.: {descOfConsign.currDisc}</p>
        </div>
        <div className='col s6'>
          <p>Total Cube: {descOfConsign.totalCube}</p>
          <p>Total Gross Wt.: {descOfConsign.totalGross}</p>
        </div>
      </div>
      <h2 className='center'>Final Bill</h2>
      <div className='row'>
        <div className='col s6'>
          <p>Currency: {finalBill.curr}</p>
          <p>Adjusted Total: {finalBill.adjTotal}</p>
          <p>Freight/Dev Amount: {finalBill.devAmount}</p>
          <p>Packing Charges: {finalBill.packingChg}</p>
          <p>Handling Charges: {finalBill.handChg}</p>
        </div>
        <div className='col s6'>
          <p>Other Charges: {finalBill.otherChg}</p>
          <p>Insurance Amount: {finalBill.insurAmount}</p>
          <p>Tax Amount: {finalBill.taxAmount}</p>
          <p>Pre-Tax Amount: {finalBill.preTaxAmount}</p>
        </div>
      </div>
      <h4 className='center'>Trade Total: {finalBill.tradeTotal}</h4>
      <button className='btn btn-large blue' onClick={handleSubmit}>
        Finalize
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tradeDeal: state.tradeDeal,
  auth: state.auth,
});

export default connect(mapStateToProps, { finalUpload })(TradeDeal);
