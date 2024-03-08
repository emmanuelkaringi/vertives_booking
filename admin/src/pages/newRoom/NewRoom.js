import './newRoom.scss'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const NewRoom = () => {
    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState(undefined);

    const {data, loading, error} = useFetch("http://localhost:8080/api/hotels")

    const handleChange = (e) => {
      setInfo((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleClick =async (e) =>{
      e.preventDefault()
      try {
        await axios.post(`http://localhost:8080/api/rooms/${hotelId}`, {...info})
      } catch (err) {
        
      }
    }

    return (
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>Add New Room</h1>
          </div>
          <div className="bottom">
            <div className="right">
              <form>
                {roomInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input onChange={handleChange} id={input.id} type={input.type} placeholder={input.placeholder} />
                  </div>
                ))}
                <div className="formInput">
                    <label>Choose a Hotel</label>
                    <select id='hotelId' onChange={e=>setHotelId(e.target.value)}>
                      {loading? "loading" : data && data.map(hotel=>(
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))}
                    </select>
                  </div>
                <button onClick={handleClick}>Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default NewRoom