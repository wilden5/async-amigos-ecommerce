<h1 align="center">
E-Commerce Application
</h1>
<p align="center">
<br>
  <img src="./public/logo.png" alt="reveal.js" width="250">
  <br>
</p>
<h3 align="center">
Computer Parts
</h3>

## Overview
The Computer E-Commerce Application is a user-friendly and feature-rich online platform designed to cater to computer 
enthusiasts, gamers, and professionals looking to purchase high-quality computer hardware. With an intuitive user 
interface and a vast range of products, our application aims to provide a seamless shopping experience for customers 
seeking the latest and most reliable computer components.  

## Technology Stack
#### The Shop-n-Comp project is an eCommerce application built using the following technology stack:

1. **[Webpack](https://www.npmjs.com/package/webpack)**: A powerful bundler used to package and optimize the application's assets.
2. **[TypeScript](https://www.npmjs.com/package/typescript)**: A statically-typed superset of JavaScript that enhances code reliability and maintainability.
3. **[HTML Webpack Plugin](https://www.npmjs.com/package/html-webpack-plugin)**: Simplifies HTML file creation and injection of bundled scripts into the HTML template.
4. **[Sass](https://www.npmjs.com/package/sass)**: A popular CSS preprocessor that provides advanced features and improves CSS code organization.
5. **[PostCSS](https://www.npmjs.com/package/postcss)**: A versatile CSS tool that enhances and transforms styles using plugins.
6. **[Stylelint](https://www.npmjs.com/package/stylelint)**: A linter for style sheets that helps maintain consistent and error-free CSS code.
7. **[Prettier](https://www.npmjs.com/package/prettier)**: An opinionated code formatter that ensures consistent code style across the project.
8. **[ESLint](https://www.npmjs.com/package/eslint)**: A JavaScript linter that identifies and enforces coding patterns and best practices.
9. **[Jest](https://www.npmjs.com/package/jest)**: A testing framework for JavaScript and TypeScript applications.
10. **[Husky](https://www.npmjs.com/package/husky)**: A Git hook manager used to trigger scripts on pre-commit and pre-push actions.
11. **[lint-staged](https://www.npmjs.com/package/lint-staged)**: A tool that runs linters on staged files to enforce code quality before committing.
12. **[Terser](https://www.npmjs.com/package/terser)**: A JavaScript minifier that compresses and optimizes the final build output.
13. **[Autoprefixer](https://www.npmjs.com/package/autoprefixer)**: Automatically adds browser-specific prefixes to CSS properties to enhance compatibility.
14. **[Mini CSS Extract Plugin](https://www.npmjs.com/package/mini-css-extract-plugin)**: Extracts CSS into separate files for better performance.
15. **[Webpack Dev Server](https://www.npmjs.com/package/webpack-dev-server)**: A development server that enables live reloading and better development experience.
16. **[ts-jest](https://www.npmjs.com/package/ts-jest)**: A TypeScript preprocessor for Jest to enable testing TypeScript files.
17. **[@typescript-eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)**: Integrates ESLint with TypeScript for enhanced linting capabilities.

## Setting up and Running the Project Locally
### Prerequisites
Before you begin, ensure that you have the following software installed on your machine:
1. Node.js (v14.x or higher)
2. npm (Node Package Manager) or yarn
### Clone the Repository
1. Open your terminal or command prompt.
2. Change the current working directory to the location where you want to clone the project.
3. Run the following command to clone the repository:\
```git clone https://github.com/your-username/shop-n-comp.git``` \
Replace your-username with your actual GitHub username.
4. Change into the project directory:
```cd shop-n-comp```
### Install Dependencies
1. After navigating to the project directory, install the required dependencies using npm or yarn:\
Using npm:```npm install```\
Using yarn:```yarn install```
### Build the Project
1. To build the project, run the following command:\
Using npm:```npm run build```\
Using yarn:```yarn build```
### Start the Development Server
1. To start the development server and view the application in your browser, use the following command:\
Using npm:```npm start```\
Using yarn:```yarn start```\
This will start the development server, and the application will be accessible at ```http://localhost:8080```.
### Running Tests
1. To run tests, use the following command:\
Using npm:```npm run jest-test```\
Using yarn:```yarn jest-test```

#### Now you have successfully set up and run the Computer E-Commerce Application project locally on your machine. You are welcome to explore and contribute the project!

## Available Scripts
```start```: Starts the development server using webpack and serves the application in development mode.\
```build```: Bundles the application using webpack in production mode for deployment.\
```lint```: Runs ESLint to check for linting errors in the project's files.\
```format```: Formats the project's TypeScript files using Prettier to ensure consistent code style.\
```clear-dist```: Removes the dist directory and its content.\
```jest-test```: Runs Jest to execute unit tests defined in the project.\
```jest-generate-report```: Runs Jest with coverage enabled to generate a test coverage report in the Coverage folder.\
```prepare```: Installs Git hooks using Husky to facilitate pre-commit and pre-push actions.
#### Make sure to run ```prepare``` script after the first npm install!
