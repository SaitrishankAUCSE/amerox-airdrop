import React from "react";

const AdminInput = ({ handleClick, name, placeholder }) => {
  return (
    <div className="input-group-new">
      <label className="label-new">{name}</label>
      <input
        onChange={handleClick}
        placeholder={placeholder}
        className="input-new"
        type="text"
      />
      <div></div>
    </div>
  );
};

export default AdminInput;
