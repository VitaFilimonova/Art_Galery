import React, { FC } from "react";
import classes from "./CardItem.module.scss";
import { IPaintings } from "../models/IPaintings";

interface CardItemProps {
  painting: IPaintings;
  author: any;
  location: any;
}

const CardItem: FC<CardItemProps> = ({ painting, author, location }) => {
  if (!painting || !author || !location) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={classes.card}>
      <img
        src={`https://test-front.framework.team${painting.imageUrl}`}
        alt=""
      />
      <div className={classes.description}>
        {painting.name}
        <div className={classes.description__text}>
          <div className={classes.description__text_elem} data-label="Author: ">
            {" "}
            {author.name}
          </div>
          <div
            className={classes.description__text_elem}
            data-label="Created: "
          >
            {" "}
            {painting.created}
          </div>
          <div
            className={classes.description__text_elem}
            data-label="Location: "
          >
            {" "}
            {location.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
