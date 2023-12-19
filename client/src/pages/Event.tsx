import TopNav from 'src/components/TopNav'
import './event.scss'

const Event = () => {
  return (
    <div className='EventContainer'>
        <TopNav/>
        <div className='EventWrapper'>
            <div className='EventInfo'>
                <img src='https://img.freepik.com/free-photo/old-books-shelf-background-with-never-stop-dreaming-quote_53876-132278.jpg' className='EventBanner' alt=''/>
                <div className='EventDetail'>
                  <h2>Event detail</h2>
                  <hr/>
                  <p>Our are hosting <strong>Authmn Sale Event</strong> Now.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Event