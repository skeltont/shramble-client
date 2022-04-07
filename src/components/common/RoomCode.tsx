import React, { useState } from 'react'

import '../../style/RoomCode.scss'

interface RoomCodeProps {
  text: string
}

export default function RoomCode({ text }: RoomCodeProps) {
  const [isCopied, setIsCopied] = useState(false)

  async function copyTextToClipboard(text: string) {
    return await navigator.clipboard.writeText(text);
  }

  function handleCopyClick() {
    copyTextToClipboard(text)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => {
          setIsCopied(false)
        }, 1500)
      })
  }

  return (
    <div className='room-code-container'>
      <div className='room-code-gutter'></div>
      <button className='room-code-button' onClick={handleCopyClick}>
        <span>{ text }</span>
      </button>
      <div className='room-code-gutter'>
        <span className='room-code-alert' style={{visibility: isCopied ? 'visible' : 'hidden'}}>{isCopied ? 'Copied!' : 'Copy'}</span>
      </div>
    </div>
  );
}
