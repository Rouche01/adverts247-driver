import { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';
import { customNavigate } from '../navigationRef';


export default () => {

    const { state: { user, loggedIn }, getUser } = useContext(AuthContext);
    
    useEffect(() => {


            if(user) {

                const { profilePhoto, insuranceCert, driversLicense, vehicleReg} = user;

                if(profilePhoto && insuranceCert && driversLicense && vehicleReg) {
                    customNavigate('mainFlow');
                } else {
                    customNavigate('SetupIndex');
                }
            }
        

    }, [loggedIn, user])


    console.log(user);

    const localSigninAndNavigate = (signinFunc) => {
        
        signinFunc(getUser);
        // console.log(loggedIn, 1);

    }

    return [ localSigninAndNavigate ];
}