import { useState } from "react";
import {
  COL,
  LINK,
  IMG,
  RapperText,
  FLAG,
  H6,
  Container,
  Li,
  RapperdCols,
  Ul,
} from "./botttom.styles";
import "../../App.css";
import { Row, Col } from "react-bootstrap";
import { RapperdCol } from "../nav-guest/navGuest.styles";
const Bottom = () => {
  const [languages, setLanguages] = useState([
    "English",
    "العربية",
    "Български",
    "Čeština",
    "Dansk",
    "Deutsch",
    "Eesti",
    "keel",
    "ქართული",
    "Dutch",
    "Español",
    "فارسی",
    "Français",
    "Galician",
    "Έλληνικά",
    "Hungarian",
    "Italiano",
    "עברית",
    "한국어",
    "Norsk",
    "Polski",
    "Português",
    "Român",
    "Pусский",
    "Slovenščina",
    "Slovenský",
    "Shqip",
    "Suomi",
    "Svenska",
    "Türkçe",
    "Українська",
    "Tiếng",
    "Việt",
    "മലയാളം",
    "中文",
    "繁體中文",
    "Hrvatski",
  ]);

  const [links, setLinks] = useState([
    { title: "Help", url: "help" },
    { title: "Resume tips", url: "tips" },
    { title: "Language credits", url: "lang" },
  ]);

  return (
    <Container className="container-fluid no-printme">
      <div className="container no-printme">
        <div className="row no-printme">
          <Col xs={12} md={4} lg={4} className="no-printme">
            <RapperdCols className="no-printme">
              <H6>System </H6>
              <RapperText>
                <p> Secure 256 bit SSL encryption</p>
                <p>Available on the Chrome webstore</p>
                <p> follow updates at @cvCreator </p>
              </RapperText>
            </RapperdCols>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <RapperdCols>
              <H6>Language </H6>
              <Ul>
                {languages.map((lang, i) => (
                  <Li key={i}>
                    <LINK to="">{lang}</LINK>{" "}
                  </Li>
                ))}
              </Ul>
            </RapperdCols>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <RapperdCols>
              <H6>Links </H6>
              {links.map((link, i) => (
                <div key={i}>
                  <LINK to={link.url}>{link.title}</LINK>
                </div>
              ))}
            </RapperdCols>
          </Col>
        </div>
      </div>
    </Container>
  );
};

export default Bottom;
