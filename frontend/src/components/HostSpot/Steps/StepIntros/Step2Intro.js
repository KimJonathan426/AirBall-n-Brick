import courtAnimation from '../../../../images/court-animations/step-2-court.mp4';
import './StepIntros.css';

const Step2Intro = () => {


    return (
        <div className='host-step-intro-container'>
            <div className='host-step-intro-container-inner'>
                <div className='host-step-intro-left step-2-left'>
                    <div className='host-step-intro-left-main-header'>Step 2</div>
                    <h1 className='host-step-intro-left-sub-header'>
                        Make your court stand&nbsp;out
                    </h1>
                    <div className='host-step-intro-left-info'>
                        In this step, you'll add some of the amenities your court
                        offers, plus 5 or more photos. Then, you'll create a title
                        and description
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

export default Step2Intro;
