## ScreenTime Client README

### Description

[Deployed link](https://screentime-client.herokuapp.com/)

ScreenTime is an app where you can log reviews of any movies or TV shows that you have watched. In v1, after creating an account you enter basic information about the movie or show (title, among other info) and can add your own rating from 0-10 and a review. Once logged, you can go back to amend your score or review as desired, but not the basic info about the piece of media. Should you wish, you can also delete your reviews.

### Features

1. Creating an account to store your reviews
2. Log reviews by entering basic info about movie (title, director, year released are required; runtime optional) or TV show (title, network required; number of seasons optional) and add your score and review.
3. Once logged, you can edit or delete your review/score. In updating, the basic info is already locked in.

### V2 Goals

1. Integrate 3rd-party API to allow movie/tv info (including poster images) to populate from API, instead of user-generated.
2. Allow users to see other user's reviews for each movie/tv show, with everything searchable.
3. Create user profile page where users can edit information and delete their profiles.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
