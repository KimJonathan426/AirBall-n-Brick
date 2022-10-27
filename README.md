# AirBallnBrick

_For a live version of AirBallnBrick, click here: [AirBallnBrick](https://airball-n-brick.herokuapp.com/)._

AirBallnBrick is an Airbnb clone that allows users to discover, rent, and list a variety of different basketball courts around the world.

_For a link to the AirBallnBrick wiki, click here: [Wiki](https://github.com/KimJonathan426/AirBall-n-Brick/wiki)._


## Previews

<h3 align="center">
  Home Page
</h3>

![Home Page](https://user-images.githubusercontent.com/100963461/177250785-1d8e7a41-ea4d-424f-a2a6-2a814ae50d19.PNG)


<h3 align="center">
  Host Court Form
</h3>

![Host Court](https://user-images.githubusercontent.com/100963461/177251572-19d8666a-fc4c-4519-a258-7960099682cc.PNG)


<h3 align="center">
  Spot Page
</h3>

<p align="center">
  <img src="https://user-images.githubusercontent.com/100963461/177252214-791f915a-d415-4eb5-baac-2372139dd035.PNG" />
</p>


## Instructions
1. Clone the repo
2. Open two terminals and cd into the frontend directory on one, and cd into the backend directory on the other
3. Run an npm install on both directories
4. Input the command "npm start" into each terminal to start the project locally


## Technologies Used
- React
- Redux
- NodeJS
- Express
- PostgreSQL
- Heroku


## Future Implementations
- Include update operation for review feature
- Include a bookings feature
- Include an image feature separate from the spot form with full CRUD
- Custom radio buttons to match stars
- Implement edit forms as a modal
- Implement a confirmation requirement for delete buttons


## Technical Implementation Details
One issue I encountered was when the DOM updates dynamically, there is a small time period before the state updates which shows a snippet of the previous state on another spot and reviews. I was able to combat this issue by creating a new thunk action, thunk, and reducer case which clears the state. I dispatched the clear state on unmount and coupled the data in the JSX with conditionals so no information from the previous state will linger before updating. I had a similar issue with clearing review averages from the state. When the last review on a spot is deleted, the reviewAvgs would not dynamically update. But I followed the same process to clear and redispatch the state upon deleting a review instead of an unmount. 

<p align="left">
  <img src="https://user-images.githubusercontent.com/100963461/177257780-26528ee8-f811-4591-9db2-071a26c38e4e.PNG" />
</p>


<p align="center">
  <img src="https://user-images.githubusercontent.com/100963461/177257824-b18adf12-0250-4f1d-8156-1daee2138a74.PNG" />
</p>

<p align="right">
  <img src="https://user-images.githubusercontent.com/100963461/177313467-59429aaa-9f26-4490-8cca-e8470f9d1109.PNG" />
</p>

