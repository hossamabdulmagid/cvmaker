import React from "react";
import { RapperColor, Content, LINK } from "./footer.styles";
const Footer = () => {
  return (
    <RapperColor>
      <Content className="container">
        <div className="row">
          <div className="col-4">
            CV Maker © 2010 - 2020. All rights reserved
          </div>
          <div className="col-4"></div>
          <div className="col-4">
            <LINK to="/policy">Terms & Privacy policy</LINK>||
            <LINK to="/contact">Contact</LINK>
          </div>
        </div>
      </Content>
    </RapperColor>
  );
};

export default Footer;
