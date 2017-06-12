/**
 * Created by fylder on 2017/6/11.
 */

import React, {Component} from "react";
import {pink400, pink500, grey50, grey600, grey700, grey800, white} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import FloatingActionButton from "material-ui/FloatingActionButton";
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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
        height: '40%'
    },
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: pink500,
    },
});
const tilesData = [
    {
        id: 1,
        img: 'yan/yan.jpg',
        title: 'Breakfast',
        author: 'jill111',
    },
    {
        id: 2,
        img: 'yan/yan.jpg',
        title: 'Tasty burger',
        author: 'pashminu',
    },
    {
        id: 3,
        img: 'yan/yan.jpg',
        title: 'Camera',
        author: 'Danson67',
    },
    {
        id: 4,
        img: 'yan/yan.jpg',
        title: 'Morning',
        author: 'fancycrave1',
    },
    {
        id: 5,
        img: 'yan/yan.jpg',
        title: 'Hats',
        author: 'Hans',
    },
    {
        id: 6,
        img: 'yan/yan.jpg',
        title: 'Honey',
        author: 'fancycravel',
    },
    {
        id: 7,
        img: 'yan/yan.jpg',
        title: 'Vegetables',
        author: 'jill111',
    },
    {
        id: 8,
        img: 'yan/yan.jpg',
        title: 'Water plant',
        author: 'BkrmadtyaKarki',
    },
];
class PhotoCollect extends Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <Card style={styles.card} zDepth={2}>
                        <div style={styles.photo_top}>
                            <FloatingActionButton href={'user/collect'}
                                                  style={styles.collect_back}
                                                  secondary={true}>
                                <span style={ styles.card_photo_span}>返回</span>
                            </FloatingActionButton>
                        </div>
                        <div style={styles.photo_content}>
                            <div style={styles.root}>
                                <GridList
                                    cellHeight={240}
                                    cols={3}
                                    padding={16}
                                    style={styles.gridList}>
                                    {tilesData.map((tile) => (
                                        <GridTile
                                            key={tile.id}
                                            title={tile.title}
                                            actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)"/></IconButton>}
                                            titleStyle={styles.titleStyle}
                                            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">
                                            <img src={tile.img}/>
                                        </GridTile>
                                    ))}
                                </GridList>
                            </div>
                        </div>
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default PhotoCollect;
