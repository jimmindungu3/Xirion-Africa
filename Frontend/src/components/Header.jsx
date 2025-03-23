import React from "react";
import { GiCircuitry } from "react-icons/gi";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="max-w-7xl mx-auto flex justify-between items-center p-2 md:p-3">
      {/* Logo */}
      <Link to={"/"} className="text-lg md:text-2xl lg:text-3xl flex items-center space-x-2 text-brandOrange">
        <GiCircuitry />
        <span>
          <span className="font-bold">XIR</span>ION
        </span>
      </Link>

      {/* Contact Section */}
      <div className="flex flex-col md:flex-row md:gap-x-6 text-xs md:text-lg">
        {/* Clickable Call */}
        <a href="tel:+254717055495" className="flex items-center space-x-2 hover:text-green-600">
          <FaPhoneAlt className="text-green-600" />
          <span className="text-gray-500 font-semibold">+254 717 055 495</span>
        </a>

        {/* Clickable WhatsApp */}
        <a
          href="https://wa.me/254789335955"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 hover:text-green-600"
        >
          <FaWhatsapp className="text-green-600" />
          <span className="text-gray-500 font-semibold">+254 789 335 955</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
