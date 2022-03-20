import React, { useEffect, useState } from 'react';

import { makeGetRequest, makePostRequest } from '../hooks/makeRequest';

export default function Ongoing({ owner, changeStage }) {
  const [results, setResults] = useState([{name: '', contestant: ''}])
  const [contestantList, setContestantList] = useState([{ id: '', name: '' }])
  const [matchId, setMatchId] = useState(null)
  const [winner, setWinner] = useState(null)

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

  async function handleEndMatch(e) {
    const response = await makePostRequest("/end", {
      match: {
        contestant_id: winner,
        match_id: matchId
      }
    })

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
        <div className='contestants'>
          {contestantList.map((x, i) => {
            return (
              <div className='row' key={i}>
                <button className='button-wide' value={x.id} onClick={handleWinnerSelection}>{x.name}</button>
              </div>
            )
          })}
        </div>
      }
      {owner &&
        <div className='row'>
          <button className='button-wide' onClick={handleEndMatch}>End Match</button>
        </div>
      }
    </div>
  )
}
