
'use client'
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import youtube from '@/Assets/images/social/youtube.svg'
import instagram from '@/Assets/images/social/instagram.svg'
import twitter from '@/Assets/images/social/twitter.svg'
import telegram from '@/Assets/images/social/telegram.svg'
// import abtbg from '@/Assets/images/abt-bg.avif';




const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#e4edff07]   border-[#a4a7ba6e]  backdrop-blur  py-8 footermain top-full sticky  border-t  px-4">
            {/* <Image
                src={abtbg}
                alt="Banner Background"
                className="absolute top-0 left-0  w-full h-full z-0   object-center opacity-100 transform overflow-visible hue-rotate-[80deg] "
                layout="fill"
            // priority={true}
            /> */}
            <div className="container mx-auto   rounded-xl">
                <div className="flex flex-col-reverse sm:flex-row flex-wrap justify-center sm:justify-between items-center">
                    <div className="text-center mt-5 sm:mt-0">
                        <p className="bnr-desc text-xl text-white">
                            &copy; {currentYear} <span className="text-[#dfe6ff]">Dexora</span> All rights reserved.
                        </p>
                    </div>
                    <div className="flex space-x-5 justify-center sm:justify-start items-center mx-auto sm:mx-0">
                        <Link className="bg-white/5 p-2 rounded-lg opacity-85 hover:opacity-100 border border-[#404052]" href="https://x.com/DexoraFinance" target="_blank" rel="noopener noreferrer">
                            <Image src={twitter} alt="twitter" width={100} height={100}
                                className="w-auto h-6 hover:-rotate-[25deg] transition-transform duration-300 ease-in-out 
                       filter drop-shadow-[0_10px_10px_rgba(255,255,255,0.8)]"
                            />
                        </Link>
                        <Link className="bg-white/5 p-2 rounded-lg opacity-85 hover:opacity-100 border border-[#404052]" href="https://www.youtube.com/@DexoraFinance" target="_blank" rel="noopener noreferrer">
                            <Image src={youtube} alt="youtube" width={100} height={100}
                                className="w-auto h-6 hover:-rotate-[25deg] invert transition-transform duration-300 ease-in-out 
                       filter drop-shadow-[0_10px_10px_rgba(255,255,255,0.8)]"
                            />
                        </Link>
                        <Link className="bg-white/5 p-2 rounded-lg opacity-85 hover:opacity-100 border border-[#404052]" href="https://www.instagram.com/dexorafinance" target="_blank" rel="noopener noreferrer">
                            <Image src={instagram} alt="instagram" width={100} height={100}
                                className="w-auto h-6 hover:-rotate-[25deg] transition-transform duration-300 ease-in-out 
                       filter drop-shadow-[0_10px_10px_rgba(255,255,255,0.8)]"
                            />
                        </Link>
                        <Link className="bg-white/5 p-2 rounded-lg opacity-85 hover:opacity-100 border border-[#404052]" href="https://t.me/DexoraFinance" target="_blank" rel="noopener noreferrer">
                            <Image src={telegram} alt="telegram" width={100} height={100}
                                className="w-auto h-6 hover:-rotate-[25deg] transition-transform duration-300 ease-in-out 
                       filter drop-shadow-[0_10px_10px_rgba(255,255,255,0.8)]"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
