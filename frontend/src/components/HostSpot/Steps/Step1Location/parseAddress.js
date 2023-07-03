export function parseAddress(place) {
    const addressNameFormat = {
        'address': '',
        'street_number': 'short_name',
        'route': 'long_name',
        'locality': 'long_name',
        'administrative_area_level_1': 'short_name',
        'country': 'long_name',
        'postal_code': 'short_name',
    };

    for (const component of place.address_components) {
        const addressType = component.types[0];

        if (addressType in addressNameFormat) {
            addressNameFormat[addressType] = component[addressNameFormat[addressType]];
        };
    };

    addressNameFormat['address'] = `${addressNameFormat['street_number']} ${addressNameFormat['route']}`;

    return addressNameFormat;
};
