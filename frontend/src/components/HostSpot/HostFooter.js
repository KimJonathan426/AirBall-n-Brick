import './HostSpot.css';

const HostFooter = ({ step, setStep }) => {


    return (
        <>
            <div className='host-spot-start'>
                <button onClick={() => setStep(step + 1)}className='host-spot-start-btn'>Get Started</button>
            </div>
        </>
    )
}

export default HostFooter;
