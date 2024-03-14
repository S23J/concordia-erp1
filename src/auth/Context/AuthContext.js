import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext( {} );

export const AuthProvider = ( { children } ) =>
{
    const [ userInfo, setUserInfo ] = useState( null );
    const [ tokens, setTokens ] = useState( null );

    useEffect( () =>
    {
        const isLoggedIn = async () =>
        {
            try {
                let user_info = window.sessionStorage.getItem( "userInfo" );
                let token = window.sessionStorage.getItem( "token" );

                if ( user_info ) {
                    setUserInfo( JSON.parse( user_info ) );
                }
                if ( token ) {
                    setTokens( JSON.parse( token ) );
                }
            } catch ( error ) {
                console.error( "Error while fetching user data", error );
            }
        };

        isLoggedIn();
    }, [] );

    useEffect( () =>
    {
        if ( userInfo || tokens ) {
            window.sessionStorage.setItem( "userInfo", JSON.stringify( userInfo ) );
            window.sessionStorage.setItem( "token", JSON.stringify( tokens ) );
        }
    }, [ userInfo, tokens ] );

    return (
        <AuthContext.Provider
            value={ {
                userInfo,
                setUserInfo,
                tokens,
                setTokens,
            } }
        >
            { children }
        </AuthContext.Provider>
    );
};

export default AuthContext;
