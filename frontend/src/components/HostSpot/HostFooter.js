import './HostSpot.css';

const HostFooter = ({ step, setStep }) => {


    return (
        <>
            {/* <div className='host-spot-start'>
                <button onClick={() => setStep(step + 1)} className='host-spot-start-btn'>Get Started</button>
            </div> */}

            <div className='host-spot-footer-progress'>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className='host-spot-footer-step'>
                <button onClick={() => setStep(step - 1)} className='host-spot-back-btn'>Back</button>
                <button onClick={() => setStep(step + 1)} className='host-spot-next-btn'>Next</button>
            </div>
        </>
    )
}

export default HostFooter;
