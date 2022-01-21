import React, { Component } from "react";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			isLoaded: false,
		};
	}

	componentDidMount() {
		fetch("https://localhost:44331/api/Books")
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					isLoaded: true,
					items: json,
				});
			});
	}

	render() {
		var { isLoaded, items } = this.state;

		if (!isLoaded) {
			return <div>Loading....</div>;
		} else {
			return (
				<div className="App">
					<h1>Data has been loaded</h1>
				</div>
			);
		}
	}
}

export default App;
