import './HostDashboard.css';
import HostingReservations from './HostingReservations';
import HostingTips from './HostingTips.js';

const HostDashboard = () => {


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
                <HostingReservations />
                <HostingTips />
            </div>
        </div>
    )
}

export default HostDashboard;
