import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import './App.css';
import { Button } from './components/Shared/Button';

function App() {
  return (
    <RouterProvider router={router} />

  );
}

export default App;
