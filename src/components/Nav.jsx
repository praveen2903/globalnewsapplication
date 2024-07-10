import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import logo from "../logo.png";
import { ParamContext } from "../context/Context";
import Main from "./Main";
import { FaSearch } from "react-icons/fa";
import {
  Bars3Icon,
  ChartBarIcon,
  PuzzlePieceIcon,
  XMarkIcon,
  LightBulbIcon,
  CursorArrowRippleIcon,
  HeartIcon,
  VideoCameraIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const solutions = [
  {
    name: "Breaking-News",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Business",
    href: "#",
    icon: ArrowTrendingUpIcon,
  },
  {
    name: "Entertainment",
    href: "#",
    icon: VideoCameraIcon,
  },
  {
    name: "Health",
    href: "#",
    icon: HeartIcon,
  },
  {
    name: "Science",
    href: "#",
    icon: LightBulbIcon,
  },
  {
    name: "Sports",
    href: "#",
    icon: PuzzlePieceIcon,
  },
  {
    name: "Technology",
    href: "#",
    icon: CursorArrowRippleIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [theme,setTheme]=useState(localStorage.getItem("theme")? localStorage.getItem("theme"):"light");

    const handleToggle=(e)=>{
        if(e.target.checked){
            setTheme("dark");
        }
        else{
            setTheme("light");
        }
    }

    useEffect(()=>{
        localStorage.setItem("theme",theme)
        const localTheme=localStorage.getItem("theme");

        document.querySelector("html").setAttribute("data-theme",localTheme);
    },[theme])

  const [searchVal, setSearch] = useState("");
  const [param, setParam] = useState({
    location: "",
    category: "",
    keyword: "",
  });
  const handleClick = (reqParam) => {
    if (param.keyword) param.keyword = "";
    const newParam = { ...param, ...reqParam };
    setParam(newParam);
    setSearch("");
    if(document.getElementById('mobile-close'))
      document.getElementById('mobile-close').click();
  };
  return (
    <div>
      <Popover className="relative md:top-0 z-10 p-8 bg-[#6b21a8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 bg-[#facc15]"> 
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <div className="flex justify-center items-center h-12 text-lg text-purple-700 font-bold w-auto sm:h-12 cursor-pointer">
                <img src={logo} alt="logo" className="w-12 mx-2" />
                <div className="hidden lg:flex">Global News</div>
              </div>

            </div>
            <div className="hidden sm:flex ">
              <input
                value={searchVal}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                placeholder="Keywords here"
                className="text-base font-medium text-gray-900 bg-white  hover:text-gray-700 py-1 px-2 border-2  "
              />
              <button
                onClick={() => handleClick({ keyword: searchVal })}
                className="active:bg-purple-800 text-base font-medium text-gray-900 rounded-md hover:text-white hover:bg-purple-600 mx-2 py-2 px-2 border-2"
              >
                <FaSearch/>
              </button>
             
            </div>
           
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden space-x-10 md:flex">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      )}
                    >
                      <span>Category</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-100"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10  -ml-4 mt-3 w-max max-w-md transform px-4 sm:px-4 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            {solutions.map((item) => (
                              <span
                              
                                key={item.name}
                                onClick={() =>
                                  handleClick({ category: item.name })
                                }
                                className="active:bg-purple-100 -m-3 flex items-start rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                              >
                                <item.icon
                                  className="h-6 w-6 flex-shrink-0 hover:text-purple-600 text-indigo-600"
                                  aria-hidden="true"
                                />
                                <div className="ml-4">
                                  <div className="text-base font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                </div>
                              </span>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      )}
                    >
                      <span>Location</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-2 mt-3  max-w-xs transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-6">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            <span
                              onClick={() => handleClick({ location: "in" })}
                              className="cursor-pointer p-3 rounded-md w-fit hover:text-purple-600 active:bg-purple-100"
                            >
                              India
                            </span>
                            <span
                              onClick={() => handleClick({ location: "oth" })}
                              className="cursor-pointer  hover:text-purple-600 p-3 rounded-md w-fit active:bg-purple-100"
                            >
                              World
                            </span>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      )}
                    >
                      <span>Language</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute z-10 -ml-2 mt-3 p-2 max-w-xs transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className="relative grid gap-6 bg-white px-2 py-6 sm:gap-4 sm:p-4">
                            <span
                              onClick={() => handleClick({ lang: "hi" })}
                              className="cursor-pointer hover:text-purple-600 p-3 rounded-md w-fit active:bg-purple-100"
                            >
                              Hindi
                            </span>
                            <span
                              onClick={() => handleClick({ lang:"en" })}
                              className="cursor-pointer  hover:text-purple-600 p-3 rounded-md w-fit active:bg-purple-100"
                            >
                              English
                            </span>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>

                  </>
                )}
              </Popover>
            </Popover.Group>
            <div className="flex-none p-5">
                <label className="swap swap-rotate">  
                    <input type="checkbox" onChange={handleToggle} checked={theme==="light"? false: true}/>
                    <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                    <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>  
                </label>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-purple-700">SpotNews</div>
                  <div className="-mr-2" >
                    <Popover.Button id="mobile-close" className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {solutions.map((item) => (
                      <span
                        key={item.name}
                        onClick={() => handleClick({ category: item.name })}
                        className="flex cursor-pointer"
                      >
                        <item.icon
                          className="h-6 w-6 flex-shrink-0 text-indigo-600"
                          aria-hidden="true"
                        />
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </span>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5 flex flex-col">
                <div className="grid grid-cols-1 gap-y-4 gap-x-8 ">
                  <span className="font-bold">Location</span>
                  <span
                    onClick={() => handleClick({ location: "in" })}
                    className="cursor-pointer  hover:text-purple-600"
                  >
                    India
                  </span>
                  <span
                    onClick={() => handleClick({ location: "oth" })}
                    className="cursor-pointer  hover:text-purple-600"
                  >
                    World
                  </span>
                </div>
              </div>
              <div className="space-y-6 py-6 px-5 flex flex-col">
                <div className="grid grid-cols-1 gap-y-4 gap-x-8 ">
                  <span className="font-bold">Language</span>
                  <span
                    onClick={() => handleClick({ lang:"hi" })}
                    className="cursor-pointer  hover:text-purple-600"
                  >
                   Hindi
                  </span>
                  <span
                    onClick={() => handleClick({ lang:"en" })}
                    className="cursor-pointer  hover:text-purple-600"
                  >
                    English
                  </span>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <ParamContext.Provider value={param}>
        <Main />
      </ParamContext.Provider>
      <div
        className="move-to-top cursor-pointer ml-5 my-2"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
      </div>
     
    </div>
  );
}