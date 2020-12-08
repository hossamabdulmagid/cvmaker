import React, { useState } from "react";
import generateRandom from "../../lib/random";
import "./App.scss";
const CheckBox = ({
  refVal,
  name,
  labelText = null,
  errors = {},
  options,
  value,
  onChange,
  hint = null,
}) => {
  const htmlId = generateRandom();

  const [isChecked, setIsChecked] = useState(value);
  const handleChange = () => {
    let val = !isChecked;
    setIsChecked(val);
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <>
      {options ? (
        <>
          <div>
            {!name ? "missing name" : null}
            <input
              className="checkbox-custom"
              type="checkbox"
              name={name}
              value={options.value}
              checked={!isChecked}
              onChange={handleChange}
              ref={refVal}
              id={`${htmlId}checkbox-1`}
            />
            <label
              className="checkbox-custom-label"
              htmlFor={`${htmlId}checkbox-1`}
            >
              {options.label}
            </label>
            <span className="hintforecheckbox">
              {hint ? <small className="m-l-sm">{hint}</small> : null}
            </span>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CheckBox;
