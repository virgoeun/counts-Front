import code from "../assets/code.png"

function Joke() {
    const imageStyle = {
        width: "450px",  // Adjust the width to your preference
        height: "auto",  // Maintain aspect ratio
      };
    return (
        <div className="joke mb-5 mt-4">
            <h2>🤪 Oops! No Ecommerce Page YET!</h2>
        <h5 className="mb-5 mt-2">Alice wanted to set up an awesome E-commerce page but also needed to sleep... 😪</h5>
        <img src={code} alt="Your Image" style={imageStyle} />
      </div>
    );
  }
  
  export default Joke;