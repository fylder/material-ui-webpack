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

    handleTouchTapUpload = (id) => {
        console.log("id:" + id);
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
                        <TableRowColumn>{data.info}</TableRowColumn>
                        <TableRowColumn>
                            <RaisedButton label="upload"
                                          secondary={true}
                                          style={style}
                                          onTouchTap={this.handleTouchTapUpload.bind(this, data.id)}
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
        this.state = {
            loading: true,
            loadingView: <LinearProgressLoading/>,
            datas: [{
                'id': 0,
                'name': '未知',
                'info': "未知",
                'gender': '未知'
            }]
        };

        setTimeout(() => {
            this.setState({
                loading: false,
                loadingView: <LinearProgressLoaded/>,
                datas: [{
                    'id': 1,
                    'name': 'ahh',
                    'info': "ahh's walala",
                    'gender': 'male'
                }, {
                    'id': 2,
                    'name': 'wakaka',
                    'info': "wakaka's ahh",
                }, {
                    'id': 3,
                    'name': 'walala',
                    'info': "walala's ahh",
                }
                ]
            });
        }, 2000);
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    {this.state.loadingView}
                    <PhotoTable datas={this.state.datas}/>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default PhotoManage;
