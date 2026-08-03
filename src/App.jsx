import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import logo from './logo.svg';
import './App.css';

const COLORS = [
  'black',
  'blue',
  'green',
  'red',
  'yellow',
  'violet',
  'brown',
];

const BUTTON_COLORS = COLORS.filter(
  (color) => color !== 'black'
);

const capitalize = (value) => value.charAt(0).toUpperCase() + value.slice(1);

function ColorContainer({color}) {
  const className = "color-container color-" + color;
  return <div className={className}></div>
}

function ColorDropdown({color, onChange}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const select = (value) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <div className="color-dropdown" ref={containerRef}>
      <button
        type="button"
        className="color-dropdown-toggle"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className={"color-swatch color-" + color}></span>
        <span className="color-dropdown-label">{capitalize(color)}</span>
        <span className="color-dropdown-caret">▾</span>
      </button>
      {open && (
        <ul className="color-dropdown-list" role="listbox">
          {COLORS.map((option) => (
            <li key={option} role="option" aria-selected={option === color}>
              <button
                type="button"
                className={"color-dropdown-option" + (option === color ? " is-selected" : "")}
                onClick={() => select(option)}
              >
                <span className={"color-swatch color-" + option}></span>
                <span className="color-dropdown-label">{capitalize(option)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ColorPicker() {
  const [color, setColor] = useState('black');

  return (
    <div className="color-picker">
      <ColorDropdown
        color={color}
        onChange={setColor}
      />
      <div className="button-container">
        {BUTTON_COLORS.map((option) => (
          <button
            key={option}
            className={"color-" + option}
            aria-label={capitalize(option)}
            onClick={() => setColor(option)}
          ></button>
        ))}
      </div>
      <ColorContainer color={color}/>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <p>Color Picker Challange</p>
      </header>
      <ColorPicker />
    </div>
  );
}

export default App;
