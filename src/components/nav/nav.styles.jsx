import styled from "styled-components";
import { Link } from "react-router-dom";
import { CountryDropdown } from "react-country-region-selector";
import { BsFillLockFill } from "react-icons/bs";

export const Rapper = styled.div`
  width: auto;
  height: auto;
  background-color: black;
  color: white;
  padding: 8px;
`;
// #18C7E1 color for background;

export const Span = styled.span`
  font-size: 11px;
`;

export const RapperSelectCountry = styled.div`
background-color:black;
color:white;
font-size: 11px;
color: #ccc;
padding: 0 0 0 20px;
-webkit-appearance: no
color: #ccc;
border-radius: 3px;
width:30px;
`;

export const I = styled.i`
  background-color: white;
  @fa-font-path: "../font";
`;

export const LINK = styled(Link)`
  color: white;
  display: inli;
  margin: 2px;
  padding: 1px;
  padding-right: 2px;
  &:hover {
    color: gray;
  }
  cursor: pointer;
`;

export const SELECT = styled(CountryDropdown)`
  min-width: 105px;
  background-color: black;
  color: white;
  padding: 2px;
  border: 1px solid gray;
`;

export const Select = styled.select`
  background-color: black;
  color: white;
`;

export const Icon = styled(BsFillLockFill)`
  display: inline;
`;

export const Small = styled.small`
  color: #18c7e1;
`;
