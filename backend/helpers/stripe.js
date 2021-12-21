const stripe = require('stripe')(process.env.STRIPEKEY);
const User = require("../models/userSchema");

const createCustomer = (userDoc) => {
    console.log('CREATING CUST');

    try {
        if (!userDoc) return false;

        const customer = await stripe.customers.create({
            email: userDoc.email,
            name: `${userDoc.firstName} ${userDoc.lastName}`,
            metadata: {
                'id': userDoc._id
            }
        });



        return customer;
    } catch (e) {
        functions.logger.log({ message: "Something went wrong in creating stripe account", response: e });
        return false;
    }
}


const checkCustomerAccount = async (customerId) => {
    try {
        //Check if customer account exist
        const customer = await stripe.customers.retrieve(
            customerId
        );

        if (customer.deleted == true) {
            return false;
        }

        if (customer.id) return customer;

        return false;
    } catch (e) {
        return false;
    }
};

const saveCustomerAccountToDB = async (userId, customerId) => {
    await User.findByIdAndUpdate(userId, { 'customerAccount': customerId })
};

const createCheckoutSession = async (amount, customerId) => {
    const session = await stripe.checkout.sessions.create({
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [{
            name: "Flight Reservation",
            amount: amount * 100,
            currency: "USD",
            quantity: 1
        }],
        customer: customerId,
    });

    
}



module.exports = { createCustomer, checkCustomerAccount, saveCustomerAccountToDB };