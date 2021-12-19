# GM Dashboard

GM Dashboard is a web application intended to help Game Masters(GM) run the game of Dungeons and Dragons(D&D).  A GM is responsible for maintaining the seamless narrative flow of the game while managing notes about characters, places and enemy statistics.  Furthermore, D&D makes use of dice to add randomness to events and as such the GM is responsible for rolling and totaling the results of dozens of dice rolls throughout the game.  

This application focuses on putting dice rolls and the most complex statistics at the fingertips of the GM, so they may focus as much of their attention as possible on continuing the narrative and the other players.

## Features

### Select Monsters
![select](https://github.com/Edington42/gm-dashboard/blob/main/sample/select_monster.png)
* Build a custom dashboard by selecting from dozens of premade monsters provided by https://open5e.com/.

### Easy Rolling
![base](https://github.com/Edington42/gm-dashboard/blob/main/sample/base.png)
* First card rolls D20 with any modifier.  Rolls twice and totals both for Advantage/Disadvantage.
* Second card rolls any number of D4, D6, D8, D10, D12 and totals the result.
* Additional cards can be added, updated, or removed to display stats and roll attacks for monsters.
* All rolls logged at bottom of screen.

### Quick Stat Access
![details](https://github.com/Edington42/gm-dashboard/blob/main/sample/monster_details.png)
* Quickly show and hide details for:
   * Overall monster statistics.
   * Ability statistics.

### Customize Monsters
![edit](https://github.com/Edington42/gm-dashboard/blob/main/sample/edit_monster.png)
* Edit monster details in JSON format

### Manage Dashboard
![options](https://github.com/Edington42/gm-dashboard/blob/main/sample/options_menu.png)
* Import and export your dashboard in JSON format.
* Access other dashboard settings.

## Usage

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


