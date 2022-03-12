import React, { useState } from 'react';
import { useInterval } from '../hooks/useInterval';

import '../style/CreateMatch.css';

export default function CreateMatch({owner, changeStage}) {
  const [stake, setStake] = useState('')
  const [contestantList, setContestantList] = useState([{ name: '' }])

  function handleStakeChange(e) {
    setStake(e.target.value);
  }

  function handleContestantNameChange(e, i) {
    const {name, value } = e.target;
    const list = [...contestantList];
    list[i][name] = value;
    setContestantList(list);
  }

  function handleAddContestant(e) {
    setContestantList([...contestantList, { name: '' }]);
  }

  function handleRemoveContestant(e, i) {
    const list = [...contestantList];
    list.splice(i, 1)
    setContestantList(list)
  }

  function handleStartMatch(e) {
    fetch("http://localhost:4000/match", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken')
      },
      body: JSON.stringify({
        match: {
          stake: stake,
          contestants: contestantList
        }
      })
    }).then((res) => res.json())
      .then(data => {
        changeStage(data['next_stage'])
      })
      .catch((error) => console.log(error));
  }

  function checkStage() {
    fetch("http://localhost:4000/room", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken')
      }
    }).then((res) => res.json())
      .then(data => {
        console.log(data['stage']);
        return data['stage']
      })
      .catch((error) => console.log(error));
  }

  useInterval(async () => {
    console.log('checking to see if the stage has changed');
    const stage = checkStage()
    // if (stage !== 'pending') changeStage(stage)
    console.log(stage);
  }, 2000)

  if (owner) {
    return (
      <div className='CreateMatch row'>
        <div>
          <input type="number" className='input-number' placeholder='Set Stake' value={stake} onChange={handleStakeChange} />
        </div>
        <div className='contestants'>
          {contestantList.map((x, i) => {
            return (
              <div className='row'>
                <input type="text" name="name" className='input-text' placeholder='Name' value={x.name} onChange={e => handleContestantNameChange(e, i)}/>
                { contestantList.length !== 1 &&
                  <button className='button-small' onClick={handleRemoveContestant}>-</button>
                }
              </div>
            )
          })}
        </div>
        <div className='row'>
          <button className='button-wide' onClick={handleAddContestant}>Add another contestant</button>
        </div>
        <div className='row'>
          <button className='button-wide' onClick={handleStartMatch}>Open bets</button>
        </div>
      </div>
    )
  }

  return (
    <div className='CreateMatch'>
      waiting for match to begin, hold tight!
    </div>
  )
}
