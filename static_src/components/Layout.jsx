import React from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';



class LayoutComponent extends React.Component {

    render() {
        return (

            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>


            <div>
                <div className="Menu">
                     <AppBar title="Shitter" />

                </div>
                <div>{ this.props.children }</div>
            </div>
                </MuiThemeProvider>

        );

    }
}


export default LayoutComponent;
