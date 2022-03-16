import React, { useEffect, useState } from 'react';

import { makeGetRequest, makePostRequest } from '../hooks/makeRequest';

export default function Ongoing({ owner, changeStage }) {
  const [results, setResults] = useState([{name: '', contestant: ''}])
  const [contestantList, setContestantList] = useState([{ id: '', name: '' }])
  const [matchId, setMatchId] = useState(null)
  const [winner, setWinner] = useState(null)

  useEffect(() => {
    makeGetRequest("/result", (data) => {
      setResults(data['results']);
      setContestantList(data['contestants'])
      setMatchId(data['match_id'])
    })
  }, [])

  function handleEndMatch(e) {
    makePostRequest("/end", {
      match: {
        contestant_id: winner,
        match_id: matchId
      }
    }, (data) => {
      changeStage(data['next_stage'])
    })
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
