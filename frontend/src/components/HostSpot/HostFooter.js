import './HostSpot.css';

const HostFooter = ({ step, setStep }) => {


    return (
        <>
            {/* <div className='host-spot-start'>
                <button onClick={() => setStep(step + 1)} className='host-spot-start-btn'>Get Started</button>
            </div> */}
            <div className='host-spot-step'>
                <button onClick={() => setStep(step + 1)} className='host-spot-next-btn'>Next</button>
            </div>
        </>
    )
}

export default HostFooter;
