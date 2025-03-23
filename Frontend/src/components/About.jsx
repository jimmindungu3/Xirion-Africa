import React from "react";
import { FaFacebook, FaTiktok, FaInstagram, FaXTwitter } from "react-icons/fa6";

const About = () => {
  return (
    <div className="bg-gray-200 py-8 md:pb-12 px-4 mt-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-base md:text-lg font-semibold">Why Shop With US</h2>
        <div className="text-sm lg:text-base space-y-2 mt-2">
          <p>
            Welcome to our ecommerce platform, where quality meets
            affordability. We strive to bring you the best products at
            unbeatable prices.
          </p>
          <p>
            Our mission is to provide a seamless shopping experience, offering
            top-notch customer service and a curated selection of goods.
          </p>
          <p>
            Whether you're looking for the latest trends or everyday essentials,
            we've got you covered with an ever-growing inventory.
          </p>
          <p>
            We believe in sustainability and ethical sourcing, ensuring our
            products are both high-quality and responsibly made.
          </p>
          <p>
            Join our community and experience hassle-free shopping with fast
            shipping and easy returns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-base md:text-xl font-semibold mb-2">
              Subscribe To Our Emails
            </h3>
            <p className="mb-2 text-sm">
              Stay updated with the latest deals and exclusive offers.
            </p>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-2 border rounded text-sm md:text-base"
            />
            <button className="mt-3 px-4 py-2 text-gray-50 text-sm md:text-base border border-gray-500 bg-gray-500 hover:bg-gray-50 hover:text-gray-500 active:bg-gray-500 active:text-gray-50 rounded font-semibold transition-colors">
              Subscribe
            </button>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <h3 className="text-base md:text-lg font-semibold mb-2">
              Follow Us On Our Socials
            </h3>
            <p className="mb-2 text-sm md:text-base">
              Connect with us for updates and exclusive content.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-blue-600 text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-700 text-2xl">
                <FaTiktok />
              </a>
              <a href="#" className="text-pink-500 text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-black text-2xl">
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
