import React from 'react';
import { RapperColor, COL, Small, Color, LINK, COLL } from './signin-signup.styles';
import { Link } from 'react-router-dom';
import Signin from '../../components/sign-in/sign-in.component'
import Signup from '../../components/sign-up/sign-up.component'
const SigninSignup = () => {
    const [download, setDownload] = React.useState(0);
    const [save, setSave] = React.useState(0);

    return (
        <>
            <RapperColor className="container">
                <div className="row">
                    <COL className='col-8'>
                        <Link to='/'>
                            <img src='./logo.png' alt="" />
                        </Link>

                    </COL>
                    <COL className='col-2'>
                        <Small>{download}</Small>
                        <Small onClick={() => setDownload(download + 1)}> downloads</Small>

                    </COL>
                    <COL className='col-2'>
                        <Small>{save} </Small>
                        <Small onClick={() => setSave(save + 1)}>saved CVs </Small>

                    </COL>

                </div>
            </RapperColor>
            <Color>
                <div className="container">
                    <div className="row">
                        <div className="col-6"><Signin /></div>
                        <div className="col-6"><Signup /></div>

                    </div>
                    <div className="row">
                        <div className="col-4"> </div>

                        <div className="col"></div>
                        <COLL className="col">No time to signup? <LINK>Create a resume without signing up</LINK></COLL>
                    </div>
                </div>
            </Color>
        </>
    )
};


export default SigninSignup;
