'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AOS from "aos";
import "aos/dist/aos.css";

import logo from "@/Assets/images/dexora-logo.webp";
import { Loader } from '../Components/Loader';
import Button from '../Components/Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const timer = setTimeout(() => {
      setIsLoading(false);
    // }, 100);
    // return () => clearTimeout(timer);
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

        {/* <Button href='/' variant="animated"> */}
        {/* <ConnectButton /> */}
        {/* </Button> */}
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated');

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <Button variant="animated"
                        onClick={openConnectModal} type="button">
                        Connect Wallet
                      </Button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      // <button onClick={openChainModal} type="button">
                      //   Wrong network
                      // </button>
                      <Button variant="animated"
                        onClick={openChainModal} type="button">
                        Wrong network
                      </Button>
                    );
                  }

                  return (
                    <div style={{ display: 'flex', gap: 12 }}>
                      {/* <button
                        onClick={openChainModal}
                        style={{ display: 'flex', alignItems: 'center' }}
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: 'hidden',
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                style={{ width: 12, height: 12 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button> */}

                      {/* <button onClick={openAccountModal} type="button">
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </button> */}
                      <Button variant="animated"
                        onClick={openAccountModal} type="button">
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </Button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>

      </div>
    </header>
  );
};

export default Header;
