/**
 * Created by fylder on 2017/5/14.
 */

import React, {Component} from "react";
import {pink400, pink500, grey50, grey600, grey700, grey800, white} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Avatar from "material-ui/Avatar";

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
    info_header: {
        borderLeftWidth: 5,
        borderLeftColor: pink400,
        borderLeftStyle: 'solid',
        paddingLeft: '1.2rem',
        marginLeft: 0,
        marginTop: 8,
    },
    info_content: {
        padding: 4,
        fontSize: 16,
        color: grey600
    },
    card_head: {},
    card_title: {
        paddingTop: 42,
        marginLeft: 24
    },
    card_like: {
        paddingTop: 24,
        paddingBottom: 12,
        fontSize: 18,
        color: grey800
    },
    card_lay: {
        paddingTop: 12,
    },
    card_like_lay: {
        paddingTop: 12,
        paddingBottom: 12,
    },
    card_like_info_lay: {
        paddingTop: 6,
        paddingBottom: 6,
    },
    card_like_info: {
        paddingTop: 24,
        paddingLeft: 12,
        fontSize: 14,
        color: grey600
    },
    card_photo: {
        marginTop: 24,
        marginRight: 24,
        float: 'right'
    },
    card_photo_span: {
        color: white
    },
    card_div: {
        display: 'flex',
        paddingTop: 36
    }
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: pink500,
    },
});

class UserInfo extends Component {
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
                        <div>
                            <div>
                                <FloatingActionButton href={'user/collect'} style={styles.card_photo} secondary={true}>
                                    <span style={ styles.card_photo_span}>相册</span>
                                </FloatingActionButton>
                            </div>
                            <div style={styles.card_div}>
                                <div style={styles.card_head}>
                                    <Avatar src="yan/yan.jpg" size={108}/>
                                </div>
                                <div style={ styles.card_title}>
                                    <span style={styles.head_title}>fylder</span>
                                </div>

                            </div>

                            <div>
                                <blockquote style={styles.info_header}><p style={styles.info_content}>
                                    草在结它的籽，风在吹它的叶，我们站着什么都不说，就十分的美好</p>
                                </blockquote>

                            </div>
                            <div style={styles.card_lay}>
                                <div style={styles.card_like_lay}>
                                    <span style={styles.card_like}>个人喜好</span>
                                </div>
                                <div style={styles.card_like_info_lay}>
                                    <span style={styles.card_like_info}>摄影</span>
                                    <span style={styles.card_like_info}>花草</span>
                                    <span style={styles.card_like_info}>带着毛驴去兜风</span>
                                </div>
                            </div>
                            <div style={styles.card_lay}>
                                <div style={styles.card_like_lay}>
                                    <span style={styles.card_like}>关于我</span>
                                </div>
                                <div style={styles.card_like_info_lay}>
                                    <span style={styles.card_like_info}>山无陵，天地绝，乃敢与君绝</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default UserInfo;
