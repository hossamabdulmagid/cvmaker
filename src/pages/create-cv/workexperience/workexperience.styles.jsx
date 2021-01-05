import styled from "styled-components";
import { Button } from "react-bootstrap";
export const Title = styled.h4`
  padding: 11px;
  font-weight: 200px;
`;

export const ButtonForWork = styled.button`
  border-radius: 15px;
  background-color: rgb(206, 206, 206);
  color: black;
  font-size: 13px;
  padding: 6px;
  line-height: revert;
  height: 28px;
  width: 150px;
  margin-top: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: #18c7e1;
    color: white;
  }
`;
export const Rapperd = styled.div`
  border: 1px dotted darkgray;
  padding: 1px;
`;
export const P = styled.p`
  margin: 00px;
  padding: 10px;
  color: black;
`;

export const Strong = styled.strong`
  padding: 5px;
  text-align: right;
  color: black;
  display: flex-inline;
`;
