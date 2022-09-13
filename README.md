## Getting Started

Deployed URL: https://weathertrafficimages.netlify.app/

### How to run the source code on local server 

1. Clone the repository by clicking on Code -> Downlaod ZIP.
2. Unpack the ZIP file and open source code using Visual Studio Code or any preferred code editor.
3. Navigate to the root directory (./govtech) in the terminal.
4. Type "npm install" in the terminal to install all dependencies in the package.json file.
5. Type "npm run start" to start the application on your local server.

### Commits

Commits URL: https://github.com/tzyan35/GovTech-Meteor-Assessment/commits

## Notes 

### `Requirements and First Walkthrough`

- Knowledge of extracting API information and displaying on webpage (probably use fetch or axios).
- Displaying Date-Time properly to prevent failed API calls (limit Date-Time selection).
- Converting Date-Time input into usable API format (probably use string interpolation and Date methods). 
- Extracting and displaying all locations into readable format (mapping and select, options).
- Displaying API Data after fetching required Date-Time and Location information (useeffect, states, props, components).
- Communication between API (conditionals?).

### `Architecture Decisions`

#### React JS 

- Component-based architechture provides clarity and efficiency. 
- Unidirectional binding makes components easier to work with one another.  

#### Date-Time Picker

- Decided to go with Material UI Date-Time picker because of its pleasant user-interface and comprehensive API selection.
- Also would be extremely cumbersome to create a Date-Time picker from scratch. MUI makes the interface interactive and easy to understand.

#### Location Dropdown

- Material UI (since I've already added it as a dependency and it'll be over-engineering if I use another CSS formatter like Semantics-UI)
- Also for aesthetic purposes and pleasant UI.

### `Difficulties and Solutions`

-	Formatting the date is the first major difficulty that I came across. Not only do I have to return an ISOString, I have to format it to GMT+8 (.toISOString() does not give any timezone) and also interpolate the string to match the API input. After some research, I managed to format the date correctly by finding the timezone offset using the method .getTimeZoneOffset() and converting it to milliseconds.
-	The second major difficulty is comparing the latitude and longitude between the weather and traffic API since they are not the same. To overcome this problem, I have to find a reasonable difference so that I can safely assume the camera is in a general location. Through trial and error, I realise that a difference of 0.1 is too big and I will not get many camera images since different areas will spill onto one another. A difference of 0.01 is too small to net me any camera images.
- The Two hour weather forecast will result in future time, and there will not be any image to display. The difficulty comes when juggling between displaying forecast and not displaying any images because if there is a future time, the traffic Image API will revert the future time into the present time and show the location of present time, which is wrong. Eg If it is 2pm now and I want to know the weather at 4pm so I search for 4pm, the traffic Image API will revert and show the 2pm location instead of breaking down. I manged to overcome this problem with a few conditional checks and comparing between current and future time using dayjs().

### `Assumptions`

-	Assume that the API is always and will always be correct. The longitude and latitude of both the weather API and traffic API will always sync together.
-	Assume that the difference of <= 0.05 is the most ideal for comparing the longitude and latitude of both weather and traffic API since a difference of <= 0.01 is too little and <= 0.1 is too general.

