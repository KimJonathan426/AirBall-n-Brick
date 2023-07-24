import full from '../../../../images/types/type-full.png';
import half from '../../../../images/types/type-half.png';
import share from '../../../../images/types/type-share.png';
import '../Steps.css';
import './Step1Type.css';

const TypeEdit = ({ type, setType }) => {


    return (
        <div className='spot-edit-step-container'>
            <h1 className='spot-edit-step-header'>Type</h1>
            <div className='spot-edit-step-bottom'>
                <div className='spot-edit-type-main'>
                    <button className={type === 'full' ? 'spot-edit-type-btn-checked' : 'spot-edit-type-btn'} onClick={() => setType('full')}>
                        <div className='spot-edit-type-text'>
                            <h2 className='spot-edit-type-text-1'>An entire court</h2>
                            <div className='spot-edit-type-text-2'>Guests have the whole court to themselves.</div>
                        </div>
                        <div className='spot-edit-type-img-box'>
                            <img src={full} style={{ width: '37px' }} alt='basketball full court' />
                        </div>
                    </button>
                </div>
                <div className='spot-edit-type-main'>
                    <button className={type === 'half' ? 'spot-edit-type-btn-checked' : 'spot-edit-type-btn'} onClick={() => setType('half')}>
                        <div className='spot-edit-type-text'>
                            <h2 className='spot-edit-type-text-1'>A half court</h2>
                            <div className='spot-edit-type-text-2'>Guests have their own half in a court, plus access to shared spaces.</div>
                        </div>
                        <div className='spot-edit-type-img-box'>
                            <img src={half} style={{ width: '35px', transform: 'rotate(90deg)' }} alt='basketball half court' />
                        </div>
                    </button>
                </div>
                <div className='spot-edit-type-main'>
                    <button className={type === 'share' ? 'spot-edit-type-btn-checked' : 'spot-edit-type-btn'} onClick={() => setType('share')}>
                        <div className='spot-edit-type-text'>
                            <h2 className='spot-edit-type-text-1'>A shared court</h2>
                            <div className='spot-edit-type-text-2'>Guests play in a court or common area that may be shared with you or others.</div>
                        </div>
                        <div className='spot-edit-type-img-box'>
                            <img src={share} style={{ width: '38px' }} alt='basketball court with two people' />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TypeEdit;
