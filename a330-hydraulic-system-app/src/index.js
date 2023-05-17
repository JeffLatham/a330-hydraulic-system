/*

What this is: 	A330 Hydraulic System react app. 

Written by : 	  Jeff Latham

*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Import SVG source files
import { ReactComponent as HydSystemUI  } from './svg/A330HydSystemUI.svg'

// getElement does the same thing as "document.getElementById()" except 
// it's also nice enough to tell you if it can't find the element instead 
// of just mysteriously breaking the program and leaving you S.O.L. (:
function getElement(elementID) {
  let element = document.getElementById(elementID);
  if(element === null) { alert('cannot find element: ' + elementID); };
  return element;
}

// // getElements
// function getElements(elements) {
//   const keys = Object.keys(elements);
//   keys.forEach((key) => {
//     elements[key] = getElement(key);
//   });
// }

// // Default View object
let hydSystemUI = {

  // // SVG element IDs:
  // // These are the names of all relevant SVG element "id" attributes.
  // // This app imports the toolbar.svg file and draws it in the browser.
  // // This app then modifies the imported SVG elements on the screen 
  // // based on the element IDs in this object (list). The element "id" 
  // // names in this list must exactly match the "id" attribute for that 
  // // element from the SVG file.
  // elements: {

  //   // testButton: null,
  // },

  // switches object contains all switch objects
  switches: {

    // Switch Names:
    // These switch names must exactly match the "id" attribute 
    // for the switch in the imported SVG file. This app imports 
    // the A330HydSystemUI.svg file and draws it in the browser.
    // This app then modifies the imported SVG elements on the screen 
    // based on the switch names listed here.

    GreenHydElecPumpOnSwitch: {
      type: 'on',
      states: {
        pushed: false,
        fault:  false,
        status: false,
      },
    },

    GreenHydElecPumpOffSwitch: {
      type: 'off',
      states: {
        pushed: false,
        fault:  false,
        status: false,
      },
    },

    GreenHydEng1PumpSwitch: {
      type: 'off',
      states: {
        pushed: false,
        fault:  false,
        status: false,
      },
    },

    BlueHydElecPumpOnSwitch: {
      type: 'on',
      states: {
        pushed: false,
        fault:  false,
        status: false,
      },
    },

    BlueHydElecPumpOffSwitch: {
      type: 'off',
      states: {
        pushed: false,
        fault:  false,
        status: false,
      },
    },

    BlueHydEng1PumpSwitch: {
      type: 'off',
      states: {
        pushed: false,
        fault:  false,
        status: false,
      },
    },

    YellowHydElecPumpOnSwitch: {
      type: 'on',
      states: {
        pushed: false,
        fault:  false,
        status: false,
      },
    },

    YellowHydElecPumpOffSwitch: {
      type: 'off',
      states: {
        pushed: false,
        fault:  false,
        status: false,
      },
    },

    YellowHydEng2PumpSwitch: {
      type: 'off',
      states: {
        pushed: false,
        fault:  false,
        status: false,
      },
    },

    GreenHydEng2PumpSwitch: {
      type: 'off',
      states: {
        pushed: false,
        fault:  false,
        status: false,
      },
    },

    RatSwitch: {
      type: 'rat',
      states: {
        pushed: false,
        fault:  false,
        status: false,
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

  // init Initializes the Tool Bar
  init: function() {

    // getElements(this.elements);

    // Initialize buttons
    const allSwitches = Object.keys(this.switches);
    allSwitches.forEach((thisSwitch) => {

      // 
      this.updateSwitch(thisSwitch);
        
      // Attach event
      getElement(thisSwitch+'Button').addEventListener("click", () => this.switchPush(thisSwitch));
    });
  },

  updateSwitch: function(switchName) {

    if(this.switches[switchName].type === 'off' || this.switches[switchName].type === 'on') {

      if(this.switches[switchName].states.pushed) {
        getElement(switchName+'Push').style.display = 'inline';
      } else {
        getElement(switchName+'Push').style.display = 'none';
      }
  
      if(this.switches[switchName].type === 'off') {
        if(this.switches[switchName].states.fault) {
          getElement(switchName+'Fault').style.display = 'inline';
        } else {
          getElement(switchName+'Fault').style.display = 'none';
        }
      }
  
      if(this.switches[switchName].states.status) {
        getElement(switchName+'Status').style.display = 'inline';
      } else {
        getElement(switchName+'Status').style.display = 'none';
      }
    }
  },

  switchPush: function(switchName) {

    this.switches[switchName].states.pushed = !this.switches[switchName].states.pushed;

    if(this.switches[switchName].states.pushed) {
      this.switches[switchName].states.status = true;
    } else {
      this.switches[switchName].states.status = false;
    }

    this.updateSwitch(switchName);
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
