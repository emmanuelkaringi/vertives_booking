import {
  faBed,
  faUtensils,
  faMapLocationDot,
  faPlane,
  faCalendarDays,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns"
import "./header.css";
import { useState } from "react";

const Header = () => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faUtensils} />
            <span>Eat</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faMapLocationDot} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flight</span>
          </div>
        </div>
        <h1 className="headerTitle">Find your next stay</h1>
        <p className="headerDesc">
          Search deals on hotels, homes, and much more...
        </p>
        <button className="headerBtn">Sign in / Register </button>

        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder="Where are you going?"
              className="headerSearchInput"
            />
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span className="headerSearchText">{`${format(date[0].startDate, "EEE, MMM dd")} to ${format(date[0].endDate, "EEE, MMM dd")}`}</span>
            <DateRangePicker
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="date"
            />
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faUser} className="headerIcon" />
            <span className="headerSearchText">2 adults 2 children 1 room</span>
          </div>

          <div className="headerSearchItem">
            <button className="headerBtn">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
