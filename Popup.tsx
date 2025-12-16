import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/app/Components/Button";

type PopupProps = {
  title: string;
  content: string | React.ReactNode;
  image?: string;
  isOpen?: boolean;
  onClose?: () => void;
  buttons?: React.ReactNode;
  triggerLabel?: string;
  triggerClassName?: string;
};

const Popup: React.FC<PopupProps> = ({
  title,
  content,
  image,
  isOpen: propIsOpen,
  onClose,
  buttons,
  triggerLabel = "Open Popup",
  triggerClassName = "px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(!!propIsOpen);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  useEffect(() => {
    if (propIsOpen !== undefined && propIsOpen !== isOpen) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {!propIsOpen && (
        <button onClick={openPopup} className={triggerClassName}>
          {triggerLabel}
        </button>
      )}

      {(isOpen || propIsOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60  px-4">
          <div
            ref={popupRef}
            className="border border-[#cecece4b] bg-black rounded-lg shadow-lg w-full max-w-md p-6  min-h-[50vh] relative"
          >
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-300"
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

            {image && (
              <div className="mb-4">
                <Image
                  src={image}
                  alt={title}
                  className="rounded-lg w-full object-cover h-48"
                  width={400}
                  height={200}
                />
              </div>
            )}

            <h2 className="text-2xl font-semibold text-white mt-2">{title}</h2>
            <div className="mt-2 text-base text-gray-300">{content}</div>

            <div className="flex space-x-2 mt-4">
              {buttons || (
                <Button variant="primary" onClick={closePopup} className="">
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
