import { useState } from 'react';

const HomeImages = ({ images }) => {

    const [showImage1, setShowImage1] = useState(true);
    const [showImage2, setShowImage2] = useState(false);
    const [showImage3, setShowImage3] = useState(false);
    const [showImage4, setShowImage4] = useState(false);
    const [showImage5, setShowImage5] = useState(false);

    const switchImageBackward = (e) => {
        e.preventDefault();

        switch (true) {
            case showImage1:
                setShowImage1(false);
                setShowImage2(false);
                setShowImage3(false);
                setShowImage4(false);
                setShowImage5(true);
                break;
            case showImage2:
                setShowImage1(true);
                setShowImage2(false);
                setShowImage3(false);
                setShowImage4(false);
                setShowImage5(false);
                break;
            case showImage3:
                setShowImage1(false);
                setShowImage2(true);
                setShowImage3(false);
                setShowImage4(false);
                setShowImage5(false);
                break;
            case showImage4:
                setShowImage1(false);
                setShowImage2(false);
                setShowImage3(true);
                setShowImage4(false);
                setShowImage5(false);
                break;
            case showImage5:
                setShowImage1(false);
                setShowImage2(false);
                setShowImage3(false);
                setShowImage4(true);
                setShowImage5(false);
                break;
            default:
                setShowImage1(true);
                setShowImage2(false);
                setShowImage3(false);
                setShowImage4(false);
                setShowImage5(false);
                break;
        }
    }

    const switchImageForward = (e) => {
        e.preventDefault();

        switch (true) {
            case showImage1:
                setShowImage1(false);
                setShowImage2(true);
                setShowImage3(false);
                setShowImage4(false);
                setShowImage5(false);
                break;
            case showImage2:
                setShowImage1(false);
                setShowImage2(false);
                setShowImage3(true);
                setShowImage4(false);
                setShowImage5(false);
                break;
            case showImage3:
                setShowImage1(false);
                setShowImage2(false);
                setShowImage3(false);
                setShowImage4(true);
                setShowImage5(false);
                break;
            case showImage4:
                setShowImage1(false);
                setShowImage2(false);
                setShowImage3(false);
                setShowImage4(false);
                setShowImage5(true);
                break;
            case showImage5:
                setShowImage1(true);
                setShowImage2(false);
                setShowImage3(false);
                setShowImage4(false);
                setShowImage5(false);
                break;
            default:
                setShowImage1(true);
                setShowImage2(false);
                setShowImage3(false);
                setShowImage4(false);
                setShowImage5(false);
                break;
        }
    }


    return (
        <div className='spot-image'>
            <img className={showImage1 ? 'center' : 'center hide-image'} src={images[0].url} />
            <img className={showImage2 ? 'center' : 'center hide-image'} src={images[1].url} />
            <img className={showImage3 ? 'center' : 'center hide-image'} src={images[2].url} />
            <img className={showImage4 ? 'center' : 'center hide-image'} src={images[3].url} />
            <img className={showImage5 ? 'center' : 'center hide-image'} src={images[4].url} />
            <button onClick={switchImageBackward} className='left-arrow'><span>❮</span></button>
            <button onClick={switchImageForward} className='right-arrow'><span>❯</span></button>
        </div>
    )
}

export default HomeImages;
