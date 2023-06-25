import courtAnimation from '../../../../images/basketball-court.mp4';
import './Step1Intro.css';

const Step1Intro = () => {

    return (
        <div className='host-step-1-intro-container'>
            <div className='host-step-1-intro-container-inner'>
                <div className='host-step-1-intro-left'>
                    <div className='host-step-1-intro-left-main-header'>Step 1</div>
                    <h1 className='host-step-1-intro-left-sub-header'>
                        Tell us about your&nbsp;place
                    </h1>
                    <div className='host-step-1-intro-left-info'>
                        In this step, we'll ask you which type of property you have
                        and if guests will book the entire place or just a room. Then
                        let us know the location and how many guests can stay.
                    </div>
                </div>
                <div className='host-step-1-intro-right'>
                    <div className='host-step-1-intro-right-main'>
                        <video className='basketball-court-animation' autoplay='autoplay' playsinline preload='auto' muted>
                            <source type='video/mp4' src={courtAnimation} />
                        </video>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step1Intro;
