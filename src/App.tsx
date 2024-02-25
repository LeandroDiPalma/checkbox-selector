import React, { useReducer } from "react";
import styles from "./App.module.css";

interface Country {
  name: string;
  checked: boolean;
}

type State = Country[];
type Action =
  | { type: "toggle"; name: string }
  | { type: "toggleAll"; checked: boolean };

const reducer = (state: State, action: Action) : State =>{
  switch (action.type) {
    case "toggle":
      return state.map((country) =>
        country.name === action.name
          ? { ...country, checked: !country.checked }
          : country
      );
    case "toggleAll":
      return state.map((country) => ({ ...country, checked: action.checked }));
    default:
      return state;
  }
}

const initialState: Country[] = [
  { name: "India", checked: false },
  { name: "USA", checked: false },
  { name: "France", checked: false },
  { name: "Argentina", checked: false },
];

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const allChecked = state.every((country) => country.checked);


  const toggleCountry = (name: string) => dispatch({ type: "toggle", name });
  const toggleAll = (checked: boolean) =>
    dispatch({ type: "toggleAll", checked });

  return (
    <div>
      <div className={styles.checkboxList}>
        <label className={styles.selectAllCheckbox}>
          <input
            type="checkbox"
            checked={allChecked}
            onChange={() => toggleAll(!allChecked)}
            aria-label="Select All Countries"
          />{" "}
          Select All
        </label>
        {state.map((country, index) => (
          <label key={index} className={styles.checkboxItem}>
            <input
              type="checkbox"
              checked={country.checked}
              onChange={() => toggleCountry(country.name)}
              aria-label={`Select ${country.name}`}
            />{" "}
            {country.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default App;
