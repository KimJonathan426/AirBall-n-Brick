import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import locationPing from '../../../../images/location.svg';
import './LocationPin.css';
import './Step1Location.css';

const LocationPin = ({ address, city, state, zipcode, country, lat, lng, setLat, setLng }) => {

    // create custom marker
    // adjust map settings to be able to adjust zoom, move around marker/center
    // get center of map/marker and update lat and lng with move

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
                center: { lat: lat, lng: lng },
                zoom: 15,
                zoomControl: true,
                zoomControlOptions: {
                    position: window.google.maps.ControlPosition.LEFT_BOTTOM,
                },
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

            const marker = new window.google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: map
            });

            map.addListener('center_changed', function () {
                marker.setPosition(map.getCenter());
            });

        });

        return () => {
            if (map) {
                window.google.maps.event.clearInstanceListeners(map);
            };
        }

    }, []);


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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationPin;
