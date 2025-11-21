import React, { useEffect, useState } from "react";
import "./Pokemon.css";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import { pokemonList } from "../utils";

const url = "https://pokeapi.co/api/v2/pokemon/";
const pokemonAmount = 20;
const totalPokemon = 1025;

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    setLoading(true);
    setError(null);
    setPokemon([]);
    try {
      const getRandomId = () => Math.floor(Math.random() * totalPokemon) + 1;
      const ids = Array.from({ length: pokemonAmount }, () => getRandomId());

      const responses = await Promise.all(
        ids.map((id) => fetch(`${url}${id}`))
      );
      const data = await Promise.all(responses.map((res) => res.json()));

      setPokemon(data);

    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchData = async (e) => {
    e.preventDefault();
    const query = e.target.elements["search-box"].value.trim().toLowerCase();
    if (!query) {
      fetchPokemon();
      return;
    }

    setLoading(true);
    setError(null);
    setPokemon([]);

    try {
      const promises = pokemonList
        .filter((name) => name.includes(query))
        .map((name) => fetch(url + name));

      if (promises.length === 0) {
        let randomName = pokemonList[Math.floor(Math.random() * 1025)];
        setError(
          `No Pokémon name found containing "${query}". Try searching a different name, like ${
            randomName.charAt(0).toUpperCase() + randomName.slice(1)
          }.`
        );
        setPokemon([]);
        return;
      }

      const responses = await Promise.all(promises);
      const data = await Promise.all(
        responses.map((response) => response.json())
      );

      setPokemon(data);

    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div className="app-container">
      <h1>Project 3 - JD</h1>
      <SearchBar onSearch={fetchSearchData} onFetchRandom={fetchPokemon} />
      {loading && (
        <div className="loader" id="loader">
          <img src="src/assets/pokeball.png" height="90" alt="Loading..." />
          <p>Fetching...</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      <div id="card-container">
        {pokemon.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </div>
    </div>
  );
};

export default Pokemon;
