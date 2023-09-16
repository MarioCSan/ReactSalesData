import { useEffect } from "react";
import { CircleLoader } from "react-spinners";

/**
 * Represents the Loader component.
 * Displays an animated loader with SVG icons.
 *
 * @component
 * @param {function} setShowLoader - A function to set whether the loader should be displayed.
 */

const Loader = ({ setShowLoader }) => {
  useEffect(() => {
    // Automatically hide the loader after a delay
    setTimeout(() => {
      setShowLoader(false);
    }, 2800);
  }, [setShowLoader]);



  return (
    <div className="loader" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: '100%', backgroundColor: '#0a0a19' }}>
      <CircleLoader color="#48a3c6" size={150}/>
      <br/>
      <h1 style={{color: 'white'}}>Cargando datos...</h1>
    </div>
  );
};

export default Loader;