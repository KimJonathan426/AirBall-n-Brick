import { NavLink } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DemoButton from '../DemoButton';
import LogoutButton from '../LogoutButton';
import emptyProfileImage from '../../images/empty-profile-image.svg';
import dropdownBars from '../../images/dropdown-bars.svg';
import './NavDropdown.css';

const NavDropdown = ({ sessionUser }) => {

    const openDropdown = (e) => {
        e.stopPropagation();

        document.getElementById('dropdown-toggle').classList.toggle('show');
    }

    window.onclick = function (event) {
        if (!event.target.matches('.dropdown-btn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    return (
        <div className='dropdown'>
            <button onClick={openDropdown} className='dropdown-btn'>
                <img className='dropdown-bars-svg' src={dropdownBars} alt='three stacked horizontal bars' />
                <img className='empty-profile-svg' src={emptyProfileImage} alt='empty profile placeholder' />
            </button>
            <div id="dropdown-toggle" className='dropdown-content'>
                <div className='dropdown-options'>
                    {sessionUser ?
                        <>
                            {/* <button>Trips</button> */}
                            <NavLink to="/spots/new">Host a Court</NavLink>
                            {/* <button>Manage Listings</button> */}
                            <div className='dropdown-divider' />
                            {/* <button>Account</button> */}
                            <NavLink className='dropdown-about' exact to='/about'>About</NavLink>
                            <LogoutButton />
                        </>
                        :
                        <>
                            <LoginFormModal />
                            <SignupFormModal />
                            <DemoButton />
                            <div className='dropdown-divider' />
                            <NavLink className='dropdown-about' exact to='/about'>About</NavLink>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default NavDropdown;
