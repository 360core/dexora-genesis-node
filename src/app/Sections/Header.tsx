'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AOS from "aos";
import "aos/dist/aos.css";

import logo from "@/Assets/images/dexora-logo.webp";
import { Loader } from '../Components/Loader';
import Button from '../Components/Button';

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <header className="fixed w-full z-50 bg-[#2e312f00] border-b border-[#a4baac23] backdrop-blur-[2px]">
      <div
        className="container mx-auto px-4 py-2 sm:py-4 flex items-center justify-between"
        data-aos="fade-down"
      >
       
        <Link href="/">
          <Image
            src={logo}
            alt="Dexora Logo"
            width={200}
            height={50}
            className="w-10 md:w-16 h-auto"
          />
        </Link>

      <Button href='/' target='_blank' variant="animated">Connect Wallet</Button>
       
      </div>
    </header>
  );
};

export default Header;
