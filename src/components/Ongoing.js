import React, { useEffect, useState } from 'react';

import { makeGetRequest, makePostRequest } from '../hooks/makeRequest';
import Button from '../components/common/Button.js'

export default function Ongoing({ owner, changeStage }) {
  const [results, setResults] = useState([{name: '', contestant: ''}])
  const [contestantList, setContestantList] = useState([{ id: '', name: '' }])
  const [matchId, setMatchId] = useState(null)
  const [winner, setWinner] = useState(null)
  const [loading, setLoading] = useState('')

  useEffect(async () => {
    const response = await makeGetRequest("/result")

    if (response.ok) {
      setResults(response.data['results']);
      setContestantList(response.data['contestants'])
      setMatchId(response.data['match_id'])
    } else {
      // TODO handle error
    }
  }, [])

  const disabled = () => loading === 'endMatch'

  async function handleEndMatch(e) {
    setLoading('endMatch')
    const response = await makePostRequest("/end", {
      match: {
        contestant_id: winner,
        match_id: matchId
      }
    })
    setLoading('')

    if (response.ok) {
      changeStage(response.data['next_stage'])
    } else {
      // TODO handle error
    }
  }

  function handleWinnerSelection(e) {
    setWinner(e.target.value)
  }

  return (
    <div className='Ongoing'>
      <h1>Current Match Bets</h1>
      <div className='results'>
        <table>
          <thead>
            <tr>
              <td>Player</td>
              <td>Contestant</td>
            </tr>
          </thead>
          <tbody>
            {results.map((x, i) => {
              return (
                <tr key={i}>
                  <td>{x.name}</td>
                  <td>{x.contestant}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      { owner &&
        <div className='contestants form mg-top-10'>
          {contestantList.map((x, i) => {
            return (
              <div className='row' key={i}>
                <Button
                  disabled={disabled()}
                  text={x.name}
                  className={`wide ${winner === x.id ? 'selected' : ''}`}
                  value={x.id}
                  onClick={handleWinnerSelection}
                />
              </div>
            )
          })}
        </div>
      }
      {owner &&
        <div className='row extra-space'>
          <Button
            text="End Match"
            disabled={disabled()}
            loading={loading === 'endMatch'}
            className='wide primary' 
            onClick={handleEndMatch}
          />
        </div>
      }
    </div>
  )
}
