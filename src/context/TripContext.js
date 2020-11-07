import createDataContext from './createDataContext';


const tripReducer = (state, action) => {
    switch(action.type) {
        case 'start_trip':
            return { ...state, tripState: action.payload }
        case 'end_trip':
            return { ...state, tripState: action.payload }
        default:
            return state;
    }
}


const startTrip = (dispatch) => () => {
    dispatch({ type: 'start_trip', payload: true });
};


const endTrip = (dispatch) => () => {
    dispatch({ type: 'end_trip', payload: false });
};


const saveTrip = (dispatch) => () => {

};


export const { Context, Provider } = createDataContext(
    tripReducer,
    { startTrip, endTrip, saveTrip },
    { tripState: false },
)