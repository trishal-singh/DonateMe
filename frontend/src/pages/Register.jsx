import React from "react";
import { useState } from "react";
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted ${username} ${password}`);
    setUsername("");
    setPassword("");
  };
  return (
    <div className="flex justify-center items-center w-auto h-screen ">
      <form
        onSubmit={handleSubmit}
        className="border-2 border-lime-500 rounded-2xl h-1/2 w-1/2 flex flex-col justify-evenly items-center"
      >
        <input
          value={username}
          required
          type="text"
          placeholder="name"
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-lime-500 rounded w-42 h-10 focus:border-lime-700 focus:outline-none text-lime-500"
        />
        <input
          value={password}
          required
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-lime-500 rounded w-42 h-10 focus:border-lime-700 focus:outline-none text-lime-500"
        />
        <button
          type="submit"
          className="border-2 border-lime-500 rounded w-36 h-10  font-bold font-mono hover:bg-lime-500 hover:text-white"
        >
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default Register;
