import courtAnimation from '../../../../images/court-animations/step-3-court.mp4';
import './StepIntros.css';

const Step3Intro = () => {


    return (
        <div className='host-step-intro-container'>
            <div className='host-step-intro-container-inner'>
                <div className='host-step-intro-left'>
                    <div className='host-step-intro-left-main-header'>Step 3</div>
                    <h1 className='host-step-intro-left-sub-header'>
                        Finish up and publish
                    </h1>
                    <div className='host-step-intro-left-info'>
                        Finally, you'll set your daily price.
                        Take a second to review your court details and publish when you're ready.
                    </div>
                </div>
                <div className='host-step-intro-right'>
                    <div className='host-step-intro-right-main'>
                        <video className='basketball-court-animation' autoPlay playsInline preload='auto' muted>
                            <source type='video/mp4' src={courtAnimation} />
                        </video>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step3Intro;
