# a330-hydraulic-system

Links:
- [Live App](https://a330-hydraulic-system-app-yqep8.ondigitalocean.app/)

Description:
This is a React app that simulates an A330 hydraulic system. The hydraulic section of the overhead panel, the hydraulic system ECAM page, and both engine switches are simulated. All buttons are clickable.

How it works:
The React app imports and draws the [SVG source file](https://github.com/JeffLatham/a330-hydraulic-system/tree/main/a330-hydraulic-system-app/src/svg) for all of the UI elements. That SVG file has very specific ID attributes for certain elements. The React app looks for those specific element ID names and modifies those elements as needed. All logic is contained in [index.js](https://github.com/JeffLatham/a330-hydraulic-system/blob/main/a330-hydraulic-system-app/src/index.js).

Systems that are simulated:
- all hydraulic pumps (minus the Yellow hand pump for the cargo door)
- all hydraulic loop pressures
- all of the hydraulic system overhead panel
- most of the hydraulic system ECAM page

Systems that are NOT simulated:
- all downstream systems powered by the hydraulics loops (ailerons, flaps, etc.).
- hydraulics reservoirs (fluid levels, pressures, temperatures)
- engine fire valves
- various other systems that affect hydraulic system logic (landing gear lever, flap lever, etc.)
- anything not included in the list of "Systems that are simulated".