export default function Button({
  text, 
  value, 
  className='', 
  onClick, 
  disabled=false,
  loading=false, 
  percent=false, 
  styleOverwrite={},
  percentBarColor='teal'
}) {
  // function onClick() {
  //   onClick()
  // }

  function generateStyle() {
    let style = Object.assign({}, styleOverwrite)

    if (percent) style = Object.assign(generatePercentBar(), styleOverwrite)

    return style
  }

  function generatePercentBar() {
    return {
      backgroundImage: `linear-gradient(
        to right, 
        ${percentBarColor}, 
        ${percentBarColor} ${percent}%, 
        transparent ${percent}%, 
        transparent 100%)`
    }
  }

  return (
    <button 
      className={`button ${className} ${loading ? 'loading' : ''}`} 
      value={value} 
      style={generateStyle()} 
      onClick={onClick}
      disabled={disabled}
    >
      <span className="text">{text}</span>
    </button>
  )
}
