import loadingGif from '../../images/host-court-loading.gif';
import './Loading.css';

const Loading = () => {

    return (
        <>
            <div className='loading-container'>
                <img className='loading-gif' src={loadingGif} alt='loading...' />
            </div>
        </>
    )
}

export default Loading;
