import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder, getAllUsers } from "../api";
import { setAllUserDetails } from "../context/actions/allUsersAction";
import { setOrders } from "../context/actions/ordersAction";
import { Header, OrderData } from "../components";
import { Avatar } from "../assets";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    if (!orders) {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
        setUserOrders(data.filter((item) => item.userId === user?.user_id));
      });
    } else {
      setUserOrders(orders.filter((data) => data.userId === user?.user_id));
    }
  }, [orders]);

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <section className="relative block h-500-px">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={user?.picture ? user?.picture : Avatar}
                      class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0"></div>
                </div>
              </div>
              <div className="text-center mt-12">
                {user?.name && (
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                    {user?.name}
                  </h3>
                )}
                {user?.email && (
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i class="fa-solid fa-envelope mr-2 text-lg text-blueGray-400"></i>
                    {user?.email}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col items-start justify-center mt-4 px-6 md:px-40 2xl:px-96 gap-12 pb-24">
              <div className=" w-full flex items-center justify-between ">
                <div className="flex flex-col items-start justify-start gap-1">
                  <p className="text-2xl text-headingColor font-bold">
                    My Recent Orders
                  </p>
                  <div className="w-40 h-1 rounded-md bg-orange-500"></div>
                </div>
              </div>
              <div className="w-full flex flex-col items-start justify-center mt-4 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
                {userOrders?.length > 0 ? (
                  <>
                    {userOrders.map((item, i) => (
                      <OrderData key={i} index={i} data={item} admin={false} />
                    ))}
                  </>
                ) : (
                  <>
                    <h1 className="text-[72px] text-headingColor font-bold">
                      No Data
                    </h1>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Profile;
