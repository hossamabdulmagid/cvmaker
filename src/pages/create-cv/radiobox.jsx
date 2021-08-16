import React, { useState } from "react";
import generateRandom from "../../lib/random";
import "./styles.scss";
const InputRadioBox = ({
  refVal,
  name,
  labelText = null,
  errors = {},
  options,
  hint = null,
  value,
  disabled,
}) => {
  const htmlId = generateRandom();

  const [isChecked, setIsChecked] = useState(value);
  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="padding-xs">
      {options ? (
        <>
          <div className="pretty p-default p-round p-thick">
            {!name ? "missing name" : null}
            <input
              type="radio"
              name={name}
              disabled={disabled}
              value={options.value}
              checked={isChecked}
              onChange={handleChange}
              ref={refVal}
              id={`${htmlId}checkbox-1`}
            />
            <div className="state p-info-o">
              <label className="" htmlFor={`${htmlId}checkbox-1`}>
                {options.label}
              </label>
            </div>
          </div>
          <div>{hint ? <small className="m-l-lg">{hint}</small> : null}</div>
        </>
      ) : null}
    </div>
  );
};

export default InputRadioBox;
