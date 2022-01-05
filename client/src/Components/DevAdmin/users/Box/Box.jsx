import React from "react";
// import "./Box.css";
// import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import '../../Orders/Box/Box.css'

const Box = ({ firstName, lastName, email, address, building, phone }) => {

   return (
      <>
         <div className="manageOrders__box" >
            <table
               className="manageOrders__box-first-table">
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Address</th>
                     <th>Building</th>
                     <th>Phone</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>{lastName ? firstName + " " + lastName : firstName} </td>
                     <td style={{ textTransform: "lowercase" }}> {email ? email : ''} </td>
                     <td></td>
                     < td style={{ fontSize: "12px", letterSpacing: ".2px" }}>
                        {address ? address : ''}
                     </td>
                     <td >{phone ? phone : ''}</td>

                  </tr>
               </tbody>
            </table>

         </div>
      </>
   );
};

export default Box;
