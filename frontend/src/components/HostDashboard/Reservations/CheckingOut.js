import reservationIcon from '../../../images/reservation-icon.svg';

const CheckingOut = ({ reservations }) => {
    return (
        reservations.length > 0 ?
            <div>
                Yes
            </div>
            :
            <div className='reservation-empty-container'>
                <div className='reservation-empty-main'>
                    <img className='reservation-empty-icon' src={reservationIcon} alt='empty page with check mark' />
                    You don't have any guests checking out today or tomorrow.
                </div>
            </div>
    )
}

export default CheckingOut;