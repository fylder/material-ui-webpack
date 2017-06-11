/**
 * Created by fylder on 2017/5/14.
 */

import React, {Component} from "react";
import {pink500} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import {List, ListItem} from "material-ui/List";

const styles = {

    title: {
        color: '#FFFFFF',
        margin: 0
    },

    theme: {
        background: pink500,
    },
    button: {
        background: '#3E434E',
        marginTop: 12,
        width: '100%',
        color: '#FFFFFF',
        minWidth: 48
    },
    button_label: {
        paddingLeft: 4,
        paddingRight: 8,
        margin: 0
    },
    card: {
        background: '#373C47',
        height: 480,
        paddingLeft: '4%',
        paddingRight: '4%',
        margin: 0,
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
        accent1Color: '#373C47'
    },
});

class PhotoTools extends Component {


    constructor(props, context) {
        super(props, context);

        let title = document.title;

        this.state = {
            title: title,
        };
    }


    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <Card style={styles.card} zDepth={2}>
                        <div>
                            <LinkButton text="信息" type="info"/>
                        </div>
                        <div>
                            <LinkButton text="相册" type="photo" active={false}/>
                        </div>
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}

class LinkButton extends Component {

    constructor(props, context) {
        super(props, context);

        let title = document.title;//标题
        let text = props.text;
        let info = props.type;


        let active = false;
        if (props.active) {
            active = true;
        } else {
            console.log("info:" + props.active);
            if (info == "info" && title == "主页") {
                active = true;
            } else if (info == "photo" && title == "相册管理") {
                active = true;
            }
        }

        this.state = {
            active: active,
            labelStr: text,
            info: info
        };

    }

    //功能选项卡
    handleTouchTapTools = (type)=> {
        setTimeout(function () {
            console.log("type:" + type);
            if (type == 'info') {
                window.location.href = "home";
            } else if (type == "photo") {
                window.location.href = "user/photo/manage";
            }

        }, 400);
    };

    render() {

        return (
            <RaisedButton
                target="_blank"
                label={this.state.labelStr }
                backgroundColor={this.state.active ? '#2D323C' : '#373C47'}
                labelColor="#FFFFFF"
                style={ styles.button }
                labelStyle={styles.button_label}
                onTouchTap={this.handleTouchTapTools.bind(this, this.state.info)}
                icon={<FontIcon className="muidocs-icon-custom-github"/>}
            />
        );
    }
}

export default PhotoTools;
