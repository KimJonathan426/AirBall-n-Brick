import React from 'react';
import './PageNotFound.css'

const PageNotFound = () => {

    return (
        <div className='page-not-found-container'>
            <div className='not-found-main'>
                <div className='not-found-text'>
                    <h1>
                        Oops!
                    </h1>
                    <h2>
                        You traveled to a non-existent page.
                        Avoid this violation by going to a valid page!
                    </h2>
                    <h3>
                        Error code: 404
                    </h3>
                </div>
                <div className='not-found-image'>
                    <img className='travel-image' src='https://airballnbrick.s3.amazonaws.com/NBA+Travel+Violation.png' alt='referee travel violation call' />
                </div>
            </div>
        </div>
    )
}

export default PageNotFound;
