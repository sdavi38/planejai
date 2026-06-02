import { Outlet } from 'react-router-dom'
import Header from '../Shared/Header'

export default function RootLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}