import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpots } from '../../store/spotReducer';

const SpotList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spot)

    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch]);

    const spotArray = Object.values(spots)

    return (
        <div>
            <h1>Spots</h1>
            <div>
                {spotArray.map(({id, name, price}) => (
                    <div key={id}>
                        {name} {id}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SpotList;
