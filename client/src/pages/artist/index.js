import React from 'react';
import './index.css';
import API from '../../utilities/API';
import PageTitle from '../../components/Title';
import Images from '../../components/ArtistImage';

class Artist extends React.Component {
    state = {
        artists: [],
        currentArtist: {}
    }

    componentDidMount() {
        this.getArtists();
    }

    getArtists = () => {
        API.find()
            .then(res =>
                this.setState({ artists: res.data }, () => this.getArtist())
            )
    }

    getArtist = () => {
        var URL = window.location.pathname;
        this.state.artists.map(results => {
            if ("/artist/" + results._id === URL) {
                return this.setState({ currentArtist: results })
            }
            return console.log("hello");
        })
    }



    render() {
        return (
            <div>
                {this.state && this.state.currentArtist.image &&
                    <PageTitle title={this.state.currentArtist.firstName + " " + this.state.currentArtist.lastName} />
                }
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="artist-flex-container" >
                                <div className="divLeft">
                                    <img id="artistImage" src={this.state.currentArtist.image} alt=".." />
                                </div>
                            </div>
                        </div>

                        <div className="col-8">
                            <div className="divRight">
                                <p>{this.state.currentArtist.about}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="img-grid" >
                    <div className="shopBG">
                        <div className="artwork-flex-container">
                            {this.state && this.state.currentArtist && this.state.currentArtist.artworks && this.state.currentArtist.artworks.map((result, index) => {
                                return (
                                    <div>
                                        <Images
                                            image={result.img}
                                            artistID={this.state.currentArtist._id}
                                            imageID={index}
                                        ></Images>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div >
            </div>


        )
    }
}

export default Artist