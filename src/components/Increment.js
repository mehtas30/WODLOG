const Increment = ({count, decrement, increment}) => {
  return (
    <div className="incrementer-wrapper">
        <button id="incrementer-component" className="incrementer-btn" onClick={decrement}>-</button>
        <input id="incrementer-component" className="incrementer-counter" value={count}/>
        <button id="incrementer-component" className="incrementer-btn" onClick={increment}>+</button>
    </div>
  )
}

export default Increment