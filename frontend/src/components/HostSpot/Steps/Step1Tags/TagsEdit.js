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
        <div className='spot-edit-tags-container'>
            <h1 className='spot-edit-tags-header'>Tags</h1>
            <div className='spot-edit-tags-bottom'>
                {tagCombos.map(option => (
                    <div key={option.id}>
                        <button className={tags.has(option.name) ? 'spot-edit-tags-btn-checked' : 'spot-edit-tags-btn'} onClick={() => handleClick(option.name)}>
                            <img src={option.url} style={{ width: '15px', marginRight: '8px' }} alt='icon' />
                            <div className='spot-edit-tags-text'>{option.name}</div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagsEdit;
