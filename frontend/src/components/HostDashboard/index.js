import './HostDashboard.css';
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
                <div className='hosting-reservations-container'>
                    Test
                </div>
                <HostingTips />
            </div>
        </div>
    )
}

export default HostDashboard;
