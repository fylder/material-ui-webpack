/**
 * Created by fylder on 2017/5/23.
 */

import React, {Component} from "react";
import {pink500, grey50, white} from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Gallery from "react-photo-gallery";
import Measure from "react-measure";
import Lightbox from "react-images";
import _ from "lodash";

const styles = {

    card: {
        background: grey50,
        height: 'auto',
        margin: 0,
        paddingLeft: '8%',
        paddingRight: '8%',
        paddingBottom: 16,
        overflow: 'hidden'
    },
    photo_lay: {
        overflow: 'hidden'
    },
    photo_top: {
        overflow: 'hidden',
        paddingBottom: 12
    },
    collect_back: {
        marginTop: 24,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 4,
        float: 'left'
    },
    card_photo_span: {
        color: white
    },
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: pink500,
    },
});

class PicturePreview extends Component {

    constructor(props, context) {
        super(props, context);

        let cid = this.getQueryString("cid");
        this.state = {
            cid: cid,
            photos: null,
            pageNum: 1,
            totalPages: 1,
            loadedAll: false,
            currentImage: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.loadMorePhotos = this.loadMorePhotos.bind(this);
        this.openLightBox = this.openLightBox.bind(this);
        this.closeLightBox = this.closeLightBox.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
    }

    componentDidMount() {
        this.loadMorePhotos();
        this.loadMorePhotos = _.debounce(this.loadMorePhotos, 200);
        window.addEventListener('scroll', this.handleScroll);
    }

    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    handleScroll() {
        let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
            this.loadMorePhotos();
        }
    }

    loadMorePhotos(e) {
        if (e) {
            e.preventDefault();
        }
        if (this.state.pageNum > this.state.totalPages) {
            this.setState({loadedAll: true});
            return;
        }

        fetch('user/photo/pictures_json', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            body: "cid=" + this.state.cid
        }).then((response)=> {
            return response.json()
        }).then((json)=> {
                let photos = [];
                json.photoset.photo.forEach(function (obj, i, array) {
                    let aspectRatio = parseFloat(obj.width_o / obj.height_o);
                    photos.push({
                        src: (aspectRatio >= 3) ? obj.url_c : obj.url_m,
                        width: parseInt(obj.width_o),
                        height: parseInt(obj.height_o),
                        caption: obj.title,
                        alt: obj.title,
                        srcset: [
                            obj.url_m + ' ' + obj.width_m + 'w',
                            obj.url_c + ' ' + obj.width_c + 'w',
                            obj.url_l + ' ' + obj.width_l + 'w',
                            obj.url_h + ' ' + obj.width_h + 'w'
                        ],
                        sizes: [
                            '(min-width: 480px) 50vw',
                            '(min-width: 1024px) 33.3vw',
                            '100vw'
                        ]
                    });
                });
                this.setState({
                    photos: this.state.photos ? this.state.photos.concat(photos) : photos,
                    pageNum: this.state.pageNum + 1,
                    totalPages: json.photoset.pages
                });

            }
        ).catch((ex)=> {
            console.log("error:" + ex);
        });
    }

    openLightBox(index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightBoxIsOpen: true
        });
    }

    closeLightBox() {
        this.setState({
            currentImage: 0,
            lightBoxIsOpen: false,
        });
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }

    gotoNext() {
        if (this.state.photos.length - 2 === this.state.currentImage) {
            this.loadMorePhotos();
        }
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    renderGallery() {
        return (
            <Measure whitelist={['width']}>
                {
                    ({width}) => {
                        var cols = 1;
                        if (width >= 480) {
                            cols = 2;
                        }
                        if (width >= 1024) {
                            cols = 3;
                        }
                        return <Gallery photos={this.state.photos} cols={cols} onClickPhoto={this.openLightBox}/>
                    }
                }
            </Measure>
        );
    }

    render() {
        // no loading sign if its all loaded
        if (this.state.photos) {
            return (<MuiThemeProvider muiTheme={muiTheme}>
                    <Card style={styles.card} zDepth={2}>
                        <div style={styles.photo_top}>
                            <FloatingActionButton href={'/photo/user/collect'}
                                                  style={styles.collect_back}
                                                  secondary={true}>
                                <span style={ styles.card_photo_span}>返回</span>
                            </FloatingActionButton>
                        </div>
                        {this.renderGallery()}
                        <Lightbox
                            images={this.state.photos}
                            backdropClosesModal={true}
                            onClose={this.closeLightBox}
                            onClickPrev={this.gotoPrevious}
                            onClickNext={this.gotoNext}
                            currentImage={this.state.currentImage}
                            isOpen={this.state.lightBoxIsOpen}
                            width={1600}
                        />
                        {!this.state.loadedAll &&
                        <div id="msg-loading-more" className="loading-msg">Loading</div>}
                    </Card>
                </MuiThemeProvider>
            );
        }
        else {
            return (<MuiThemeProvider muiTheme={muiTheme}>
                    <Card style={styles.card} zDepth={2}>
                        <div style={styles.photo_top}>
                            <FloatingActionButton href={'/photo/user/collect'}
                                                  style={styles.collect_back}
                                                  secondary={true}>
                                <span style={ styles.card_photo_span}>返回</span>
                            </FloatingActionButton>
                        </div>
                        <div id="msg-app-loading" className="loading-msg">No thing!</div>
                    </Card>
                </MuiThemeProvider>
            );
        }
    }
}


export
default
PicturePreview;
