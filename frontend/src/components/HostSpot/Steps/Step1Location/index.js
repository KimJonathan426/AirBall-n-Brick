import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { parseAddress } from './parseAddress';
import './Step1Location.css';

const Step1Location = ({ location, setLocation, googleLoader, setGoogleLoader }) => {

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.REACT_APP_GOOGLE_PLACES_API,
            version: 'weekly',
            libraries: ['places']
        });

        loader.importLibrary('maps').then(async ({ Map }) => {
            // const { Map } = await window.google.maps.importLibrary('maps');
            const { Autocomplete } = await window.google.maps.importLibrary('places');

            const map = new Map(document.getElementById('step-1-map'), {
                center: { lat: 38.483378, lng: -109.681333 },
                zoom: 12,
                gestureHandling: 'none',
                zoomControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
                keyboardShortcuts: false,
            });

            const autocomplete = new Autocomplete(document.getElementById('step-1-autocomplete'), {
                componentRestrictions: { country: 'us' },
                fields: ['address_components', 'geometry'],
            });


            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();

                if (!place.geometry || !place.geometry.location) {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }

                const addressDetails = parseAddress(place)

                console.log(addressDetails)

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                }
            });
        });

        return () => {
            const elements = document.getElementsByClassName('pac-container');

            if (elements[0]) {
                elements[0].remove()
            }
        }
    }, []);


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
                            <div>
                                <input id='step-1-autocomplete' placeholder='Enter your address' />
                            </div>
                            <div id='step-1-map'></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Step1Location;
