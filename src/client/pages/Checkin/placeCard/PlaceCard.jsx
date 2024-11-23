import './PlaceCard.css';



import React from 'react'

const PlaceCard = ({img, name, address, fee}) => {
  return (
    <>
    <div className="place-card-container">
          <div className="place-card-image">
          <img src={img} />
          </div>
          <div className="place-card-category"> {name} </div>
          <div className="place-card-heading">
            {" "}
            {address}
            <div className="place-card-author">
              {" "}
              <span className="place-card-name">Phí: </span> {fee}
            </div>
          </div>
        </div>
    </>
  )
}

export default PlaceCard;