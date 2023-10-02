// src/pages/HomePage.jsx

import CookieConsent, { Cookies, getCookieConsentValue, resetCookieConsentValue } from "react-cookie-consent";


function HomePage() {
  console.log(resetCookieConsentValue());
  console.log(getCookieConsentValue());

  return (
      <div>
<CookieConsent
  onAccept={(acceptedByScrolling) => {
    if (acceptedByScrolling) {
      // triggered if user scrolls past threshold
      alert("Accept was triggered by user scrolling");
    } else {
      alert("Accept was triggered by clicking the Accept button");
    }
  }}
>Counts collects cookies to analyze our website traffic and performance; we never collect any personal data 🔐</CookieConsent>
        <h1>Counts</h1>
      </div>
    );
  }
  
  export default HomePage;
  