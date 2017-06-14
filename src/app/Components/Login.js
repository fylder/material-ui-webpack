/**
 * Created by fylder on 2017/5/13.
 */
import React, {Component} from "react";
import {pink500} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import Snackbar from "material-ui/Snackbar";
import "whatwg-fetch";

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: '5%',
    },
    card: {
        padding: 80,
        display: 'inline-block'
    },
    login_title: {}
    ,
    button: {
        margin: 12,
        background: pink500
    }

};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: pink500,
    },
});

class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleTouchTapLogin = this.handleTouchTapLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);

        this.state = {
            open: false,
            msg: "",
            username: "fylder",
            password: "",
        };
    }

    handleTouchTapLogin() {

        let username = this.state.username;
        let password = this.state.password;

        fetch('user/login_account', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: "username=" + username + "&password=" + password
        })
            .then((response)=> {
                return response.json()
            }).then((json)=> {
                console.log('parsed json', json);
                if (json.result == 1) {
                    this.setState({
                        open: true,
                        msg: "登录成功"
                    });
                    setTimeout(function () {
                        window.location.href = "/photo/home";
                    }, 700);
                } else {
                    this.setState({
                        open: true,
                        msg: "登录失败"
                    });
                }

            }
        ).catch((ex)=> {
            console.log('ex:', ex);
            this.setState({
                open: true,
                msg: "请求异常:" + ex
            });
        })
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value,
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value,
        });
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    };

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <Card style={styles.card} zDepth={3}>
                        <CardTitle title="user login" style={styles.login_title}/>
                        <TextField
                            id={"username"}
                            floatingLabelText="First Name"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                        /><br />
                        <TextField
                            id={"password"}
                            floatingLabelText="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        /><br />
                        <RaisedButton
                            label="LOGIN"
                            labelPosition="before"
                            onTouchTap={this.handleTouchTapLogin}
                            primary={true}
                            icon={<FontIcon className="muidocs-icon-custom-github"/>}
                            style={styles.button}
                        />
                    </Card>
                    <Snackbar
                        open={this.state.open}
                        message={this.state.msg}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Login;
