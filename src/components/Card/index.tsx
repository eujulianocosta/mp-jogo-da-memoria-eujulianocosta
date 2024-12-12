import {
  useContext, useEffect, useState,
} from 'react';
import ReactCardFlip from 'react-card-flip';
import { Context } from '../../context/Provider';
import { ICard } from '../../utils/data';

interface ICardProps {
  card: ICard;
  changeAttrCard: (
    cardTarget: ICard,
    newValue: Record<string, boolean>,
    time?: number,
  ) => void;
}

function Card({ card, changeAttrCard }: ICardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { cardsSelected, setCardsSelected } = useContext(Context);

  const handleUpdateCard = (cardTarget: ICard) => {
    setIsFlipped(true);
    changeAttrCard(cardTarget, { showCard: true });
    if (!cardsSelected.some((c) => c.id === cardTarget.id)) {
      setCardsSelected([...cardsSelected, { ...cardTarget, showCard: true }]);
    }
  };

  useEffect(() => {
    if (cardsSelected.length === 2) {
      const [firstCard, secondCard] = cardsSelected;
      if (firstCard.title === secondCard.title) {
        changeAttrCard(firstCard, { grayScale: true }, 1000);
        changeAttrCard(secondCard, { grayScale: true }, 1000);
      } else {
        changeAttrCard(firstCard, { showCard: false }, 1000);
        changeAttrCard(secondCard, { showCard: false }, 1000);

        if (!card.grayScale) {
          setTimeout(() => {
            setIsFlipped(false);
          }, 1000);
        }
      }

      setCardsSelected([]);
    }
  }, [card.grayScale, cardsSelected, changeAttrCard, setCardsSelected]);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <button
        type="button"
        onClick={() => handleUpdateCard(card)}
      >
        <img
          className="min-w-[9rem] lg:min-w-[8rem] w-[9rem] lg:w-[8rem] h-auto hover:cursor-pointer lg:hover:scale-105 transition-all duration-500 ease-in-out"
          src="/images/card.png"
          alt="Imagem do verso do card"
        />
      </button>
      <button
        type="button"
        onClick={() => handleUpdateCard(card)}
        disabled={isFlipped}
      >
        <img
          className={`min-w-[9rem] lg:min-w-[8rem] w-[9rem] lg:w-[8rem] h-auto hover:cursor-not-allowed lg:hover:scale-105 ${card.grayScale ? 'grayscale' : 'grayscale-0'} transition-all duration-500 ease-in-out`}
          src={card.url}
          alt="Imagem da frente do card"
        />
      </button>
    </ReactCardFlip>
  );
}

export default Card;
