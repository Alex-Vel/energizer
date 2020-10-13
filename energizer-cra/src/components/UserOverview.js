import React from 'react';
import Receipts from './Receipts';
export default function UserOverview(props) {

    function goMap() {
        props.history.push(props.goMap);
    
      }
      function Logout() {

          props.LogOut();
        
      }

return (
    <>
      <div className={"topMenuBar"}>
      
          User: 
          {" "+props.userData.username}
          <div>
          <button onClick={goMap}>Go to Energizer</button>
          </div>
          <div>
          <button onClick={Logout}> Logout </button>
          <output type="text" id="logoutprompt"></output>
        </div>
        </div>
        <div className ={ "mainContent"}>


        <div>
          <h1>Welcome, {props.userData.username} </h1>
          <div>
            <form>
              <span> UserName: {props.userData.username} </span>
               <span> Email: {props.userData.email} </span>
            </form>
          </div>
      </div>
      <h2> Receipts: </h2>
      <div>
 
    <Receipts
    userReceipts = {props.userReceipts.reverse()}
    />
      </div>
      </div>
    </>
)

}
