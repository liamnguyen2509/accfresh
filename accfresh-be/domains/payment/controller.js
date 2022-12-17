// models
const axios = require('axios');
const Admin = require('../admin/model');
const User = require('../user/models/user');
const Payment = require('./models/payment');

const EXTERNAL_ENDPOINT = require('./externalEndPoint');

const getReceiver = async () => {
    const admin = await Admin.findOne({});
    return { bank: admin.bank, bankAccount: admin.bankAccount };
}

const getRate = async (request) => {
    return await axios.post(EXTERNAL_ENDPOINT.AUTOPAYMENT_GET_RATE, 
    { 
        send: request.send, 
        sendCurrency: request.sendCurrency, 
        receive: request.receive, 
        receiveCurrency: request.receiveCurrency, 
        amount: request.amount, 
        amountOf: "send", 
        fromAmount: "" 
    }, { timeout: 5000, headers: { 'Content-Type': 'multipart/form-data', "Accept-Encoding": "gzip,deflate,compress" } })
    .then((response) => response.data)
    .catch((err) => { throw Error(err.message) });
}

const deposit = async (request) => {
    const transaction = await axios.post(EXTERNAL_ENDPOINT.AUTOPAYMENT_OPEN_TRANSFER, 
    { 
        am_ount: request.amount, 
        ra_te: request.rate, 
        se_nd: request.send, 
        rec_eive: request.receive,
        fr_om_curr_ency: request.fromCurrency, 
        to_curr_ency: request.toCurrency,
        se_nder_id: "", 
        rece_iver_id: request.receiverBank, 
        pho_ne: request.phone,
        rece_ive_am_ount: request.receiveAmount
    }, { timeout: 5000, headers: { 'Content-Type': 'multipart/form-data', "Accept-Encoding": "gzip,deflate,compress" } })
    .then((response) => response.data)
    .catch((err) => { throw Error(err.message) });

    const userRequest = await User.findOne({ email: request.senderEmail });

    const inputElementMemo = transaction.content.split('\r\n')[8];
    const memoValueRegex = /value="[A-Za-z0-9]+"/g;
    const valueAttributeMemo = inputElementMemo.match(memoValueRegex);
    const valueMemo = valueAttributeMemo[0].split('"')[1];

    const payment = new Payment({
        paymentId: transaction.id,
        paymentTime: transaction.time,
        paymentUnit: "USD",
        paymentAmount: request.amount,
        type: transaction.type,
        payeeAccount: "U9674906",
        payeeName: "AutopayPM.Com",
        suggestedMemo: valueMemo,
        user: userRequest
    });

    const requestedPayment = payment.save().catch((err) => {
        throw Error("Request Deposit failed.");
    });

    return requestedPayment;
}   

const requestPerfectMoney = async (request) => {
    const payment = await axios.post(EXTERNAL_ENDPOINT.PERFECTMONEY_REQUEST_PAYMENT, 
    { 
        STATUS_URL: `${process.env.FRONTEND_URI}/payment/${request.paymentId}`, 
        PAYMENT_URL: `${process.env.FRONTEND_URI}/payment/${request.paymentId}`, 
        PAYMENT_URL_METHOD: "POST", 
        NOPAYMENT_URL: `${process.env.FRONTEND_URI}`,
        NOPAYMENT_URL_METHOD: "POST", 
        PAYEE_ACCOUNT: request.payeeAccount,
        PAYEE_NAME: request.payeeName, 
        SUGGESTED_MEMO: request.suggestedMemo, 
        PAYMENT_UNITS: request.paymentUnit,
        PAYMENT_AMOUNT: request.paymentAmount,
        PAYMENT_ID: request.paymentId
    }, { timeout: 5000, headers: { 'Content-Type': 'multipart/form-data', "Accept-Encoding": "gzip,deflate,compress" } })
    .then((response) => response.data)
    .catch((err) => { throw Error(err.message) });

    return payment;
}

const getLastedPayment = async () => {
    const payments = await Payment.find().sort({_id: -1}).limit(1);
    const paymentStatus = await axios.post(EXTERNAL_ENDPOINT.AUTOPAYMENT_CHECK_STATUS, 
        { 
            id: payments[0].paymentId
        }, { timeout: 5000, headers: { 'Content-Type': 'multipart/form-data', "Accept-Encoding": "gzip,deflate,compress" } })
        .then((response) => response.data)
        .catch((err) => { throw Error(err.message) });
    
    payments[0].status = paymentStatus.status;
    await payments[0].save().catch((err) => {
        throw Error("Get Payment failed.");
    });

    return payments[0];
}

const getPaymentById = async (id) => {
    const payment = await Payment.findOne({ paymentId: id });
    const paymentStatus = await axios.post(EXTERNAL_ENDPOINT.AUTOPAYMENT_CHECK_STATUS, 
        { 
            id: payment.paymentId
        }, { timeout: 5000, headers: { 'Content-Type': 'multipart/form-data', "Accept-Encoding": "gzip,deflate,compress" } })
        .then((response) => response.data)
        .catch((err) => { throw Error(err.message) });
    
    payment.status = paymentStatus.status;
    await payment.save().catch((err) => {
        throw Error("Get Payment failed.");
    });

    return payment;
}

const getPaymentsByUser = async (userId) => {
    const payments = await Payment.find({ user: userId }).sort({ updatedAt: -1 });
    return payments;
}

module.exports = { getReceiver, getRate, deposit, requestPerfectMoney, getLastedPayment, getPaymentById, getPaymentsByUser }