import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import generalMarker from '../../../images/location-marker-general.svg';
import exactMarker from '../../../images/location-marker-exact.svg';
import './SpotMap.css';

const SpotMap = ({ singleSpot }) => {

    const [randomLat,] = useState(Math.random() * 0.012 - 0.006);
    const [randomLng,] = useState(Math.random() * 0.012 - 0.006);

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

            if (singleSpot.showSpecific) {
                options['origin'] = { lat: singleSpot.lat, lng: singleSpot.lng };
                options['zoom'] = 15;
                options['icon'] = {
                    url: exactMarker,
                    scaledSize: new window.google.maps.Size(74, 74),
                };
                options['radius'] = 0;
            } else {
                options['origin'] = { lat: singleSpot.lat + randomLat, lng: singleSpot.lng + randomLng };
                options['zoom'] = 14;
                options['icon'] = {
                    url: generalMarker,
                    scaledSize: new window.google.maps.Size(74, 74),
                    anchor: new window.google.maps.Point(37, 37),
                };
                options['radius'] = 900;
            };

            const map = new Map(document.getElementById('single-spot-map'), {
                center: options['origin'],
                streetViewControl: true,
                streetViewControlOptions: {
                    position: window.google.maps.ControlPosition.RIGHT_TOP,
                },
                zoom: options['zoom'],
                zoomControl: true,
                zoomControlOptions: {
                    position: window.google.maps.ControlPosition.RIGHT_TOP,
                },
                scrollwheel: false,
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

            new window.google.maps.Marker({
                position: options['origin'],
                map: map,
                icon: options['icon'],
            });

            new window.google.maps.Circle({
                center: options['origin'],
                map: map,
                radius: options['radius'],
                strokeOpacity: 0,
                fillColor: '#FF5F15',
                fillOpacity: 0.20,
            })

        });

    }, [singleSpot.lat, singleSpot.lng, randomLat, randomLng, singleSpot.showSpecific]);

    return (
        <div className='single-spot-map-container'>
            <h2 className='single-spot-header'>Where you'll be</h2>
            <div className='single-spot-map-box'>
                <div id='single-spot-map'></div>
            </div>
            {singleSpot.showSpecific ?
                <h3 className='single-spot-map-address'>{singleSpot.address}, {singleSpot.city}, {singleSpot.state}, {singleSpot.zipcode}, {singleSpot.country}</h3>
                :
                <h3 className='single-spot-map-address'>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h3>
            }

        </div>
    );
};

export default SpotMap;
