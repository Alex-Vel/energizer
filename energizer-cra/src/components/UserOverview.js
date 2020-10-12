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
          <button onClick={goMap}>Go to map</button>
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
              <span> UserName: <output type="text" name="username"> {props.userData.username} </output></span>
               <span> Email: <output type="text" name="email"> { props.userData.email} </output></span>
            </form>
          </div>
      </div>
      <div>
      <h2> Receipts: </h2>
    <Receipts
    userReceipts = {props.userReceipts}
    />
      </div>
      </div>
    </>
)

}
