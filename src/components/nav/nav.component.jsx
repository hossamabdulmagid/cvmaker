import React, { useState } from 'react';
import { Rapper, Span, LINK, Select, Icon, Small } from './nav.styles'
import { BsFillLockFill } from "react-icons/bs";
import { auth } from '../../firebase/firebase.utils'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const Nav = ({ currentUser, displayName }) => {

    const [languages, setLanguages] = useState([
        "English", "العربية", "Български",
        "Čeština", "Dansk", "Deutsch",
        "Eesti", "keel", "ქართული",
        "Dutch", "Español", "فارسی",
        "Français", "Galician", "Έλληνικά",
        "Hungarian", "Italiano", "עברית",
        "한국어", "Norsk", "Polski",
        "Português", "Român", "Pусский",
        "Slovenščina", "Slovenský", "Shqip",
        "Suomi", "Svenska", "Türkçe",
        "Українська", "Tiếng", "Việt",
        "മലയാളം", "中文", "繁體中文", "Hrvatski",]);

    return (
        <Rapper>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <Span>Create, maintain, publish, and share your CVs for free</Span>
                    </div>
                    <div className="col-2">

                        <Select>
                            {
                                languages.map((singlelang, i) => (
                                    <option key={i}>
                                        {singlelang}
                                    </option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="col-3">

                        {
                            currentUser ?
                                <LINK onClick={() => auth.signOut()}> <span>  Sign Out</span>
                                    <Small> ({currentUser.displayName}) </Small>
                                </LINK>
                                :
                                <>

                                    <Icon className="lock" />
                                    <LINK to='/login'>
                                        Login | Signup
                                  </LINK>
                                </>

                        }

                    </div>
                </div>

            </div>
        </Rapper >
    );
};
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})
export default connect(mapStateToProps)(Nav);