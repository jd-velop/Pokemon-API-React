import React from "react";
import "./PokemonCard.css";
import { typeColor } from "../utils"

const PokemonCard = ({ pokemon }) => {
  const { id, name, sprites, cries, stats, types } = pokemon;
  const pokeId = id.toString().padStart(3, "0");
  const pokeName = (name.charAt(0).toUpperCase() + name.slice(1)).replace(
    /-([a-z])/g,
    (hyphen, nextLetter) => "-" + nextLetter.toUpperCase()
  );
  const pokeSprite = sprites.other.home.front_default;
  const pokeCry = new Audio(cries.latest);
  pokeCry.volume = 0.1; // these cries are LOUD

  const statHp = stats[0].base_stat;
  const statAttack = Math.floor(stats[1].base_stat + stats[3].base_stat / 2);
  const statDefense = Math.floor(stats[2].base_stat + stats[4].base_stat / 2);
  const statSpeed = stats[5].base_stat;

  const playCry = () => {
    pokeCry.currentTime = 0;
    pokeCry.playbackRate = Math.random() * 0.4 + 0.9;
    pokeCry.play();
  };

  // style card
  const cardColor1 = typeColor[types[0].type.name];
  let bgStyle;
  if (types.length > 1) {
    const cardColor2 = typeColor[types[1].type.name];
    bgStyle = {
      background: `radial-gradient(circle at 50% 0%, ${cardColor1} 30%, ${cardColor2} 30%, ${cardColor2} 36%, #fbfbfb 36%)`,
    };
  } else {
    bgStyle = {
      background: `radial-gradient(circle at 50% 0%, ${cardColor1} 36%, #fbfbfb 36%)`,
    };
  }

  return (
    <div className="card" onClick={playCry} style={bgStyle}>
      <p className="hp">
        <span>HP</span> {statHp}
      </p>
      <img src={pokeSprite} alt={`${pokeName} Sprite`} />
      <h2 className="poke-name">{pokeName}</h2>
      <p className="poke-id">#{pokeId}</p>
      <div className="types">
        {types.map((typeInfo) => {
          const tName = typeInfo.type.name;
          const bg = typeColor[tName];
          return (
            <span
              key={tName}
              style={{
                backgroundColor: bg,
                color: '#fff',
                padding: '4px 16px',
                borderRadius: '12px',
                textTransform: 'capitalize',
                fontSize: '0.75rem',
                letterSpacing: '0.5px'
              }}
            >
              {tName}
            </span>
          );
        })}
      </div>
      <div className="card-bottom">
        <div>
          <h3>{statAttack}</h3>
          <p>ATK</p>
        </div>
        <div>
          <h3>{statDefense}</h3>
          <p>DEF</p>
        </div>
        <div>
          <h3>{statSpeed}</h3>
          <p>SPE</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
