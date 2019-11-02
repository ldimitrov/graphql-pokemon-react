import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import './App.css';

const GET_POKEMON_INFO = gql`
{
    pokemons(first: 150) {
      id
      number
      name,
      image,  
      evolutions {
        id,
        number,
        name,
        image
      }
    }
  }`

function App() {
  const { data, loading, error } = useQuery(GET_POKEMON_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <React.Fragment>
      <h1>Pokemons</h1>
      <div>
        {data &&
          data.pokemons &&
          data.pokemons.map((pokemon, index) => (
            <div key={index}>
              <img src={pokemon.image} alt="pokomen" />
              <div>
                <h3>{pokemon.name}</h3>
                <p>
                  {pokemon.evolutions && pokemon.evolutions.length !== 0 && (
                    <p>
                      {" "}
                      Evolutions:
                    {pokemon.evolutions.map((e, indx) => {
                        return <p key={indx}> {e.name} </p>;
                      })}
                    </p>
                  )}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </React.Fragment>
  );
}

export default App;
