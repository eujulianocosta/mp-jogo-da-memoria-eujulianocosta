import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen gap-2">
      <h1 className="text-[2rem] lg:text-[3rem] font-title text-white">ERROR 404</h1>
      <img className="w-[19rem] lg:w-[30rem]" src="/images/404.jpg" alt="Imagem de Erro 404" />
      <button
        className="absolute px-4 py-2 text-xl font-bold text-white rounded bg-button-background bottom-24 lg:bottom-28 hover:brightness-[.8] focus:outline-none"
        type="button"
        onClick={() => navigate('/')}
      >
        Voltar
      </button>
    </div>
  );
}

export default NotFound;
