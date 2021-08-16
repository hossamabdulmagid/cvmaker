import { Rapper, Box, Ol, Li, P, IMG, Title, Ph, H5 } from "./help.styles";
import NavGuest from "../../components/nav-guest/navGuest.component";
const Help = () => {
  return (
    <>
      <NavGuest />
      <Rapper className="container-fluid">
        <div className="container">
          <H5>Quick help</H5>
          <Box className="container">
            <Ol>
              <Li>Creating and managing CVs</Li>
              <Li>Adding and ordering CV sections</Li>
              <Li>Renaming sections</Li>
              <Li>Adding entries in special sections</Li>
              <Li>Re-ordering entries in special sections</Li>
              <Li>Forcing page-breaks</Li>
              <Li>Save, preview, and download</Li>
              <Li>Publishing and sharing your CV online</Li>
            </Ol>
          </Box>
          <P>
            There are e-learning modules available that advise you on effective
            resume writing. You can access them here
          </P>
          <hr />

          <div className="row">
            <div className="col-8">
              <Title>Creating and managing CVs</Title>
              <Ph>
                Once you have logged in to your account, you will be presented
                with a home screen. Click on the Create a new CV. A dialog box
                will show asking for a name. Give your CV a name, for example,
                “My academic resume”, and you will be presented with the CV
                creation wizard where you will provide all your details. The
                same home screen lists all you the CVs you have created. You can
                edit a CV by clicking on its name.
              </Ph>
              <IMG src="help2.png" alt="" />
            </div>
            <div className="col-4">
              <IMG src="help1.png" alt="" />
            </div>
          </div>
          <hr />

          <div className="row">
            <div className="col-4">
              <Title> Adding and ordering CV sections</Title>
              <IMG src="help3.png" alt="" className="editphotos" />
            </div>
            <div className="col-8">
              <Ph>
                A CV consists of several sections, Work experience, Education,
                References and so forth. You can change the order of how these
                appear in your CV by clicking on a section name, and dragging it
                vertically and dropping it in the desired place. You can reorder
                all sections except for Basic information You can add custom
                sections to your, for example, “Personal projects” or “Awards
                and achievements” CV by clicking the Add a new section button.
              </Ph>
            </div>
          </div>
          <hr />
          <div className="container">
            <div className="container">
              <Title>Renaming sections</Title>
              <Ph>
                You can rename any of the sections in your CV by clicking the
                tiny pencil icon to the right of the section name.
              </Ph>
            </div>
            <IMG src="help4.png" alt="" />
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <Title>Adding entries in special sections</Title>
              <IMG src="help5.png" alt="" />
            </div>
            <div className="col">
              <Ph>
                Work experience and Education are special sections to which you
                can add multiple entries, that is, details of your past jobs and
                schooling. To add a new entry, click the 'Add entry' button. You
                can delete an entry by clicking the Delete button underneath it.
              </Ph>
            </div>
          </div>
          <hr />

          <div className="container">
            <div className="row">
              <div className="col-9">
                <Ph>
                  Re-ordering entries in special sections Collapse button You
                  can re-order the entries you add in Work experience and
                  Education by simply clicking on them and dragging. However,
                  when you have many entries, it becomes difficult to drag them
                  vertically across the page. You can collapse the entries for
                  easy re-ordering by clicking in the collapse icon to the right
                  of the section title along with the rename icon. Once the
                  entries are collapsed, you can reorder them easily by clicking
                  and dragging. Clicking on the collapse icon again will expand
                  the entries to their normal state.
                </Ph>
              </div>
              <div className="2">
                <IMG src="help6.png" alt="" />
              </div>
            </div>
          </div>
          <IMG src="help7.png" alt="" />
          <hr />
          <div className="container">
            <div className="row">
              <div className="col-10">
                <Title>Forcing page-breaks</Title>
                <Ph>
                  Page-break button It's impossible to automatically deduce
                  where a pagebreak is aesthetic, and for that reason,
                  sometimes, you get pagebreaks in undesired places. In such
                  cases, or for whatever reason, to force a page break in the
                  output PDF, use the page-break button in the editor toolbar.
                  This inserts the [page-break] tag, that becomes a hard
                  page-break in the PDF you download.
                </Ph>
              </div>
              <div className="col-2">
                <IMG src="help8.png" alt="" />
              </div>
            </div>
            <hr />
            <div className="">
              <div className="row">
                <div className="col">
                  <Title>Save, preview, and download</Title>
                  <Ph>
                    The Save button saves the CV you are editing to your account
                    Preview lets you preview your CV in a template of your
                    choice in the browser without having to download it. Quite
                    useful to check progression as your work on your CV.
                    Download lets you download a copy of your CV (PDF or HTML)
                    to your computer in a style of your choice.
                  </Ph>
                </div>
                <div className="col">
                  <IMG src="help9.png" alt="" />
                </div>
              </div>
            </div>
            <hr />
            <div className="container">
              <div className="row">
                <div className="col-7">
                  <Title>Publishing and sharing your CV online</Title>
                  <IMG src="help10.png" alt="" />
                  <Ph>
                    The sharing options dialog shows the public URL of your CV
                    which you can copy and share with anyone. You can also share
                    your CV on Facebook, Twitter, and other social network sites
                    by clicking on the appropriate buttons. The sharing options
                    dialog also presents you to the different style choices
                    available. Choose the style you wish to publish your CV in,
                    and press OK to save your preference.
                  </Ph>
                </div>
                <div className="col-5">
                  <Ph>
                    CV Maker can host online copies of your CVs so that you can
                    publish and share them. Clicking on the Share button beside
                    your CV in the home screen will bring up the sharing
                    options.
                  </Ph>
                  <IMG src="help11.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Rapper>
    </>
  );
};

export default Help;
