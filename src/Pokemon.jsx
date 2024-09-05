import React, { useEffect, useState } from 'react';
import './index.css';
import PokemonCards from './PokemonCards';

const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState(""); // Initialize as an empty string

    const API = "https://pokeapi.co/api/v2/pokemon?limit=130";

    const fetchPokemon = async () => {
        setLoading(true);
        try {
            const res = await fetch(API);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();

            const detailedPokemonData = data.results.map(async (curPokemon) => {
                const res = await fetch(curPokemon.url);
                if (!res.ok) {
                    throw new Error('Failed to fetch detailed Pokemon data');
                }
                const data = await res.json();
                return data;
            });

            const detailResponses = await Promise.all(detailedPokemonData);
            setPokemon(detailResponses);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Something went wrong: {error.message}</div>;
    }

    // Ensure search is a string and check for empty values
    const searchData = pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <section>
            <header>
                <h1>Let's Catch Pokemon</h1>
            </header>
            <div className="pokemon-search">
                <input
                    type="text"
                    placeholder='Search Pokemon'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div>
                <ul className="cards">
                    {searchData.map((curPokemon) => (
                        <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Pokemon;
