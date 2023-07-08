import { useEffect, useState, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import generalMarker from '../../../../images/location-marker-general.svg';
import exactMarker from '../../../../images/location-marker-exact.svg';
import check from '../../../../images/check-mark.svg';
import LocationAlert from './LocationAlert';
import './Step1Location.css';
import './LocationConfirm.css';

const LocationConfirm = ({
    showSpecific, setShowSpecific, address, setAddress,
    city, setCity, state, setState, zipcode, setZipcode,
    country, setCountry, lat, setLat, lng, setLng,
    isFinalCheck, setIsFinalCheck, setLocationStep }) => {

    const googleMap = useRef(null);
    const googleMarker = useRef(null);
    const googleCircle = useRef(null);
    const storedLat = useRef(lat);
    const storedLng = useRef(lng);
    const showSpecificRef = useRef(showSpecific);
    const isFirstRender = useRef(true);

    const [randomLat,] = useState(Math.random() * 0.012 - 0.006);
    const [randomLng,] = useState(Math.random() * 0.012 - 0.006);

    const [alert, setAlert] = useState(false);

    // update reference without it being necessary in larger useEffect dependency array
    useEffect(() => {
        showSpecificRef.current = showSpecific;
    }, [showSpecific])
    useEffect(() => {
        storedLat.current = lat;
        storedLng.current = lng;
    }, [lat, lng])

    useEffect(() => {
        const loader = new Loader({
            apiKey: process.env.REACT_APP_GOOGLE_PLACES_API,
            version: 'weekly',
            libraries: ['places', 'geocoding']
        });

        loader.importLibrary('maps').then(({ Map }) => {

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

            let options = {};

            if (showSpecificRef.current) {
                options['origin'] = { lat: storedLat.current, lng: storedLng.current };
                options['zoom'] = 15;
                options['animation'] = window.google.maps.Animation.BOUNCE;
                options['icon'] = {
                    url: exactMarker,
                    scaledSize: new window.google.maps.Size(74, 74),
                };
                options['radius'] = 0;
            } else {
                options['origin'] = { lat: storedLat.current + randomLat, lng: storedLng.current + randomLng };
                options['zoom'] = 13;
                options['animation'] = null;
                options['icon'] = {
                    url: generalMarker,
                    scaledSize: new window.google.maps.Size(74, 74),
                    anchor: new window.google.maps.Point(37, 37),
                };
                options['radius'] = 900;
            };

            const map = new Map(document.getElementById('step-1-confirm-map'), {
                center: options['origin'],
                zoom: options['zoom'],
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
                position: options['origin'],
                map: map,
                animation: options['animation'],
                icon: options['icon'],
            });

            googleMarker.current = marker;

            const markerCircle = new window.google.maps.Circle({
                center: options['origin'],
                map: map,
                radius: options['radius'],
                strokeOpacity: 0,
                fillColor: '#FF5F15',
                fillOpacity: 0.20,
            })

            googleCircle.current = markerCircle;

        });
    }, [randomLat, randomLng])

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
                },
            };

            geocoder.geocode(geocoderRequest, (results, status) => {
                if (status === 'OK') {
                    // Geocoding was successful

                    // If there are country restrictions, there will always be a result
                    // with the country itself being the highest level.
                    // if the result equals the country, this will count as no response.
                    if (results[0] && isFinalCheck && (results[0].formatted_address === 'United States' ||
                        results[0].formatted_address === 'Canada')) {
                        setIsFinalCheck(false);
                        setAlert(true);
                    } else if (results[0]) {
                        // Access the first result
                        const location = results[0].geometry.location;
                        const latitude = location.lat();
                        const longitude = location.lng();

                        if (isFinalCheck) {
                            setIsFinalCheck(false);
                            setLat(latitude);
                            setLng(longitude);
                            setLocationStep((prev) => prev + 1);
                        }

                        // If its the same location, no need to continue
                        if (storedLat.current === latitude && storedLng.current === longitude) {
                            return;
                        };

                        if (showSpecificRef.current) {
                            googleCircle.current.setCenter({ lat: latitude + randomLat, lng: longitude + randomLng })
                            googleMarker.current.setPosition({ lat: latitude, lng: longitude })
                            googleMap.current.setCenter({ lat: latitude, lng: longitude });
                        } else {
                            googleCircle.current.setCenter({ lat: latitude + randomLat, lng: longitude + randomLng })
                            googleMarker.current.setPosition({ lat: latitude + randomLat, lng: longitude + randomLng })
                            googleMap.current.setCenter({ lat: latitude + randomLat, lng: longitude + randomLng });
                        }

                        setLat(latitude);
                        setLng(longitude);
                    };
                };
            });
        };


        if (isFirstRender.current) {
            isFirstRender.current = false;
            rateLimitGeocoder();
            return;
        }

        if (isFinalCheck) {
            rateLimitGeocoder();
            return;
        }

        const timeoutId = setTimeout(rateLimitGeocoder, 3000);

        return () => {
            clearTimeout(timeoutId);
        }
    }, [address, city, country, state, zipcode, setLat, setLng, randomLat, randomLng, isFinalCheck, setIsFinalCheck, setLocationStep]);

    const handleSwitch = () => {
        if (googleMap.current) {
            if (showSpecific) {
                googleMap.current.setCenter({ lat: lat + randomLat, lng: lng + randomLng });
                googleMap.current.setZoom(13);

                googleMarker.current.setOptions({ animation: null });
                googleMarker.current.setPosition({ lat: lat + randomLat, lng: lng + randomLng });
                googleMarker.current.setIcon({
                    url: generalMarker,
                    scaledSize: new window.google.maps.Size(74, 74),
                    anchor: new window.google.maps.Point(37, 37),
                });

                googleCircle.current.setRadius(900);
            } else {
                googleMap.current.setCenter({ lat: lat, lng: lng });
                googleMap.current.setZoom(15);

                googleMarker.current.setOptions({ animation: window.google.maps.Animation.BOUNCE });
                googleMarker.current.setPosition({ lat: lat, lng: lng });
                googleMarker.current.setIcon({
                    url: exactMarker,
                    scaledSize: new window.google.maps.Size(74, 74),
                });

                googleCircle.current.setRadius(0);
            };
        };

        setShowSpecific(!showSpecific);
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
                                <button className={showSpecific ? 'location-preference-toggle-on' : 'location-preference-toggle-off'} onClick={handleSwitch}>
                                    <div className={showSpecific ? 'toggle-switch-circle-on' : 'toggle-switch-circle-off'}>
                                        {showSpecific &&
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
            {alert &&
                <LocationAlert alert={alert} setAlert={setAlert} />
            }
        </div>
    );
};

export default LocationConfirm;
