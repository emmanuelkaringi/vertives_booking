import useFetch from "../../hooks/useFetch";
import "./feature.css";

const Feature = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8080/api/hotels/countByCity?cities=Nyeri,Nakuru,Nairobi"
  );
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              alt=""
              className="featuredImg"
              src="https://cf.bstatic.com/xdata/images/city/600x600/685406.jpg?k=fb02ffb273110d269bc5603a6c662f36fc5ec76b877f68d5de90c0ffbdd3f475&o="
            ></img>
            <div className="featuredTitles">
              <h1>Nyeri</h1>
              <h2>{data[0]} Hotels</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              alt=""
              className="featuredImg"
              src="https://cf.bstatic.com/xdata/images/city/600x600/691725.jpg?k=ba3cf3ded7b086bb6476b6a605875d22ac350d47d16fc3f1b0982bf54551b2f3&o="
            ></img>
            <div className="featuredTitles">
              <h1>Nakuru</h1>
              <h2>{data[1]} Hotels</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              alt=""
              className="featuredImg"
              src="https://cf.bstatic.com/xdata/images/city/600x600/685406.jpg?k=fb02ffb273110d269bc5603a6c662f36fc5ec76b877f68d5de90c0ffbdd3f475&o="
            ></img>
            <div className="featuredTitles">
              <h1>Nairobi</h1>
              <h2>{data[2]} Hotels</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Feature;
