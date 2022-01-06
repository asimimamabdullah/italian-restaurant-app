import React from "react";
import Footer from "./../Home/Sections/Footer";
import "./About.css";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import FacebookIcon from "../../Images/facebookicon.png";
import InstagramIcon from "../../Images/instagramicon.png";
import TripAdvisorIcon from "../../Images/tripadvisor.png";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import logo from '../Header/newlogoblack.png'

const About = () => {
  return (
    <>
      <div className="about">
        <div className="about__frontImg">
          <div className="about__frontImg-text">
            <h1>Prendi il Tuo Cibo extra Delizioso Preferito o Prenota Subito un Tavolo!</h1>
          </div>
        </div>
        <div className="about__content">
          <br />
          <h3>
            Se vuoi immergerti in sapori nuovi e particolari,
            scegli il nostro ristorante Shahì a Soliera, in provincia di Modena.
            Siamo specializzati nell'offrire le migliori specialità indiane e
            La cucina pakistana è a base di riso, carne, verdure, spezie e
            legumi, ma non solo.
            <br />
            <br />
            Siamo anche una pizzeria con un menù ricco di classici e originali
            proposte, farcite con ingredienti emiliani sempre freschi
            preferenza. Contattaci per prenotare un tavolo o per richiedere il nostro take-away
            o consegna a domicilio cucina etnica.
          </h3>
        </div>

        <div className="about__details">
          <div className="about__logo-name">
            <img
              className="about__details-logoImg"
              src={logo}
              alt=""
              width="280"
            />
            <div className="about__details-field">
              <h3>Pakistani Indian Shahì Restaurant</h3>
            </div>
          </div>

          <div className="about__details-flex">
            <div className="about__details-flex-field">
              <div className="about__details-flex-field-icon">
                <FmdGoodRoundedIcon className="about__details-flex-field-icon-svg" />
              </div>
              <p>Via Carpi Ravarino 124/126 41019 Soliera (MO)</p>
            </div>
            <div className="about__details-flex-field">
              <div className="about__details-flex-field-icon">
                <EmailRoundedIcon className="about__details-flex-field-icon-svg" />
              </div>
              <p>ristorante.shahi@gmail.com</p>
            </div>
            <div className="about__details-flex-field">
              <div className="about__details-flex-field-icon">
                <PhoneRoundedIcon className="about__details-flex-field-icon-svg" />
              </div>
              <p>+39 059 3968633</p>
            </div>
            <div className="about__details-flex-field">
              <div className="about__details-flex-field-icon">
                <CancelRoundedIcon className="about__details-flex-field-icon-svg" />
              </div>
              <p>
                <span>Monday:</span> <span>Closed</span>
              </p>
            </div>

            <div className="about__details-flex-field">
              <div className="about__details-flex-field-icon">
                <FmdGoodRoundedIcon className="about__details-flex-field-icon-svg" />
              </div>
              <p>
                <span>Tue - Sun:</span> <span>7:00 AM - 11:00 PM</span>
              </p>
            </div>

            <div className="about__details-flex-field socialIcons">
              <a href="https://www.facebook.com/shahiristorante">
                <img src={FacebookIcon} alt="" className="socialLinksIcons" />
              </a>
              <a href="https://www.instagram.com/shahi_ristorante/">
                <img src={InstagramIcon} alt="" className="socialLinksIcons" />
              </a>
              <a href="https://www.tripadvisor.it/Restaurant_Review-g1931037-d15662862-Reviews-Shahi_Ristorante_Pizzeria-Soliera_Province_of_Modena_Emilia_Romagna.html">
                <img
                  src={TripAdvisorIcon}
                  alt=""
                  className="socialLinksIcons"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;


// import React, { useState, useEffect } from 'react'
// import cookie from "react-cookies";
//
// import { googleTranslate } from '../../utils/googleTranslate';
//
// const About = () => {
//
//   const [data, setData] = useState({
//     languageCodes: [],
//     language: cookie.load("language") ? cookie.load("language") : "en",
//     question: cookie.load("question")
//       ? cookie.load("question")
//       : "What language do you prefer to read with?"
//   })
//
//   const getLanguageCodes = languageCodes => {
//     setData(prevData => ({ ...prevData, languageCodes }));
//   };
//
//   useEffect(() => {
//     googleTranslate.getSupportedLanguages("en", function(err, languageCodes) {
//       getLanguageCodes(languageCodes); // use a callback function to setState
//     });
//
//   }, [])
//
//
//
//   const changeHandler = language => {
//     let { question } = data;
//     let cookieLanguage = cookie.load("language");
//     let transQuestion = "";
//
//     const translating = transQuestion => {
//       if (question !== transQuestion) {
//         setData(prevData => ({ question: transQuestion, ...prevData }));
//         cookie.save("question", transQuestion, { path: "/about" });
//       }
//     };
//
//     // translate the question when selecting a different language
//     if (language !== cookieLanguage) {
//       googleTranslate.translate(question, language, function(err, translation) {
//         transQuestion = translation.translatedText;
//         translating(transQuestion);
//       });
//     }
//
//     setData(prevData => ({ language, ...prevData }));
//     cookie.save("language", language, { path: "/about" });
//   };
//
//   return (
//     <div>
//       <div style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         height: "100vh",
//         width: "100wh"
//       }}>
//         <p>{data?.question}</p>
//
//         {/* iterate through language options to create a select box */}
//         <select
//           className="select-language"
//           value={data?.language}
//           onChange={e => changeHandler(e.target.value)}
//         >
//           {data?.languageCodes?.map(lang => (
//             <option key={lang.language} value={lang.language}>
//               {lang.name}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   )
// }
//
// export default About
