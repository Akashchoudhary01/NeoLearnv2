import React, { useState } from "react";
import { toast } from "react-hot-toast";
import HomeLayout from "../Layout/HomeLayout";
import { isEmailValid } from "../Helpers/regexHelper";
import AxiosInstance from "../Helpers/AxiosInstance";

const ContactUs = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function handleformSubit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("Every field is mandatory!");
      return;
    }
    if (!isEmailValid(userInput.email)) {
      toast.error("Invalid Email!");
      return;
    }
    try {
      const response = AxiosInstance.post("/contact-us", userInput);
      toast.promise(response, {
        loading: "Sending your message...",
        success: "Message sent successfully!",
        error: "Failed to submit the form",
      });
      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({ name: "", email: "", message: "" });
      }
    } catch (error) {
      toast.error("Operation Failed!");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-16 bg-base-100 transition-colors duration-300">
        
        {/* Heading */}
        <h1 className="text-4xl lg:text-5xl font-bold mb-12 text-base-content">
          Get In Touch
        </h1>

        {/* Contact Form Box */}
        <div className="w-full max-w-xl bg-base-200 p-8 rounded-2xl shadow-xl border border-base-300">
          <h2 className="text-2xl font-bold text-center mb-8 text-base-content">
            Send us a message
          </h2>

          <form className="space-y-5" noValidate onSubmit={handleformSubit}>
            <div>
              <label className="block mb-2 text-base-content font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={userInput.name}
                placeholder="Enter your name"
                className="w-full bg-base-100 rounded-lg px-4 py-3 outline-none border border-base-300 focus:border-primary transition"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-base-content font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={userInput.email}
                placeholder="xyz@gmail.com"
                className="w-full bg-base-100 rounded-lg px-4 py-3 outline-none border border-base-300 focus:border-primary transition"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-base-content font-medium">Message</label>
              <textarea
                name="message"
                value={userInput.message}
                placeholder="Write your message..."
                rows="6"
                className="w-full bg-base-100 rounded-lg px-4 py-3 outline-none resize-none border border-base-300 focus:border-primary transition"
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
        
      </div>
    </HomeLayout>
  );
};

export default ContactUs;