"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import SingleCard from "./components/SingleCard";

// Define the Card type
interface Card {
  id: number;
  front_img_src: string;
  back_img_src: string;
  reward: string;
}

// Reward pics and messages
const tileImages = [
  {
    front_img_src: "/img/trolley.png",
    reward: "Congratulations You have won Grocery Voucher",
  },
  {
    front_img_src: "/img/try-again.jpg",
    reward: "Try Again Tomorrow",
  },
  {
    front_img_src: "/img/trolley.png",
    reward: "Congratulations You have won Grocery Voucher",
  },
  {
    front_img_src: "/img/sbicon.png",
    reward: "Congratulations you got 15 SB",
  },
  { front_img_src: "/img/try-again.jpg", reward: "Try Again Tomorrow" },
  {
    front_img_src: "/img/trolley.png",
    reward: "Congratulations You have won Grocery Voucher",
  },
  {
    front_img_src: "/img/sbicon.png",
    reward: "Congratulations you got 15 SB",
  },
  { front_img_src: "/img/try-again.jpg", reward: "Try Again Tomorrow" },
  { front_img_src: "/img/try-again.jpg", reward: "Try Again Tomorrow" },
];

// Cover pages
const coverImages = [
  { back_img_src: "/img/covers/Tile 1.png" },
  { back_img_src: "/img/covers/Tile 2.png" },
  { back_img_src: "/img/covers/Tile 3.png" },
  { back_img_src: "/img/covers/Tile 4.png" },
  { back_img_src: "/img/covers/Tile 5.png" },
  { back_img_src: "/img/covers/Tile 6.png" },
  { back_img_src: "/img/covers/Tile 7.png" },
  { back_img_src: "/img/covers/Tile 8.png" },
  { back_img_src: "/img/covers/Tile 9.png" },
];

export default function Home() {
  // States for the page
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(3);
  const [choice, setChoice] = useState<Card>();
  const [choice2, setChoice2] = useState<Card>();
  const [choice3, setChoice3] = useState<Card>();
  const [disabled, setDisabled] = useState(false);

  // A function the front cards and then set disabled to false
  const shuffleCards = () => {
    // If the the third choice has not been made yet then the cards can be shuffled
    if (!choice3) {
      const shuffledCards = tileImages

        .sort(() => Math.random() - 0.5) // Radomize them
        .map((card, index) => ({
          id: Math.random(),
          front_img_src: card.front_img_src,
          back_img_src: coverImages[index % coverImages.length].back_img_src, // Use modulo to cycle through cover images
          reward: card.reward,
        }));

      // Cards becomes an array of objects of type Card
      setCards(shuffledCards);
      setDisabled(false);
    }
  };

  // When the app loads the rewards get shuffled
  useEffect(() => {
    // Call the function
    shuffleCards();
  }, []);

  // Hanlde choice function - Set the choice from null
  const handleChoice = (card: any) => {
    // If the first card is turned set the second and if the second the set the third one else set firt choice
    if (choice) {
      if (choice2) {
        setChoice3(card);
      } else {
        setChoice2(card);
      }
    } else {
      setChoice(card);
    }

    setTurns(turns - 1);
    console.log(card.reward);
  };

  // This function runs everytime a new choice is clicked
  useEffect(() => {
    // If we allow the user to redeem 3 times

    // if (choice && choice2 && choice3) {
    //   setDisabled(true);
    // }

    if (choice) {
      setDisabled(true);
    }
  }, [choice, choice2, choice3]);

  return (
    <div className={`${styles.homeContainer} color-yellow`}>
      <h1 className="text-4xl font-semibold m-4 max-[360px]:text-3xl">
        Welcome to Sebenza&nbsp;Rewards
      </h1>

      <p className="my-4 text-lg max-[360px]:text-base max-[360px]:my-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        debitis at dicta necessitatibus+
      </p>

      <div className={`grid grid-cols-3 gap-3`}>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choice || card === choice2 || card === choice3}
            disabled={disabled}
          />
        ))}
      </div>

      {/* <button className={styles.btnNewGame} onClick={shuffleCards}>
        Try Again
      </button> */}

      {/* <p className="mt-2 text-sm font-semibold">Turns left: {turns}</p> */}
    </div>
  );
}
