import React from 'react';
import logo from './logo.svg';
import './App.css';


interface State {
  varosok : Varos[]
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
    }
  }

  betoltes = async () => {
    let response = await fetch("http://localhost:3000/varos")
    let adat = await response.json() as varosResponse
    this.setState({
      varosok : adat.varosok
  })
}
  componentDidMount(): void {
    this.betoltes()
  }

  render() {
    return <div>
      {}
    </div>
  }
}

export default App;
