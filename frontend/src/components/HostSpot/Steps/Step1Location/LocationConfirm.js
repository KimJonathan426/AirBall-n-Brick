import './Step1Location.css';

const LocationConfirm = () => {


    return (
        <div className='host-step-1-location-container'>
            <div className='host-step-1-location-container-inner'>
                <div className='host-step-1-location-top'>
                    <h1 className='host-step-1-location-header'>Confirm your address</h1>
                    <div className='host-step-1-location-subheader'>
                        Your address is only shared with guests after they;ve made a reservation.
                    </div>
                </div>
                <div className='host-step-1-location-bottom'>
                    <div className='host-step-1-location-main'>
                        <div>

                        </div>
                        <div id='step-1-map'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationConfirm;
