import React, { useState } from "react";

import { RapperColor, COL, Small, Img, Links } from "./navGuest.styles";
import { Link } from "react-router-dom";

const NavGuest = () => {
  const [download, setDownload] = useState(0);
  const [save, setSave] = useState(0);
  return (
    <div>
      <RapperColor className="container">
        <div className="row">
          <COL className="col-8">
            <Link to="/">
              <img src="https://cvmkr.com/images/logo.png" alt="" />
            </Link>
          </COL>
          <COL className="col-2">
            <Small>{download}</Small>
            <Small onClick={() => setDownload(download + 1)}> downloads</Small>
          </COL>
          <COL className="col-2">
            <Small>{save}</Small>
            <Small onClick={() => setSave(save + 1)}>saved CVs </Small>
          </COL>
        </div>
      </RapperColor>
    </div>
  );
};

export default NavGuest;
