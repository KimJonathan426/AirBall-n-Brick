import hoop from '../../../../images/basketball-hoop-3d.png';
import basketball from '../../../../images/basketball-3d.png';
import court from '../../../../images/basketball-court-3d.png';
import './HostSpotIntro.css';

const HostSpotIntro = () => {


    return (
        <div className='host-intro-container'>
            <div className='host-intro-container-inner'>
                <div className='host-intro-left'>
                    <h1 className='host-intro-left-header'>
                        It's easy to get started on Airbnb
                    </h1>
                </div>
                <div className='host-intro-right'>
                    <div className='host-intro-right-1'>
                        <div className='host-intro-right-side'>1</div>
                        <div className='host-intro-right-main'>
                            <h2 className='host-intro-right-main-header'>Tell us about your court</h2>
                            <h3 className='host-intro-right-main-info'>Share some basic info, like where it is and what the court is like.</h3>
                        </div>
                        <div className='host-intro-right-img-box'>
                            <img className='host-intro-right-img' src={hoop} alt='basketball hoop' />
                        </div>
                    </div>
                    <div className='host-intro-right-2'>
                    <div className='host-intro-right-side'>2</div>
                        <div className='host-intro-right-main'>
                            <h2 className='host-intro-right-main-header'>Make it stand out</h2>
                            <h3 className='host-intro-right-main-info'>Add 5 or more photos plus a title and description—we'll help you out.</h3>
                        </div>
                        <div className='host-intro-right-img-box'>
                            <img className='host-intro-right-img' src={basketball} alt='mesh basketball' />
                        </div>
                    </div>
                    <div className='host-intro-right-3'>
                    <div className='host-intro-right-side'>3</div>
                        <div className='host-intro-right-main'>
                            <h2 className='host-intro-right-main-header'>Finish up and publish</h2>
                            <h3 className='host-intro-right-main-info'>Finalize your court by setting a starting price and publish your listing.</h3>
                        </div>
                        <div className='host-intro-right-img-box'>
                            <img className='host-intro-right-img' src={court} alt='basketball court' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostSpotIntro;
