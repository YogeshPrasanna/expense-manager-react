## A Simple Expense Manager 💵

## Demo Account

*_In case you need to have a quick look at the app without creating an account, use the below credentials_*

[Click Here For Demo](https://sad-shirley-6ef62f.netlify.com/)

`Username : yogi15moto@gmail.com`
`password: yogesh`

## Screenshots

#### Login Screen
[![Login Page](https://s25.postimg.cc/jvolgx1tb/login.png)](https://sad-shirley-6ef62f.netlify.com/)

#### Home Page
[![Home Page](https://s25.postimg.cc/c2xxoyizj/home.png)](https://sad-shirley-6ef62f.netlify.com/)

#### Night Mode Home Page
[![Night Mode Home](https://i.postimg.cc/mZVBMTwf/Home1.png)](https://sad-shirley-6ef62f.netlify.com/)

#### Monthly View
[![Monthly View](https://s25.postimg.cc/i3vmm1sr3/monthly.png)](https://sad-shirley-6ef62f.netlify.com/)

#### Daily View
[![Daily View](https://s25.postimg.cc/6208rwbsv/daily.png)](https://sad-shirley-6ef62f.netlify.com/)

#### Filter
[![Filter Page](https://s25.postimg.cc/uiiemdrz3/filter.png)](https://sad-shirley-6ef62f.netlify.com/)

#### Statistics
[![Statistics](https://s25.postimg.cc/lnhkbvawf/statistics.png)](https://sad-shirley-6ef62f.netlify.com/)

#### Loan Page
[![Loan Page](https://s25.postimg.cc/s16nf3kxb/loan.png)](https://sad-shirley-6ef62f.netlify.com/)

#### Night Mode Month View Page
[![Night Mode Month](https://i.postimg.cc/zDyzFLVf/month-night-mode.png)](https://sad-shirley-6ef62f.netlify.com/)

#### Settings
[![Settings](https://i.postimg.cc/pr0s2D95/settings.png)](https://sad-shirley-6ef62f.netlify.com/)

#### Mobile Views
[![Mobile Screens](https://s25.postimg.cc/r5zhetxzz/mobile_screens_expense_manager.png)](https://sad-shirley-6ef62f.netlify.com/)

#### Calendar Component
[![Calendar Component](https://i.postimg.cc/DyZ1TZnM/calendar-component.png)](https://sad-shirley-6ef62f.netlify.com/)

## Setup

#### 1. Setting Up Firebase 
- Create a firebase account

- Create a new firebase project 

  [![Add Firebase Project](https://i.postimg.cc/TwvMnjTk/add-Firebase.png)](https://i.postimg.cc/TwvMnjTk/add-Firebase.png)
  [![Add Firebase Project](https://i.postimg.cc/fL74C3LM/add-project.png)](https://i.postimg.cc/fL74C3LM/add-project.png)
  
- Be Sure to Choose Realtime Database , and not firestore

- change database rules to 
  [![Change database rules](https://i.postimg.cc/3N3scK4m/firebase-database-rules.png)](https://i.postimg.cc/3N3scK4m/firebase-database-rules.png)
  
- Enable Google Authentication and Email Authentication , Feel Free to add other authentication methods and setup accordingly
  [![Enable Google Authentication](https://i.postimg.cc/593dFFT3/firebase-enable-auth-methods.png)](https://i.postimg.cc/593dFFT3/firebase-enable-auth-methods.png)
  
- Setup Email Verification Template
  [![Setup Email Verification Template](https://i.postimg.cc/pXLNQLtt/firebase-setup-firebase-email-verification-templates.png)](https://i.postimg.cc/pXLNQLtt/firebase-setup-firebase-email-verification-templates.png)
  
 2. Setup Repo Locally
 
    `git clone https://github.com/YogeshPrasanna/expense-manager-react.git`

### `npm install`

      This will install all the required packages and dependencies to run the app.

### create a file named .env.local in root folder and add your firebase api key here
    
    `REACT_APP_FIREBASE_API_KEY = "your-api-key-here"`

### `npm start`

  Runs the app in the development mode.<br>
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  The page will reload if you make edits.<br>
  You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

