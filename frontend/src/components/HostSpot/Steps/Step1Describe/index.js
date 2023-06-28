import indoor from '../../../../images/descriptions/description-indoor.png';
import outdoor from '../../../../images/descriptions/description-outdoor.png';
import stadium from '../../../../images/descriptions/description-stadium.png';
import gym from '../../../../images/descriptions/description-gym.png';
import blacktop from '../../../../images/descriptions/description-blacktop.png';
import wood from '../../../../images/descriptions/description-wood.png';
import concrete from '../../../../images/descriptions/description-concrete.png';
import vinyl from '../../../../images/descriptions/description-vinyl.png';
import double from '../../../../images/descriptions/description-double.png';
import nylon from '../../../../images/descriptions/description-nylon.png';
import chain from '../../../../images/descriptions/description-chain.png';
import noNet from '../../../../images/descriptions/description-no-net.png';
import adjustable from '../../../../images/descriptions/description-adjustable.png';
import mini from '../../../../images/descriptions/description-mini.png';
import './Step1Describe.css';

const Step1Describe = () => {

    const descriptions = ['Indoor', 'Outdoor', 'Stadium', 'Gym', 'Blacktop', 'Wood',
        'Concrete', 'Vinyl', 'Double rim', 'Nylon net', 'Chain net', 'No net',
        'Adjustable hoop', 'Mini hoop'];

    return (
        <div className='host-step-1-describe-container'>
            <div className='host-step-1-describe-container-inner'>
                <div className='host-step-1-describe-top'>
                    <h1 className='host-step-1-describe-header'>Which of these best describes your&nbsp;court?</h1>
                </div>
                <div className='host-step-1-describe-bottom'>
                    <img src={indoor} style={{ width: '50px'}}/>
                    <img src={outdoor} style={{ width: '50px'}}/>
                    <img src={stadium} style={{ width: '50px'}}/>
                    <img src={gym} style={{ width: '50px'}}/>
                    <img src={blacktop} style={{ width: '50px'}}/>
                    <img src={wood} style={{ width: '50px'}}/>
                    <img src={concrete} style={{ width: '50px'}}/>
                    <img src={vinyl} style={{ width: '50px'}}/>
                    <img src={double} style={{ width: '50px'}}/>
                    <img src={nylon} style={{ width: '50px'}}/>
                    <img src={chain} style={{ width: '50px'}}/>
                    <img src={noNet} style={{ width: '50px'}}/>
                    <img src={adjustable} style={{ width: '50px'}}/>
                    <img src={mini} style={{ width: '50px'}}/>
                </div>
            </div>
        </div>
    );
};

export default Step1Describe;
