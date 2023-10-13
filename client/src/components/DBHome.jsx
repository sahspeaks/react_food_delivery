import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";

import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const biryani = products?.filter(
    (item) => item.product_category === "biryani"
  );
  const curry = products?.filter((item) => item.product_category === "curry");
  const drinks = products?.filter((item) => item.product_category === "drinks");
  const rice = products?.filter((item) => item.product_category === "rice");
  const desserts = products?.filter(
    (item) => item.product_category === "desserts"
  );
  const fried_rice = products?.filter(
    (item) => item.product_category === "fried-rice"
  );
  const salads = products?.filter((item) => item.product_category === "salads");
  const snacks = products?.filter((item) => item.product_category === "snacks");
  const soup = products?.filter((item) => item.product_category === "soup");
  const sweets = products?.filter((item) => item.product_category === "sweets");

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: [
                  "Biryani",
                  "Curry",
                  "Drinks",
                  "Deserts",
                  "Fried-Rice",
                  "Rice",
                  "Salads",
                  "Snacks",
                  "Soup",
                  "Sweets",
                ],
                datasets: [
                  {
                    label: "Category wise Count",
                    backgroundColor: "#f87979",
                    data: [
                      biryani?.length,
                      curry?.length,
                      drinks?.length,
                      desserts?.length,
                      fried_rice?.length,
                      rice?.length,
                      salads?.length,
                      snacks?.length,
                      soup?.length,
                      sweets?.length,
                    ],
                  },
                ],
              }}
              labels="months"
            />
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: [
                  "Orders",
                  "Delivered",
                  "Cancelled",
                  "Paid",
                  "Not Paid",
                ],
                datasets: [
                  {
                    backgroundColor: [
                      "#51FF00",
                      "#00B6FF",
                      "#008BFF",
                      "#FFD100",
                      "#FF00FB",
                    ],
                    data: [40, 20, 80, 34, 54],
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBHome;
