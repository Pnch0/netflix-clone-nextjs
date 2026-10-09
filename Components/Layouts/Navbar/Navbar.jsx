"use client";
import React, { useState, useEffect } from "react";
import './Navbar.css';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { MdMovie } from "react-icons/md";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";

function Navbar(){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [inputValue, setInputValue] = useState(searchParams.get('q') || '');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setInputValue(searchParams.get('q') || '');
    }, [searchParams]);

    const handleSearchChange = (e) => {
        const valor = e.target.value;
        setInputValue(valor);

        if (valor.trim().length > 0) {
            router.push(`/?q=${encodeURIComponent(valor)}`);
        } else {
            router.push('/');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return(
        <>
        <div className="Contenedor-Navbar">
            <div className="ContenedorNavbar-Izquierda">
                <div className="ContenedorNavbarIzquierda-Izquierda">
                    <MdMovie className="Icono-Navbar"/>
                </div>
                
                <div className="Mobile-Menu-Toggle" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </div>

                <div className={`ContenedorNavbarIzquierda-Derecha ${isMobileMenuOpen ? 'active' : ''}`}>
                    <ul>
                        <li>
                            <Link href="/" className={pathname === '/' ? "nav-item active" : "nav-item"} onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/series" className={pathname === '/series' ? "nav-item active" : "nav-item"} onClick={closeMobileMenu}>
                                Series
                            </Link>
                        </li>
                        <li>
                            <Link href="/films" className={pathname === '/films' ? "nav-item active" : "nav-item"} onClick={closeMobileMenu}>
                                Peliculas
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className={`ContenedorNavbar-Derecha ${isMobileMenuOpen ? 'active' : ''}`}>
                <div className="ContenedorNavbar-Input">
                    <FaSearch className="Icono-Buscador" />
                    <input
                        type="text"
                        placeholder="Titulos, personas, generos"
                        value={inputValue}
                        onChange={handleSearchChange}
                    />
                </div>
                
                <div className="Contenedor-Logout" onClick={handleLogout}>
                    Cerrar Sesión
                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar;
