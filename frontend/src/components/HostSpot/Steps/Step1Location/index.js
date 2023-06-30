import { Loader } from '@googlemaps/js-api-loader';
import './Step1Location.css';

const Step1Location = ({ location, setLocation }) => {
    const loader = new Loader({
        apiKey: process.env.REACT_APP_GOOGLE_PLACES_API,
        version: 'weekly',
    });

    loader.load().then(async () => {
        const { Map } = await window.google.maps.importLibrary("maps");

        const map = new Map(document.getElementById("step-1-map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
            gestureHandling: 'none',
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            keyboardShortcuts: false,
            // disableDefaultUI:true,
        });
    });

    return (
        <>
            <div className='host-step-1-location-container'>
                <div className='host-step-1-location-container-inner'>
                    <div className='host-step-1-location-top'>
                        <h1 className='host-step-1-location-header'>Where's your court located?</h1>
                        <div className='host-step-1-location-subheader'>
                            Your address is only shared with guests after they've made a reservation.
                        </div>
                    </div>
                    <div className='host-step-1-location-bottom'>
                        <div className='host-step-1-location-main'>
                            <div id="step-1-map"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Step1Location;
