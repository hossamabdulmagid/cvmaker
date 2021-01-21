import styled from "styled-components";

export const Rapper = styled.div`
  position: fixed;
  width: 500px;
  height: 200px;
  min-width: auto;
  min-height: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: darkgray;
  ..popup {
    position: absolute;
    left: 25%;
    right: 25%;
    top: 25%;
    bottom: 25%;
    margin: 10%;
    border-radius: 20px;
    background: white;
  }
  .btn btn-danger {
    margin-left: 10px;
  }
`;
