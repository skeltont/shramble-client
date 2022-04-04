import React, { useState } from 'react'

import '../style/CreateMatch.scss'

import Button from './common/Button'
import { makePostRequest } from '../hooks/makeRequest'

interface CreateMatchProps {
  owner: boolean,
}

interface Contestant {
  name: string
}
interface Contestants extends Array<Contestant>{}

export default function CreateMatch({owner} : CreateMatchProps) {
  const [stake, setStake] = useState('')
  const [contestants, setContestants] = useState<Contestants>([{ name: ''}])

  function handleStakeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setStake(e.target.value)
  }

  function handleContestantNameChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
    const { name, value } = e.target
    const list = [...contestants]

    list[i].name = value

    setContestants(list)
  }

  function handleAddContestant() {
    setContestants([...contestants, { name: '' }])
  }

  function handleRemoveContestant(i: number) {
    const list = [...contestants]

    list.splice(i, 1)
    setContestants(list)
  }

  async function handleStartMatch() {
    const response = await makePostRequest("/match", {
      match: { stake, contestants }
    })

    if (response.ok) {
      // TODO anything?
    } else {
      // TODO Handle Error
    }
  }

  /**
   * Checks to see if the contestant list has at least one valid entry
   */
  function checkContestantsLength(): number {
    return (contestants.length && contestants[0].name.length) || 0
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
                        value={String(i)}
                        className='extra-small input-left'
                        onClick={() => handleRemoveContestant(i)}
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
