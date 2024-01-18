import { Link } from 'react-router-dom'
import './searchitem.css'

const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
    <img
      src="https://cf.bstatic.com/xdata/images/hotel/square200/405795996.webp?k=e0bbe3b39ba81068129e64ac872dd0abfa3cd6de395fde3598d5e86c712601bb&o="
      alt=""
      className="siImg"
    />
    <div className="siDesc">
      <h1 className="siTitle">{item.name}</h1>
      <span className="siDistance">{item.distance} from center</span>
      <span className="siFeatures">
        {item.description}
      </span>
      <span className="siCancelOp">Free cancellation </span>
      <span className="siCancelOpSubtitle">
        You can cancel later, so lock in this great price today!
      </span>
    </div>
    <div className="siDetails">
      {item.rating && <div className="siRating">
        <span>Excellent</span>
        <button>{item.rating}</button>
      </div>}
      <div className="siDetailTexts">
        <span className="siPrice">KES {item.cheapestPrice}</span>
        <span className="siTaxOp">Includes taxes and fees</span>
        <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">Check availability</button>
        </Link>
      </div>
    </div>
  </div>
  )
}

export default SearchItem