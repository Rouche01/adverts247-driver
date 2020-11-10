import createDataContext from './createDataContext';
import paystackApi from '../api/paystackApi';


const paymentReducer = (state, action) => {
    switch(action.type) {
        case 'get_bank_list':
            return { ...state, bankList: action.payload }
        case 'get_account_details':
            return { ...state, userAccountDetails: action.payload }
        case 'enable_withdraw':
            return { ...state, enableWithdraw: true }
        case 'disable_withdraw':
            return { ...state, enableWithdraw: false }
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
            type: 'add_error',
            payload: err
        })
    }
};



const confirmUserAccount = (dispatch) => async(account_number, bank_code) => {
    dispatch({ type: 'disable_withdraw'})
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
        dispatch({ type: 'enable_withdraw'})
    } catch(err) {
        dispatch({
            type: 'get_account_details',
            payload: null
        })
        // console.log(err);
        dispatch({
            type: 'add_error',
            payload: err
        })
    }
};



export const { Context, Provider } = createDataContext(
    paymentReducer,
    { getBankList, confirmUserAccount },
    { bankList: null, userAccountDetails: null, enableWithdraw: false }
)