/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import AxiosProvider from "../provider/AxiosProvider"

const Auth0ProviderWithHistory = ({ children }: any) => {
    const history = useNavigate();
    const domain: string = process.env.REACT_APP_AUTH0_DOMAIN!;
    const clientId: string = process.env.REACT_APP_AUTH0_CLIENT_ID!;
    const audience: string = process.env.REACT_APP_AUTH0_AUDIENCE!;

    const onRedirectCallback = (appState: any) => {
        history(appState?.returnTo || window.location.pathname);
    };
    

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            audience={audience}
            redirect_uri={window.location.origin}
            useRefreshTokens
            cacheLocation="localstorage"
        >
            <AxiosProvider>
            {children}
            </AxiosProvider>
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;