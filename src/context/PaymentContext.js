import createDataContext from './createDataContext';
import paystackApi from '../api/paystackApi';
import { customNavigate } from '../navigationRef';

const paymentReducer = (state, action) => {
    switch(action.type) {
        case 'get_bank_list':
            return { ...state, bankList: action.payload }
        case 'get_account_details':
            return { ...state, userAccountDetails: action.payload }
        case 'create_recipient':
            return { ...state, recipientCode: action.payload }
        case 'set_loading':
            return { ...state, loading: action.payload }
        case 'add_error_message':
            return { ...state, error: action.payload }
        case 'clear_error':
            return { ...state, error: action.payload }
        default:
            return state;
    }
}



const getBankList = (dispatch) => async() => {
    try {
        const response = await paystackApi.get('/bank');
        dispatch({
            type: 'get_bank_list',
            payload: response.data.data
        })
    } catch(err) {
        dispatch({
            type: 'add_error_message',
            payload: err.message
        })
    }
};



const clearAccountDetails = (dispatch) => () => {
    dispatch({
        type: 'get_account_details',
        payload: null
    })
}



const confirmUserAccount = (dispatch) => async(account_number, bank_code) => {
    dispatch({ type: 'set_loading', payload: true});
    try {
        const response = await paystackApi.get('/bank/resolve', {
            params: {
                account_number,
                bank_code
            }
        });
        dispatch({
            type: 'get_account_details',
            payload: response.data.data
        })
        dispatch({ type: 'set_loading', payload: false});
    } catch(err) {
        dispatch({
            type: 'get_account_details',
            payload: null
        })
        // console.log(err);
        dispatch({
            type: 'add_error_message',
            payload: err.message
        })
        dispatch({ type: 'set_loading', payload: false});
    }
};


const createRecipient = (dispatch) => async(account_number, bank_code, name) => {
    try {
        const response = await paystackApi.post('/transferrecipient', 
            {
                type: "nuban",
                name,
                account_number,
                bank_code,
                currency: "NGN"
            }
        );

        dispatch({
            type: 'create_recipient',
            payload: response.data.data.recipient_code
        })

    } catch(err) {
        dispatch({
            type: 'add_error_message',
            payload: err.message
        })
    }
}


const initiateTransfer = (dispatch) => async(recipient, amount) => {
    try {
        const response = await paystackApi.post('/transfer', {
            source: "balance",
            amount,
            recipient,
            reason: "Adverts247 Payout"
        });
        // create a transaction(Transaction Model attached to a User) with the data gotten from the response above
        customNavigate('Transactions');
    } catch(err) {
        dispatch({
            type: 'add_error_message',
            payload: 'This feature is not available yet, work is in progress to make it ready as soon as possible'
        })
    }
}


const clearErrors = (dispatch) => () => {
    dispatch({
        type: 'clear_error',
        payload: ''
    })
}



export const { Context, Provider } = createDataContext(
    paymentReducer,
    { getBankList, confirmUserAccount, clearAccountDetails, createRecipient, initiateTransfer, clearErrors },
    { bankList: null, userAccountDetails: null, loading: false, error: '', recepientCode: '' }
)