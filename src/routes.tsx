import { createBrowserRouter } from 'react-router-dom';
import { Button } from './components/Shared/Button';
import { User2 } from 'lucide-react';


export const router = createBrowserRouter([
    {
        children: [
            {
                path: '/',
                element: <Button variant='primary' icon={User2}> teste </Button>
            },
            {
                path: '/result',
                element: <h1>Elemento simulado</h1>
            },
            {
                path: '/historico',
                element: <h1>Elemento simulado</h1>

            }
        ]
    }
])