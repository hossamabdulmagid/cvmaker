import styled from "styled-components";

import { Input, Button } from "@chakra-ui/core";
import { Link } from "react-router-dom";

export const COL = styled.div`
  margin-top: 20px;
  padding: 25px;

  margin: 0 auto;
`;

export const Container = styled.div`
  text-align: center;
  align-item: center;
  border: 1px dotted hsl(208deg 79% 51%);
  padding-top: 20px;
  margin-bottom: 120px;
  padding: 25px;
  margin-top: 120px;
  min-height: auto;
`;

export const Title = styled.h1`
  padding: 25px;
  color: white;
  border-radius: 10px;
  min-height: auto;

  animation-name: example;
  animation-duration: 3s;
  background-color: #3182ce;
  @keyframes example {
    0% {
      background-color: red;
      margin: 50px;
      padding: 10px;
    }
    25% {
      background-color: yellow;
    }
    50% {
      background-color: blue;
      margin: 50px;
    }
    100% {
      background-color: purple;
    }
  }
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
  margin-top: 5px;
  min-width: auto;
`;
export const RapperdInput = styled.div`
  margin: 0 auto;
  padding: 5px;
`;

export const Form = styled.form`
  padding: 30px;
`;
export const RapperdAlert = styled.div`
  text-align: center;
  padding: 5px;

  border-radius: 10px;
`;
