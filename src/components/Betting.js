import React, { useEffect, useState } from 'react';

import '../style/Betting.scss';

import { makeGetRequest, makePostRequest } from '../hooks/makeRequest';

export default function Betting({ owner, changeStage }) {
  const [contestantList, setContestantList] = useState([{ id: '', name: '' }])
  const [matchId, setMatchId] = useState(null)
  const [selectedContestant, setSelectedContestant] = useState(null)

  useEffect(async () => {
    const response = await makeGetRequest("/contestant")

    if (response.ok) {
      setContestantList(response.data['contestants']);
      setMatchId(response.data['match_id']);
    } else {
      // TODO handle error
    }
  }, [])

  async function handleContestantSelection(e) {
    // TODO Need error handling
    e.target.closest('button').classList.toggle('loading');

    const response = await makePostRequest("/result", {
      result: {
        match_id: matchId,
        contestant_id: e.target.value
      }
    })
    // Simulating load time just to show loading state
    setTimeout(() => {
      setSelectedContestant(e.target.value);
    }, 1000);
  }

  async function handleBeginMatch(e) {
    e.target.closest('button').classList.toggle('loading');

    const response = await makePostRequest("/start", { 
      result: { 
        match_id: matchId 
      }
    })
    if (response.ok) {
      changeStage(response.data['next_stage']);
    } else {
      // TODO handle error
    }
  }

  function setContestantButtonStyle(contestant) {
    // TODO get percentage of total votes for this contestant
    // Need backend to return either calculated percentage or number of votes and total count
    // A way to work in an integer count of votes would be nice
    // Example of style, replace percentage
    // return { backgroundImage: "linear-gradient(to right, red, red 70%, transparent 70%, transparent 100%)" }
  }

  function ContestantList(props) {
    const listItems = props.contestants.map((contestant) => 
      <div className="contestant-row row" key={contestant.id}>
        <button className={`button input-right ${contestant.id === selectedContestant ? 'selected' : ''}`} style={setContestantButtonStyle(contestant)} value={contestant.id} onClick={handleContestantSelection}>
          <span className="text">{contestant.name}</span>
        </button>
      </div>
    )

    return (<div>{listItems}</div>)
  }

  return (
    <div className='Betting form'>
      {/* <h1>Select a Contestant!</h1> */}
      <div className="row mg-top-10">
        <div className="input-group">
          <label>Select a Contestant</label>
        </div>
      </div>
      <ContestantList contestants={contestantList} />
      {owner &&
        <div className='row extra-space'>
          <button className='button primary' onClick={handleBeginMatch}>
            <span className="text">Begin Match</span>
          </button>
        </div>
      }
    </div>
  )
}
