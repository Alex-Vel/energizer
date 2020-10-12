  
import React from 'react';


//this returns the users previous consumptions
export default function Receipts(props) {

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}

return ( 
    <>
   <ul className = "Receipts">
    {
      props.userReceipts.map(receipt => <li className="Receipt" key={receipt.id} >
      <div>id: {receipt.id}</div>
      <div>date: {formatDate(receipt.Date)} </div>
      <br/>
      <div>charger id: {receipt.Charger.ID}</div>
      <div>charger name: {receipt.Charger.Title}</div>
      <br/>
      <div>price: € {receipt.Price}</div>
      <div>time in seconds: {receipt.Time}</div>
      <div>Power in KW: {receipt.Power}</div>
      <br/>
    </li>)
    }
  </ul>
  </>
)
}
