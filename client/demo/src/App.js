import React, {Component} from 'react';
import logo from "./logo.svg";
import "./App.css";
import axios from 'axios';

class App extends Component {

	state = {telegramUser: '', ethereumAddress: '', backendResponse: ''};
	
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeAddress = this.handleChangeAddress.bind(this);
		this.handleChangeUser = this.handleChangeUser.bind(this);
	}

	handleChangeUser(event){
		event.preventDefault();
		this.setState({
			telegramUser : event.target.value
		});
	}

	handleChangeAddress(event){
		event.preventDefault();
		this.setState({
			ethereumAddress : event.target.value
		});
	}

	handleSubmit(event){
		event.preventDefault();
		const url = "http://localhost:8080/post"
		const data = {
			telegramUser    : this.state.telegramUser,
			ethereumAddress : this.state.ethereumAddress
		};
		
		 axios.post(url,data)
		 .then(response => {
		 	console.log(response)
		 })
		 .catch(error => {
		 	console.log(error.response)
		 })
		 console.log(JSON.stringify(data))

		// this.setState({
		// 	submit : this.state.backendResponse
		// })
	}

	render(){
		return(
			<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo"
					alt="logo" />
				
				<p>A simple React app.....</p>

				<form onSubmit={this.handleSubmit}>
					<label>Telegram User: </label>
					<input type="text" value={this.state.telegramUser} onChange={this.handleChangeUser} />
					<br/>
					<label>Rinkeby Ethereum Addresss: </label>
					<input type="text" value={this.state.ethereumAddress} onChange={this.handleChangeAddress} />
					<br/><br/><input type="submit" value="SEND"/> 
				</form>
			</header>
			</div>
		);
	}
}

export default App;
