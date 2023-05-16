/*

What this is: 	A330 Hydraulic System react app. 

Written by : 	  Jeff Latham

*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Import SVG source files
import { ReactComponent as TestButton   } from './svg/button.svg'

// getElement does the same thing as "document.getElementById()" except 
// it's also nice enough to tell you if it can't find the element instead 
// of just mysteriously breaking the program and leaving you S.O.L. (:
function getElement(elementID) {
  let element = document.getElementById(elementID);
  if(element === null) { alert('cannot find element: ' + elementID); };
  return element;
}

// getElements
function getElements(elements) {
  const keys = Object.keys(elements);
  keys.forEach((key) => {
    elements[key] = getElement(key);
  });
}

// // Default View object
let defaultView = {

  // SVG element IDs:
  // These are the names of all relevant SVG element "id" attributes.
  // This app imports the toolbar.svg file and draws it in the browser.
  // This app then modifies the imported SVG elements on the screen 
  // based on the element IDs in this object (list). The element "id" 
  // names in this list must exactly match the "id" attribute for that 
  // element from the SVG file.
  elements: {

    testButton: null,
    numberTest: null,
  },

  // init Initializes the Tool Bar
  init: function() {

    getElements(this.elements);

    // Select buttons
    // this.numberChange();

    // Attach button events
    this.elements.testButton.addEventListener("click", this.numberChange);
  },

  // numberChange
  numberChange: function() {

    defaultView.elements.numberTest.firstChild.textContent = 'T';
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

    // // Initialize imported SVGs
    defaultView.init();

    // Refresh to draw new elements
    this.setState({});
  }

  // render
  render() {

    // Code can go here before the return

    
    return (
      <div>

        <TestButton />
        
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UI />);
