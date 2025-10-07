import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import './FunDogFacts.css'
import { DogFact } from '../../components/DogFact'
import { DogImage } from '../../components/DogImage'

const FunDogFacts = () => {
  const { fact, loading, fetchFact } = DogFact()
  const { dogImage, fetchDogImage, setDogImage } = DogImage()
  const [searchParams, setSearchParams] = useSearchParams()
  const showDetails = searchParams.get('showDetails') === 'true'

  const openPopup = () => {
    setSearchParams({ showDetails: 'true' })
  }

  const closePopup = () => {
    setSearchParams({})
    setDogImage('')
  }

  useEffect(() => {
    if (showDetails) {
      fetchDogImage()
    }
  }, [showDetails, fetchDogImage])

  return (
    <div className='dog-fact-container'>
      <h2>🐾 Did you know?</h2>
      {loading ? <p>Loading...</p> : <p className='dog-fact'>{fact}</p>}
      <button onClick={fetchFact} className='new-fact-btn'>
        New Fact
      </button>
      <button onClick={openPopup} className='fact-details-btn'>
        Fact Details
      </button>

      {showDetails && (
        <div className='popup'>
          <div className='popup-content'>
            <span className='close-btn' onClick={closePopup}>
              &times;
            </span>
            <h3>Fun Dog Fact</h3>
            <p>{fact}</p>
            {dogImage && (
              <img src={dogImage} alt='Random Dog' className='dog-image' />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FunDogFacts
