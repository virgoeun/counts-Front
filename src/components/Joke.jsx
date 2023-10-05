import code from "../assets/code.png"

function Joke() {
    const imageStyle = {
        width: "450px",  // Adjust the width to your preference
        height: "auto",  // Maintain aspect ratio
      };
    return (
        <div className="joke">
            <h2>🤪 Oops! No Ecommerce Page YET!</h2>
        <h4>Alice wanted to set up an E-commerce page but also needed to sleep... 😪</h4>
        <img src={code} alt="Your Image" style={imageStyle} />
      </div>
    );
  }
  
  export default Joke;