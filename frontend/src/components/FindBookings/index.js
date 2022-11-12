const findBookings = (
    bookings,
    user,
    setPreviousBookings,
    setCurrentBookings,
    setUpcomingBookings
) => {
    const currentDate = new Date();
    const previous = []
    const current = [];
    const upcoming = [];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let booking of bookings) {
        if (user !== booking.userId) {
            continue;
        }

        const startDate = new Date(booking.startDate);
        const endDate = new Date(booking.endDate);
        endDate.setTime(endDate.getTime() + 23.9999 * 60 * 60 * 1000);

        const startDateDay = startDate.getDate();
        const startDateMonth = months[startDate.getMonth()];
        const startDateYear = startDate.getFullYear();
        const endDateDay = endDate.getDate();
        const endDateMonth = months[endDate.getMonth()];
        const endDateYear = endDate.getFullYear();

        let date = `${startDateMonth} ${startDateDay}–${endDateDay}, ${endDateYear}`;

        if (startDateYear !== endDateYear) {
            date = `${startDateMonth} ${startDateDay}, ${startDateYear} – ${endDateMonth} ${endDateDay}, ${endDateYear}`;
        } else if (startDateMonth !== endDateMonth) {
            date = `${startDateMonth} ${startDateDay}–${endDateMonth} ${endDateDay}, ${endDateYear}`;
        } else if (startDateDay === endDateDay) {
            date = `${startDateMonth} ${startDateDay}`;
        }

        booking['date'] = date;

        if (currentDate > endDate) previous.push(booking);
        else if (currentDate < startDate) upcoming.push(booking);
        else current.push(booking);
    }

    setPreviousBookings(previous);
    setCurrentBookings(current);
    setUpcomingBookings(upcoming);
};

export default findBookings
