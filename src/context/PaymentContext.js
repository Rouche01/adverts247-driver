import createDataContext from './createDataContext';
import paystackApi from '../api/paystackApi';


const paymentReducer = (state, action) => {
    switch(action.type) {
        case 'get_bank_list':
            return { ...state, bankList: action.payload }
        case 'get_account_details':
            return { ...state, userAccountDetails: action.payload }
        case 'set_loading':
            return { ...state, loading: action.payload }
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
            type: 'add_error',
            payload: err
        })
        dispatch({ type: 'set_loading', payload: false});
    }
};



export const { Context, Provider } = createDataContext(
    paymentReducer,
    { getBankList, confirmUserAccount, clearAccountDetails },
    { bankList: null, userAccountDetails: null, loading: false }
)