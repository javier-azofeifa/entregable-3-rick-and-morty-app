import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import { useEffect, useRef, useState } from 'react'
import useFetch from './hooks/useFetch'
import imghero from './assets/img/rick-y-morty.jpg'
import logohero from './assets/img/logo.png'
import logoloading1 from './assets/img/portal-1.png'
import logoloading2 from './assets/img/portal-2.png'

import './App.css'

function App() {

  const [inputValue, setInputValue] = useState(getRandomNumber(126))

  const url = `https://rickandmortyapi.com/api/location/${inputValue || 'Hola'}`
  const [location, getLocation, hasError, isLoading ] = useFetch(url)

  useEffect(() => {
    getLocation()
  }, [inputValue])

  const inputSearch = useRef()

  const handleSubmit = e => {
    e.preventDefault()
    setInputValue(inputSearch.current.value.trim())
  }

  return (
  <main className='main'>
    <article className='header'>
      <img className='header__img' src={imghero} alt="" />
      <img className='header__logo' src={logohero} alt="" />
    </article>
    <article className='form'>
      <form className='form__form' onSubmit={handleSubmit}>
        <input className='form__input' ref={inputSearch} type="text" placeholder='Provide an ID from 1 to 126'/>
        <button className='form__button'>Search</button>
      </form>
        {
          isLoading
            ? <div className='load'>
                <div className='load__container'>
                  <img className='load__img1' src={logoloading1} alt="" />
                  <img className='load__img2' src={logoloading2} alt="" />
                </div>               
              </div>
            : (
                hasError
                    ? <h2>Hey! You must provide an ID from 1 to 126</h2>
                    : (
                        <>
                          <LocationInfo
                          location={location}
                          />
                          <div className='resident__container'>
                            {
                              location?.residents.map(url => (
                                <ResidentCard
                                  key={url}
                                  url={url}
                                />
                              ))
                            }
                          </div>
                        </>
                      )
              )
        }
    </article>
  </main>

  )
}

export default App