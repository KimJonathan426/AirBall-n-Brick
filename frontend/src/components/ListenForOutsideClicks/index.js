export default function listenForOutsideClicks(
  listening,
  setListening,
  bookingRef,
  setIsOpen
) {
  return () => {
    if (listening) return;
    if (!bookingRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const cur = bookingRef.current;
        const node = evt.target;
        if (cur?.contains(node)) return;
        setIsOpen(false);
      });
    });
  };
}
