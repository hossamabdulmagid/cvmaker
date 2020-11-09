import styled from "styled-components";
import { Link } from "react-router-dom";

export const RapperColor = styled.div`
  background-color: #2f2f2f;
  color: white;
  height: 45px;
  padding: 2px;
  width: auto;
  margin-top: 20px;
`;

export const Content = styled.div`
  padding: 7px;
  font-size: 14px;
`;

export const LINK = styled(Link)`
  color: white;
  margin: 5px;
  padding: 2px;
  &:hover {
    color: white;
  }
`;
