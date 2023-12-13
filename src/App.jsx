import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useState } from "react";
import Routes from "./Routes";
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon } from "@heroicons/react/24/outline";

function App() {
  const[open ,setOpen]=useState(false)
    const handleIconClick = () => {
      setOpen(!open)
      // Handle the click event, e.g., open a chat window
      // alert('Open chat window or perform other actions here!');
    };
  return (<div>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Routes />
      <button
      id="message-icon"
      className="fixed bottom-8 right-8 bg-gray-100 text-white rounded-full p-4 cursor-pointer text-lg focus:outline-none"
      onClick={handleIconClick}
    >
     {open?<XMarkIcon className="w-8 h-8 text-gray-900"/>: <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8 text-gray-900"/>}
    </button>
    </GoogleOAuthProvider>
{open&&<ul class="space-y-5 fixed bottom-28 bg-gray-200 px-2 py-2 rounded-md overflow-auto h-[30rem] right-10">
  <li class="max-w-lg flex gap-x-2 sm:gap-x-4 me-11">
    <img class="inline-block h-9 w-9 rounded-full" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80" alt="Image Description"/>

    <div>
      <div class="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
        <h2 class="font-medium text-gray-800 dark:text-white">
          How can we help?
        </h2>
        <div class="space-y-1.5">
          <p class="mb-1.5 text-sm text-gray-800 dark:text-white">
            You can ask questions like:
          </p>
          <ul class="list-disc list-outside space-y-1.5 ps-3.5">
            <li class="text-sm text-gray-800 dark:text-white">
              What's Preline UI?
            </li>

            <li class="text-sm text-gray-800 dark:text-white">
              How many Starter Pages & Examples are there?
            </li>

            <li class="text-sm text-gray-800 dark:text-white">
              Is there a PRO version?
            </li>
          </ul>
        </div>
      </div>

      <span class="mt-1.5 flex items-center gap-x-1 text-xs text-gray-500">
        <svg class="flex-shrink-0 w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
        Sent
      </span>
    </div>
  </li>
  <li class="flex ms-auto gap-x-2 sm:gap-x-4">
    <div class="grow text-end items-end space-y-3">
      <div class="inline-flex flex-col justify-end">
     
        <div class="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
          <p class="text-sm text-white">
            what's preline ui?
          </p>
        </div>

        <span class="mt-1.5 ms-auto flex items-center gap-x-1 text-xs text-gray-500">
          <svg class="flex-shrink-0 w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>
          Sent
        </span>
      </div>
    </div>

    <span class="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-600">
      <span class="text-sm font-medium text-white leading-none">AZ</span>
    </span>
  </li>
  <li class="max-w-lg flex gap-x-2  sm:gap-x-4 me-11">
    <img class="inline-block h-9 w-9 rounded-full" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80" alt="Image Description"/>

    <div>
      <div class="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 dark:bg-slate-900 dark:border-gray-700">
        <p class="text-sm text-gray-800 dark:text-white">
          Preline UI is an open-source set of prebuilt UI components based on the utility-first Tailwind CSS framework.
        </p>
        <div class="space-y-1.5">
          <p class="text-sm text-gray-800 dark:text-white">
            Here're some links to get started
          </p>
          <ul>
            <li>
              <a class="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="../docs/index.html">
                Installation Guide
              </a>
            </li>
            <li>
              <a class="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="../docs/frameworks.html">
                Framework Guides
              </a>
            </li>
          </ul>
        </div>
      </div>

      <span class="mt-1.5 flex items-center gap-x-1 text-xs text-red-500">
        <svg class="flex-shrink-0 w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
        Not sent
      </span>
    </div>
  </li>
  <input className="w-full px-2 py-2 rounded-md"/>
</ul>}
  </div>
  );
}

export default App;
