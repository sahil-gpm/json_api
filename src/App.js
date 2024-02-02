import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { motion } from "framer-motion";
import avatar from "./assets/avatar.png";

function App() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const getData = useCallback(async () => {
    setLoader(true);
    axios
      .get("http://jsonplaceholder.typicode.com/photos")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
      });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="app-wrapper bg-black h-[100vh] overflow-x-hidden relative">

      <img src={avatar} className="w-40 mx-auto mt-10 rounded-full border border-white" />

      <div className="main text-center font-bold lg:text-6xl text-3xl text-white mt-[1%]">
        {/* <MoonLoader color="black"/> */}
        Loading data through an external API 🚀
      </div>

      <div className="main text-center lg:text-2xl text-sm mx-10 text-white mt-[1%] mb-4">
        {/* <MoonLoader color="black"/> */}A simple react-app fetching json data
        from jsonplaceholder ↴
        <br />
        <button className="bg-white text-sm text-black font-semibold px-10 py-3 rounded-md mb-8 mt-4">
          Github Link
        </button>
      </div>

      {data.length === 0 && (
        <div className="w-fit mx-auto mt-[10%]">
          <MoonLoader color="white" />
        </div>
      )}

      {/* mapping the data  */}
      {data?.map((d, i) => {
        if (i < 32) {
          return (
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: (i + 1) * 0.25 }}
              key={d?.id}
              className="my-3 bg-[#1c1c1c] w-[90%] lg:w-[58%] px-5 lg:px-10 py-6 rounded-md mx-auto flex items-center gap-4 lg:gap-10 text-start"
            >
              {d?.thumbnailUrl ? (
                <img
                  className="lg:w-36 lg:h-36 w-20 h-20 rounded-full object-cover"
                  src={d?.url}
                  alt=""
                />
              ) : (
                "Loading..."
              )}

              <div className="title text-white font-semibold text-sm lg:text-2xl">
                {d?.title}
                <div className="link-to-profile mt-1">
                  <a
                    className="text-blue-400"
                    href={d?.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View full profile image here 🔗
                  </a>
                </div>

                <div>Json doc number : {d?.id}</div>
              </div>
            </motion.div>
          );
        }
        return null;
      })}

      <div className="text-white text-center my-5 text-xs ">
        Developed ⚒️ by Sahil Chavan
      </div>
    </div>
  );
}

export default App;
