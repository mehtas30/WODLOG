import welcomeBg from './welcome-bg.jpg'

const Welcome = () => {
  return (
    <div className='welcome-container'>
        <div className="bg-wrapper">
            <img src={welcomeBg} alt="bg" className='welcome-bg'/>
        </div>
        <div className="welcome-title">Welcome</div>
    </div>
  )
}

export default Welcome