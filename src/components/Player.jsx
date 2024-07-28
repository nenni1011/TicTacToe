import { useState } from "react"
export default function Player ({initialName, symbol, isActive, onChangeName}) {

  const [name, changeName] = useState(initialName)
  const [isEditing, setEditing] = useState(false)

  function changeEdit () {
    setEditing(prevEditing => !prevEditing);

    if(isEditing){
      onChangeName(symbol, name);
    }
  }

  function handleNameChange(event){
    console.log(event.target.value);
    changeName(event.target.value);
  }

  // decided based on the editing status
  let playerInfo = <span className = 'player-name'>{name}</span>;
  let changeButton = 'Edit'
  
  if(isEditing){
    playerInfo = <input type="text" required defaultValue = {name} onChange={handleNameChange}/ >
      changeButton="Save"
  }

  return (
    <li className = { isActive ? 'active' : undefined }>
          <span className = 'player'>
            {playerInfo}
            <span className = 'playeer-symbol'>{symbol}</span>
          </span>

          <button onClick = {changeEdit}> {changeButton} </button>
    </li>
  )
}