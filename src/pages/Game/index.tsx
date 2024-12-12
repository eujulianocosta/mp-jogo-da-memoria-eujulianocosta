import {
  useContext, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Context } from '../../context/Provider';
import { ICard, data } from '../../utils/data';
import Card from '../../components/Card';

let idIntervel = 0;

function Game() {
  const [cards, setCards] = useState<ICard[]>([]);
  const [count, setCount] = useState<number>(0);
  const { name } = useContext(Context);
  const navigate = useNavigate();

  const changeAttrCard = (
    cardTarget: ICard,
    newValue: Record<string, boolean>,
    time = 250,
  ) => {
    setTimeout(() => {
      setCards((prevCards: ICard[]) => prevCards.map((c) => {
        if (c.id === cardTarget.id) {
          return {
            ...c,
            ...newValue,
          };
        }
        return c;
      }));
    }, time);
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.grayScale)) {
      clearInterval(idIntervel);
      void Swal.fire(
        {
          icon: 'success',
          title: 'Parabéns!!',
          text: `Seu tempo foi de ${count} segundos`,
          confirmButtonText: 'Jogar novamente',
        },
      )
        .then((result) => {
          if (result.isConfirmed) {
            setCount(0);
            setCards(data.sort(() => Math.random() - 0.5));
            navigate('/');
          }
        });
    }
  }, [cards, count, navigate]);

  useEffect(() => {
    const shuffledData = data.sort(() => Math.random() - 0.5);
    setCards(shuffledData);
    idIntervel = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
  }, []);

  return (
    <div className="w-screen h-screen max-h-screen bg-[url(/images/kame.jpeg)] bg-cover bg-no-repeat bg-center">
      <div className="flex flex-col items-center justify-center w-5/6 h-full gap-1 py-5 m-auto my-0 lg:p-5">
        <div className="flex flex-col items-center justify-center w-full lg:justify-between lg:flex-row">
          <h1 className="text-[2rem] lg:text-[3rem] font-title text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {name}
          </h1>
          <h1 className="text-[2rem] lg:text-[3rem] min-w-full lg:min-w-[17rem] text-center lg:text-left font-title text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {`Tempo: ${count}`}
          </h1>
        </div>

        <div className="grid h-full grid-cols-2 gap-3 py-1 overflow-y-auto lg:px-10 lg:grid-cols-5">
          {
          cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              changeAttrCard={changeAttrCard}
            />
          ))
        }
        </div>
      </div>
    </div>
  );
}

export default Game;
