import './HostDashboard.css';

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
                <div className='hosting-reservations'>

                </div>
                <div className='hosting-tips-container'>
                    <div className='tips-header'>
                        Hosting Tips
                    </div>
                    <ul className='tips-list'>
                        <li className='tip-box'>
                            <div className='tip-image'>
                                <img src='https://airballnbrick.s3.amazonaws.com/Luxury-court-landscape.jpg' alt='exotic court'/>
                            </div>
                            <div className='tip-info'>Make your court stand out</div>
                        </li>
                        <li className='tip-box'>
                            <div className='tip-image'>
                                <img src='https://airballnbrick.s3.amazonaws.com/basketball-dunk-landscape.PNG' alt='mid dunk poster' />
                            </div>
                            <div className='tip-info'>Show great photos of your court</div>
                        </li>
                        <li className='tip-box'>
                            <div className='tip-image'>
                                <img src='https://airballnbrick.s3.amazonaws.com/warm-court-landscape.jpg' alt='warm basketball court' />
                            </div>
                            <div className='tip-info'>Write a great listing description</div>
                        </li>
                        <li className='tip-box'>
                            <div className='tip-image'>
                                <img src='https://airballnbrick.s3.amazonaws.com/basketball-group-landscape.jpg' alt='players talking' />
                            </div>
                            <div className='tip-info'>Create a great experience for your customers</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HostDashboard;
