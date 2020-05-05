# [UI Eyechecker]

Created with ReactJS, based on [Paper Dashboard React](https://github.com/creativetimofficial/paper-dashboard-react/archive/master.zip) with the combination of [Material-UI](https://material-ui.com). This repo contains only the front-end of this project, for the full usage you need to first install and configure the next [repo](https://github.com/CallmeTorre/api-eyechecker).

## How to run

```
$ git clone https://github.com/Gushley110/ui-eyechecker.git
$ cd ui-eyechecker
$ npm install
$ npm start
```

If you encounter a problem while showing the PDF file, you need to change **webpack.config.js** located at **node_modules/react-scripts/config/**. Find the output property and add 
```
globalObject: 'this'
```
it should look like this

![webpack.config.js](configuration.png)
