import { Outlet } from 'react-router-dom'
import Header from '../Shared/Header'

export default function RolltLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}