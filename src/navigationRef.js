import { NavigationActions } from 'react-navigation';

let navigator;

export const setNavigator = (insertNavigator) => {
    navigator = insertNavigator
};


export const customNavigate = (routeName, params) => {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
}