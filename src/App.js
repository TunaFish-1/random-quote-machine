import './App.css';
import React from 'react';
import $ from 'jquery';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      text:'',
      author:'',
      color:''
    }

    //bind to this
    this.getQuote=this.getQuote.bind(this);
  }

  colors= [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ]

  componentWillMount(){
    this.getQuote();
  }

  getQuote = () => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => this.setState(
        {
          text: data.content,
          author: data.author,
          color: this.colors[Math.floor((Math.random() * this.colors.length))]
        }
      ));
  };

render(){
  
  $('.App').hide().fadeIn(0, "linear", $('#quote-box').hide().fadeIn(1000));
  
  return (
    <div className="App" id="wrapper" style={{backgroundColor: this.state.color}}>
      <div id="quote-box">
        <p id="text" style={{color: this.state.color}}>
          <i class="fa fa-quote-left"></i>
          {this.state.text}
          <i class="fa fa-quote-right"></i>
        </p>
        <p id="author" style={{color: this.state.color}}>{this.state.author}</p>
        <button id="new-quote" onClick={this.getQuote} style={{backgroundColor: this.state.color}}>Get Quote</button>
        <a 
          id="tweet-quote" 
          href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.state.text + '" ' + this.state.author)} 
          target='_blank'
          rel="noreferrer"
        >
          <button style={{backgroundColor: this.state.color}}><i class="fa fa-twitter"></i></button>
        </a>
        <div id="footer">
          <p>Made by <span style={{color: this.state.color}}>Anthony Fakhoury</span></p>
        </div>
      </div>
    </div>
  );}
}

export default App;
