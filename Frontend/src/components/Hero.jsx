import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const categories = [
  {
    title: "Computing",
    items: "Laptops, Keyboards, Monitors, External Drives, Software",
  },
  {
    title: "Gaming",
    items: "Consoles, Gaming Laptops, Controllers, VR Headsets, Accessories",
  },
  {
    title: "Gadgets & Accessories",
    items: "Smartwatches, Wireless Earbuds, Power Banks, Cameras",
  },
  {
    title: "Beauty & Health",
    items: "Makeup, Skincare, Perfumes, Supplements",
  },
  {
    title: "Electronics",
    items: "Fridges, Electric Kettle, Blender, TV, Speakers",
  },
  {
    title: "Fashion & Style",
    items: "Shoes, T-Shirts, Watches, Sunglasses, Bags",
  },
  {
    title: "Home & Kitchen",
    items: "Cookware, Dishes, Blenders, Curtains, Lamps",
  },
  {
    title: "Toys & Games",
    items: "Board Games, Dolls, Action Figures, Puzzles",
  },
  {
    title: "Office Supplies",
    items: "Desks, Chairs, Printers, Notebooks, Whiteboards",
  },
];

const slideImages = [
  "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500&auto=format&fit=crop&q=60",
  "https://plus.unsplash.com/premium_photo-1670274609267-202ec99f8620?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1604527039309-8044c298ba46?w=500&auto=format&fit=crop&q=60",
];

const Hero = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="max-w-7xl mx-auto hidden md:flex pt-4 mb-6">
      {/* Left Column: Categories */}
      <div className="w-1/4 bg-white shadow-md max-h-[490px] overflow-y-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="px-3 py-1 hover:bg-gray-200 cursor-pointer rounded-md"
            onClick={() => handleCategoryClick(category.title)}
          >
            <h3 className="font-semibold text-gray-900">{category.title}</h3>
            <p className="text-xs text-gray-500">{category.items}</p>
          </div>
        ))}
      </div>

      {/* Right Column: Image Slider */}
      <div className="w-3/4 ml-4 overflow-hidden shadow-md">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 4000 }}
          loop
          navigation
          pagination={{ clickable: true }}
          className="w-full h-[490px] rounded-lg shadow-lg"
        >
          {slideImages.map((src, index) => (
            <SwiperSlide key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
