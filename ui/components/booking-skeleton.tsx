import React from "react";

const SkeletonBooking = () => {
  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          marginBottom: "20px",
          width: "100%",
          height: "20px",
          backgroundColor: "#eee",
        }}
      ></div>
      {/* Mimic rows of seats */}
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex", marginBottom: "10px" }}>
          {Array.from({ length: 20 }).map((_, seatIndex) => (
            <div
              key={seatIndex}
              style={{
                width: "40px",
                height: "30px",
                margin: "2px",
                backgroundColor: "#ccc",
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkeletonBooking;
