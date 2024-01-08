import PropTypes from "prop-types";
import { Button } from "@mui/material";

function Card(props) {
  return (
    <>
      <p>
        <em>{props.description}</em>
      </p>
      {props.imageLink ? (
        <img
          src={props.imageLink}
          alt={props.title}
          className="w-full rounded-lg"
        />
      ) : (
        <p>No image available</p>
      )}
      <div className="flex justify-between font-black">
        <p>{props.title}</p>
        <p>${props.price}</p>
      </div>

      <Button variant="contained" onClick={props.onClick}>
        Edit{" "}
      </Button>
    </>
  );
}

Card.propTypes = {
  imageLink: PropTypes.string,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Card;
