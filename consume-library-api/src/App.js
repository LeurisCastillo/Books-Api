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
			.then((result) => {
				this.setState({
					isLoaded: true,
					items: result,
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
					<ul>
						{items.map((item) => (
							<li key={item.id}>
								Title: {item.title} | Description:{" "}
								{item.description.substring(0, 20)} | Pages: {item.pageCount}
							</li>
						))}
					</ul>
				</div>
			);
		}
	}
}

export default App;
