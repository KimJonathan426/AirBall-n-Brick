import React from 'react';
import './PageNotFound.css'

const PageNotFound = () => {

    return (
        <div className='page-not-found'>
            <h4>
                *Whistle* Travel!!!
            </h4>
            <div>
                You traveled to a non-existent page.
                Avoid this violation by going to a valid path!
            </div>
            <h1>
                404
            </h1>
            <h1>
                Page Not Found
            </h1>
            <img className='travel-image' src='https://cdn.vox-cdn.com/thumbor/ij0Ng1FcLNz0sjQV6DWRVanCWjc=/0x294:2775x2144/1400x1050/filters:focal(0x294:2775x2144):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/45568342/459394688.0.jpg'></img>
        </div>
    )
}

export default PageNotFound;
