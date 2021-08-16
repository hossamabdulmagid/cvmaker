import styled from "styled-components";

import { Link } from "react-router-dom";

export const RapperColor = styled.div`
  background-color: #ffffff;
  min-height:
  height: 80px;
  padding: 15px;
`;

export const COL = styled.div`
  display: block;
`;

export const Small = styled.small`
  display: block;
  font-size: 18px;
`;

export const Color = styled.div`
  background-color: #f9f9f9;
  height: auto;
  min-height: ;
  margin-bottom: 25px;
  margin: 0 auto;
`;

export const LINK = styled(Link)`
  padding: 5px 10px 4px 4px;
  margin: 4px 4px 4px 4px;
  background: #18c7e1;
  box-shadow: inset 0 0 10px #17bdd3;
  text-shadow: 1px 1px #17bdd3;
  color: #fff;
  border-color: #18c7e1;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.5;
  border-radius: 11px;
  display: inline-block;
  &:hover {
    text-decoration: none;
    color: white;
  }
`;

export const COLL = styled.div`
  margin-top: 35px;
`;
