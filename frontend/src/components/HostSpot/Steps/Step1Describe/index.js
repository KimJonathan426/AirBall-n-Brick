import { useState } from 'react';
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

const Step1Describe = ({ tags, setTags }) => {

    const [delayed,] = useState(500);
    const [descriptions,] = useState([['Indoor', indoor], ['Outdoor', outdoor], ['Stadium', stadium],
    ['Gym', gym], ['Blacktop', blacktop], ['Wood', wood], ['Concrete', concrete],
    ['Vinyl', vinyl], ['Double rim', double], ['Nylon net', nylon], ['Chain net', chain],
    ['No net', netless], ['Adjustable hoop', adjustable], ['Mini hoop', mini]]);

    const handleClick = (value) => {
        if (tags.has(value)) {
            setTags(prev => {
                prev.delete(value);
                return new Set(prev);
            });
        } else {
            setTags(prev => new Set(prev.add(value)));
        };
    };


    return (
        <div className='host-step-1-describe-container'>
            <div className='host-step-1-describe-container-inner'>
                <div className='host-step-1-describe-top'>
                    <h1 className='host-step-1-describe-header'>Which of these best describes your&nbsp;court?</h1>
                </div>
                <div className='host-step-1-describe-bottom'>
                    {descriptions.map((option, i) => (
                        <div key={option[0]} className='host-step-1-describe-main' style={{ animationDelay: `${delayed * (1.00 + (.11 - .0027 * i) * i)}ms` }}>
                            <button className={tags.has(option[0]) ? 'host-step-1-describe-btn-checked' : 'host-step-1-describe-btn'} onClick={() => handleClick(option[0])}>
                                <div style={{ height: '45px' }}>
                                    <img src={option[1]} style={{ width: '35px' }} alt='icon' />
                                </div>
                                <div className='host-step-1-describe-text'>{option[0]}</div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Step1Describe;
