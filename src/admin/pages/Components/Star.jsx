import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Star = ({ rating }) => {
  return (
    <div>
      {Array.from({ length: Math.floor(rating) }, (_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} className="text-warning"/>
      ))}
    </div>
  );
};
