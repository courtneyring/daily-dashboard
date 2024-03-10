'use client';
import { useEffect, useState } from 'react';
import './Train.scss';
import useSWR from 'swr';
import moment from 'moment';


const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function Train() {

  const [trains, setTrains] = useState([]);
  const { data, error, isLoading } = useSWR('https://realtimerail.nyc/transiter/v0.6/systems/us-ny-subway/stops/A33', fetcher, { refreshInterval: 1000 })


  const filterStops = (stop) => {
    const isUptown =  stop.track == 'A2';
    const isPositive = moment.unix(stop.arrival.time).diff(moment(), 'seconds') > 0;
    return isUptown && isPositive

  }

  const formatStop = (stop) => {
    const headsign = stop.headsign;
    const remainingMin = moment.unix(stop.arrival.time).diff(moment(), 'minutes')
    const remainingSec = moment.unix(stop.arrival.time).diff(moment(), 'seconds')
    const remaining = remainingMin ? remainingMin + 'm' : remainingSec + 's';
    const time = moment.unix(stop.arrival.time).format('h:mm a');
    const trip = stop.trip.route.id;
    return { headsign, remaining, time, trip }
  }

  useEffect(() => {
    const uptownStops = data?.stopTimes.filter(filterStops).sort((a, b) => a.arrival.time - b.arrival.time).slice(0, 5)

    if (uptownStops?.length) {
      let current = uptownStops.map(formatStop)
      setTrains(current)
    }
  }, [data])

  useEffect(() => {
    console.log(trains)
  }, [trains])

  return (
    <div className='widget'>
      <h3>Trains</h3>
      <div>{trains && <table className="table-auto">
        <thead></thead>
        <tbody>
          {trains.map((train, idx) => {
            return (
              <tr key={idx}> 
                <td><div className='train__icon flex justify-center align-center'>{train.trip}</div></td>
                {/* <td>{train.headsign}</td> */}
                <td>{train.remaining}</td>
                <td>{train.time}</td>
              </tr>
            )
          })}

        </tbody>
      </table>}
      </div>
    </div>
    
  )
}