import "./checkout.css";

function Checkout() {
  return (
    <div className="checkout">
      <main className="container">
        <aside className="info">
          {/* <!-- Credit Card Name --> */}
          <label className="name">Full Name</label>
          <input className="input" type="text" name="cardNumber" />

          {/* <!-- Phone --> */}
          <label className="phone">Phone Number</label>
          <input className="input" type="text" name="cardholderName" />

          {/* <button className='makePayment'>MAKE A PAYMENT</button> */}
        </aside>
        <aside className="description">
          <h2>Original wayfarer classic</h2>
          <h3>Green classic g-15</h3>
          {/* <img src='http://www.ray-ban.com/_repository/_resources/_collections/sun/RB4105/601/_default_500_300/601.png'> */}
          <h1>$150</h1>
          <button className="editOrder">Pay with MPesa</button>
        </aside>
      </main>
    </div>
  );
}

export default Checkout;
