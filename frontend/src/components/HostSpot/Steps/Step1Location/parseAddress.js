export function parseAddress(place) {
    const addressNameFormat = {
        'address': '',
        'street_number': '',
        'route': '',
        'locality': '',
        'administrative_area_level_1': '',
        'country': '',
        'country_abre': '',
        'postal_code': '',
        'lat': '',
        'lng': ''
    };

    for (const component of place.address_components) {
        const addressType = component.types[0];

        // eslint-disable-next-line
        switch (addressType) {
            case 'street_number':
                addressNameFormat[addressType] = component['short_name'];
                break;
            case 'route':
                addressNameFormat[addressType] = component['long_name'];
                break;
            case 'locality':
                addressNameFormat[addressType] = component['long_name'];
                break;
            case 'administrative_area_level_1':
                addressNameFormat[addressType] = component['long_name'];
                break;
            case 'country':
                addressNameFormat[addressType] = component['long_name'];
                addressNameFormat['country_abre'] = component['short_name'];
                break;
            case 'postal_code':
                addressNameFormat[addressType] = component['short_name'];
                break;
            case 'postal_code_prefix':
                addressNameFormat['postal_code'] = component['short_name'];
                break;
        };
    };


    if (addressNameFormat['street_number']) {
        addressNameFormat['address'] = `${addressNameFormat['street_number']} ${addressNameFormat['route']}`;
    } else if (addressNameFormat['route']) {
        addressNameFormat['address'] = `${addressNameFormat['route']}`;
    };

    addressNameFormat['lat'] = place.geometry.location.lat();
    addressNameFormat['lng'] = place.geometry.location.lng();

    return addressNameFormat;
};
