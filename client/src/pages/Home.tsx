//import './Home.scss'
import TopNav from '../components/TopNav';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Content from 'src/components/Content';

const home = () => {

  return (
    <div className='App'>
        <TopNav/>
        <Header/>
        <Content/>
        <Footer/>
    </div>
  )
}

export default home