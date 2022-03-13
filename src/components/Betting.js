import React, { useEffect, useState } from 'react';

export default function Betting({ owner, changeStage }) {
  const [contestantList, setContestantList] = useState([{ id: '', name: '' }])
  const [matchId, setMatchId] = useState(null)

  useEffect(() => {
    fetch("http://localhost:4000/contestant", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken')
      }
    }).then((res) => res.json())
      .then(data => {
        setContestantList(data['contestants']);
        setMatchId(data['match_id'])
      })
      .catch((error) => console.log(error));
  }, [])

  function handleContestantSelection(e) {
    fetch("http://localhost:4000/result", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken')
      },
      body: JSON.stringify({
        result: {
          match_id: matchId,
          contestant_id: e.target.value
        }
      })
    }).then((res) => res.json())
      .then(data => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  function handleBeginMatch(e) {
    fetch("http://localhost:4000/start", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken')
      },
      body: JSON.stringify({
        result: {
          match_id: matchId
        }
      })
    }).then((res) => res.json())
      .then(data => {
        changeStage(data['next_stage'])
      })
      .catch((error) => console.log(error));
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
