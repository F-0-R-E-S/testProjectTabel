import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mantine/core';
import { Header as HeaderStyle } from './header.styled'


const Header = () => {

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    const login = () => loginWithRedirect()
    const logoutRedirect = () => logout({ returnTo: window.location.origin, })
    
    return (
        <HeaderStyle>
            {!isAuthenticated ? (
                <Button onClick={login} variant="light" color="teal">
                    Sign In
                </Button>
            ) : (
                <Button onClick={logoutRedirect} variant="light" color="teal">
                    Logout
                </Button>
            )}
        </HeaderStyle>
    )
}

export default Header
