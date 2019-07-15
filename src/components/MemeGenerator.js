import React, { Component } from 'react';

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: '',
      bottomText: '',
      randomImg: 'http://i.imgflip.com/1bij.jpg',
      allMemeImgs: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

  }

  handleClick(event) {
    event.preventDefault();

    const memes = this.state.allMemeImgs;
    const mem = memes[Math.floor(Math.random() * memes.length)].url;
    this.setState({randomImg: mem});
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(response => this.setState({ allMemeImgs: response.data.memes }));
  }

  render() {
    const { topText, bottomText, randomImg } = this.state;
    return (
      <div>
        <form className="meme-form">
          <label>
            <input type="text" name="topText" value={topText} placeholder="Top text" onChange={ this.handleChange }/>
          </label>

          <label>
            <input type="text" name="bottomText" value={bottomText} placeholder="Bottom text" onChange={ this.handleChange }/>
          </label>

          <button onClick={ this.handleClick }>Gen</button>
        </form>
        <div className="meme">
          <img align="center" src={ randomImg } alt="" />
          <h2 className="top">{ topText }</h2>
          <h2 className="bottom">{ bottomText }</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;