import React from "react";

const Characters = ({ characters = [] }) => {
  return (
    <div className="row">
      {characters.map((item, index) => (
        <div key={index} className="col">
            <div className="card">
                
            </div>
        </div>
      ))}
    </div>
  );
};

export default Characters;
