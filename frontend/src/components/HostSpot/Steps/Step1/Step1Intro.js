import courtAnimation from '../../../../images/basketball-court.mp4';
import './Step1Intro.css';

const Step1Intro = () => {


    return (
        <div className='host-step-1-intro-container'>
            <div className='host-step-1-intro-container-inner'>
                <div className='host-step-1-intro-left'>
                    <div className='host-step-1-intro-left-main-header'>Step 1</div>
                    <h1 className='host-step-1-intro-left-sub-header'>
                        Tell us about your&nbsp;court
                    </h1>
                    <div className='host-step-1-intro-left-info'>
                        In this step, we'll ask you which type of property you have
                        and if guests will book the entire court or just a portion. Then
                        let us know the location.
                    </div>
                </div>
                <div className='host-step-1-intro-right'>
                    <div className='host-step-1-intro-right-main'>
                        <video className='basketball-court-animation' autoPlay playsInline preload='auto' muted>
                            <source type='video/mp4' src={courtAnimation} />
                        </video>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step1Intro;
