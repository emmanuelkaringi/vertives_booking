import './datatable.scss'
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch"
import { useEffect, useState } from "react";
import axios from 'axios';

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const {data, loading, error} = useFetch(`http://localhost:8080/api/${path}`)

    useEffect(()=>{
      if (data) {
        const sortedData = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setList(sortedData);
      }
    }, [data])

    console.log(data)

    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:8080/api/${path}/${selectedItemId}`);
        setList(list.filter((item) => item._id !== selectedItemId));
        setIsConfirmationOpen(false);
      } catch (err) {
        // Handle error
      }
    };
  
    const openConfirmation = (id) => {
      setSelectedItemId(id);
      setIsConfirmationOpen(true);
    };
  
    const closeConfirmation = () => {
      setSelectedItemId(null);
      setIsConfirmationOpen(false);
    };
  
    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <Link to={`/users/${params.row._id}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">View</div>
              </Link>
              <div
                className="deleteButton"
                onClick={() => openConfirmation(params.row._id)}
              >
                Delete
              </div>
            </div>
          );
        },
      },
    ];

    return (
      <div className="datatable">
        <div className="datatableTitle">
          {path.charAt(0).toUpperCase() + path.slice(1)}
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        </div>
        <DataGrid
          className="datagrid"
          rows={list || []}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={row => row._id}
        />
  
        {isConfirmationOpen && (
          <div className="confirmationModal">
            <p>Are you sure you want to delete this item?</p>
            <div>
              <button className='yesButton' onClick={handleDelete}>Yes</button>
              <button className='noButton' onClick={closeConfirmation}>No</button>
            </div>
          </div>
        )}
      </div>
    );
  };

export default Datatable