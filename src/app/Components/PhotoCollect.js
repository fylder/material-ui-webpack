/**
 * Created by fylder on 2017/6/11.
 */
import React, {Component} from "react";
import {pink400, pink500, grey50, grey200, grey300, grey600, grey700, grey800, white} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import Measure from "react-measure";
import FloatingActionButton from "material-ui/FloatingActionButton";
import {GridList, GridTile} from 'material-ui/GridList';
import Snackbar from "material-ui/Snackbar";
import "whatwg-fetch";

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
        minHeight: 480,
        margin: 0,
        paddingLeft: '8%',
        paddingRight: '8%'
    },
    card_collect: {
        background: grey50,
        height: 240,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2
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
        marginTop: 42,
        marginLeft: 24
    },
    card_like: {
        marginTop: 24,
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
        marginTop: 6,
        paddingBottom: 6,
    },
    card_like_info: {
        marginTop: 24,
        paddingLeft: 12,
        fontSize: 14,
        color: grey600
    },
    collect_back: {
        marginTop: 24,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 4,
        float: 'left'
    },
    collect_add: {
        marginTop: 24,
        float: 'right'
    },
    card_photo_span: {
        color: white
    },
    card_div: {
        display: 'flex',
        paddingTop: 36
    },
    photo_top: {
        overflow: 'hidden',
        paddingBottom: 12
    },
    photo_content: {
        overflow: 'hidden',
        paddingBottom: 48
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: '100%',
        height: '40%',
        paddingBottom: 16
    },
    subtitle: {
        fontSize: 12,
        color: grey300,
        fontWeight: 'normal'
    },
    subtitle_div: {
        marginTop: 2
    },
    subtitle_time: {
        float: 'right',
        marginRight: 8
    }
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: pink500,
    },
});

class PhotoCollect extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleMsgShow = this.handleMsgShow.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);

        this.state = {
            open: false,
            msg: "",
            loading: true,
            datas: []
        };

        fetch('user/photo/collect_json', {
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
                        datas: json.covers
                    });
                } else {
                    setTimeout(() => {
                        this.setState({
                            loading: false,
                            datas: [{
                                "cid": 1,
                                "name": "回忆",
                                "describe": "校园",
                                "img": "#",
                                "time": "05-20 20:27"
                            }]
                        });
                    }, 2000);
                }

            }
        ).catch((ex)=> {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    datas: [{
                        "cid": 0,
                        "name": "异常",
                        "img": "yan/yan.jpg",
                        "describe": "咦，找不到咯",
                        "time": "05-20 20:27"
                    }, {
                        "cid": 1,
                        "name": "异常",
                        "img": "yan/yan.jpg",
                        "describe": "咦，找不到咯",
                        "time": "05-20 20:27"
                    }, {
                        "cid": 2,
                        "name": "异常",
                        "img": "yan/yan2.jpg",
                        "describe": "咦，找不到咯",
                        "time": "05-20 20:27"
                    }]
                });
            }, 77);
        });
    }

    handleTouchTapPicture = (cid) => {
        if (cid > 0) {
            setTimeout(function () {
                window.location.href = "/photo/user/pictures?cid=" + cid;
            }, 100);
        } else {
            this.handleMsgShow()
        }
    };

    handleMsgShow() {
        this.setState({
            open: true,
            msg: "相册找不见咯"
        });
    };

    handleRequestClose() {
        this.setState({
            open: false,
        });
    };

    onImgError = (e) => {
        e.target.src = "assets/img/404.png"
    };

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Measure whitelist={['width']}>
                    {({width}) => {
                        console.info("width:" + width);
                        let card_h = 240;
                        let col = 3;

                        //三个分割线
                        let w = 1024;
                        let w2 = 720;
                        let w4 = 7;

                        //三种相框尺寸
                        let h = 240;
                        let h2 = 180;
                        let h4 = 140;
                        if (width >= w) {
                            card_h = h;
                            col = 3;
                        } else if (width > w2) {
                            let i = h - h2;
                            card_h = h - (w - width) / (w - w2) * i;
                            col = 3;
                        } else if (width > w4) {
                            let i = h2 - h4;
                            card_h = h2 - (w2 - width) / (w2 - w4) * i;
                            col = 2;
                        }
                        if (width > 0) {
                            return (<div style={styles.container}>
                                <Card style={styles.card} zDepth={2}>
                                    <div style={styles.photo_top}>
                                        <FloatingActionButton href={'home'}
                                                              style={styles.collect_back}
                                                              secondary={true}>
                                            <span style={ styles.card_photo_span}>返回</span>
                                        </FloatingActionButton>
                                    </div>
                                    <div style={styles.photo_content}>
                                        <div style={styles.root}>
                                            <GridList
                                                cellHeight={card_h}
                                                cols={col}
                                                padding={16}
                                                style={styles.gridList}>

                                                {this.state.datas.map((tile) => (
                                                    <GridTile
                                                        className="slickCard"
                                                        key={tile.cid}
                                                        title={tile.name}
                                                        subtitle={<div style={styles.subtitle_div}>
                                                <span>{tile.describe}<span
                                                    style={styles.subtitle_time}>{tile.time}</span></span>
                                                        </div>}
                                                        titleStyle={styles.titleStyle}
                                                        subtitleStyle={styles.subtitle}
                                                        titleBackground="linear-gradient(to top, rgba(55, 60, 71, 0.9) 0%,rgba(55, 60, 71, 0.3) 80%,rgba(55, 60, 71, 0.1) 100%)">
                                                        <img src={tile.img}
                                                             onError={this.onImgError.bind(this)}
                                                             onClick={this.handleTouchTapPicture.bind(this, tile.cid)}/>
                                                    </GridTile>

                                                ))}
                                            </GridList>
                                        </div>
                                    </div>
                                </Card>
                                <Snackbar
                                    open={this.state.open}
                                    message={this.state.msg}
                                    autoHideDuration={4000}
                                    onRequestClose={this.handleRequestClose}
                                />
                            </div>)
                        } else {
                            return (<div style={styles.container}/>)
                        }
                    }
                    }
                </Measure>
            </MuiThemeProvider>
        );
    }
}

export default PhotoCollect;
