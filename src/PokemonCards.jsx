import React from 'react';

const PokemonCards = ({ pokemonData }) => {
    // Destructure the properties from pokemonData for easier access
    const { name, sprites, types } = pokemonData;

    return (
        <li className="pokemon-card">
            <figure>
                {/* Make sure the path to the image is correct */}
                <img 
                    src={sprites.other.dream_world.front_default} 
                    alt={name}
                    className="pokemon-image" 
                />
            </figure>
            <h1 className="pokemon-name">{name}</h1>
            <div className="pokemon-info pokemon-highlight">
                <p>
                    {types.map((curType) =>curType.type.name).join(", ")}
                </p>
            </div>
            <div className="grid-three-cols">
                <p className="pokemon-info">
                    <span>Height:</span> {pokemonData.height}
                </p>

                <p className="pokemon-info">
                    <span>Weight:</span> {pokemonData.weight}
                </p>

                <p className="pokemon-info">
                    <span>Speed:</span> {pokemonData.stats[5].base_stat}
                </p>
            </div>

            <div className="grid-three-cols">
                <p className="pokemon-info">
                    <span>Experience:</span> {pokemonData.base_experience}
                </p>

                <p className="pokemon-info">
                    <span>Attack:</span> {pokemonData.stats[1].base_stat}
                </p>

                <p className="pokemon-info">
                    <span>Ability:</span> {pokemonData.abilities
                    .map((abilityInfo)=>abilityInfo.ability.name)
                    .slice(0,1)
                    .join(", ")
                    }
                </p>
            </div>
        </li>
    );
};

export default PokemonCards;
