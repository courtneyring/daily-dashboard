'use client';
import './Weather.scss'
import { useEffect, useState } from 'react';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json())
import moment from 'moment';
const lat = 40.726212
const lon = -74.001757
const key = 'c637665d966fe3267ce408e4decfccfa'

export default function Weather() {
  const [weatherNow, setWeatherNow] = useState({})
  const [weatherForecast, setWeatherForecast] = useState([])

  const weatherResp = useSWR(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`, fetcher, { refreshInterval: 600000 })
  const forecastResp = useSWR(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`, fetcher, { refreshInterval: 600000 })


  const formatData = (d) => {
    return {
      description: d.weather[0].description,
      temp: Math.round(d.main.temp),
      feelsLike: Math.round(d.main.feels_like),
      icon: d.weather[0].icon,
      dt: moment.unix(d.dt).format('ha')
    }
  }

  useEffect(() => {
    let data = weatherResp.data;
    let forecastData = forecastResp.data;
    console.log(forecastResp.data)
    const now = data && data.weather ? formatData(data) : {}
    const later = forecastData && forecastData.list && forecastData.list.map(formatData).slice(0, 3)
    
    setWeatherForecast(later)
    setWeatherNow(now)
    console.log(later)
  }, [weatherResp.data, forecastResp.data])

  const getWeatherBlock = (weather, alignment)=> {
    return <div className={`weather__temp flex flex-col items-${alignment} `}>
      <span className='description'>{weather.description}</span>
      <span className='temp'>{weather.temp}&deg; F</span>
      <i className='feels-like'>Feels like {weather.feelsLike}&deg;</i>

    </div>
  }

  return <>
    <div className='flex widget flex-col'>
      <div className='weather__now flex items-center justify-between mb-5'>
        {getWeatherBlock(weatherNow, 'start')}
        <img src={`https://openweathermap.org/img/wn/${weatherNow.icon}@2x.png`} />

      </div>
      <div className='flex'>
        {weatherForecast?.map((time, idx) => {
          return (
            <div className='flex flex-col items-center weather__temp mx-5' key={`w-${idx}`}>
              <div>{time.dt}</div>
              <img src={`https://openweathermap.org/img/wn/${time.icon}@2x.png`} className='w-16'/>
              
              {getWeatherBlock(time, 'center')}
            </div>
          )
        })}
      </div>
    </div>
  </>
}