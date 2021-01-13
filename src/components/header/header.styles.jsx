import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/core";
export const RapperColor = styled.div`
  min-height: auto;
  width: auto;
  height: auto;
  background-color: #18c7e1;
  color: white;
`;
// #18c7e1
export const RapperContent = styled.div`
  padding: 15px;

  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial;
  font-size: 28px;
  line-height: 24px;
`;

export const H1 = styled.h1`
  display: inline-flex;
  padding: 5px;
`;

export const SPan = styled.span`
  font-weight: bold;
`;

export const P = styled.p`
  font-size: 33px;
  font-weight: 100;
  padding-top: 80px;
  margin: 0 0 300px 0;
  font-size: 32px;
  font-weight: 300;
  line-height: 38px;
`;

export const LINK = styled(Link)`
  margin-top: 25px;
  padding-top: 20px;
`;

export const BUTTON = styled(Button)`
  background-img: url(cvmaker.png);
  background-repeat: no-repeat;
  padding: 2px;
  margin: 2px 2px 2px 2px;
  background-position: 0px 0px 0px 0px;

  background-color: #009fb5;
  border-radius: 10px;
  &:hover {
    background-color: black;
  }
`;

export const IMG = styled.img`
  width: 50px;
`;

export const Div = styled.div`
  padding: 15px;
  border-bottom: 1px solid gray;
`;
export const BUTTONFORLIKE = styled(Button)`
  height: 30px;
  width: 110px;
`;
export const BUTTONFORTWITTER = styled(Button)`
  height: 30px;
  width: 100px;
  background-color: #1a91da;
  &:hover {
    background-color: #1a91da;
  }
`;
export const BUTTONFORSHARE = styled(Button)`
  width: 100px;
  height: 30px;
  padding: 2px;
`;

export const BUTTONFORLOGIN = styled(Button)`
  height: 30px;
  background-color: #6bc9d5;
  padding: 2px;
  &:hover {
    background-color: black;
  }
  text-shadow: 1px 1px #17bdd3;
  color: #fff;
  padding: 2px;
  width: 100px;
`;

export const Links = styled(Link)`
  color: white;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;
export const RapperdRow = styled.div`
  padding: 10px;
`;
export const RapperdCols = styled.div`
  margin-top: 20px;
`;

export const Small = styled.small`
  padding-top: 25px;
  margin-top: 25px;
`;
