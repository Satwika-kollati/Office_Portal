# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


I want to build an  mern stack firstly , i want to create a signup form with the details emailid,username,password,officer name,date of birth,year of join,job title and when the user is signed up it redirects to home page which we currently keep empty,and there will be a profile section link on the navbar so that the profile of the user is shown like a card with great ui,and should show us few uptions like update profile and delete account when update profile is selected we need to get the same card display but like a form with the previous details already filled so when the user can update any field they wish for,they can update it and when clicked delete account and after clicking it i need a popup display which asks for "Are you sure" and to enter the password.so if delted the user details should be removed from the database and immediately we should be redirected lo login form pages.initially i want the login form to be seen,if logged in we store the jwt token in local storage,and i want to reamin for 24hours so when a user is logged in we automically get home page and only logout option will be shown on navbar,but if logged we automatically navigate to login form page and logon and sigup buttons should be shoen on nav bar.now i need details of the all the files to required in client and server folder.I want the following thing in the profile section we should get all the profile details except when the profile button is clicked in home page and update and delete buttons should be shown when clicked on update button a card display with all the current details should be shown and after receiving the updated info from frontend it should be updated in db.whrn delete option is selected I want a pop up which should be asking the user if they surely want to delete the profile and should ask for password and only if the password is verified the account must be deleted .now i want code for home.js initially when website is opened and if the user is looged in,if we check from local storage and if user is logged in,we go to home page directly if no user is logged in then we should be automatically redirected to login page and i want profile page to be shown on navbar,so give me code for home.js and navbar.js componnet and profile.js page and any other required components and pages
