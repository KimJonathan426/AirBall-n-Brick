import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import locationPing from '../../../../images/location.svg';
import markerPin from '../../../../images/pins/marker-pin.svg';
import markerShadow from '../../../../images/pins/marker-shadow.svg';
import markerBasket from '../../../../images/pins/marker-basket.png';
import markerBasketball from '../../../../images/pins/marker-basketball.png';
import './LocationPin.css';
import './Step1Location.css';

const LocationPin = ({ address, city, state, zipcode, country, lat, lng, setLat, setLng }) => {

    const [initialLat, ] = useState(lat);
    const [initialLng, ] = useState(lng);
    const [pin, setPin] = useState('drop');

    useEffect(() => {
        let map;

        const loader = new Loader({
            apiKey: process.env.REACT_APP_GOOGLE_PLACES_API,
            version: 'weekly',
            libraries: ['places', 'geocoding']
        });

        loader.importLibrary('maps').then(async ({ Map }) => {

            const hideFeatures = [
                {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "administrative",
                    elementType: "labels",
                    stylers: [{ fontWeight: 'normal' }]
                },
                {
                    featureType: "administrative",
                    elementType: "labels.text.fill",
                    stylers: [{ color: '#818181' }]
                },
                {
                    featureType: "road.local",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "road.arterial",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "road.highway",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#FFFFFF" }]
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#C0C0C0" }]
                },
                {
                    featureType: "transit",
                    elementType: "labels.icon",
                    stylers: [{ visibility: "off" }],
                }
            ];

            const hideFeaturesMapType = new window.google.maps.StyledMapType(hideFeatures, { name: "HIDE FEATS" });

            map = new Map(document.getElementById('step-1-pin-map'), {
                center: { lat: initialLat, lng: initialLng },
                zoom: 15,
                zoomControl: true,
                zoomControlOptions: {
                    position: window.google.maps.ControlPosition.LEFT_BOTTOM,
                },
                scrollwheel: false,
                streetViewControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
                keyboardShortcuts: true,
                clickableIcons: false,
                mapTypeControlOptions: {
                    mapTypeIds: [window.google.maps.MapTypeId.ROADMAP, 'hide_feats']
                }
            });

            map.mapTypes.set('hide_feats', hideFeaturesMapType);
            map.setMapTypeId('hide_feats');

            map.addListener('dragstart', function () {
                setPin('lift');
            });

            map.addListener('dragend', function () {
                setPin('drop');
                setLat(map.getCenter().lat());
                setLng(map.getCenter().lng());
            });

        });

        return () => {
            if (map) {
                window.google.maps.event.clearInstanceListeners(map);
            };
        };
    }, [initialLat, initialLng, setLat, setLng]);


    return (
        <div className='host-step-1-location-container'>
            <div className='host-step-1-location-container-inner'>
                <div className='host-step-1-location-top'>
                    <h1 className='host-step-1-location-header'>Is the pin in the right spot?</h1>
                    <div className='host-step-1-location-subheader'>
                        Your address is only shared with guests after they've made a reservation.
                    </div>
                </div>
                <div className='host-step-1-location-bottom'>
                    <div className='host-step-1-location-main'>
                        <div className='static-autocomplete-container' >
                            <div className='step-1-locator-box'>
                                <img className='step-1-locator' src={locationPing} alt='locator ping' />
                            </div>
                            <div className='static-autocomplete'>{address}, {city}, {state}, {country}, {zipcode}</div>
                        </div>
                        <div id='step-1-pin-map'></div>
                        <div className='custom-google-marker'>
                                < img className={`animated-google-marker-shadow-${pin}`} src={markerShadow} alt='circle shadow' />
                                < img className={`animated-google-marker-pin-${pin}`} src={markerPin} alt='google map custom pin' />
                                < img className={`animated-google-marker-basketball-${pin}`} src={markerBasketball} alt='basketball' />
                                < img className={`animated-google-marker-basket-${pin}`} src={markerBasket} alt='basketball basket' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationPin;
