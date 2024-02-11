import { Container, Button } from "react-bootstrap";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
const Base = ({
  title = "Page Title",
  description = "Welcome To Dyanamic Electronic Store",
  buttonEnabled = false,
  buttonText = "Shop Now",
  buttonType = "primary",
  buttonLink="/",
  children,
}) => {
  let styleContainer = {
    height:"200px"
  };
  return (
    <>
      <div>
        <Container
          fluid
          style={styleContainer}
          className="bg-dark p-5 text-white text-center d-flex flex-column align-items-center justify-content-center"
        >
          <h3 className="text-center">{title}</h3>
          <p className="text-center">{description && description}</p>

          {buttonEnabled && <Button as={NavLink} to={buttonLink} variant={buttonType}  >{buttonText}</Button>}
        </Container>
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Base;
