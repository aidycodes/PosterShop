'use client'
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import { LINKS } from "../nav-links";
import { Chewy, Fredoka } from 'next/font/google'
 
const chewy = Chewy({
    weight: '400',
    subsets: ['latin'],
})

const fredoka = Fredoka({
    weight: '400',
    subsets: ['latin'],
})
 

const MobileMenu = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <div className="cursor-pointer" onClick={toggleMenu}>{children}</div>
            <div
                className={`
                    fixed top-0 left-0 w-full h-full z-50
                    transition-all duration-500 ease-in-out
                    ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-8 pointer-events-none'}
                `}
                style={{ backgroundColor: 'rgba(191, 219, 254, 0.95)' }} // bg-blue-200 with opacity
            >
                <div className="absolute top-4 right-4 text-right cursor-pointer">
                    <button onClick={toggleMenu}><p className={`${fredoka.className} tracking-widest text-6xl font-mono text-white cursor-pointer rounded transition-colors duration-200`} >X</p></button>
                </div>
                <div className="flex flex-col items-center justify-center h-full">

                    {LINKS.map((link) => (

                        <Link key={link.label}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                        className={`${chewy.className} tracking-widest text-4xl font-mono text-white py-2 px-6 rounded transition-colors duration-200`}
                    >
                        {link.label}
                    </Link>
                    ))}
                </div>
            </div>
        </>
    )
};

export default MobileMenu;