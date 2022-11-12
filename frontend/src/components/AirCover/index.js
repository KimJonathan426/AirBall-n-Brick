import airCover from '../../images/aircover.webp';
import './AirCover.css';

const AirCover = () => {

    return (
        <div className='air-cover-container content-divider'>
            <img className='air-cover' src={airCover} alt='air cover'/>
            <div>
                Every booking includes free protection from Host cancellations,
                listing inaccuracies, and other issues like trouble checking in.
            </div>
        </div>
    )
}

export default AirCover;
