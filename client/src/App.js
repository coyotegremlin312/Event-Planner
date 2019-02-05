import React, { Component } from 'react';
import './App.css';
import database from './firebase'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comedianName: "",
      comedianList: [],
      performerName: "",
      performerList: [],
      error: ''
    };
  }

  onComedianNameChange = (e) => {
    const comedianName = e.target.value;
    this.setState(() => ({ comedianName }));
  };

  onPerformerNameChange = (e) => {
    const performerName = e.target.value;
    this.setState(() => ({ performerName }));
  };

  onComedianSubmit = (e) => {
        database.ref('comedianList').push(this.state.comedianName);
        database.ref('performerList').push(this.state.comedianName);
        this.setState(() => ({comedianName: ''}))
        e.preventDefault();
    }

  onPerformerSubmit = (e) => {
      database.ref('performerList').push(this.state.performerName);
      this.setState(() => ({performerName: ''}))
      e.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="SearchBar">
          <form onSubmit={this.onComedianSubmit} className="Form">
            <input
              className="SearchBox"
              type="text"
              placeholder="Type Comedian's Name Here"
              value={this.state.comedianName}
              onChange={this.onComedianNameChange}
            ></input>
            <button className="SearchButton">Add Comedian</button>
          </form>
          <header className="App-header">Event Planner
        </header>
          <form onSubmit={this.onPerformerSubmit} className="Form">
            <input
              className="SearchBox"
              type="text"
              placeholder="Type Performer's Name Here"
              value={this.state.performerName}
              onChange={this.onPerformerNameChange}
            ></input>
            <button className="SearchButton">Add Performer</button>
          </form>
        </div>
        <div className="TheEvents">
          <ComedyStore/>
          <IceHouse/>
          <Ticketmaster/>
        </div>
      </div>
    );
  }
}

class ComedyStore extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      comedianList: [],
      comedians: '',
      error: ''
    };
  }

  componentDidMount = () => {
    this.displayComedyBoard();
  }

  displayComedyBoard = (event) => {
    const URL = "http://localhost:3000/"
    fetch(URL)
      .then((res) => {
        let comedians = [];
        for(let i = 0; i < res.length; i++){
          if(res[i].date){
            comedians.push(res[i])
          }
        }
        this.setState({ comedians: comedians })
      })
      .then(() => {
        const comedianList = this.state.comedians.map(this.createList)
        this.setState({ comedianList })
      })
  }

  createList = (event) => {
    return (
      <div key={event._id} className="signature">
        <h1 className="Performer">{event.performer}</h1>
        <h2 className="Date">{event.date}</h2>
        <h2 className="Link">{event.link}</h2>
      </div>
    )
  }

  render() {
    return (
      <div className="EventList">
        <header className="EventHeader">
          Comedy Store Events
        </header>
        <div className="The List">{this.state.comedianList}</div>
      </div>
    );
  }
}

class IceHouse extends Component {

  render() {
    return (
      <div className="EventList">
        <header className="EventHeader">
        Ice House Events
        </header>
        <div className="The List"></div>
      </div>
    );
  }
}

class Ticketmaster extends Component {

  render() {
    return (
      <div className="EventList">
        <header className="EventHeader">
        TicketMaster Events
        </header>
        <div className="The List"></div>
      </div>
    );
  }
}


export default App;
