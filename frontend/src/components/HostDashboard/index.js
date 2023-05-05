import { useSelector } from 'react-redux';
import HostListings from './HostListings';
import HostingReservations from './HostingReservations';
import HostingTips from './HostingTips.js';
import StaticAuthForm from '../AuthFormModal/StaticAuthForm';
import './HostDashboard.css';

const HostDashboard = () => {
    const user = useSelector(state => state.session.user?.id)

    return (
        <div className='hosting-container'>
            <div className='hosting-content'>
                <div className='hosting-introduction'>
                    <h2 className='hosting-header'>
                        Hosting Dashboard
                    </h2>
                    <h4 className='hosting-sub-header'>
                        View and manage your listings.
                    </h4>
                </div>
                {user ?
                    <>
                        <HostListings />
                        <HostingReservations />
                        <HostingTips />
                    </>
                    :
                    <div className='hosting-auth-container'>
                        <StaticAuthForm />
                    </div>
                }
            </div>
        </div>
    )
}

export default HostDashboard;
