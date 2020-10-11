  
import React from 'react';


//this returns the users previous consumptions
export default function Receipts(props) {

return ( 
    <>
   <ul className = "Receipts">
    {
      props.userReceipts.map(receipt => <li className="Receipt" key={receipt.id}> <note key={ receipt.id }  {...receipt}/> 
      <div>id: {receipt.id}</div>
      <div>date: {receipt.Date} </div>
      <div>price: {receipt.Price}</div>
      <div>time: {receipt.Time}</div>
    </li>)
    }
  </ul>
  </>
)
}
