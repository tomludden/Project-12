import React, { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import './FunDogFacts.css'

const FunDogFacts = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const showDetails = searchParams.get('showDetails') === 'true'

  const [fact, setFact] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(true)

  const API_BASE =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:3001'
      : 'https://dog-facts-api.onrender.com'

  const fetchFactAndImage = useCallback(async () => {
    setLoading(true)
    try {
      const [factRes, imageRes] = await Promise.all([
        fetch(`${API_BASE}/api/dog-fact`),
        fetch('https://dog.ceo/api/breeds/image/random')
      ])
      const factData = await factRes.json()
      const imageData = await imageRes.json()
      setFact(factData.fact || 'No fact found.')
      setImage(imageData.message || '')
    } catch (error) {
      console.error('Error fetching data:', error)
      setFact('Could not fetch dog fact right now.')
      setImage('')
    } finally {
      setLoading(false)
    }
  }, [API_BASE])

  const fetchFactOnly = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/dog-fact`)
      const data = await res.json()
      setFact(data.fact || 'No fact found.')
    } catch (error) {
      console.error('Error fetching fact:', error)
      setFact('Could not fetch dog fact right now.')
    } finally {
      setLoading(false)
    }
  }, [API_BASE])

  const fetchRandomImage = useCallback(async () => {
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random')
      const data = await res.json()
      setImage(data.message || '')
    } catch (error) {
      console.error('Error fetching random image:', error)
      setImage('')
    }
  }, [])

  useEffect(() => {
    fetchFactAndImage()
  }, [fetchFactAndImage])

  const openPopup = async () => {
    await fetchRandomImage()
    setSearchParams({ showDetails: 'true' })
  }

  const closePopup = () => setSearchParams({})

  return (
    <div className='dog-fact-container'>
      <h2>Did you know?</h2>

      <div className='dog-fact'>
        {loading ? <p>Loading dog fact...</p> : <p>{fact}</p>}

        <div className='button-group'>
          <button onClick={fetchFactOnly} className='new-fact-btn'>
            New Fact
          </button>
          <button onClick={openPopup} className='fact-details-btn'>
            Fact Details
          </button>
        </div>
      </div>

      {showDetails && (
        <div className='popup'>
          <div className='popup-content'>
            <span className='close-btn' onClick={closePopup}>
              &times;
            </span>
            <h3>Fun Dog Fact</h3>
            <p>{fact}</p>
            {image && <img src={image} alt='Dog' className='popup-img' />}
          </div>
        </div>
      )}
    </div>
  )
}

export default FunDogFacts
