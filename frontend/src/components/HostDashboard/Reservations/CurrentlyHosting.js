import reservationIcon from '../../../images/reservation-icon.svg';

const CurrentlyHosting = ({ reservations }) => {
    return (
        reservations.length > 0 ?
            <div className='reservation-display'>
                {reservations.map((reservation) => (
                    <div key={reservation.id} className='hosted-reservation'>
                        <div className='hosted-reservation-container'>
                            <div className='hosted-reservation-info'>
                                <div className='hosted-reservation-info-inner'>
                                    <strong>Check-in</strong>
                                    <span>{reservation.startDate}</span>
                                </div>
                                <div className='hosted-reservation-info-inner'>
                                    <strong>Check-out</strong>
                                    <span>Row4</span>
                                </div>
                            </div>
                            <div className='hosted-reservation-image-container'>
                                <img className='hosted-reservation-image' src={reservation.url} alt='reservation spot'/>
                            </div>
                        </div>
                        <div className='hosted-reservation-footer'>Guest</div>
                    </div>
                ))}
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
