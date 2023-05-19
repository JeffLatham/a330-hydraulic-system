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

    Green: {
      pressure: 0,
      pressureSensor: 'GreenHydPressureDisplay',
      pressureLevelLow: 2000,

      hydPumps: {

        GreenHydElecPump: {
          power: true,
          // loop: 'green',
          type: 'elec',
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
        
        GreenHydEng1Pump: {
          power: true,
          // loop: 'green',
          type: 'eng1',
          maxOutputPressure: 2950,
          setPower: function() {
            if(!hydSystemUI.switches.GreenHydEng1PumpSwitch.states.Status) {
              this.power = true;
            } else {
              this.power = false;
            }
          },
        },
    
        GreenHydEng2Pump: {
          power: true,
          // loop: 'green',
          type: 'eng2',
          maxOutputPressure: 2940,
          setPower: function() {
            if(!hydSystemUI.switches.GreenHydEng2PumpSwitch.states.Status) {
              this.power = true;
            } else {
              this.power = false;
            }
          },
        },
    
        GreenHydRatPump: {
          power: false,
          // loop: 'green',
          type: 'rat',
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

    Blue: {
      pressure: 0,
      pressureSensor: 'BlueHydPressureDisplay',
      pressureLevelLow: 2000,

      hydPumps: {

        BlueHydElecPump: {
          power: true,
          // loop: 'blue',
          type: 'elec',
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
    
        BlueHydEng1Pump: {
          power: true,
          // loop: 'blue',
          type: 'eng1',
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

    Yellow: {
      pressure: 0,
      pressureSensor: 'YellowHydPressureDisplay',
      pressureLevelLow: 2000,

      hydPumps: {

        YellowHydElecPump: {
          power: true,
          // loop: 'yellow',
          type: 'elec',
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
    
        YellowHydEng2Pump: {
          power: true,
          // loop: 'yellow',
          type: 'eng2',
          maxOutputPressure: 2750,
          setPower: function() {
            if(!hydSystemUI.switches.YellowHydEng2PumpSwitch.states.Status) {
              this.power = true;
            } else {
              this.power = false;
            }
          },
        },
    
        YellowHydHandPump: {
          power: false,
          // loop: 'yellow',
          type: 'hand',
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
      running: true,
    },
  
    eng2: {
      running: true,
    },
  },

  // init Initializes all UI elements
  init: function() {

    // Get colors
    let ecamGreen = getElement('HydHighGreen').getAttribute('stroke');
    let ecamOrnage = getElement('HydLowOrange').getAttribute('stroke');

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
    this.hydLoops.Green.hydPumps.GreenHydElecPump.autoSwitch = true;
    this.hydLoops.Blue.hydPumps.BlueHydElecPump.autoSwitch = true;
    this.hydLoops.Yellow.hydPumps.YellowHydElecPump.autoSwitch = true;
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

    const allHydLoops = Object.keys(this.hydLoops);
    allHydLoops.forEach((thisHydLoop) => {

      // Check loop pressure
      let pressureHigh = true;
      if(this.hydLoops[thisHydLoop].pressure < this.hydLoops[thisHydLoop].pressureLevelLow) {
        pressureHigh = false;
      }

      // Set pressure display indicator
      getElement(this.hydLoops[thisHydLoop].pressureSensor).firstChild.textContent = this.hydLoops[thisHydLoop].pressure;
      if(pressureHigh) {
        getElement(this.hydLoops[thisHydLoop].pressureSensor).firstChild.setAttribute('fill', this.ecamGreen);
      } else {
        getElement(this.hydLoops[thisHydLoop].pressureSensor).firstChild.setAttribute('fill', this.ecamOrnage);
      }

      // Set line pressure indicator
      if(pressureHigh) {
        getElement(thisHydLoop + 'HydLineHigh').style.display = 'inline';
        getElement(thisHydLoop + 'HydLineLow').style.display = 'none';
      } else {
        getElement(thisHydLoop + 'HydLineHigh').style.display = 'none';
        getElement(thisHydLoop + 'HydLineLow').style.display = 'inline';
      }

      // Check all hyd loop pumps
      const allHydLoopPumps = Object.keys(this.hydLoops[thisHydLoop].hydPumps);
      allHydLoopPumps.forEach((thisHydPump) => {

        let pumpType = this.hydLoops[thisHydLoop].hydPumps[thisHydPump].type;

        // Set elec and rat pump indicators
        if(pumpType === 'elec' || pumpType === 'rat') {

          if(this.hydLoops[thisHydLoop].hydPumps[thisHydPump].power) {
            getElement(thisHydPump + 'On').style.display = 'inline';
            getElement(thisHydPump + 'Off').style.display = 'none';
          } else {
            getElement(thisHydPump + 'On').style.display = 'none';
            getElement(thisHydPump + 'Off').style.display = 'inline';
          }
        }

        // Set engine 1 pump indicators
        if(pumpType === 'eng1' || pumpType === 'eng2') {

          if(this.hydLoops[thisHydLoop].hydPumps[thisHydPump].power) {
            
            if(this.engines[pumpType].running) {
              getElement(thisHydPump + 'On').style.display = 'inline';
              getElement(thisHydPump + 'Off').style.display = 'none';
              getElement(thisHydPump + 'Low').style.display = 'none';
            } else {
              getElement(thisHydPump + 'On').style.display = 'none';
              getElement(thisHydPump + 'Off').style.display = 'none';
              getElement(thisHydPump + 'Low').style.display = 'inline';
            }
          } else {
            getElement(thisHydPump + 'On').style.display = 'none';
            getElement(thisHydPump + 'Off').style.display = 'inline';
            getElement(thisHydPump + 'Low').style.display = 'none';
          }
        }
      });

      
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
