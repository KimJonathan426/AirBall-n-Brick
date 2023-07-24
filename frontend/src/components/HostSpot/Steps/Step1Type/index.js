import full from '../../../../images/types/type-full.png';
import half from '../../../../images/types/type-half.png';
import share from '../../../../images/types/type-share.png';
import '../Steps.css';
import './Step1Type.css';

const Step1Type = ({ type, setType }) => {


    return (
        <div className='host-step-container-center'>
            <div className='host-step-container-inner-center'>
                <div className='host-step-top'>
                    <h1 className='host-step-header-only'>Which type of court will guests have?</h1>
                </div>
                <div className='host-step-1-type-bottom'>
                        <div className='host-step-1-type-main' style={{ animationDelay: '400ms' }}>
                            <button className={type === 'full' ? 'host-step-1-type-btn-checked' : 'host-step-1-type-btn'} onClick={() => setType('full')}>
                                <div className='host-step-1-type-text'>
                                    <h2 className='host-step-1-type-text-1'>An entire court</h2>
                                    <div className='host-step-1-type-text-2'>Guests have the whole court to themselves.</div>
                                </div>
                                <div className='host-step-1-type-img-box'>
                                    <img src={full} style={{ width: '37px' }} alt='basketball full court' />
                                </div>
                            </button>
                        </div>
                        <div className='host-step-1-type-main' style={{ animationDelay: '450ms' }}>
                            <button className={type === 'half' ? 'host-step-1-type-btn-checked' : 'host-step-1-type-btn'} onClick={() => setType('half')}>
                                <div className='host-step-1-type-text'>
                                    <h2 className='host-step-1-type-text-1'>A half court</h2>
                                    <div className='host-step-1-type-text-2'>Guests have their own half in a court, plus access to shared spaces.</div>
                                </div>
                                <div className='host-step-1-type-img-box'>
                                    <img src={half} style={{ width: '35px', transform: 'rotate(90deg)' }} alt='basketball half court' />
                                </div>
                            </button>
                        </div>
                        <div className='host-step-1-type-main' style={{ animationDelay: '500ms' }}>
                            <button className={type === 'share' ? 'host-step-1-type-btn-checked' : 'host-step-1-type-btn'} onClick={() => setType('share')}>
                                <div className='host-step-1-type-text'>
                                    <h2 className='host-step-1-type-text-1'>A shared court</h2>
                                    <div className='host-step-1-type-text-2'>Guests play in a court or common area that may be shared with you or others.</div>
                                </div>
                                <div className='host-step-1-type-img-box'>
                                    <img src={share} style={{ width: '38px' }} alt='basketball court with two people' />
                                </div>
                            </button>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Step1Type;
