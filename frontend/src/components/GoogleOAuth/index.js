import { useEffect } from "react"
import './GoogleOAuth.css';

const GoogleOAuth = () => {

    const handleCallbackResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '974738052404-p6injlhbf8fiv1109m27dh4v68mi07st.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('google-signin-div'),
            { theme: 'outline',
            size: 'large',
            width: 400,
            text: 'continue_with',
        });

    }, []);

    return (
        <div className='google-oauth-container'>
            <div id='google-signin-div'>

            </div>
        </div>
    )
}

export default GoogleOAuth;
