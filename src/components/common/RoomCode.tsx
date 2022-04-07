import React, { useEffect, useState } from 'react'

import '../../style/RoomCode.scss'

interface RoomCodeProps {
  value: string
}

export default function RoomCode({ value }: RoomCodeProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [displayText, setDisplayText] = useState(value)

  async function copyTextToClipboard(value: string) {
    return await navigator.clipboard.writeText(value);
  }

  useEffect(() => {
    setDisplayText(value)
  }, [value])

  function handleCopyClick() {
    copyTextToClipboard(value)
      .then(() => {
        setDisplayText('Copied!')
        setTimeout(() => {
          setDisplayText(value)
        }, 1500)
      })
  }

  return (
    <div className='room-code-container' style={{ visibility: value ? 'visible' : 'hidden' }}>
      <button className='room-code-button' onClick={handleCopyClick}>
        <span>{ displayText }</span>
      </button>
    </div>
  );
}
