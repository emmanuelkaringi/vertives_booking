import './searchitem.css'

const SearchItem = () => {
  return (
    <div className="searchItem">
    <img
      src="https://cf.bstatic.com/xdata/images/hotel/square200/405795996.webp?k=e0bbe3b39ba81068129e64ac872dd0abfa3cd6de395fde3598d5e86c712601bb&o="
      alt=""
      className="siImg"
    />
    <div className="siDesc">
      <h1 className="siTitle">Ole Samara guest suites</h1>
      <span className="siDistance">500m from center</span>
      <span className="siTaxiOp">Free airport taxi</span>
      <span className="siSubtitle">
        Studio Apartment with Air conditioning
      </span>
      <span className="siFeatures">
        Entire studio • 1 bathroom • 21m² 1 full bed
      </span>
      <span className="siCancelOp">Free cancellation </span>
      <span className="siCancelOpSubtitle">
        You can cancel later, so lock in this great price today!
      </span>
    </div>
    <div className="siDetails">
      <div className="siRating">
        <span>Excellent</span>
        <button>8.9</button>
      </div>
      <div className="siDetailTexts">
        <span className="siPrice">KES 48,109</span>
        <span className="siTaxOp">Includes taxes and fees</span>
        <button className="siCheckButton">See availability</button>
      </div>
    </div>
  </div>
  )
}

export default SearchItem