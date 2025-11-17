import React, { useEffect, useState } from "react";
import "./Pokemon.css";

const Pokemon = () => {
  // useState has initial state of empty array
  const [users, setUsers] = useState([]);

  const fetchPokemon = async () => {
    try {
      const url = "https://randomuser.me/api/?results=20";

      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        setUsers(data);
      }

      console.log(data);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div>
      <h1>Pokemon</h1>
      <div></div>
    </div>
  );
};

export default Pokemon;
