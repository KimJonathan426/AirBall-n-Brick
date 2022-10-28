import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

const LogoutButton = () => {
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
      };

    return (
        <button onClick={logout}>Log Out</button>
    )
}

export default LogoutButton;
