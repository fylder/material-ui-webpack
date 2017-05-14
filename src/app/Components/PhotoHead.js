/**
 * Created by fylder on 2017/5/14.
 */

import React, {Component} from "react";
import {pink500} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";

const styles = {

    title: {
        color: '#FFFFFF',
        margin: 0
    },

    theme: {
        background: pink500,
    },
    button: {
        margin: 12,
    },
    card: {
        background: pink500,
        height: 240,
        margin: 0,
        paddingLeft: '20%',
    },
    card_title: {
        paddingTop: 60,
    }, card_title2: {
        paddingTop: 24,
    },
    head_title: {
        color: '#FFFFFF',
        fontSize: 36,
    },
    head_title2: {
        color: '#FFFFFF',
        fontSize: 24,
        paddingTop: 24
    }
    ,
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: pink500,
    },
});

class PhotoHead extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleTouchTapExit = this.handleTouchTapExit.bind(this);

    }

    //退出
    handleTouchTapExit() {
        window.location.href = "login.html";
    }


    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <AppBar zDepth={2} style={styles.theme}
                            title={<a style={styles.title} href="http://www.fylder.me:8080/photo">Photo</a> }
                            iconElementLeft={<div></div>}
                            iconElementRight={<FlatButton label="exit"
                                                          onTouchTap={this.handleTouchTapExit}/>}
                    />
                    <Card style={styles.card} zDepth={2}>
                        <div style={ styles.card_title}>
                            <span style={styles.head_title}>fylder</span>
                        </div>
                        <div style={ styles.card_title2}>
                            <span style={styles.head_title2}>剑指锁妖塔</span>
                        </div>

                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default PhotoHead;
