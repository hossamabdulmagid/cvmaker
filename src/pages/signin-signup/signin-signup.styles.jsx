import styled from 'styled-components'

import { Link } from 'react-router-dom';


export const RapperColor = styled.div`
background-color:#FFFFFF;
height:80px;
padding:15px;
`;


export const COL = styled.div`
display:block;
`;


export const Small = styled.small`
display:block;
font-size:18px;
`;


export const Color = styled.div`
background-color:#F9F9F9;
height:550px;
margin-bottom:25px;
`;


export const LINK = styled(Link)`
display: inline;
padding: 5px 10px;
margin-left: 15px;
background: #18c7e1;
box-shadow: inset 0 0 10px #17bdd3;
text-shadow: 1px 1px #17bdd3;
color: #fff;
border-color: #18c7e1;
font-size: 11px;
font-weight: 400;
line-height: 1.5;
border-radius:11px;
&:hover{
    text-decoration:none;
color:white;
}
    `;


export const COLL = styled.div`
margin-top: 35px;
    `;