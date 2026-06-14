import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content py-6 px-4 sm:px-8 border-t border-base-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-sm sm:text-base">
            © {year} NeoLearn. All Rights Reserved.
          </h2>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all duration-300">
            <FaFacebookF />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all duration-300">
            <FaGithub />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all duration-300">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-all duration-300">
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Signature */}
      <div className="border-t border-base-300 mt-6 pt-4">
        <p className="text-center text-sm">
          Made with ❤️ by{" "}
          <a
            href="https://www.linkedin.com/in/akashchoudhary007/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold"
          >
            Akash
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;