'use client'
import { useEffect, useState } from 'react'
import { POKE_LIST } from '@/constants'
import { useLazyQuery, gql } from '@apollo/client'
import { IPokemon } from '../types'
import styles from './page.module.css'

const GET_POKEMON = gql`
  query getPokemon($name: String) {
    pokemon_v2_pokemon(
      distinct_on: base_experience
      where: { name: { _eq: $name } }
    ) {
      name
      pokemon_v2_pokemonsprites {
        sprites(path: "front_default")
      }
    }
  }
`

export default function Home() {
  const [currentPokemon, setCurrentPokemon] = useState<IPokemon | undefined>()
  const [currentSelectedPokemonIndex, setCurrentSelectedPokemonIndex] =
    useState(0)
  const [getPokemon, { loading, error }] = useLazyQuery(GET_POKEMON, {
    onCompleted: (data) => {
      const pokemon = data.pokemon_v2_pokemon[0]
      setCurrentPokemon({
        name: pokemon.name,
        sprite: pokemon.pokemon_v2_pokemonsprites[0].sprites,
      })
    },
  })

  const getSelectedPokemon = () => {
    getPokemon({ variables: { name: POKE_LIST[currentSelectedPokemonIndex] } })
  }

  const onLeftClick = () => {
    const prevIndex = currentSelectedPokemonIndex - 1
    if (prevIndex >= 0) {
      setCurrentSelectedPokemonIndex(prevIndex)
    }
  }

  const onRightClick = () => {
    const nextIndex = currentSelectedPokemonIndex + 1
    if (nextIndex <= POKE_LIST.length - 1) {
      setCurrentSelectedPokemonIndex(nextIndex)
    }
  }

  useEffect(() => {
    getSelectedPokemon()
  }, [currentSelectedPokemonIndex])

  if (error) return `Error ${error.message}`

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.pokeDex}>
          {loading ? (
            <div className={styles.loadingScreen}>Loading</div>
          ) : (
            <div className={styles.pokeScreen}>
              <div className={styles.pokeImage}>
                {currentPokemon ? (
                  <img src={currentPokemon.sprite} alt={currentPokemon.name} />
                ) : (
                  <div>No pokemon</div>
                )}
              </div>
              <div className={styles.pokeData}>
                {currentPokemon && (
                  <>
                    <h1>{currentPokemon.name}</h1>

                    {currentPokemon?.abilities && (
                      <div>
                        <h2>Habilidades:</h2>
                        <ul>
                          {currentPokemon.abilities.map((currentAbility) => (
                            <li key={currentAbility.ability.name}>
                              {currentAbility.ability.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          <div className={styles.pokeButtons}>
            <button onClick={onLeftClick}>Previous</button>
            <button onClick={onRightClick}>Next</button>
          </div>
        </div>
      </main>
    </div>
  )
}
