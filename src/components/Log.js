import React from 'react'
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

// Components
import Increment from './Increment';
import LogItem from './LogItem';

// Font Awesome
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// DayPicker
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, new Date(), { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

const Log = () => {
  const [date, setDate] = useState("")
  const [workout, setWorkout] = useState("")
  const [repCount, setRepCount] = useState(0) 
  const [setsCount, setSetsCount] = useState(0)
  const [time, setTime] = useState(0);
  const [notes, setNotes] = useState("")
  const [weight, setWeight] = useState(45)
  const [logList, setLogList] = useState([])

  // Fetch logs from JSON backend
  const fetchLog = async () => {
    const response = await fetch('http://localhost:5000/logs')
    const data = await response.json()

    return data
  }

  useEffect(() => {
    const getLogs = async () => {
        const logsFromBackend = await fetchLog()
        setLogList(logsFromBackend)
    }
    getLogs()
  }, [])

  const decrementRepCount = () => {
    if(repCount === 0) return
    setRepCount(repCount-1)
  }

  const incrementRepCount = () => {
    setRepCount(repCount+1)
  }

  const decrementSetsCount = () => {
    if(setsCount === 0) return
    setSetsCount(setsCount-1)
  }

  const incrementSetsCount = () => {
    setSetsCount(setsCount+1)
  }

  const decrementTime = () => {
    if(time === 0) return
    setTime(time - 0.5)
  }

  const incrementTime = () => {
    setTime(time + 0.5)
  }

  const decrementWeight = () => {
    if(weight === 0) return
    setWeight(weight - 2.5)
  }

  const incrementWeight = () => {
    setWeight(weight + 2.5)
  }

  const onNotesChange = (e) => {
    setNotes(e.target.value);
  }

  const onWorkoutChange = (e) => {
    setWorkout(e.target.value);
  }

  const onDateChange = (date) => {
    setDate(dateFnsFormat(date, "yyyy-MM-dd"));
  }

  const addLog = async () => {
    if(workout.length === 0 || date.length === 0){
      alert("Please fill out log properly...")
      return
    }
    const data = {
      id: uuidv4(),
      date: date,
      workout: workout,
      sets: setsCount,
      reps: repCount,
      weight: weight,
      time: time,
      notes: notes
    }
    const response = await fetch("http://localhost:5000/logs", {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    setLogList([...logList, data])
  }

  const deleteLog = async (id) => {
    await fetch(`http://localhost:5000/logs/${id}`, {
      method: "DELETE"
    })
    console.log(id)
    setLogList(logList.filter((log) => log.id !== id))
  }

  return (
    <div className='log-wrapper'>
      <div className="log-title">Log Your Workouts</div>
      <div className="log-form">
        <div id="log-form-item" className="input-wrapper">
          <p id="log-form-label">Workout: </p>
          <input id="log-form-item" type="text" name="workout-field" placeholder='Enter workout' onChange={(e) => onWorkoutChange(e)}/>
        </div>

        <div id="log-form-item" className="input-wrapper">
          <p id="log-form-label">Sets: </p>
          <Increment count={setsCount} increment={incrementSetsCount} decrement={decrementSetsCount}/>
        </div>

        <div id="log-form-item" className="input-wrapper">
          <p id="log-form-label">Reps: </p>
          <Increment count={repCount} increment={incrementRepCount} decrement={decrementRepCount}/>
        </div>

        <div id="log-form-item" className="input-wrapper">
          <p id="log-form-label">Weight(lbs): </p>
          <Increment count={weight} increment={incrementWeight} decrement={decrementWeight}/>
        </div>

        <div id="log-form-item" className="input-wrapper">
          <p id="log-form-label">Time(min): </p>
          <Increment count={time} increment={incrementTime} decrement={decrementTime}/>
        </div>
        
        <div id="log-form-item" className='date-picker-column-container'>
          <p id="log-form-label">Date Posted: </p>
          <DayPickerInput formatDate={formatDate} parseDate={parseDate} format={"yyyy-MM-dd"} onDayChange={onDateChange} component={props => <input className="date-picker-input" placeholder="YYYY-MM-DD" {...props}/>} />            
        </div>

        <div>
          <div id="log-form-item">
            <p id="log-form-label">Additional Notes: </p>
            <input type="text" className='log-form-notes' placeholder='Enter notes' onChange={(e) => onNotesChange(e)}/>
          </div>
          <button onClick={addLog} id="log-form-item" className='log-form-add'>Log <FontAwesomeIcon icon={faCheck} /></button>
        </div>
      </div>

      <div className='log-entries-wrapper'>
        {logList.map((item, index) => (
          <div key={item.id} className='logitem-id-eventWrapper'>
            <LogItem data={item} remove={deleteLog}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Log