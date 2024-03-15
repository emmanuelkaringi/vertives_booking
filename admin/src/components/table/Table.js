import React, { useEffect, useState } from "react";
import './table.scss'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';

const Tables = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
        try {
            const response = await axios.get('http://localhost:8080/api/reserve');
            setReservations(response.data);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }
    fetchReservations();
}, []);

// Function to apply status classes
const getStatusClass = (status) => {
  switch(status) {
    case "pending":
      return "Pending";
    case "confirmed":
      return "Confirmed";
    case "canceled":
      return "Canceled";
    default:
      return "";
  }
};

return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
        <TableRow>
                    <TableCell className="tableCell">Booking Id</TableCell>
                    <TableCell className="tableCell">Username</TableCell>
                    <TableCell className="tableCell">Hotel Name</TableCell>
                    <TableCell className="tableCell">Room Booked</TableCell>
                    <TableCell className="tableCell">Check-in Date</TableCell>
                    <TableCell className="tableCell">Check-out Date</TableCell>
                    <TableCell className="tableCell">Amount</TableCell>
                    <TableCell className="tableCell">Status</TableCell>
                </TableRow>
        </TableHead>
        <TableBody>
                {reservations.map((row) => (
                    <TableRow key={row._id}>
                        <TableCell className="tableCell">{row._id}</TableCell>
                        <TableCell className="tableCell">{row.userId.username}</TableCell>
                        <TableCell className="tableCell">{row.hotelId.name}</TableCell>
                        <TableCell className="tableCell">{row.roomId[0].title}</TableCell>
                        <TableCell className="tableCell">{new Date(row.checkInDate).toDateString()}</TableCell>
                        <TableCell className="tableCell">{new Date(row.checkOutDate).toDateString()}</TableCell>
                        <TableCell className="tableCell">{row.totalAmount}</TableCell>
                        <TableCell className={`status ${getStatusClass(row.status)}`}>{row.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tables;