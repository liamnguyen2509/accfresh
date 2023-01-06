// models
const axios = require('axios');
const Admin = require('../admin/model');
const User = require('../user/models/user');
const Payment = require('./models/payment');
const Wallet = require('../user/models/wallet');

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
    }, { timeout: 5000, headers: { 'Content-Type': 'multipart/form-data', "Accept-Encoding": "gzip,deflate,compress", "User-Agent": "axios 1.2.1" } })
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

    const userRequest = await User.findById(request.senderId);
    
    let valueMemo = "";
    if (request.send === 4) {
        const inputElementMemo = transaction.content.split('\r\n')[8];
        const memoValueRegex = /value="[A-Za-z0-9]+"/g;
        const valueAttributeMemo = inputElementMemo.match(memoValueRegex);
        valueMemo = valueAttributeMemo[0].split('"')[1];
    } // PM ELSE send === 5 => PM Voucher
    

    const payment = new Payment({
        paymentId: transaction.id,
        paymentTime: transaction.time,
        paymentUnit: "USD",
        paymentAmount: request.amount,
        paymentType: request.send,
        type: transaction.type,
        payeeAccount: "U9674906",
        payeeName: "AutopayPM.Com",
        suggestedMemo: valueMemo,
        user: userRequest,
        isDeposit: false
    });

    const requestedPayment = payment.save().catch((err) => {
        throw Error("Request Deposit failed.");
    });

    return requestedPayment;
}   

const transferEvoucher = async (request) => {
    await axios.post(EXTERNAL_ENDPOINT.AUTOPAYMENT_TRANSFER_EVOUCHER, 
        { 
            in_ecurr: request.paymentType, 
            confirm: request.paymentId, 
            pm_number: request.activationNumber, 
            pm_code: request.activationCode
        }, { timeout: 5000, headers: { 'Content-Type': 'multipart/form-data', "Accept-Encoding": "gzip,deflate,compress" } })
        .then((response) => response.data)
        .catch((err) => { throw Error(err.message) });

    const payment = await Payment.findOne({ paymentId: request.paymentId });
    payment.activationNumber = request.activationNumber;
    payment.activationCode = request.activationCode;

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

const getPaymentById = async (userId, paymentId) => {
    const payment = await Payment.findOne({ user: userId, paymentId: paymentId });

    if (payment.isDeposit) {
        return payment;
    } else {
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
    
        if (paymentStatus.status === 'onhold') {
            throw Error("Your request infomation not correct.");
        } else {
            if (paymentStatus.status === 'done') {
                payment.isDeposit = true;
                await payment.save().catch((err) => {
                    throw Error("Update Payment failed.");
                });
        
                const user = await User.findById(userId);
                const wallet = await Wallet.findById(user.wallet._id);
                
                wallet.previousBalance = wallet.balance;
                wallet.balance = parseFloat(wallet.balance) + parseFloat(payment.paymentAmount);
                
                await wallet.save().catch((err) => {
                    throw Error("Update Wallet failed.");
                });
            }
        }
    
        return payment;
    }
}

const getPaymentsByUser = async (userId) => {
    const payments = await Payment.find({ user: userId }).sort({ updatedAt: -1 });
    return payments;
}

const getPayments = async () => {
    const payments = await Payment.find({}).sort({ updatedAt: -1 }).populate("user");
    return payments;
}

module.exports = { getReceiver, getRate, deposit, requestPerfectMoney, getLastedPayment, getPaymentById, getPaymentsByUser, getPayments, transferEvoucher }