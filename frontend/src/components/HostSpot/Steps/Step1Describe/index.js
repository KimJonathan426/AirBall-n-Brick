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
import netless from '../../../../images/descriptions/description-no-net.png';
import adjustable from '../../../../images/descriptions/description-adjustable.png';
import mini from '../../../../images/descriptions/description-mini.png';
import './Step1Describe.css';

const Step1Describe = () => {

    const descriptions = [['Indoor', 'indoor'], ['Outdoor', 'outdoor'], ['Stadium', 'stadium'],
    ['Gym', 'gym'], ['Blacktop', 'blacktop'], ['Wood', 'wood'], ['Concrete', 'concrete'],
    ['Vinyl', 'vinyl'], ['Double rim', 'double'], ['Nylon net', 'nylon'], ['Chain net', 'chain'],
    ['No net', 'netless'], ['Adjustable hoop', 'adjustable'], ['Mini hoop', 'mini']];


    return (
        <div className='host-step-1-describe-container'>
            <div className='host-step-1-describe-container-inner'>
                <div className='host-step-1-describe-top'>
                    <h1 className='host-step-1-describe-header'>Which of these best describes your&nbsp;court?</h1>
                </div>
                <div className='host-step-1-describe-bottom'>
                    <div className='host-step-1-describe-main'>
                        <button className='host-step-1-describe-btn'>
                            <div>
                                <img src={indoor} style={{ width: '35px' }} />
                    <img src={outdoor} style={{ width: '35px' }} />
                    <img src={stadium} style={{ width: '35px' }} />
                    <img src={gym} style={{ width: '35px' }} />
                    <img src={blacktop} style={{ width: '35px' }} />
                    <img src={wood} style={{ width: '35px' }} />
                    <img src={concrete} style={{ width: '35px' }} />
                    <img src={vinyl} style={{ width: '35px' }} />
                    <img src={double} style={{ width: '35px' }} />
                    <img src={nylon} style={{ width: '35px' }} />
                    <img src={chain} style={{ width: '35px' }} />
                    <img src={netless} style={{ width: '35px' }} />
                    <img src={adjustable} style={{ width: '35px' }} />
                    <img src={mini} style={{ width: '35px' }} />
                            </div>
                            <div>Test</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step1Describe;
