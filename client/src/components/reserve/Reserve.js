import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [maxRooms, setMaxRooms] = useState(1);
  const { data, loading, error } = useFetch(
    `http://localhost:8080/api/hotels/room/${hotelId}`
  );

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { options, dates } = useContext(SearchContext);
  console.log(dates);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  console.log("Number of days:", days);

  useEffect(() => {
    setMaxRooms(options.room);
  }, [options.room]);

  const handleSelect = (e, room) => {
    const checked = e.target.checked;
    const roomId = room._id;

    if (checked && selectedRooms.length >= maxRooms) {
      return;
    }

    setSelectedRooms((prevSelectedRooms) =>
      checked
        ? [...prevSelectedRooms, roomId]
        : prevSelectedRooms.filter((item) => item !== roomId)
    );
  };

  console.log(selectedRooms);

  const isRoomAvailable = (room) => {
    if (room.unavailableDates && room.unavailableDates.length > 0) {
      const startDate = new Date(dates[0].startDate);
      const endDate = new Date(dates[0].endDate);

      for (const unavailableDate of room.unavailableDates) {
        const currentDate = new Date(unavailableDate);

        if (currentDate >= startDate && currentDate <= endDate) {
          return false;
        }
      }
    }

    return true;
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const room = data.find((r) => r._id === roomId);
          const totalAmount = room.price * days;

          const reservationData = {
            userId: user._id,
            hotelId,
            roomId,
            checkInDate: dates[0].startDate,
            checkOutDate: dates[0].endDate,
            totalAmount,
            mpesaPaymentId: "", // Provide the MPesa payment ID if available
            confirmationNumber: user.phone,
          };
          console.log(reservationData);
          const res = await axios.post(
            "http://localhost:8080/api/reserve",
            reservationData
          );
          return res.data;
        })
      );
      setOpen(false);
      navigate("/checkout");
    } catch (err) {
      console.error("Error during reservation:", err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((room) => (
          <div
            key={room._id}
            className={`rItem ${!isRoomAvailable(room) ? "unavailable" : ""}`}
          >
            <div className="rItemInfo">
              <div className="rTitle">{room.title}</div>
              <div className="rDesc">{room.description}</div>
              <div className="rMax">
                Max people: <b>{room.maxPeople}</b>
              </div>
              <div className="rPrice">KES {room.price}</div>
            </div>
            <div className="room">
              {!isRoomAvailable(room) ? (
                <div className="unavailableText">Unavailable</div>
              ) : (
                <input
                  type="checkbox"
                  value={room._id}
                  onChange={(e) => handleSelect(e, room)}
                  checked={selectedRooms.includes(room._id)}
                />
              )}
            </div>
          </div>
        ))}
        <button
          onClick={handleClick}
          className={`rButton ${
            selectedRooms.length === 0 || selectedRooms.length > maxRooms
              ? "disabled"
              : ""
          }`}
          disabled={
            selectedRooms.length === 0 || selectedRooms.length > maxRooms
          }
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
