import React, { useEffect, useState } from 'react';

import { makeGetRequest } from '../hooks/makeRequest';
import Button from '../components/common/Button.tsx'

export default function Results({ owner }) {
  const [standings, setStandings] = useState([{ name: '', winnings: 0.0 }])

  useEffect(async () => {
    const response = await makeGetRequest("/standings")

    if (response.ok) {
      setStandings(response.data['standings']);
    } else {
      // TODO handle error
    }
  }, [])

  async function handleNewMatch(e) {
    const response = await makeGetRequest("/match/new")

    if (response.ok) {
      // TODO anything?
    } else {
      // TODO handle error
    }
  }

  return (
    <div className='Results'>
      <div className='Ongoing form'>
        <div className='stage-header'>
          <h1>Standings</h1>
        </div>
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
          <div className='row extra-space'>
            <Button
              text="New Match"
              className='wide primary'
              onClick={handleNewMatch}
            />
          </div>
        }
      </div>
    </div>
  )
}
