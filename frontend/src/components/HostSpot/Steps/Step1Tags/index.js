import { useEffect, useState } from 'react';
import { csrfFetch } from '../../../../store/csrf';
import '../Steps.css';
import './Step1Tags.css';

const Step1Tags = ({ tags, setTags }) => {

    const [delayed,] = useState(500);
    const [tagCombos, setTagCombos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await csrfFetch('/api/tags');

            if (response.ok) {
                const data = await response.json();
                setTagCombos(data.tags);
            };
        };

        fetchData();
    }, []);


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
                        <div key={option.id} className='host-step-1-tags-main' style={{ animationDelay: `${delayed * (1.00 + (.11 - .0027 * i) * i)}ms` }}>
                            <button className={tags.has(option.name) ? 'host-step-1-tags-btn-checked' : 'host-step-1-tags-btn'} onClick={() => handleClick(option.name)}>
                                <div style={{ height: '45px' }}>
                                    <img src={option.url} style={{ width: '35px' }} alt='icon' />
                                </div>
                                <div className='host-step-1-tags-text'>{option.name}</div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Step1Tags;
