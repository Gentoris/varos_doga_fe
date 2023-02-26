import React from 'react';
import logo from './logo.svg';
import './App.css';


interface State {
  varosok : Varos[],
  varos_neve : string,
  lakossag_szama: number
}

interface Varos {
  id : number,
  varos : string,
  lakossag : number
}

interface varosResponse {
  varosok : Varos[]
}

class App extends React.Component<{}, State> {
  constructor(props : {}){
    super(props)
    this.state = {
      varosok : [],
      varos_neve : "",
      lakossag_szama : 0
    }
  }

  betoltes = async () => {
    let response = await fetch("http://localhost:3000/varos")
    let adat = await response.json() as varosResponse
    this.setState({
      varosok : adat.varosok
  })
}

  kuldes = async () => {
    let varos = {
      "varos" : this.state.varos_neve,
      "lakossag" : this.state.lakossag_szama
    }
    let response = await fetch("http://localhost:3000/varos", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(varos)
    })
    this.setState({
      varos_neve : "",
      lakossag_szama : 0
    })
    this.betoltes()
  }

  torles = async (id : number) => {
    await fetch('http://localhost:3000/varos/'+ id, {
      method : 'DELETE'
    })
    this.betoltes()
  }

  componentDidMount(): void {
    this.betoltes()
  }

  render() {
    return <div>
      <div>
        Város neve:
        <input type="text" value={this.state.varos_neve} onChange={event => this.setState({varos_neve : event.currentTarget.value})} />
        Város népessége:
        <input type="number" value={this.state.lakossag_szama} onChange={event => this.setState({lakossag_szama : parseInt(event.currentTarget.value)})} />
        <button onClick={this.kuldes}>Beküldés</button>
      </div>
      <ul>
        {this.state.varosok.map(varos => (
          <li>
            <p>{varos.id} 
            <p>Város neve: {varos.varos}</p>
            <p>Város lakossága: {varos.lakossag}</p>
            <p><button onClick={event => this.torles(varos.id)}>Törlés</button></p></p>
          </li>
        ))}
      </ul>
        
    </div>
  }
}

export default App;
