import React, { useState } from 'react';

import '../style/CreateMatch.scss';
import Button from '../components/common/Button.js'

import { makePostRequest } from '../hooks/makeRequest';

export default function CreateMatch({owner, changeStage}) {
  const [stake, setStake] = useState('')
  const [contestants, setContestants] = useState([{ name: '' }])

  function handleStakeChange(e) {
    setStake(e.target.value);
  }

  function handleContestantNameChange(e, i) {
    const { name, value } = e.target;
    const list = [...contestants];

    list[i][name] = value;
    setContestants(list);
  }

  function handleAddContestant(e) {
    setContestants([...contestants, { name: '' }]);
  }

  function handleRemoveContestant(e, i) {
    const list = [...contestants];

    list.splice(i, 1)
    setContestants(list)
  }

  async function handleStartMatch(e) {
    const response = await makePostRequest("/match", {
      match: { stake, contestants }
    })
    console.log(response)

    if (response.ok) {
      changeStage(response.data['next_stage'])
    } else {
      // TODO Handle Error
    }
  }

  /**
   * Checks to see if the contestant list has at least one valid entry
   */
  function checkContestantsLength() {
    return (contestants.length && contestants[0].name.length) || false
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
          {contestants.map((x, i) => {
            return (
              <div className='row' key={i}>
                <div className="input-group">
                  <div className="flex-row">
                    <input type="text" name="name" className={`${contestants.length !== 1 ? 'button-right' : ''}`} placeholder='Name' value={x.name} onChange={e => handleContestantNameChange(e, i)}/>
                    { contestants.length !== 1 &&
                      <Button 
                        text="-" 
                        className='extra-small input-left' 
                        onClick={handleRemoveContestant} 
                      />
                    }
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className='row'>
          <Button 
            text="Add another contestant"
            className='wide'
            onClick={handleAddContestant}
          />
        </div>
        <div className='row extra-space'>
          <Button
            text="Open bets"
            className='wide'
            onClick={handleStartMatch}
            disabled={!stake || !checkContestantsLength()}
          />
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
