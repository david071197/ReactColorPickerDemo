import React, { Component, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const COLORS = ['black', 'blue', 'green', 'red', 'yellow', 'violet'];

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

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "black"
    }
  }

  render() {
    return(
      <div className="color-picker">
        <ColorDropdown color={this.state.color} onChange={(color) => this.setState({ color })}/>
        <div className="button-container">
          <button className="color-blue"   onClick={() => this.setState({ color: 'blue'})}></button>
          <button className="color-green"  onClick={() => this.setState({ color: 'green'})}></button>
          <button className="color-red"    onClick={() => this.setState({ color: 'red'})}></button>
          <button className="color-yellow" onClick={() => this.setState({ color: 'yellow'})}></button>
          <button className="color-violet" onClick={() => this.setState({ color: 'violet'})}></button>
        </div>
        <ColorContainer color={this.state.color}/>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Color Picker Challange</p>
        </header>
        <ColorPicker />
      </div>
    );
  }
}

export default App;
