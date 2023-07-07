import { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import check from '../../../../images/check-mark.svg';
import './Step1Location.css';
import './LocationConfirm.css';

const LocationConfirm = ({
    locationStep, setLocationStep, address, setAddress,
    city, setCity, state, setState, zipcode, setZipcode,
    country, setCountry, lat, setLat, lng, setLng }) => {

    const googleMap = useRef(null);
    const storedLat = useRef(lat);
    const storedLng = useRef(lng);
    const isFirstRender = useRef(true);

    const [checked, setChecked] = useState(false);
    // const [approxLocation, approxLocation] =


    useEffect(() => {
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

            // zoom 15 if they want to show specific
            // zoom 13 if they want to show approximate
            const map = new Map(document.getElementById('step-1-confirm-map'), {
                center: { lat: storedLat.current, lng: storedLng.current },
                zoom: 13,
                gestureHandling: 'none',
                zoomControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                mapTypeControl: false,
                keyboardShortcuts: false,
                clickableIcons: false,
                mapTypeControlOptions: {
                    mapTypeIds: [window.google.maps.MapTypeId.ROADMAP, 'hide_feats']
                }
            });

            googleMap.current = map;

            map.mapTypes.set('hide_feats', hideFeaturesMapType);
            map.setMapTypeId('hide_feats');

            const marker = new window.google.maps.Marker({
                position: { lat: storedLat.current, lng: storedLng.current },
                map: map,
            });
        });
    }, [])

    useEffect(() => {
        const rateLimitGeocoder = () => {
            let fullAddress = '';

            if (address) {
                fullAddress += `${address}, `;
            };
            if (city) {
                fullAddress += `${city}, `;
            };
            if (state) {
                fullAddress += `${state}, `;
            };

            const geocoder = new window.google.maps.Geocoder();

            const geocoderRequest = {
                address: fullAddress,
                componentRestrictions: {
                    country,
                }
            };

            geocoder.geocode(geocoderRequest, (results, status) => {
                if (status === 'OK') {
                    // Geocoding was successful
                    if (results[0]) {
                        // Access the first result
                        const location = results[0].geometry.location;
                        const latitude = location.lat();
                        const longitude = location.lng();

                        if (storedLat.current === latitude && storedLng.current === longitude) {
                            return;
                        };

                        googleMap.current.setCenter(location);

                        setLat(location.lat());
                        setLng(location.lng());
                    };
                };
            });
        };


        if (isFirstRender.current) {
            rateLimitGeocoder();
            return;
        }

        const timeoutId = setTimeout(rateLimitGeocoder, 3000);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [address, city, country, state, zipcode, setLat, setLng]);

    const handleSwitch = () => {
        if (googleMap.current) {
            if (checked) {
                googleMap.current.setZoom(15);
            } else {
                googleMap.current.setZoom(13);
            };
        };

        setChecked(!checked);
    };


    return (
        <div className='host-step-1-location-container'>
            <div className='host-step-1-location-container-inner'>
                <div className='host-step-1-location-top'>
                    <h1 className='host-step-1-location-header'>Confirm your address</h1>
                    <div className='host-step-1-location-subheader'>
                        Your address is only shared with guests after they've made a reservation.
                    </div>
                </div>
                <div className='host-step-1-location-bottom'>
                    <div className='host-step-1-location-main'>
                        <div>
                            <div className='location-confirm-country-container'>
                                <label className='location-confirm-country' htmlFor='countryCode'>
                                    <div className='location-confirm-header-shrink'>
                                        <div className='location-confirm-header-text'>Country / Region</div>
                                    </div>
                                    <select id='countryCode' value={country} onChange={(e) => setCountry(e.target.value)}>
                                        <option value='United States' className='country-code-option'>
                                            United States - US
                                        </option>
                                        <option value='Canada' className='country-code-option'>
                                            Canada - CA
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div className='location-confirm-combined-container'>
                                <div className='location-confirm-combined-item-1'>
                                    <label className='location-confirm-combined' htmlFor='street'>
                                        <div className={address ? 'location-confirm-header-shrink' : 'location-confirm-header-enlarge'}>
                                            <div className='location-confirm-header-text'>Street address</div>
                                        </div>
                                        <input id='street' value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </label>
                                </div>
                                <div className='location-confirm-combined-item-2'>
                                    <label className='location-confirm-combined' htmlFor='city'>
                                        <div className={city ? 'location-confirm-header-shrink' : 'location-confirm-header-enlarge'}>
                                            <div className='location-confirm-header-text'>City</div>
                                        </div>
                                        <input id='city' value={city} onChange={(e) => setCity(e.target.value)} />
                                    </label>
                                </div>
                                <div className='location-confirm-combined-item-3'>
                                    <label className='location-confirm-combined' htmlFor='state'>
                                        <div className={state ? 'location-confirm-header-shrink' : 'location-confirm-header-enlarge'}>
                                            <div className='location-confirm-header-text'>State</div>
                                        </div>
                                        <input id='state' value={state} onChange={(e) => setState(e.target.value)} />
                                    </label>
                                </div>
                                <div className='location-confirm-combined-item-4'>
                                    <label className='location-confirm-combined' htmlFor='zipcode'>
                                        <div className={zipcode ? 'location-confirm-header-shrink' : 'location-confirm-header-enlarge'}>
                                            <div className='location-confirm-header-text'>Zipcode</div>
                                        </div>
                                        <input id='zipcode' value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
                                    </label>
                                </div>
                                <div className='location-confirm-border-1' />
                                <div className='location-confirm-border-2' />
                                <div className='location-confirm-border-3' />
                            </div>
                        </div>
                        <div className='location-confirm-map-container'>
                            <div className='toggle-location-preference'>
                                <div className='toggle-location-preference-text-box'>
                                    <div className='toggle-location-preference-header'>
                                        Show your specific location
                                    </div>
                                    <div className='toggle-location-preference-info'>
                                        Make it clear to guests where your place is located.
                                        We'll only share your address after they've made a reservation.
                                    </div>
                                </div>
                                <button className={checked ? 'location-preference-toggle-on' : 'location-preference-toggle-off'} onClick={handleSwitch}>
                                    <div className={checked ? 'toggle-switch-circle-on' : 'toggle-switch-circle-off'}>
                                        {checked &&
                                            <img className='toggle-check-mark' src={check} alt='check mark' />
                                        }
                                    </div>
                                </button>
                            </div>
                            <div id='step-1-confirm-map'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationConfirm;
