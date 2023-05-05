import reservationIcon from '../../../images/reservation-icon.svg';

const CurrentlyHosting = ({ reservations }) => {
    return (
        reservations.length > 0 ?
            <div>
                Yes
            </div>
            :
            <div className='reservation-empty-container'>
                <div className='reservation-empty-main'>
                    <img className='reservation-empty-icon' src={reservationIcon} alt='empty page with check mark' />
                    You don't have any guests staying with you right now.
                </div>
            </div>
    )
}

export default CurrentlyHosting;
