import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="h-screen overflow-hidden relative">
        <div className="flex flex-col absolute justify-center w-screen h-screen items-center">
          <div className="bg-kWhiteDark bg-opacity-80 rounded-2xl p-[30px] w-[360px] h-[430px] flex flex-col justify-between">
            <p className="text-xl text-kBlue">Hello Again!</p>
            <p className="text-sm px-3">Please enter your email and password to login</p>
            <div>
              <input
                placeholder="Email"
                className="w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm"
              ></input>
              <input
                placeholder="Password"
                className="w-full rounded-md border focus:border-kBlue p-2 my-1 text-sm"
              ></input>
              <p className="text-kBlue text-sm">Forgot Password?</p>
            </div>
            <button className="w-full bg-kBlue rounded-md p-2 text-white text-sm">LOGIN</button>
            <p className="text-kBlue text-sm">or continue with...</p>
            <div>
              <div className="flex">
                <button className="w-full bg-white rounded-md p-2 text-black text-sm mr-1">GOOGLE</button>
                <button className="w-full bg-black rounded-md p-2 text-white text-sm ml-1">APPLE</button>
              </div>
            </div>
          </div>
          <p className="text-kBlue text-sm mt-2">Sign Up instead</p>
        </div>
        <img src={require('./assets/images/corgi_sit.jpg')} alt="" className="w-full bg-cover "></img>
      </div>
    </div>
  );
}

export default App;
