

const SpotImages = ({ images }) => {

    return (
        <div className='all-photos-modal-container animate-modal'>
            <div className='show-all-photos-container'>
                <div className='wrapper'>
                    {images.map(image =>
                        <div>
                            <img src={image.url} alt='spot image' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SpotImages;
