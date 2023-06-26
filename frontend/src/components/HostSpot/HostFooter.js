import './HostSpot.css';

const HostFooter = ({ step, setStep }) => {


    return (
        <>
            {step == 0 ?
                <div className='host-spot-start'>
                    <button onClick={() => setStep(step + 1)} className='host-spot-start-btn'>Get Started</button>
                </div>
                :
                <>
                    <div className='host-spot-footer-progress'>
                        <div className='host-spot-footer-progress-bar'>
                            <div className='footer-progress-bar-highlight'
                                style={{ transition: 'transform 600ms linear 0s', transform: 'translateX(0%)' }} />
                        </div>
                        <div className='host-spot-footer-progress-bar'>
                            <div className='footer-progress-bar-highlight'
                                style={{ transition: 'transform 600ms linear 0s', transform: 'translateX(0%)' }} />
                        </div>
                        <div className='host-spot-footer-progress-bar'>
                            <div className='footer-progress-bar-highlight'
                                style={{ transition: 'transform 600ms linear 0s', transform: 'translateX(0%)' }} />
                        </div>
                    </div>
                    <div className='host-spot-footer-step'>
                        <button onClick={() => setStep(step - 1)} className='host-spot-back-btn'>Back</button>
                        <button onClick={() => setStep(step + 1)} className='host-spot-next-btn'>Next</button>
                    </div>
                </>
                }
        </>
    )
}

export default HostFooter;
