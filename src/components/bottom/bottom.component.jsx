import React, { useState } from 'react'
import { COL, LINK, IMG, RapperText, FLAG, H6, Container, Li, Ul } from './botttom.styles'
import '../../App.css';
const Bottom = () => {
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

    const [links, setLinks] = useState([
        { title: "Help", url: 'help' },
        { title: "Resume tips", url: 'tips' },
        { title: "Language credits", url: 'lang' },

    ]);

    return (
        <Container className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <img src='ico.png' className="edit" alt="" />
                    <RapperText>
                        <p> Secure 256 bit SSL encryption</p>
                        <p>Available on the Chrome webstore</p>
                        <p>  follow updates at @cvmkr </p>
                    </RapperText>
                </div>
                <COL className="col-4">
                    <Ul>

                        {languages.map((lang, i) => (
                            <Li key={i}><LINK to=''>{lang}</LINK> </Li>
                        ))}
                    </Ul>
                </COL>
                <COL className="col-4">
                    <H6>Links  </H6>
                    {links.map((link, i) => (
                        <div key={i}><LINK to={link.url}>{link.title}</LINK></div>

                    ))}

                </COL>

            </div>

        </Container>
    )
};


export default Bottom;

