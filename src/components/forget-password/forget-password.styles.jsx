import styled from "styled-components";

import { Input, Button } from "@chakra-ui/core";
import { Link } from "react-router-dom";

export const COL = styled.div`
  margin-top: 20px;
  padding: 25px;
`;

export const Container = styled.div`
  text-align: center;
  align-item: center;
  border: 1px dotted hsl(208deg 79% 51%);
  padding-top: 20px;
  margin-bottom: 120px;
  padding: 25px;
  margin-top: 120px;
`;

export const Title = styled.h1`
  padding: 25px;
  color: hsl(208deg 79% 51%);
  padding: 25px;

  font-weight: bold;
`;

export const ButtonSubmit = styled(Button)`
  padding: 20px;
  margin: 20px;
`;

export const LinkForSignInSignUp = styled(Link)`
  color: black;
  padding-top: 25px;
  display: block;
  &:hover {
    color: hsl(208deg 79% 51%);
  }
`;

export const INPUT = styled(Input)`
  margin: 0 auto;
`;
export const RapperdInput = styled.div`
  text-align: center;
  width: 260px;
  margin: 0 auto;
  padding: 5px;
`;

export const Form = styled.form`
  padding: 30px;
`;
export const RapperdAlert = styled.div`
  padding: 5px;
  border-radius: 10px;
`;
