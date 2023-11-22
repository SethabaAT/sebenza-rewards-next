"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import SingleCard from "./components/SingleCard";

interface Card {
  id: number;
  f_src: string;
  b_src: string;
}

const tileImages = [
  { f_src: "/img/trolley.png" },
  { f_src: "/img/try-again.jpg" },
  { f_src: "/img/trolley.png" },
  { f_src: "/img/sbicon.png" },
  { f_src: "/img/try-again.jpg" },
  { f_src: "/img/trolley.png" },
  { f_src: "/img/sbicon.png" },
  { f_src: "/img/try-again.jpg" },
];

const coverImages = [
  { b_src: "/img/cover-1.png" },
  { b_src: "/img/cover-2.png" },
  { b_src: "/img/cover-3.png" },
  { b_src: "/img/cover-4.png" },
  { b_src: "/img/cover-4.png" },
  { b_src: "/img/cover-4.png" },
  { b_src: "/img/cover-4.png" },
  { b_src: "/img/cover-4.png" },
  { b_src: "/img/cover-4.png" },
  { b_src: "/img/cover-4.png" },
  { b_src: "/img/cover-11.png" },
  { b_src: "/img/cover-4.png" },
  { b_src: "/img/cover-4.png" },
  { b_src: "/img/cover-4.png" },
  { b_src: "/img/cover-4.png" },
  { b_src: "/img/cover-4.png" },
];

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(3);
  const [choice, setChoice] = useState<Card>();
  const [choice2, setChoice2] = useState<Card>();
  const [choice3, setChoice3] = useState<Card>();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // shuffle cards
    const shuffleCards = () => {
      const shuffledCards = tileImages
        .concat(tileImages) // Duplicate front images for pairs
        .sort(() => Math.random() - 0.5)
        .map((card, index) => ({
          id: Math.random(),
          f_src: card.f_src,
          b_src: coverImages[index % coverImages.length].b_src, // Use modulo to cycle through cover images
        }));

      setCards(shuffledCards);
    };

    shuffleCards();
  }, []);

  // Hanlde choice function
  const handleChoice = (card: any) => {
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
    console.log("Wow you won", card.f_src);
  };

  useEffect(() => {
    if (choice && choice2 && choice3) {
      setDisabled(true);
    }
  }, [choice, choice2, choice3]);

  return (
    <div className={`${styles.homeContainer} color-yellow`}>
      <h1 className="text-5xl font-semibold m-6">
        Welcome to Sebenza&nbsp;Rewards
      </h1>

      <p className="my-4 text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
        debitis at dicta necessitatibus+
      </p>

      <div className={`grid grid-cols-4 gap-2`}>
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

      <p className="mt-2 text-sm font-semibold">Turns left: {turns}</p>
    </div>
  );
}
