import { NavLink } from 'react-router-dom';
import AuthFormModal from '../AuthFormModal';
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
                            <NavLink to="/trips/v1">Trips</NavLink>
                            <NavLink to="/spots/new">Host a Court</NavLink>
                            <NavLink to='/hosting'>Manage Listings</NavLink>
                            <div className='dropdown-divider' />
                            {/* <button>Account</button> */}
                            <NavLink className='dropdown-about' exact to='/about'>About</NavLink>
                            <LogoutButton />
                        </>
                        :
                        <>
                            <AuthFormModal display={'Log in'}/>
                            <AuthFormModal display={'Sign up'}/>
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
