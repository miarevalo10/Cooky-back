import React, {Component} from 'react';
import axios from 'axios';
import VideoPlayer from './video_player';
import Sugerencias from './sugerencias';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    }
  }


  buscarVideoYoutube(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    return(
      <div>
        <Buscador className="amplio" buscarVideoYoutube={this.buscarVideoYoutube.bind(this)} />
        <div className="row">
          <VideoPlayer className="col-md-8" video={this.state.selectedVideo}/>
          <Sugerencias className="col-md-4" videos={this.state.videos} ponerVideo={(video) => {this.setState({selectedVideo: video})}} />
        </div>

      </div>
    )
  }
}

export default App;
