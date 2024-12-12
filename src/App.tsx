import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="w-full h-full min-h-screen bg-[url(/images/shen.png)] bg-cover bg-no-repeat bg-left flex flex-col justify-start items-center">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
