import PropTypes from "prop-types";

function Card(props) {
  return (
    <>
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
      <p>
        <em>{props.description}</em>
      </p>
    </>
  );
}

Card.propTypes = {
  imageLink: PropTypes.string,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
