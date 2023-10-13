import { motion } from "framer-motion";
import React, { useState } from "react";
import { BsToggles2, IoFastFood, MdSearch } from "../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { staggerFadeInOut } from "../animations";
import { categ } from "../utils/FoodCategory";
import SliderCard from "./SliderCard";
import { Header, Cart } from "../components";
const Menu = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("fried-rice");
  const [search, setSearch] = useState("");

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />

      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <motion.div className="flex items-center justify-center gap-3 px-4 py-2 bg-cardOverlay backdrop-blur-md rounded-md shadow-md">
          <MdSearch className="text-gray-400 text-2xl" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Search here"
            className="border-none outline-none bg-transparent w-50 text-base font-semibold text-textColor"
          />
          <BsToggles2 className="text-gray-400 text-2xl" />
        </motion.div>

        <motion.div className="w-full flex items-start justify-start flex-col">
          <div className=" w-full flex items-center justify-between ">
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-2xl text-headingColor font-bold">
                Our Hot Recipes
              </p>
              <div className="w-40 h-1 rounded-md bg-orange-500"></div>
            </div>
          </div>

          <div className=" w-full flex items-center justify-evenly flex-wrap gap-4 mt-12 ">
            {products &&
              products
                .filter(
                  (data) =>
                    data.product_category.includes(search) ||
                    data.product_name.toLowerCase().includes(search) ||
                    data.product_cuisine.toLowerCase().includes(search) ||
                    data.product_food_time.toLowerCase().includes(search)
                )
                .map((data, i) => <SliderCard key={i} data={data} index={i} />)}
          </div>
        </motion.div>
      </div>
      {isCart && <Cart />}
    </main>
  );
};

export default Menu;
