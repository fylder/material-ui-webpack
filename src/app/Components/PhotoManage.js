/**
 * Created by fylder on 2017/5/14.
 */

import React, {Component} from "react";
import {pink500, grey50, grey700, grey800} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
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
        background: grey50,
        height: 480,
        margin: 0,
        paddingLeft: '10%',
    },
    card_title: {
        paddingTop: 60,
    }, card_title2: {
        paddingTop: 24,
    },
    head_title: {
        color: grey800,
        fontSize: 36,
    },
    head_title2: {
        color: grey700,
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

class PhotoManage extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleTouchTapLogin = this.handleTouchTapLogin.bind(this);
    }



    handleTouchTapLogin() {
        window.location.href = "register";
    }

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <Card style={styles.card} zDepth={2}>
                        <div style={ styles.card_title}>
                            <span style={styles.head_title}>相册管理</span>
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

export default PhotoManage;
