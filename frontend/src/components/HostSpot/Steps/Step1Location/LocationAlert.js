import exclamation from '../../../../images/exclamation-point.svg';
import clearX from '../../../../images/clear-x-thin.svg';
import './LocationAlert.css';

const LocationAlert = ({ alert, setAlert }) => {


    return (
        <div className={alert ? 'invalid-google-location-container-on' : 'invalid-google-location-container-off'}>
            <div className='invalid-google-location-img-box'>
                <img className='invalid-google-location-exclamation' src={exclamation} alt='exclamation point' />
            </div>
            <div>
                <div className='invalid-google-location-text-1'>
                    We don't recognize that address
                </div>
                <div className='invalid-google-location-text-2'>
                    Are you sure that it's correct?
                </div>
                <div className='invalid-google-location-main'>
                    <div className='invalid-google-location-main'>
                        <button className='invalid-google-location-no'>
                            No, edit the address
                        </button>
                        <button className='invalid-google-location-yes'>
                            Yes, my address is correct
                        </button>
                    </div>
                </div>
            </div>
            <div className='invalid-google-location-exit'>
                <button className='invalid-google-location-cancel' onClick={() => setAlert(false)}>
                    <img style={{ width: '16px', height: '16px' }} src={clearX} alt='x'/>
                </button>
            </div>
        </div>
    )
}

export default LocationAlert;
