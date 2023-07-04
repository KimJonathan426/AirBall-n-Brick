export function parseAddress(place) {
    const addressNameFormat = {
        'address': '',
        'street_number': 'short_name',
        'route': 'long_name',
        'locality': 'long_name',
        'administrative_area_level_1': 'short_name',
        'country': 'long_name',
        'country_abre': 'short_name',
        'postal_code': 'short_name',
    };

    for (const component of place.address_components) {
        const addressType = component.types[0];

        if (addressType === 'country') {
            addressNameFormat['country_abre'] = component[addressNameFormat['country_abre']];
        }

        if (addressType in addressNameFormat) {
            addressNameFormat[addressType] = component[addressNameFormat[addressType]];
        };
    };


    if (addressNameFormat['street_number'] !== 'short_name') {
        addressNameFormat['address'] = `${addressNameFormat['street_number']} ${addressNameFormat['route']}`;
    } else if (addressNameFormat['route'] !== 'long_name') {
        addressNameFormat['address'] = `${addressNameFormat['route']}`;
    }

    return addressNameFormat;
};
