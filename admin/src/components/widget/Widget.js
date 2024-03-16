import { useEffect, useState } from 'react';
import axios from 'axios';
import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

const Widget = ({ type }) => {
  const [data, setData] = useState({
    title: '',
    isMoney: false,
    link: '',
    amount: 0,
    diff: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (type) {
          case 'user':
            response = await axios.get('http://localhost:8080/api/users/count');
            setData({
              title: 'USERS',
              isMoney: false,
              link: 'See all users',
              amount: response.data.count,
            });
            break;
          case 'order':
            response = await axios.get('http://localhost:8080/api/reserve/count');
            setData({
              title: 'RESERVATIONS',
              isMoney: false,
              link: 'View all reservations',
              amount: response.data.count,
            });
            break;
          case 'earning':
            response = await axios.get('http://localhost:8080/api/reserve/total-amount');
            setData({
              title: 'EARNINGS',
              isMoney: true,
              link: 'View net earnings',
              amount: response.data.totalAmount,
            });
            break;
          default:
            break;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div className="widget">
      {type && (
        <>
          <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">
              {data.isMoney && '$'} {data.amount}
            </span>
            <a href={data.link} className="link">
              {data.link}
            </a>
          </div>
          <div className="right">
            <div className="percentage positive">
              <KeyboardArrowUpIcon />
              {data.diff} %
            </div>
            {type === 'user' ? (
              <PersonOutlinedIcon
                className="icon"
                style={{
                  color: 'crimson',
                  backgroundColor: 'rgba(255, 0, 0, 0.2)',
                }}
              />
            ) : type === 'order' ? (
              <BookOnlineIcon
                className="icon"
                style={{
                  backgroundColor: 'rgba(218, 165, 32, 0.2)',
                  color: 'goldenrod',
                }}
              />
            ) : type === 'earning' ? (
              <MonetizationOnOutlinedIcon
                className="icon"
                style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
              />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Widget;