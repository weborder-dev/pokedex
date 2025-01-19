'use client'
import { useEffect, useState } from 'react'
import { POKE_API_URL, POKE_LIST } from '@/constants'
import { IPokemon } from '../types'
import styles from './page.module.css'

export default function Home() {
  const [currentPokemon, setCurrentPokemon] = useState<IPokemon | undefined>()
  const [currentSelectedPokemonIndex, setCurrentSelectedPokemonIndex] =
    useState(0)

  const getSelectedPokemon = async () => {
    try {
      const response = await fetch(
        `${POKE_API_URL}pokemon/${POKE_LIST[currentSelectedPokemonIndex]}`,
      )
      const pokemon = await response.json()
      setCurrentPokemon(pokemon)
    } catch (error) {
      console.error(error)
    }
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

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.pokeDex}>
          <div className={styles.pokeScreen}>
            <div className={styles.pokeImage}>
              {currentPokemon ? (
                <img
                  src={currentPokemon.sprites.front_default}
                  alt={currentPokemon.name}
                />
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
          <div className={styles.pokeButtons}>
            <button onClick={onLeftClick}>Previous</button>
            <button onClick={onRightClick}>Next</button>
          </div>
        </div>
      </main>
    </div>
  )
}
