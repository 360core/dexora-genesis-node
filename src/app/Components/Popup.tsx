"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

type LinkItem = {
  title: string;
  image: string;
  href: string;
};

type PopupProps = {
  items: LinkItem[];
  isOpen?: boolean;
  onClose?: () => void;
  buttons?: React.ReactNode;
  triggerLabel?: string;
  triggerClassName?: string;
};

const Popup: React.FC<PopupProps> = ({
  items,
  isOpen: propIsOpen,
  onClose,
  buttons,
  triggerLabel = "Open Popup",
  triggerClassName = "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const isControlled = propIsOpen !== undefined;
  const isOpen = isControlled ? propIsOpen : internalIsOpen;

  const openPopup = () => {
    if (!isControlled) setInternalIsOpen(true);
  };

  const closePopup = () => {
    if (!isControlled) setInternalIsOpen(false);
    onClose?.();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {!isControlled && (
        <button onClick={openPopup} className={triggerClassName}>
          {triggerLabel}
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 px-4 ">
          <div
            ref={popupRef}
            className="border nft-card rounded-lg shadow-lg w-full max-w-md p-6 bg-gray-900 relative "
          >
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-300 hidden"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col space-y-4">
              {items.slice(0, 2).map((item, index) => (
                <Link
                  key={index} 
                  href={item.href}
                  target="_blank"
                  className="flex items-center space-x-3 sm:space-x-4 bg-[#7a96f1a4] p-4  hover:bg-[#7aa6f1c2] transition rounded-lg"
                >
                  <div className="w-12 h-12 relative  rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className=" object-contain w-12 h-12 "
                    />
                  </div>
                  <h3 className="text-white  text-lg sm:text-xl bnr-desc">{item.title}</h3>
                </Link>
              ))}
            </div>

            <div className="flex space-x-2 mt-6 justify-center">
              {buttons || (
                <Button variant="primary" onClick={closePopup}>
                  Close
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
