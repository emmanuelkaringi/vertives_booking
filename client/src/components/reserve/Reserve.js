import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [maxRooms, setMaxRooms] = useState(1);
  const { data, loading, error } = useFetch(
    `http://localhost:8080/api/hotels/room/${hotelId}`
  );
  const { options } = useContext(SearchContext);
  const navigate = useNavigate();

  useEffect(() => {
    setMaxRooms(options.room);
  }, [options.room]);

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    if (checked && selectedRooms.length >= maxRooms) {
      return;
    }
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  console.log(selectedRooms);

  const handleClick = async () => {
    try {
      setOpen(false);
      navigate("/checkout");
    } catch (err) {}
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
        {data.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.description}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">KES {item.price}</div>
            </div>
            {item.roomNumbers.map((roomNumber) => (
              <div className="room">
                <label>{roomNumber.number}</label>
                <input
                  type="checkbox"
                  value={roomNumber._id}
                  onChange={handleSelect}
                  checked={selectedRooms.includes(roomNumber._id)}
                />
              </div>
            ))}
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
