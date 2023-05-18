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
      setStatus: function() {
        if(this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
    },

    GreenHydElecPumpOffSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
    },

    GreenHydEng1PumpSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
      setFault: function() {
        if(!hydSystemUI.engines.eng1.running) {
          this.states.Fault = true;
        } else {
          this.states.Fault = false;
        }
      },
    },

    BlueHydElecPumpOnSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Status: false,
      },
      setStatus: function() {
        if(this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
    },

    BlueHydElecPumpOffSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
    },

    BlueHydEng1PumpSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
      setFault: function() {
        if(!hydSystemUI.engines.eng1.running) {
          this.states.Fault = true;
        } else {
          this.states.Fault = false;
        }
      },
    },

    YellowHydElecPumpOnSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Status: false,
      },
      setStatus: function() {
        if(this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
    },

    YellowHydElecPumpOffSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
    },

    YellowHydEng2PumpSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
      setFault: function() {
        if(!hydSystemUI.engines.eng2.running) {
          this.states.Fault = true;
        } else {
          this.states.Fault = false;
        }
      },
    },

    GreenHydEng2PumpSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
      setFault: function() {
        if(!hydSystemUI.engines.eng2.running) {
          this.states.Fault = true;
        } else {
          this.states.Fault = false;
        }
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

  hydLoops: {

    green: {
      pressure: 0,
      pressureSensor: 'GreenHydPressureDisplay',

      hydPumps: {

        greenElecHydPump: {
          power: true,
          loop: 'green',
          autoSwitch: false,
          maxOutputPressure: 2920,
          setPower: function() {
            if(!hydSystemUI.switches.GreenHydElecPumpOffSwitch.states.Status) {
              if(this.autoSwitch || hydSystemUI.switches.GreenHydElecPumpOnSwitch.states.Status) {
                this.power = true;
              }
            } else {
              this.power = false;
            }
          },
        },
        
        greenEng1HydPump: {
          power: true,
          loop: 'green',
          maxOutputPressure: 2950,
          setPower: function() {
            if(!hydSystemUI.switches.GreenHydEng1PumpSwitch.states.Status) {
              this.power = true;
            } else {
              this.power = false;
            }
          },
        },
    
        greenEng2HydPump: {
          power: true,
          loop: 'green',
          maxOutputPressure: 2940,
          setPower: function() {
            if(!hydSystemUI.switches.GreenHydEng2PumpSwitch.states.Status) {
              this.power = true;
            } else {
              this.power = false;
            }
          },
        },
    
        greenRatHydPump: {
          power: false,
          loop: 'green',
          maxOutputPressure: 2900,
          setPower: function() {
            if(hydSystemUI.switches.RatSwitch.states.Push) {
              this.power = true;
            }
            // once the RAT is on, there's no turning it off
          },
        },
      },
    },

    blue: {
      pressure: 0,
      pressureSensor: 'BlueHydPressureDisplay',

      hydPumps: {

        blueElecHydPump: {
          power: true,
          loop: 'blue',
          autoSwitch: false,
          maxOutputPressure: 2820,
          setPower: function() {
            if(!hydSystemUI.switches.BlueHydElecPumpOffSwitch.states.Status) {
              if(this.autoSwitch || hydSystemUI.switches.BlueHydElecPumpOnSwitch.states.Status) {
                this.power = true;
              }
            } else {
              this.power = false;
            }
          },
        },
    
        blueEng1HydPump: {
          power: true,
          loop: 'blue',
          maxOutputPressure: 2850,
          setPower: function() {
            if(!hydSystemUI.switches.BlueHydEng1PumpSwitch.states.Status) {
              this.power = true;
            } else {
              this.power = false;
            }
          },
        },
      },
    },

    yellow: {
      pressure: 0,
      pressureSensor: 'YellowHydPressureDisplay',

      hydPumps: {

        yellowElecHydPump: {
          power: true,
          loop: 'yellow',
          autoSwitch: false,
          maxOutputPressure: 2720,
          setPower: function() {
            if(!hydSystemUI.switches.YellowHydElecPumpOffSwitch.states.Status) {
              if(this.autoSwitch || hydSystemUI.switches.YellowHydElecPumpOnSwitch.states.Status) {
                this.power = true;
              }
            } else {
              this.power = false;
            }
          },
        },
    
        yellowEng2HydPump: {
          power: true,
          loop: 'yellow',
          maxOutputPressure: 2750,
          setPower: function() {
            if(!hydSystemUI.switches.YellowHydEng2PumpSwitch.states.Status) {
              this.power = true;
            } else {
              this.power = false;
            }
          },
        },
    
        yellowHandHydPump: {
          power: false,
          loop: 'yellow',
          maxOutputPressure: 2700,
          // setPower: function() {
          //   // just testing, actually put in logic!!!
          //   this.power = false;
          // },
        },
      },
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
      this.simulateHydLoops();
      this.ecam();
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

    // Set switch statuses and faults
    const allSwitches = Object.keys(this.switches);
    allSwitches.forEach((thisSwitch) => {

      if('setStatus' in this.switches[thisSwitch]) {
        this.switches[thisSwitch].setStatus();
      }

      if('setFault' in this.switches[thisSwitch]) {
        this.switches[thisSwitch].setFault();
      }
      
      this.updateSwitch(thisSwitch);
    });

    // Set elec pump auto switches
    this.hydLoops.green.hydPumps.greenElecHydPump.autoSwitch = true;
    this.hydLoops.blue.hydPumps.blueElecHydPump.autoSwitch = true;
    this.hydLoops.yellow.hydPumps.yellowElecHydPump.autoSwitch = true;
  },

  //
  simulateHydLoops: function() {

    const allHydLoops = Object.keys(this.hydLoops);
    allHydLoops.forEach((thisHydLoop) => {

      let pressure = 0;

      const allHydLoopPumps = Object.keys(this.hydLoops[thisHydLoop].hydPumps);
      allHydLoopPumps.forEach((thisHydPump) => {

        if('setPower' in this.hydLoops[thisHydLoop].hydPumps[thisHydPump]) {
          this.hydLoops[thisHydLoop].hydPumps[thisHydPump].setPower();
        }

        if(this.hydLoops[thisHydLoop].hydPumps[thisHydPump].power) {
          
          if(this.hydLoops[thisHydLoop].hydPumps[thisHydPump].maxOutputPressure > pressure) {
            pressure = this.hydLoops[thisHydLoop].hydPumps[thisHydPump].maxOutputPressure;
          }
        }
      });

      this.hydLoops[thisHydLoop].pressure = pressure;
    });
  },

  //
  ecam: function() {

    // // interval test (delete)
    // testValue++;
    // getElement('GreenHydPressureDisplay').firstChild.textContent = testValue;

    const allHydLoops = Object.keys(this.hydLoops);
    allHydLoops.forEach((thisHydLoop) => {
      getElement(this.hydLoops[thisHydLoop].pressureSensor).firstChild.textContent = this.hydLoops[thisHydLoop].pressure;
    });
  }
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
        <div id='testDiv'>test div</div>
        <HydSystemUI />
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UI />);
