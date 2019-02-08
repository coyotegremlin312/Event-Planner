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
      loading: true,
      comedianList: [],
      comedians: '',
      error: ''
    };
  }

  componentDidMount = () => {
    this.displayComedyBoard();
  }

  displayComedyBoard = (event) => {
    const URL = "http://localhost:5000/events"
    fetch(URL)
      .then((res) => {
        return res.json()
      }).then((data) => {
        console.log(data)
        let comedians = [];
        for(let i = 0; i < data.length; i++){
          if(data[i].date){
            comedians.push(data[i])
          }
        }
        this.setState({ comedians: comedians })
      })
      .then(() => {
        const comedianList = this.state.comedians.map(this.createList)
        this.setState({ comedianList, loading: false })
      })
  }

  createList = (event, index) => {
    return (
      <div key={index} className="signature">
        <h1 className="Performer">{event.performer}</h1>
        <h2 className="Date">{event.date}</h2>
        <a href={event.link} className="Link">Event Info</a>
      </div>
    )
  }

  render() {
    if(this.state.loading === true){
      return "Loading"
    }
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
