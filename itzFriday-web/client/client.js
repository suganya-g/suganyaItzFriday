import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App'

injectTapEventPlugin();

render(
	<MuiThemeProvider>
		<App />
	</MuiThemeProvider>, 
	document.getElementById("app"));