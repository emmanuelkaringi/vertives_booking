import Feature from '../../components/feature/Feature'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import FHotels from '../hotels/FHotels'
import './home.css'

const Home = () => {
  return (
    <div>
        <Navbar />
        <Header />
        <div className='homeContainer'>
          <Feature />
          <h1 className='homeTitle'>Hotels People Love</h1>
          <FHotels />
        </div>
    </div>
  )
}

export default Home