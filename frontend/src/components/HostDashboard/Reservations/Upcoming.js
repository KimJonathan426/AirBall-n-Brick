import reservationIcon from '../../../images/reservation-icon.svg';

const Upcoming = ({ reservations }) => {
    return (
        reservations.length > 0 ?
            <div>
                Yes
            </div>
            :
            <div className='reservation-empty-container'>
                <div className='reservation-empty-main'>
                    <img className='reservation-empty-icon' src={reservationIcon} alt='empty page with check mark' />
                    You currently don't have any upcoming guests.
                </div>
            </div>
    )
}

export default Upcoming;
