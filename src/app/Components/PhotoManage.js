/**
 * Created by fylder on 2017/5/14.
 */

import React, {Component} from "react";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {pink500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from "material-ui/Snackbar";
import "whatwg-fetch";

const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 20,
    },
};

const style = {
    margin: 4,
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: pink500,
        secondaryColor: pink500,
    },
});


class PhotoTable extends Component {

    constructor(props, context) {
        super(props, context);
    }

    handleTouchTapUpload = (id, name) => {
        if (id > 0) {
            setTimeout(function () {
                window.location.href = "/photo/user/upload?cid=" + id + "&collectName=" + name;
            }, 400);
        } else {
            this.props.callbackMsg();
            // this.setState({
            //     open: true,
            //     msg: "异常"
            // });
        }
    };

    render() {
        return (<Table selectable={false}>
            <TableHeader displaySelectAll={false}
                         adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn tooltip="序号">ID</TableHeaderColumn>
                    <TableHeaderColumn tooltip="相册">相册</TableHeaderColumn>
                    <TableHeaderColumn tooltip="简介">简介</TableHeaderColumn>
                    <TableHeaderColumn tooltip="操作"><FlatButton label="操作" disabled={true}/></TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody showRowHover={true}
                       displayRowCheckbox={false}>
                {this.props.datas.map((data, index) => {
                    return (<TableRow
                        hoverable={true}>
                        <TableRowColumn>{index + 1}</TableRowColumn>
                        <TableRowColumn>{data.name}</TableRowColumn>
                        <TableRowColumn>{data.describe}</TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label="upload"
                                          secondary={true}
                                          style={style}
                                          onTouchTap={this.handleTouchTapUpload.bind(this, data.cid, data.name)}
                            />
                        </TableRowColumn>
                    </TableRow>);
                })}
            </TableBody>
        </Table>)
    }
}
const LinearProgressLoading = () => (
    <LinearProgress color={pink500} mode="indeterminate"/>
);
const LinearProgressLoaded = () => (
    <LinearProgress color={pink500} mode="determinate" value={100}/>
);

class PhotoManage extends Component {
    constructor(props) {
        super(props);
        this.handleMsgShow = this.handleMsgShow.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);

        this.state = {
            open: false,
            msg: "",
            loading: true,
            loadingView: <LinearProgressLoading/>,
            datas: [{
                "cid": 0,
                "name": "回忆",
                "describe": "校园"
            }]
        };

        fetch('user/photo/manage_json', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
        }).then((response)=> {
            return response.json()
        }).then((json)=> {
                console.log('parsed json', json);
                if (json.result == 1) {
                    this.setState({
                        loading: false,
                        loadingView: <LinearProgressLoaded/>,
                        datas: json.collects
                    });
                } else {
                    setTimeout(() => {
                        this.setState({
                            loading: false,
                            loadingView: <LinearProgressLoaded/>,
                            datas: [{
                                "cid": 0,
                                "name": "未知",
                                "describe": "咦，找不到咯"
                            }]
                        });
                    }, 2000);
                }

            }
        ).catch((ex)=> {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    loadingView: <LinearProgressLoaded/>,
                    datas: [{
                        "cid": 0,
                        "name": "异常",
                        "describe": "咦，找不到咯"
                    }]
                });
            }, 2000);
        });
    }


    handleMsgShow() {
        this.setState({
            open: true,
            msg: "相册异常"
        });
    };

    handleRequestClose() {
        this.setState({
            open: false,
        });
    };


    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    {this.state.loadingView}
                    <PhotoTable datas={this.state.datas} callbackMsg={this.handleMsgShow}/>
                    <Snackbar
                        open={this.state.open}
                        message={this.state.msg}
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}

export default PhotoManage;
