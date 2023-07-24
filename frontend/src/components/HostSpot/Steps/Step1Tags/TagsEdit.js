import { useEffect, useState } from 'react';
import { csrfFetch } from '../../../../store/csrf';
import '../Steps.css';
import './Step1Tags.css';

const TagsEdit = ({ tags, setTags }) => {

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
        <div className='spot-edit-step-container'>
            <h1 className='spot-edit-step-header'>Tags</h1>
            <div className='spot-edit-step-bottom'>
                {tagCombos.map(option => (
                    <div key={option.id}>
                        <button className={tags.has(option.name) ? 'spot-edit-step-btn-checked' : 'spot-edit-step-btn'} onClick={() => handleClick(option.name)}>
                            <img src={option.url} style={{ width: '15px', marginRight: '8px' }} alt='icon' />
                            <div className='spot-edit-step-text'>{option.name}</div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagsEdit;
