/*

What this is: 	A330 Hydraulic System react app. 

Written by : 	  Jeff Latham

*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Import SVG source files
import { ReactComponent as HydSystemUI  } from './svg/A330HydSystemUI.svg'

let testValue = 2950;

// getElement does the same thing as "document.getElementById()" except 
// it's also nice enough to tell you if it can't find the element instead 
// of just mysteriously breaking the program and leaving you S.O.L. (:
function getElement(elementID) {
  let element = document.getElementById(elementID);
  if(element === null) { alert('cannot find element: ' + elementID); };
  return element;
}

// // Default View object
let hydSystemUI = {

  refreshRate: 10, // Hz

  // switches object contains all switch objects
  switches: {

    // Switch Names:
    // These switch names must exactly match the "id" attribute 
    // for the switch in the imported SVG file. This app imports 
    // the A330HydSystemUI.svg file and draws it in the browser.
    // This app then modifies the imported SVG elements on the screen 
    // based on the switch names listed here.

    GreenHydElecPumpOnSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Status: false,
      },
      statusCriteria: {
        Push: true,
      },
    },

    GreenHydElecPumpOffSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      statusCriteria: {
        Push: true,
      },
    },

    GreenHydEng1PumpSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      statusCriteria: {
        Push: true,
      },
      faultCriteria: {
        path: ['engines', 'eng1', 'running'],
        condition: false,
      },
    },

    BlueHydElecPumpOnSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Status: false,
      },
      statusCriteria: {
        Push: true,
      },
    },

    BlueHydElecPumpOffSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      statusCriteria: {
        Push: true,
      },
    },

    BlueHydEng1PumpSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      statusCriteria: {
        Push: true,
      },
      faultCriteria: {
        path: ['engines', 'eng1', 'running'],
        condition: false,
      },
    },

    YellowHydElecPumpOnSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Status: false,
      },
      statusCriteria: {
        Push: true,
      },
    },

    YellowHydElecPumpOffSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      statusCriteria: {
        Push: true,
      },
    },

    YellowHydEng2PumpSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      statusCriteria: {
        Push: true,
      },
      faultCriteria: {
        path: ['engines', 'eng2', 'running'],
        condition: false,
      },
    },

    GreenHydEng2PumpSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      statusCriteria: {
        Push: true,
      },
      faultCriteria: {
        path: ['engines', 'eng2', 'running'],
        condition: false,
      },
    },

    RatSwitch: {
      type: 'momentary',
      states: {
        Push:   false,
      },
    },
  },

  covers: {

    RatSwitchCover: {
      states: {
        Cover:   false,
      },
    },
  },

  hydPumps: {

    greenEng1HydPump: {
      on: false,
      outputPressure: 3000,
      requirements: [
        'GreenHydEng1PumpSwitch',
      ],
    },
  },

  hydLoops: {

    greenHydLoop: {

    },

    blueHydLoop: {

    },

    yellowHydLoop: {

    },
  },

  engines: {

    eng1: {
      running: false,
    },
  
    eng2: {
      running: false,
    },
  },

  // init Initializes all UI elements
  init: function() {

    // getElements(this.elements);

    // Initialize Switches
    const allSwitches = Object.keys(this.switches);
    allSwitches.forEach((thisSwitch) => {

      // Configure Switch based on initial conditions
      this.updateSwitch(thisSwitch);
        
      // Attach click event
      getElement(thisSwitch+'Button').addEventListener("click", () => this.switchPush(thisSwitch));
    });

    // Initialize Covers
    const allCovers = Object.keys(this.covers);
    allCovers.forEach((thisCover) => {

      // Configure Cover based on initial conditions
      this.coverToggle(thisCover);
        
      // Attach click events
      getElement(thisCover+'Open').addEventListener("click", () => this.coverToggle(thisCover));
      getElement(thisCover+'Closed').addEventListener("click", () => this.coverToggle(thisCover));
    });

    // Continuously refresh UI
    
    setInterval(() => {
      this.hsmu();
    }, 1000/this.refreshRate)
  },

  updateSwitch: function(switchName) {

    const switchStates = Object.keys(this.switches[switchName].states);
    switchStates.forEach((thisState) => {

      if(this.switches[switchName].states[thisState]) {
        getElement(switchName+thisState).style.display = 'inline';
      } else {
        getElement(switchName+thisState).style.display = 'none';
      }
    });
  },

  switchPush: function(switchName) {

    if(this.switches[switchName].type === 'latch') {
      this.switches[switchName].states.Push = !this.switches[switchName].states.Push;
    }

    if(this.switches[switchName].type === 'momentary') {

      this.switches[switchName].states.Push = true;

      setTimeout(() => {
        this.switches[switchName].states.Push = false;
        this.updateSwitch(switchName);
      }, 1000)
    }

    this.updateSwitch(switchName);
  },

  coverToggle: function(coverName) {

    this.covers[coverName].states.Cover = !this.covers[coverName].states.Cover;

    if(this.covers[coverName].states.Cover) {
      getElement(coverName+'Closed').style.display = 'inline';
      getElement(coverName+'Open').style.display = 'none';
    } else {
      getElement(coverName+'Closed').style.display = 'none';
      getElement(coverName+'Open').style.display = 'inline';
    }
  },

  // hsmu contains all logic for the Hydraulic System Monitoring Unit (HSMU)
  hsmu: function() {

    // interval test (delete)
    testValue++;
    getElement('GreenHydPressureDisplay').firstChild.textContent = testValue;

    // Set switch statuses and faults
    const allSwitches = Object.keys(this.switches);
    allSwitches.forEach((thisSwitch) => {

      // Set switch status
      const allStatusCriteria = Object.keys(this.switches[thisSwitch].statusCriteria);
      allStatusCriteria.forEach((thisStatusCriteria) => {

        if(this.switches[thisSwitch].statusCriteria[thisStatusCriteria] === this.switches[thisSwitch].states[thisStatusCriteria]) {
          this.switches[thisSwitch].states.Status = true;
        } else {
          this.switches[thisSwitch].states.Status = false;
        }
      });

      // Set switch fault
      if('faultCriteria' in this.switches[thisSwitch]) {

        let path = this.switches[thisSwitch].faultCriteria.path;
        let condition = this.switches[thisSwitch].faultCriteria.condition;
        
        if(this[path[0]][path[1]][[path[2]]] === condition) {
          this.switches[thisSwitch].states.Fault = true;
        }
      }
      
      this.updateSwitch(thisSwitch);
    });
  },
};

// Top-level UI component
class UI extends React.Component {

  // constructor runs when component is initialized
  constructor(props) {

    super(props);

    this.state = {
      
    };
  }

  // componentDidMount 
  componentDidMount() {

    // // Initialize imported SVG
    hydSystemUI.init();

    // Refresh to draw new elements
    this.setState({});
  }

  // render
  render() {

    // Code can go here before the return

    
    return (
      <div>
        <HydSystemUI />
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UI />);
