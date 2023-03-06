import { useEffect } from "react"
import './GoogleOAuth.css';

const GoogleOAuth = () => {

    const handleCallbackResponse = (response) => {
        return
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '974738052404-p6injlhbf8fiv1109m27dh4v68mi07st.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('googleSignInDiv'),
            { theme: 'outline', size: 'large'}
        );
    }, []);

    return (
        <div className='google-oauth-container'>
            Google OAuth 2.0
            <div id='googleSignInDiv'>

            </div>
        </div>
    )
}

export default GoogleOAuth;
