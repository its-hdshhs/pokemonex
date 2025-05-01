import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card';
import SearchBar from './components/SearchBar';
import FilterDropdown from './components/FilterDropdown';
import './styles/App.css';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Fetch Pokémon data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Fetch the first 150 Pokémon with their details in one request
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const results = response.data.results;

        // Map the results to include only necessary data
        const detailedPokemon = results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          types: [], // Types will be fetched separately
        }));

        setPokemon(detailedPokemon);
        setFilteredPokemon(detailedPokemon);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  // Fetch Pokémon types
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        setTypes(response.data.results.map((type) => type.name));
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  // Filter Pokémon based on search term and type
  useEffect(() => {
    let filtered = pokemon;

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((p) => p.types.includes(selectedType));
    }

    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemon]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokémon Explorer</h1>
      </header>
      <div className="filters">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterDropdown
          types={types}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />
      </div>
      <div className="card-container">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((p) => (
            <Card key={p.id} name={p.name} image={p.image} types={p.types} id={p.id} />
          ))
        ) : (
          <p>No Pokémon found.</p>
        )}
      </div>
    </div>
  );
};

export default App;