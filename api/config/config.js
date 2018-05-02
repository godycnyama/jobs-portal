'use strict';
//DB_CONNECTION_STRING: "mongodb://127.0.0.1/test"
//DB_CONNECTION_STRING: "mongodb://admin:@Ns*j@127.0.0.1:27017/jobmix"
module.exports = {
  ENCR_KEY: "bnmTYgdwup359032HswNF",
  DB_CONNECTION_STRING: "mongodb://127.0.0.1/test",
  payfast: {
      MERCHANT_ID: "10913219",
      MERCHANT_KEY: "pslp0rjyj3pbj",
      RETURN_URL: "https://www.jobmix.co.za/#/recruiter/order-success",
      CANCEL_URLJOBAD: "https://www.jobmix.co.za/#/recruiter/checkout-order",
      CANCEL_URLSEARCH: "https://www.jobmix.co.za/#/recruiter/checkout-searchorder",
      NOTIFY_URL: "https://www.jobmix.co.za/api/orders/paymentNotify",
      VALIDATION_URL: "https://www.payfast.co.za/eng/query/validate",
      EMAIL_CONFIRMATION: 1,
      CONFIRMATION_ADDRESS: "godycnyama@yahoo.co.uk",
      PAYMENT_METHOD: "cc"
  }
};