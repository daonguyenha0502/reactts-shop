import React from 'react';

interface Props {}

const Checkout = (props: Props) => {
  return (
    <div className="bg-indigo-400 w-120 py-4 rounded-md leading-8">
      <div className="flex justify-between px-2">
        <p>Subtotal(2 items)</p> <p>$54.84</p>
      </div>
      <div className="flex justify-between px-2">
        <p>Delivery</p>
        <p>Free</p>
      </div>
      <div className="flex justify-between px-2">
        <p>Taxes and feesTaxes and fees</p> — —
      </div>

      <div className="flex justify-between px-2">
        <p>Est. total</p> $54.84
      </div>

      <button className="bg-blue-600 px-5 py-1 rounded-md hover:bg-red-400 active:bg-red-500 duration-500 focus:outline-none">Check out</button>
    </div>
  );
};

export default Checkout;
