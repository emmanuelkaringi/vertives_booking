import "./fhotels.css";

const FHotels = () => {
  return (
    <div className="fh">
      <div className="fhItem">
        <img
          alt=""
          className="fhImg"
          src="https://cf.bstatic.com/xdata/images/hotel/square200/87043239.webp?k=63493cf4fba80234e2e1a22bbedc562688a42be628afbc35801deb65d2fe3f77&o="
        ></img>
        <span className="fhName">Eland Safari Hotel Nyeri</span>
        <span className="fhCity">Nyeri</span>
        <span className="fhPrice">Starting from KES 13,564</span>
        <div className="fhRating">
          <button>6.0</button>
          <span>Pleasant</span>
        </div>
      </div>

      <div className="fhItem">
        <img
          alt=""
          className="fhImg"
          src="https://cf.bstatic.com/xdata/images/hotel/square200/218638446.webp?k=dca76459d5cac61526e358f1ed658ec38109cec8dabbc2e64df47d3784a77dfd&o="
        ></img>
        <span className="fhName">Sarova Woodlands Hotel and Spa</span>
        <span className="fhCity">Nakuru</span>
        <span className="fhPrice">Starting from KES 17,069</span>
        <div className="fhRating">
          <button>8.3</button>
          <span>Very Good</span>
        </div>
      </div>

      <div className="fhItem">
        <img
          alt=""
          className="fhImg"
          src="https://cf.bstatic.com/xdata/images/hotel/square200/484343229.webp?k=5b5c2481a57586ba4f7ef57f9db4eed7bd6f7c49eac66516ee6c06e13ae55513&o="
        ></img>
        <span className="fhName">Muthu Warwick Mount Kenya Hotel</span>
        <span className="fhCity">Nanyuki</span>
        <span className="fhPrice">Starting from KES 8,641</span>
        <div className="fhRating">
          <button>7.6</button>
          <span>Good</span>
        </div>
      </div>
    </div>
  );
};

export default FHotels;
