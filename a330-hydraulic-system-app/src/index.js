/*

A330 Hydraulic System react app 
Written by : 	  Jeff Latham

*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Import SVG source file
import { ReactComponent as HydSystemUI  } from './svg/A330HydSystemUI.svg'

// getElement does the same thing as "document.getElementById()" except 
// it's also nice enough to tell you if it can't find the element instead 
// of just mysteriously breaking the program. (:
function getElement(elementID) {
  let element = document.getElementById(elementID);
  if(element === null) { alert('cannot find element: ' + elementID); };
  return element;
}

// Object containing all simulation and UI logic
let hydSystemUI = {

  refreshRate: 10,  // Hz, refresh rate for the entire UI and simulation
  airspeed: 250,    // KIAS, indicated airspeed

  // Colors
  ecamGreen:  '#00fd3d',
  ecamAmber: '#fda300',

  // switches object contains all overhead HYD panel switch objects
  switches: {

    // Switch Names:
    // These names must exactly match the "id" attribute 
    // for the switch in the imported SVG file. This app imports 
    // the A330HydSystemUI.svg file and draws it in the browser.
    // This app then modifies the imported SVG elements on the screen 
    // based on the names listed here.

    // setStatus() contains the conditions for setting the switch status 
    // but is called remotely from hsmu().

    // setFault() contains the conditions for setting the switch fault 
    // but is called remotely from hsmu().

    GreenHydElecPumpOnSwitch: {
      type: 'latch',
      states: {
        Push:   false,
        Status: false,
      },
      setStatus: function() {
        if( !hydSystemUI.switches.GreenHydElecPumpOffSwitch.states.Status && 
          ( this.states.Push || hydSystemUI.hydLoops.Green.hydPumps.GreenHydElecPump.autoSwitch ) ) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
    },

    GreenHydElecPumpOffSwitch: {
      type: 'latch',
      states: {
        Push:   true,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(!this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
      setFault: function() {
        if(!hydSystemUI.engines.eng1.running && !hydSystemUI.engines.eng2.running && !this.states.Status) {
          this.states.Fault = true;
        } else {
          this.states.Fault = false;
        }
      },
    },

    GreenHydEng1PumpSwitch: {
      type: 'latch',
      states: {
        Push:   true,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(!this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
      setFault: function() {
        if(!hydSystemUI.engines.eng1.running && !this.states.Status) {
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
        if( !hydSystemUI.switches.BlueHydElecPumpOffSwitch.states.Status && 
          ( this.states.Push || hydSystemUI.hydLoops.Blue.hydPumps.BlueHydElecPump.autoSwitch ) ) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
    },

    BlueHydElecPumpOffSwitch: {
      type: 'latch',
      states: {
        Push:   true,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(!this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
      setFault: function() {
        if(!hydSystemUI.engines.eng1.running && !hydSystemUI.engines.eng2.running && !this.states.Status) {
          this.states.Fault = true;
        } else {
          this.states.Fault = false;
        }
      },
    },

    BlueHydEng1PumpSwitch: {
      type: 'latch',
      states: {
        Push:   true,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(!this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
      setFault: function() {
        if(!hydSystemUI.engines.eng1.running && !this.states.Status) {
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
        if( !hydSystemUI.switches.YellowHydElecPumpOffSwitch.states.Status && 
          ( this.states.Push || hydSystemUI.hydLoops.Yellow.hydPumps.YellowHydElecPump.autoSwitch ) ) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
    },

    YellowHydElecPumpOffSwitch: {
      type: 'latch',
      states: {
        Push:   true,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(!this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
      setFault: function() {
        if(!hydSystemUI.engines.eng1.running && !hydSystemUI.engines.eng2.running && !this.states.Status) {
          this.states.Fault = true;
        } else {
          this.states.Fault = false;
        }
      },
    },

    YellowHydEng2PumpSwitch: {
      type: 'latch',
      states: {
        Push:   true,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(!this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
      setFault: function() {
        if(!hydSystemUI.engines.eng2.running && !this.states.Status) {
          this.states.Fault = true;
        } else {
          this.states.Fault = false;
        }
      },
    },

    GreenHydEng2PumpSwitch: {
      type: 'latch',
      states: {
        Push:   true,
        Fault:  false,
        Status: false,
      },
      setStatus: function() {
        if(!this.states.Push) {
          this.states.Status = true;
        } else {
          this.states.Status = false;
        }
      },
      setFault: function() {
        if(!hydSystemUI.engines.eng2.running && !this.states.Status) {
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

  // covers object contains all overhead HYD panel switch cover objects
  covers: {

    // Cover Names:
    // These names must exactly match the "id" attribute 
    // for the cover in the imported SVG file. This app imports 
    // the A330HydSystemUI.svg file and draws it in the browser.
    // This app then modifies the imported SVG elements on the screen 
    // based on the names listed here.

    RatSwitchCover: {
      states: {
        Cover:   false,
      },
    },
  },

  // engineSwitches object contains all engine switch objects
  engineSwitches: {

    // Engine Switch Names:
    // These names must exactly match the "id" attribute 
    // for the engine switch in the imported SVG file. This app imports 
    // the A330HydSystemUI.svg file and draws it in the browser.
    // This app then modifies the imported SVG elements on the screen 
    // based on the names listed here.

    Eng1Switch: {
      engine: 'eng1',
      states: {
        On:   false,
      },
    },

    Eng2Switch: {
      engine: 'eng2',
      states: {
        On:   false,
      },
    },
  },

  // hydLoops object contains all data for all three hydraulic loops
  hydLoops: {

    // setPower() contains the conditions for a hydraulic pump to be powered. 
    // It is called externally from simulateHydLoops().

    Green: {
      pressure: 900, // psi
      pressureSensor: 'GreenHydPressureDisplay', // name of ECAM UI element
      pressureLevelLow: 1450, // low pressure threshold

      hydPumps: {

        GreenHydElecPump: {
          power: true,
          type: 'elec',
          autoSwitch: false,
          outputPressure: 3000,
          normalOutputPressure: 3000,
          setPower: function() {
            if(!hydSystemUI.switches.GreenHydElecPumpOffSwitch.states.Status) {
              if(this.autoSwitch || hydSystemUI.switches.GreenHydElecPumpOnSwitch.states.Status) {
                this.power = true;
              } else {
                this.power = false;
              }
            } else {
              this.power = false;
            }
          },
        },
        
        GreenHydEng1Pump: {
          power: true,
          type: 'eng1',
          outputPressure: 3000,
          normalOutputPressure: 3000,
          setPower: function() {

            if(!hydSystemUI.switches.GreenHydEng1PumpSwitch.states.Status) {
              this.power = true;
            } else {
              this.power = false;
            }

            if(!hydSystemUI.engines.eng1.running) {
              this.outputPressure = 0;
            } else {
              this.outputPressure = this.normalOutputPressure;
            }
          },
        },
    
        GreenHydEng2Pump: {
          power: true,
          type: 'eng2',
          outputPressure: 3000,
          normalOutputPressure: 3000,
          setPower: function() {

            if(!hydSystemUI.switches.GreenHydEng2PumpSwitch.states.Status) {
              this.power = true;
            } else {
              this.power = false;
            }

            if(!hydSystemUI.engines.eng2.running) {
              this.outputPressure = 0;
            } else {
              this.outputPressure = this.normalOutputPressure;
            }
          },
        },
    
        GreenHydRatPump: {
          power: false,
          type: 'rat',
          outputPressure: 2500,
          normalOutputPressure: 2500,
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
      pressure: 0, // psi
      pressureSensor: 'BlueHydPressureDisplay', // name of ECAM UI element
      pressureLevelLow: 1450, // low pressure threshold

      hydPumps: {

        BlueHydElecPump: {
          power: false,
          type: 'elec',
          autoSwitch: false,
          outputPressure: 3000,
          normalOutputPressure: 3000,
          setPower: function() {
            if(!hydSystemUI.switches.BlueHydElecPumpOffSwitch.states.Status) {
              if(this.autoSwitch || hydSystemUI.switches.BlueHydElecPumpOnSwitch.states.Status) {
                this.power = true;
              } else {
                this.power = false;
              }
            } else {
              this.power = false;
            }
          },
        },
    
        BlueHydEng1Pump: {
          power: true,
          type: 'eng1',
          outputPressure: 3000,
          normalOutputPressure: 3000,
          setPower: function() {

            if(!hydSystemUI.switches.BlueHydEng1PumpSwitch.states.Status) {
              this.power = true;
            } else {
              this.power = false;
            }

            if(!hydSystemUI.engines.eng1.running) {
              this.outputPressure = 0;
            } else {
              this.outputPressure = this.normalOutputPressure;
            }
          },
        },
      },
    },

    Yellow: {
      pressure: 2730, // psi
      pressureSensor: 'YellowHydPressureDisplay', // name of ECAM UI element
      pressureLevelLow: 1450, // low pressure threshold

      hydPumps: {

        YellowHydElecPump: {
          power: true,
          type: 'elec',
          autoSwitch: false,
          outputPressure: 3000,
          normalOutputPressure: 3000,
          setPower: function() {
            if(!hydSystemUI.switches.YellowHydElecPumpOffSwitch.states.Status) {
              if(this.autoSwitch || hydSystemUI.switches.YellowHydElecPumpOnSwitch.states.Status) {
                this.power = true;
              } else {
                this.power = false;
              }
            } else {
              this.power = false;
            }
          },
        },
    
        YellowHydEng2Pump: {
          power: true,
          type: 'eng2',
          outputPressure: 3000,
          normalOutputPressure: 3000,
          setPower: function() {

            if(!hydSystemUI.switches.YellowHydEng2PumpSwitch.states.Status) {
              this.power = true;
            } else {
              this.power = false;
            }

            if(!hydSystemUI.engines.eng2.running) {
              this.outputPressure = 0;
            } else {
              this.outputPressure = this.normalOutputPressure;
            }
          },
        },
    
        // YellowHydHandPump: {
        //   power: false,
        //   type: 'hand',
        //   outputPressure: 3000,
        //   normalOutputPressure: 3000,
        //   // setPower: function() {
        //   //   // just testing, actually put in logic!!!
        //   //   this.power = false;
        //   // },
        // },
      },
    },
  },

  // engines object contains data for the engines
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

    // Initialize engine switches
    const allEngineSwitches = Object.keys(this.engineSwitches);
    allEngineSwitches.forEach((thisEngineSwitch) => {

      // Configure switch based on initial conditions
      this.engineToggle(thisEngineSwitch);
        
      // Attach click events
      getElement(thisEngineSwitch+'On').addEventListener("click", () => this.engineToggle(thisEngineSwitch));
      getElement(thisEngineSwitch+'Off').addEventListener("click", () => this.engineToggle(thisEngineSwitch));
    });

    // Continuously refresh UI and simulation
    this.hsmu();
    this.simulateHydLoops();
    this.ecam();
    setInterval(() => {
      this.hsmu();
      this.simulateHydLoops();
      this.ecam();
    }, 1000/this.refreshRate)
  },

  // updateSwitch updates the UI elements to reflect the switch's states
  updateSwitch: function(switchName) {

    // Check all states
    const switchStates = Object.keys(this.switches[switchName].states);
    switchStates.forEach((thisState) => {

      if(this.switches[switchName].states[thisState]) {
        getElement(switchName+thisState).style.display = 'inline';
      } else {
        getElement(switchName+thisState).style.display = 'none';
      }
    });
  },

  // switchPush executes when a switch is clicked
  switchPush: function(switchName) {

    if(this.switches[switchName].type === 'latch') {
      this.switches[switchName].states.Push = !this.switches[switchName].states.Push;
    }

    if(this.switches[switchName].type === 'momentary') {

      this.switches[switchName].states.Push = true;

      // unpush after a delay
      setTimeout(() => {
        this.switches[switchName].states.Push = false;
        this.updateSwitch(switchName);
      }, 1000)
    }

    this.updateSwitch(switchName);
  },

  // coverToggle executes when a cover is clicked
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

  // engineToggle executes when an engine switch is clicked
  engineToggle: function(engineName) {

    this.engineSwitches[engineName].states.On = !this.engineSwitches[engineName].states.On;

    if(this.engineSwitches[engineName].states.On) {
      getElement(engineName+'On').style.display = 'inline';
      getElement(engineName+'Off').style.display = 'none';
      this.engines[this.engineSwitches[engineName].engine].running = true;
    } else {
      getElement(engineName+'On').style.display = 'none';
      getElement(engineName+'Off').style.display = 'inline';
      this.engines[this.engineSwitches[engineName].engine].running = false;
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
    if(!this.engines.eng1.running || !this.hydLoops.Green.hydPumps.GreenHydEng1Pump.power || 
       !this.engines.eng2.running || !this.hydLoops.Green.hydPumps.GreenHydEng2Pump.power) {
      this.hydLoops.Green.hydPumps.GreenHydElecPump.autoSwitch = true;
    } else {
      this.hydLoops.Green.hydPumps.GreenHydElecPump.autoSwitch = false;
    }

    if(!this.engines.eng1.running || !this.hydLoops.Blue.hydPumps.BlueHydEng1Pump.power) {
      this.hydLoops.Blue.hydPumps.BlueHydElecPump.autoSwitch = true;
    } else {
      this.hydLoops.Blue.hydPumps.BlueHydElecPump.autoSwitch = false;
    }

    if(!this.engines.eng2.running || !this.hydLoops.Yellow.hydPumps.YellowHydEng2Pump.power) {
      this.hydLoops.Yellow.hydPumps.YellowHydElecPump.autoSwitch = true;
    } else {
      this.hydLoops.Yellow.hydPumps.YellowHydElecPump.autoSwitch = false;
    }

    // Deploy RAT
    if(!this.engines.eng1.running && 
       !this.engines.eng2.running && 
       this.airspeed > 100 && 
       !this.hydLoops.Green.hydPumps.GreenHydRatPump.power) {
      this.switchPush('RatSwitch');
    }
  },

  // simulateHydLoops contains the simluation logic for all three hydraulic loops
  simulateHydLoops: function() {

    // For all hyd loops
    const allHydLoops = Object.keys(this.hydLoops);
    allHydLoops.forEach((thisHydLoop) => {

      let maxPumpPressure = 0;
      let loopPressure = this.hydLoops[thisHydLoop].pressure;

      // For all hyd loop pumps
      const allHydLoopPumps = Object.keys(this.hydLoops[thisHydLoop].hydPumps);
      allHydLoopPumps.forEach((thisHydPump) => {

        if('setPower' in this.hydLoops[thisHydLoop].hydPumps[thisHydPump]) {
          this.hydLoops[thisHydLoop].hydPumps[thisHydPump].setPower();
        }

        if(this.hydLoops[thisHydLoop].hydPumps[thisHydPump].power) {
          
          if(this.hydLoops[thisHydLoop].hydPumps[thisHydPump].outputPressure > maxPumpPressure) {
            maxPumpPressure = this.hydLoops[thisHydLoop].hydPumps[thisHydPump].outputPressure;
          }
        }
      });

      // Set loop pressure (asymptotically)
      let pressRate = 0.8 * (maxPumpPressure - loopPressure); // psi / second, 0.8 just makes it look good, lol
      this.hydLoops[thisHydLoop].pressure += (1 / this.refreshRate) * pressRate;
    });
  },

  // ecam contains all logic for updating ECAM UI elements
  ecam: function() {

    // For all hyd loops
    const allHydLoops = Object.keys(this.hydLoops);
    allHydLoops.forEach((thisHydLoop) => {

      // Check loop pressure
      let pressureHigh = true;
      if(this.hydLoops[thisHydLoop].pressure < this.hydLoops[thisHydLoop].pressureLevelLow) {
        pressureHigh = false;
      }

      // Set pressure display indicator value and color
      let pressure = Math.round(this.hydLoops[thisHydLoop].pressure / 50) * 50;
      getElement(this.hydLoops[thisHydLoop].pressureSensor).firstChild.textContent = pressure;
      if(pressureHigh) {
        getElement(this.hydLoops[thisHydLoop].pressureSensor).firstChild.setAttribute('fill', this.ecamGreen);
      } else {
        getElement(this.hydLoops[thisHydLoop].pressureSensor).firstChild.setAttribute('fill', this.ecamAmber);
      }

      // Set loop line color
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

        // Set elec and rat pump power indicators
        if(pumpType === 'elec' || pumpType === 'rat') {

          if(this.hydLoops[thisHydLoop].hydPumps[thisHydPump].power) {
            getElement(thisHydPump + 'On').style.display = 'inline';
            getElement(thisHydPump + 'Off').style.display = 'none';

            if(pumpType === 'rat') {
              getElement('RatRpm').style.display = 'inline';
            }
          } else {
            getElement(thisHydPump + 'On').style.display = 'none';
            getElement(thisHydPump + 'Off').style.display = 'inline';

            if(pumpType === 'rat') {
              getElement('RatRpm').style.display = 'none';
            }
          }
        }

        // Set engine pump power indicators
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

        // Set engine numer color
        if(this.engines.eng1.running) {
          getElement('Eng1Ind').firstChild.setAttribute('fill', 'white');
        } else {
          getElement('Eng1Ind').firstChild.setAttribute('fill', this.ecamAmber);
        }

        if(this.engines.eng2.running) {
          getElement('Eng2Ind').firstChild.setAttribute('fill', 'white');
        } else {
          getElement('Eng2Ind').firstChild.setAttribute('fill', this.ecamAmber);
        }
      });
    });

    // Set zulu time
    let zuluTime = new Date();
    let zuluHours = zuluTime.getUTCHours();
    let zuluMinutes = zuluTime.getUTCMinutes();
    if(zuluHours    < 10) { zuluHours   = '0' + zuluHours;   }
    if(zuluMinutes  < 10) { zuluMinutes = '0' + zuluMinutes; }
    getElement('ZuluHours').firstChild.textContent = zuluHours;
    getElement('ZuluMinutes').firstChild.textContent = zuluMinutes;
  }
};

// Top-level UI component
class UI extends React.Component {

  // constructor runs when component is initialized
  constructor(props) {

    super(props);
    this.state = {};
  }

  // componentDidMount runs after component mounts
  componentDidMount() {

    // Set page attributes
    document.body.style = 'background: #2b363b;';
    document.title = 'A330 Hydraulic System';

    // Initialize imported SVG
    hydSystemUI.init();

    // Refresh to draw new elements
    this.setState({});
  }

  // render draws the UI elements on the screen
  render() {
    
    return (
      <div>
        <HydSystemUI style={{
            position:'absolute',
            left: 0 + 'px',
            top: 0 + 'px',
            width: '100%',
            height: '100%',
          }} 
        />
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UI />);
