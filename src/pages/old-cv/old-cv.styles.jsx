import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiCog } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { BsFillBucketFill } from "react-icons/bs";
import { BsCalendar } from "react-icons/bs";
import { FcAlarmClock } from "react-icons/fc";
import { AiTwotoneEdit } from "react-icons/ai";
export const IconCalendar = styled(FcAlarmClock)`
  margin: 10px;
  display: inline;
`;

export const RapperdColor = styled.div`
  background-color: #f9f9f9;
  color: black;
  height: auto;
  padding-bottom: 25px;
  margin: 0 auto;
`;

export const Content = styled.div`
  margin-bottom: 30px;
`;

export const Title = styled.h2`
  font-size: 25px;
  margin: 5px;
  padding: 10px 10px 0px 0px;
`;

export const ButtonforcreateCv = styled(Button)`
  border-radius: 15px;
  background-color: #18c7e1;
  color: black;
  font-size: 13px;
  padding: 3px;
  line-height: revert;
  height: 28px;
  width: 150px;
  margin-top: 10px;
  text-decoration: none;
  &:hover {
    background-color: black;
    color: white;
    text-decoration: none;
  }
`;

export const Strong = styled.strong`
  color: green;
`;

export const Icon = styled(BsFillBucketFill)`
  margin: 4.5px;
  width: 13px;
  color: whie;
`;

export const Span = styled.small`
  float: right;
  display: flex;
  color: black;
  text-align: center;
  background-color: sunrose;
`;

export const ButtonForDeleteCv = styled.button`
  float: right;
  display: flex;
  color: white;
  background-color: gray;
  display: flex-inline;
  padding: 3px;
  border-radius: 3px;

  &:hover {
    color: white;
    background-color: darkred;
  }
`;

export const H2 = styled.h2`
  margin-bottom: 30px;
  font-size: 28px;
  line-height: 24px;
  font-weight: 300;
  margin-top: 20px;
`;

export const Small = styled.small`
  border-bottom: 1px solid darkgrey;
  font-size: 15px;
  width: 100%;
  display: flex;
  min-height: 25px;
  margin-top: 10px;
  margin: 1px;
  padding: 10px;
`;

export const Green = styled.div`
  color: green;
  margin: 1px;
  width: 15px;
`;

export const ButtonForPremium = styled.button`
  background-color: #37c871;
  font-size: 15px;
  padding: 6px;
  margin: 0 auto;
  height: 0 auto;
  color: white;
  margin-top: 20px;
  &:hover {
    color: white;
  }
`;

export const Linkcv = styled(Link)`
  color: orange;
  text-align: center;
`;
export const Iconedit = styled(BiCog)`
  display: inline;
  margin: 2px;
  color: orange;
`;

export const Td = styled.td`
  text-align: center;
`;
export const RapperTable = styled.div``;

export const SectionforLastModified = styled.span`
  float: right;
  margin: 0 auto;
`;

export const SectionforCreatedAt = styled.span`
  float: left;
  text-align: center;
  margin: 0 auto;
`;

export const IconEditNameOfSection = styled(AiTwotoneEdit)``;
