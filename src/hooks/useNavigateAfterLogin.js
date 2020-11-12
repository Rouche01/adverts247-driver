import { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { customNavigate } from '../navigationRef';


export default (email, password) => {

    const { state: { user }, getUser } = useContext(AuthContext);
    
    useEffect(() => {

        if(user) {
            const { profilePhoto, insuranceCert, driversLicense, vehicleReg} = user;

            if(profilePhoto && insuranceCert && driversLicense && vehicleReg) {
                customNavigate('mainFlow');
            } else {
                customNavigate('SetupIndex');
            }
        }

    }, [user])

    const signInAndNavigate = (signinFunc) => {

        console.log('works2');
        if(email && password) {
            signinFunc({email, password}, getUser);
        } else {
            signinFunc(getUser);
        }
        
    }

    const localSigninAndNavigate = async (signinFunc) => {
        
        console.log('signedIn');
        const signedIn = await signinFunc(getUser);
        

        if(!signedIn) {
            customNavigate('AuthPrompt');
        }

    }

    return [ signInAndNavigate, localSigninAndNavigate ];
}