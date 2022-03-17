import React, { useState } from 'react';

import '../style/CreateMatch.scss';

import { makePostRequest } from '../hooks/makeRequest';

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
    makePostRequest("/match", {
      match: {
        stake: stake,
        contestants: contestantList
      }
    }, (data) => {
      changeStage(data['next_stage'])
    })
  }

  if (owner) {
    return (
      <div className='CreateMatch form'>
        <div className="row mg-top-10">
          <div className="input-group">
            <label>Stake</label>
            <input name="stake" type="number" className='input-number' placeholder='Set Stake' value={stake} onChange={handleStakeChange} />
          </div>
        </div>
        <div className="row extra-space">
          <div className="input-group">
            <label className="mg-top-10">Contestants</label>
          </div>
        </div>
        <div className='contestants'>
          {contestantList.map((x, i) => {
            return (
              <div className='row' key={i}>
                <div className="input-group">
                  <div className="flex-row">
                    <input type="text" name="name" className={`${contestantList.length !== 1 ? 'button-right' : ''}`} placeholder='Name' value={x.name} onChange={e => handleContestantNameChange(e, i)}/>
                    { contestantList.length !== 1 &&
                      <button className='button extra-small input-left' onClick={handleRemoveContestant}>-</button>
                    }
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='row'>
          <button className='button wide' onClick={handleAddContestant}>Add another contestant</button>
        </div>
        <div className='row extra-space'>
          <button disabled={!stake} className='button wide' onClick={handleStartMatch}>Open bets</button>
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
