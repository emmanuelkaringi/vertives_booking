import './featured.scss'
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Featured = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);


  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reserve/total-amount');
        setTotalRevenue(response.data.totalAmount);
      } catch (error) {
        console.error('Error fetching total revenue:', error);
      }
    };

    fetchTotalRevenue();
  }, []);


    return (
        <div className="featured">
          <div className="top">
            <h1 className="title">Total Revenue</h1>
            <MoreVertIcon fontSize="small" />
          </div>
          <div className="bottom">
            <div className="featuredChart">
              <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
            </div>
            <p className="title">Total revenue made today</p>
            <p className="amount">KES.{totalRevenue}</p>
            <p className="desc">
              Previous transactions processing. Last payments may not be included.
            </p>
          </div>
        </div>
      );
    };
    
export default Featured