import { useState } from 'react';
import indoor from '../../../../images/tags/tag-indoor.png';
import outdoor from '../../../../images/tags/tag-outdoor.png';
import stadium from '../../../../images/tags/tag-stadium.png';
import gym from '../../../../images/tags/tag-gym.png';
import blacktop from '../../../../images/tags/tag-blacktop.png';
import wood from '../../../../images/tags/tag-wood.png';
import concrete from '../../../../images/tags/tag-concrete.png';
import vinyl from '../../../../images/tags/tag-vinyl.png';
import double from '../../../../images/tags/tag-double.png';
import nylon from '../../../../images/tags/tag-nylon.png';
import chain from '../../../../images/tags/tag-chain.png';
import netless from '../../../../images/tags/tag-no-net.png';
import adjustable from '../../../../images/tags/tag-adjustable.png';
import mini from '../../../../images/tags/tag-mini.png';
import '../Steps.css';
import './Step1Tags.css';

const Step1Tags = ({ tags, setTags }) => {

    const [delayed,] = useState(500);
    const [tagCombos,] = useState([['Indoor', indoor], ['Outdoor', outdoor], ['Stadium', stadium],
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
        <div className='host-step-container-start'>
            <div className='host-step-container-inner-start'>
                <div className='host-step-top'>
                    <h1 className='host-step-header-only'>Which of these best describes your&nbsp;court?</h1>
                </div>
                <div className='host-step-1-tags-bottom'>
                    {tagCombos.map((option, i) => (
                        <div key={option[0]} className='host-step-1-tags-main' style={{ animationDelay: `${delayed * (1.00 + (.11 - .0027 * i) * i)}ms` }}>
                            <button className={tags.has(option[0]) ? 'host-step-1-tags-btn-checked' : 'host-step-1-tags-btn'} onClick={() => handleClick(option[0])}>
                                <div style={{ height: '45px' }}>
                                    <img src={option[1]} style={{ width: '35px' }} alt='icon' />
                                </div>
                                <div className='host-step-1-tags-text'>{option[0]}</div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Step1Tags;
