export const userColumns = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 100,
    },
  ];

  export const hotelColumns = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
    },
    {
      field: "title",
      headerName: "Title",
      width: 230,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
    },
  ];
  
  export const roomColumns = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "title",
      headerName: "Title",
      width: 230,
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      valueFormatter: (params) => `KES. ${params.value}`,
    },
    {
      field: "maxPeople",
      headerName: "Max People",
      width: 100,
    },
  ];

  export const bookColumns = [
    { field: "_id", headerName: "ID", width: 80 },
    {
      field: "userId",
      headerName: "Username",
      width: 80,
      valueGetter: (params) => params.row.userId.username
    },
    {
      field: "hotelId",
      headerName: "Hotel",
      width: 150,
      valueGetter: (params) => params.row.hotelId.name
    },
    {
      field: "roomId",
      headerName: "Room Title",
      width: 100,
      valueGetter: (params) => params.row.roomId[0].title
    },
    {
      field: "checkInDate",
      headerName: "Check In Date",
      width: 150,
      valueFormatter: (params) => new Date(params.value).toDateString(),
    },
    {
      field: "checkOutDate",
      headerName: "Check Out Date",
      width: 150,
      valueFormatter: (params) => new Date(params.value).toDateString(),
    },
    {
      field: "totalAmount",
      headerName: "Amount",
      width: 80,
      valueFormatter: (params) => `KES. ${params.value}`,
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
    },
];