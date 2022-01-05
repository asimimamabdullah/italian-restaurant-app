import React from "react";
import Box from "./../Box/Box";

const OneUser = ({ orders }) => {
  return (
    <div style={{ margin: "20px 0" }}>
      <Box {...orders} />

      <hr
        style={{
          width: "80%",
          margin: "30px auto",
          background: "transparent",
          border: "none",
          borderBottom: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default OneUser;
