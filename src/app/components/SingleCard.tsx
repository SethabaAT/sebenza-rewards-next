import React from "react";
import styles from "../styles.module.css";

interface SingleCardProps {
  card: {
    front_img_src: string;
    back_img_src: string;
  };
  handleChoice(card: any): any;
  flipped: boolean;
  disabled: boolean;
}

function SingleCard({
  card,
  handleChoice,
  flipped,
  disabled,
}: SingleCardProps) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return disabled ? (
    <div className="card flex justify-center">
      <div className={flipped ? `${styles.flipped}` : ""}>
        <img
          src={card.front_img_src}
          className={`${styles.front} rounded-xl shadow-lg`}
          alt="card front"
        />

        <img
          src={card.back_img_src}
          className={
            flipped
              ? `${styles.back} rounded-xl shadow-xl`
              : `${styles.blurBack} rounded-xl shadow-lg`
          }
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  ) : (
    <div className="card flex justify-center">
      <div className={flipped ? `${styles.flipped}` : ""}>
        <img
          src={card.front_img_src}
          className={`${styles.front} rounded-xl shadow-lg`}
          alt="card front"
        />

        <img
          src={card.back_img_src}
          className={`${styles.back} rounded-xl shadow-lg`}
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SingleCard;
