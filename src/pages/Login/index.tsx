import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/Provider';

function Login() {
  const [disabled, setDisabled] = useState(true);
  const { name, setName } = useContext(Context);
  const navigate = useNavigate();

  const handleValidation = () => {
    const valName = name.trim().length > 0;
    setDisabled(!valName);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/game');
  };

  useEffect(handleValidation, [name]);

  return (
    <div className="lg:relative flex flex-col items-center justify-center gap-5 lg:gap-10 mx-auto pt-[4rem] lg:pt-[8rem] w-5/6 lg:w-fit">
      <div className="flex flex-col items-center justify-center gap-0">
        <img
          className="w-[8rem] lg:w-[10rem]"
          src="/images/brain.png"
          alt="Icone da memória"
        />
        <h1 className="text-[2rem] lg:text-[3.5rem] text-white font-title drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Memory Game</h1>
      </div>

      <form
        className="flex flex-col items-center justify-center w-full gap-5"
        onSubmit={handleSubmit}
      >
        <input
          className="px-[1.5rem] py-[1rem] w-full lg:px-[2rem] lg:py-[1.5rem] rounded-lg focus:outline-none bg-input-background text-[1.5rem] shadow-xl"
          placeholder="Escreva seu nome"
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button
          className="w-full p-[.5rem] lg:px-[2rem] lg:py-[.8rem] rounded-lg text-[2.5rem] font-title disabled:cursor-not-allowed disabled:bg-input-background disabled:text-text-placeholder text-text-button bg-button-background hover:brightness-[.8] shadow-xl"
          type="submit"
          disabled={disabled}
        >
          Play
        </button>
      </form>
      <button type="button" disabled={disabled} onClick={() => navigate('/game')}>
        <img
          className={`lg:absolute -bottom-5 -right-52 w-48 lg:w-52 h-auto z-[999]
          ${disabled ? 'grayscale hover:cursor-not-allowed' : 'grayscale-0 hover:scale-110 transition-all duration-500 ease-in-out'}`}
          src="/images/dragon-ball.png"
          alt="Imagem da esfera do dragão de 4 estrelas"
        />
      </button>
    </div>
  );
}

export default Login;
