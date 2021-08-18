import styled from "styled-components";
import { Button } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
export const RapperColor = styled.div`
  background-color: #f7f7f7;
  height: auto;
  width: auto;
  margin: 0 auto;
`;

export const Alert = styled.p`
  background-color: #fff8b0;
  color: black;
  height: auto;
  width: auto;
  padding: 10px;
  font-size: 13px;
  border-radius: 15px;
`;

export const Containers = styled.div`
  padding-top: 30px;
`;
export const Buttons = styled(Button)`
  height: 33px;
  font-size: 11px;
  color: #666;
  cursor: pointer;
  border: 1px solid #ccc;
  overflow: hidden;
  display: inline-block;
  margin: 1px;
  height: 1.5rem;
  border-radius: 15px;
  &:hover {
    background: #18c7e1;
    color: #fff;
  }
`;
export const IMG = styled.img`
  padding-left: 210px;
`;

export const RapperSidebar = styled.div`
  float: left;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial;
  font-size: 13px;
  line-height: 24px;
  padding: 0;
  margin: 0 auto;
  color: #444;
`;

export const Ul = styled.ul`
  overflow: hidden;
  padding: 0;
  list-style-type: none;
  margin: 0;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial;
  font-size: 13px;
  line-height: 44px;
  padding: 0px;
  margin: 0;
  color: #444;
  &:hover {
    color: #04b2cc;
  }
  @media print {
    .no-printme {
      display: none;
    }
    .printme {
      font-size: 20px;
      display: block;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: 0 auto;
    }
    .hide-from-page {
      display: block;
    }
  }
`;

export const Li = styled.li`
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial;
  font-size: 13px;
  line-height: 18px;
  padding: 0px;
  margin: 1px;
  color: #04b2cc;
  border-top: 1px solid #d7d7d7;
  &:hover {
    color: #04b2cc;
  }
`;

export const AllCvLinks = styled(Link)`
  font-size: 11px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: inline-block;
  width: auto;
  height: auto;

  padding: 5px;
  &:hover {
    color: white;
    text-decoration: none;
    background-color: #18c7e1;
  }
`;

export const ButtonSidebar = styled.button`
  font-size: 11px;
  height: ;
  font-weight: bold;
  margin-top: 25px;
  color: #666;
  padding-bottom: 12px;
  text-shadow: 1px 1px #ddd;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  display: inline-block;
  height: 33px;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial;
  line-height: 24px;
  padding: 5px;
  &:hover {
    background: darked;
    color: #fff;
  }
`;

export const P = styled.p`
  display: block;
  padding: 2px;
  font-size: 13px;
  margin: 3px;
`;

export const LINK = styled(Link)`
  display: block;
  padding: 6px 0 6px 8px;
  overflow: hidden;
  font-weight: bold;
  font-size: 12px;
  color: #666;
  border-width: 0 0 1px 1px;
  border-style: solid;
  border-color: #d7d7d7;
  line-height: 22px;
  cursor: move;
  text-decoration: none;
  &:hover {
    color: white;
    background-color: #04b2cc;
    text-decoration: none;
  }
`;

export const Buttonss = styled.button`
  font-size: 13px;
  font-weight: bold;
  color: #666;
  /* text-shadow: 1px 1px #ddd; */
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 15px;
  overflow: hidden;
  display: inline-block;
  width: 200px;
  height: 35px;
  line-height: 24px;
  &:hover {
    background-color: #18c7e1;
  }
`;

export const LinkOption = styled(Link)`
  color: block;
  text-decoration: none;
  &:hover {
    color: black;
    text-decoration: none;
  }
`;

export const ButtonForAddNewSection = styled.button`
  border-radius: 15px;
  background-color: #ddd;
  color: black;
  font-size: 13px;
  padding: 8px;
  line-height: revert;
  height: auto;
  width: auto;
  margin-top: 1px;
  &:hover {
    background-color: #18c7e1;
    color: white;
  }
`;

export const Span = styled.span`
  color: red;

  padding: 8px;
  margin: 5px 1px 1px 1px;
  padding: 1px 1px 1px 1px;
  w &:hover {
    color: red;
  }
`;

export const Aroow = styled(BsArrowRightShort)`
  display: inline;
  font-size: 16px;
  font-wight: blod;
  color: black;
  &:hover {
    color: black;
  }
`;
export const RapperdForms = styled.div`
  margin: 0 auto;
  padding: 10px;
  padding-bottom: 30px;
`;

export const SmallSideBar = styled.small`
  padding: 7px;
`;
