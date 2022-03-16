import React, { useEffect, useState } from 'react';

import { makeGetRequest } from '../hooks/makeRequest';

export default function Results({ owner, changeStage }) {
  const [standings, setStandings] = useState([{ name: '', winnings: 0.0 }])

  useEffect(() => {
    makeGetRequest("/standings", (data) => {
      setStandings(data['standings']);
    })
  }, [])

  function handleNewMatch(e) {
    console.log('todo');
  }

  return (
    <div className='Results'>
      <div className='Ongoing'>
        <h1>Standings</h1>
        <div className='standings'>
          <table>
            <thead>
              <tr>
                <td>Player</td>
                <td>Winnings</td>
              </tr>
            </thead>
            <tbody>
              {standings.map((x, i) => {
                return (
                  <tr key={i}>
                    <td>{x.name}</td>
                    <td>{x.winnings}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {owner &&
          <div className='row'>
            <button className='button-wide' onClick={handleNewMatch}>End Match</button>
          </div>
        }
      </div>
    </div>
  )
}
