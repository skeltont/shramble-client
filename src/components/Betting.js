import React, { useEffect, useState } from 'react';

import { makeGetRequest, makePostRequest } from '../hooks/makeRequest';

export default function Betting({ owner, changeStage }) {
  const [contestantList, setContestantList] = useState([{ id: '', name: '' }])
  const [matchId, setMatchId] = useState(null)

  useEffect(() => {
    makeGetRequest("/contestant", (data) => {
      setContestantList(data['contestants']);
      setMatchId(data['match_id'])
    })
  }, [])

  function handleContestantSelection(e) {
    makePostRequest("/result", {
      result: {
        match_id: matchId,
        contestant_id: e.target.value
      }
    }, (data) => {
      console.log(data);
    })
  }

  function handleBeginMatch(e) {
    makePostRequest("/start", { result: { match_id: matchId }}, (data) => {
      changeStage(data['next_stage'])
    })
  }

  return (
    <div className='Betting'>
      <h1>Select a Contestant!</h1>
      <div className='contestants'>
        {contestantList.map((x, i) => {
          return (
            <div className='row' key={i}>
              <button className='button-wide' value={x.id} onClick={handleContestantSelection}>{x.name}</button>
            </div>
          )
        })}
      </div>
      { owner &&
        <div className='row'>
          <button className='button-wide' onClick={handleBeginMatch}>Begin Match</button>
        </div>
      }
    </div>
  )
}
