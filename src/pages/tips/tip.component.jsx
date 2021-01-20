import { RapperColor, Title, Ph, H5 } from "./tips.styles";
import NavGuest from "../../components/nav-guest/navGuest.component";

const Tips = () => {
  return (
    <>
      <NavGuest />
      <RapperColor>
        <div className="container">
          <Title> Resume / CV tips — a common sense approach.</Title>
          <Ph>
            Over the years, the magnitude of resume creation tips that have been
            produced is staggering. While the resume requirements and
            expectations change from company to company and domain to domain, a
            lot of it really comes down to common sense. Here, we summarise a
            few common sense tips on writing resumes.
          </Ph>
          <H5> Write a proper Objective</H5>
          <Ph>
            Avoid writing generic and vague objective statements such as
            “Execllent team player seeking career growth”. Make it relevant and
            short, for example, “A beginner network administrator looking for a
            position in corporate network administration”.
          </Ph>
          <H5>Keep it short and concise</H5>
          <Ph>
            Keep information minimal, concise, and optimal. Optimal is key —
            short doesn't mean too short. When you describe your work
            experience, for instance, highlight key points such as your
            achievements. Know how to cherry pick the most important bits of
            information to showcase in your resume. Avoid writing paragraphs and
            paragraphs of text; try using bullet points instead. Overall, try to
            condense your resume to two or three pages.
          </Ph>
          <H5>Quality — spelling and grammar</H5>
          <Ph>
            Content rife with typos and grammatical errors are an instant turn
            off. Spell check and proof read your resume twice.
          </Ph>
          <H5>Tailor for targets</H5>
          <Ph>
            Tailor your resume to target the employer you are sending it to.
            Avoid using one generic resume for all settings. Often, minor
            modifications will suffice. The reader should get the impression
            that your resume was written for them.
          </Ph>
          <H5>Be careful with personal information</H5>
          <Ph>
            Including personal information such as birth date, age, gender, and
            marital status is not generally recommended, as they may aid
            selection bias on the employer's part. Be careful with such
            information; only provide what is necessary for the purpose.
          </Ph>
          <H5>Use common sense</H5>
          <Ph>
            While the above tips are only meant to be helpful pointers, creating
            a good resume ultimately comes down to you. Use your common sense,
            be patient, and put time and effort into creating a decent resume.
          </Ph>
          <H5>
            {" "}
            There are e-learning modules available that advise you on effective
            resume writing. You can access them here.
          </H5>
          <Ph>See CV Maker featured on resume template list.</Ph>
        </div>
      </RapperColor>
    </>
  );
};
export default Tips;
