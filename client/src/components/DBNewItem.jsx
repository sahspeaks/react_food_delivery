import React, { useState } from "react";
import { categ, cuisines, timeBased } from "../utils/FoodCategory";
import { Spinner } from "../components";
import { BsCloudUploadFill, MdDelete } from "../assets/icons";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import {
  alertDanger,
  alertNull,
  alertSuccess,
} from "../context/actions/alertActions";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { storage } from "../config/firebase.config";
import { addNewProduct, getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";

const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [price, setPrice] = useState("");
  const [foodTime, setFoodTime] = useState(null);
  const [cuisine, setCuisine] = useState(null);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imgDownloadUrl, setImgDownloadUrl] = useState(null);

  const alert = useSelector((state) => state.alert);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storage = getStorage();

    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => {
        dispatch(alertDanger(`Error: ${err}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImgDownloadUrl(downloadUrl);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image uploaded successfully."));
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imgDownloadUrl);
    deleteObject(deleteRef).then(() => {
      setImgDownloadUrl(null);
      setIsLoading(false);
      dispatch(alertSuccess("Image uploaded successfully."));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
    });
  };
  const submitNewData = () => {
    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    const data = {
      product_name: itemName,
      product_desc: itemDesc,
      product_price: price,
      imageURL: imgDownloadUrl,
      product_food_time: foodTime,
      product_cuisine: cuisine,
      product_category: category,
      product_time: datetime,
      product_owner: user.name,
    };
    // console.log(data);
    addNewProduct(data).then((res) => {
      console.log("after getting res" + res);
      dispatch(alertSuccess("New Item added"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
      setItemName("");
      setItemDesc("");
      setPrice("");
      setFoodTime(null);
      setCuisine(null);
      setCategory(null);
      setImgDownloadUrl(null);
    });
    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
    });
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField
          type="text"
          placeHolder={"Add New Item"}
          stateFunc={setItemName}
          stateValue={itemName}
        />
        <InputValueField
          type="text"
          placeHolder={"Add Item Description"}
          stateFunc={setItemDesc}
          stateValue={itemDesc}
        />
        <InputValueField
          type="number"
          placeHolder={"Item Price"}
          stateFunc={setPrice}
          stateValue={price}
        />
        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center px-24">
              <Spinner />
              {Math.round(progress > 0) && (
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <div className="flex justify-center w-full">
                    <span className="text-base font-medium text-textColor">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-textColor ">
                      {Math.round(progress) > 0 && (
                        <>{`${Math.round(progress)}%`}</>
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full
                          transition-all duration-300 ease-in-out"
                      style={{
                        width: `${Math.round(progress)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imgDownloadUrl ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center cursor-pointer ">
                        <p className="font-bold text-4xl ">
                          <BsCloudUploadFill className="-rotate-0" />
                        </p>
                        <p className="text-lg text-textColor">
                          Click to upload an image
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imgDownloadUrl}
                      className=" w-full h-full object-cover"
                    />
                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute top-3 right-3 p-3
                      rounded-full bg-red-500 text-xl cursor-pointer
                      outline-none hover:shadow-md duration-500 transition-all
                      ease-in-out"
                      onClick={() => deleteImageFromFirebase(imgDownloadUrl)}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                  ;
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex items-center justify-around gap-3 flex-wrap ">
          <p className="w-full flex items-center justify-around gap-3 flex-wrap py-3 rounded-md text-xl text-textColor font-semibold border border-gray-400">
            Food Time
          </p>
          {timeBased &&
            timeBased?.map((data) => (
              <p
                key={data.id}
                onClick={() => setFoodTime(data.category)}
                className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                  data.category === foodTime
                    ? "bg-red-400 text-primary"
                    : "bg-transparent"
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>
        <hr />
        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          <p className="w-full flex items-center justify-around gap-3 flex-wrap py-3 rounded-md text-xl text-textColor font-semibold border border-gray-400">
            Cuisines
          </p>
          {cuisines &&
            cuisines?.map((data) => (
              <p
                key={data.id}
                onClick={() => setCuisine(data.category)}
                className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                  data.category === cuisine
                    ? "bg-red-400 text-primary"
                    : "bg-transparent"
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>
        <hr />
        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          <p className="w-full flex items-center justify-around gap-3 flex-wrap py-3 rounded-md text-xl text-textColor font-semibold border border-gray-400">
            Category
          </p>
          {categ &&
            categ?.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data.category)}
                className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                  data.category === category
                    ? "bg-red-400 text-primary"
                    : "bg-transparent"
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>
        <motion.button
          onClick={submitNewData}
          {...buttonClick}
          className="w-9/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-500 cursor-pointer"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export const InputValueField = ({
  type,
  placeHolder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
        className="w-full px-4 py-3 bg-cardOverlay shadow-md outline-none border rounded-md border-gray-200 focus:border-red-400 "
      />
    </>
  );
};
export default DBNewItem;
