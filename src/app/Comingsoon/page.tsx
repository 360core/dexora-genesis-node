'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import bnrimg from "@/Assets/images/dexora-logo.webp";

import AOS from "aos";
import "aos/dist/aos.css";



const Comingsoon = () => {

    useEffect(() => {
        AOS.init({
            duration: 2000,
            easing: "ease-in-out",
            once: true,
        });
    }, []);
    return (
        <>
            <section className="bannerMain relative py-44 sm:py-72">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="fixed top-0 left-0 w-full h-full -z-10 object-contain object-center brightness-[0.3]  ">
                    <source src='/video/why_1.mp4' type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="container mx-auto px-4">
                    <div className=' flex items-center justify-center'>
                        <div className=" w-full  mx-auto text-center  relative innerbox" data-aos="fade-up">
                            <Image src={bnrimg} alt='about-image' priority={true} width={300} height={300} className='w-full mb-2 h-auto max-w-20 sm:max-w-32 mx-auto animate-up-down ' />
                            {/* <p className=' mb-8 inline-block rounded-lg px-3 py-0.5 font-semibold leading-[100%]  bg-[#97ffcb] text-black text-span-green '>AI PIPMASTER</p> */}
                            <h1 className="text-5xl md:text-[120px] font-bold  break-words leading-snug sm:leading-none " >
                                <span className='t'>Coming Soon...</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Comingsoon;
