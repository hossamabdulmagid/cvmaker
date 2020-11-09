import styled from "styled-components";
import { Button } from "@chakra-ui/core";
export const Box = styled.div`
  background: #fff;
  float: left;
  width: 90%;
  padding: 15px;
  min-height: 200px;
  border: 1px solid #ddd;
  position: relative;
  margin-top: 35px;
  text-align: left;
`;
export const Input = styled.input`
repeat-x bottom left;
font-family: 'Open Sans','Helvetica Neue',Helvetica,Arial;
font-size: 13px;
padding: 6px;
border: 1px solid #ccc;
border-radius: 4px;
`;
export const H6 = styled.h6`
  display: block;
`;
export const BUTTON = styled(Button)`
  background: #18c7e1;
  box-shadow: inset 0 0 10px #17bdd3;
  text-shadow: 1px 1px #17bdd3;
  color: #fff;
  border-color: #18c7e1;
  border-radius: 16px;
  width: 70px;
  height: 32px;
  display: block;
  margin-left: 190px;
  padding: 4px;
  font-size: 13px;
  &:hover {
    background-color: black;
    color: white;
    box-shadow: inset 0 0 10px black;
    text-shadow: 1px 1px black;
    border-color: black;
  }
`;
export const H7 = styled.h6`
  font-size: 11px;
  margin-top: 25px;
  display: block;
  padding: 20px;
`;
export const IMG = styled.img`
  padding: 1px;
  margin: 0 auto;
  padding: 5px;
  display: inline;
`;
