import React, { useState, useEffect } from "react";

const Follow = ({ name, handleClick }) => {
  return (
    <div className="input-group-new">
      <label className="label-new">{name}</label>
      <input
        autocomplete="off"
        onChange={handleClick}
        name={name}
        id={name}
        className="input-new"
        type="text"
      />
      <div></div>
    </div>
  );
};

export default Follow;
