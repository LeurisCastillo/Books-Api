import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
	Table,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	FormGroup,
	ModalFooter,
	Container,
} from "reactstrap";
import Swal from "sweetalert2";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			isLoaded: false,
			form: {
				id: "",
				title: "",
				description: "",
				pageCount: "",
			},
			insertModal: false,
			editModal: false,
		};
	}

	handleChange = (e) => {
		this.setState({
			form: {
				...this.state.form,
				[e.target.name]: e.target.value,
			},
		});
	};

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

	showInsertModal = () => {
		this.setState({ insertModal: true });
	};

	hideInsertModal = () => {
		this.setState({ insertModal: false });
	};

	showEditModal = (data) => {
		this.setState({ editModal: true, form: data });
	};

	hideEditModal = () => {
		this.setState({ editModal: false });
	};

	insertBook = () => {
		var newData = { ...this.state.form };
		newData.id = this.state.items.length + 1;
		var list = this.state.items;
		list.push(newData);
		this.setState({ items: list, insertModal: false });
	};

	editBook = (data) => {
		var counter = 0;
		var list = this.state.items;
		list.map((item) => {
			if (data.id === item.id) {
				list[counter].title = data.title;
				list[counter].description = data.description;
				list[counter].pageCount = data.pageCount;
			}
			counter++;
		});
		this.setState({ items: list, editModal: false });
	};

	deleteBook = (data) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				var counter = 0;
				var list = this.state.items;
				list.map((item) => {
					if (item.id === data.id) {
						list.splice(counter, 1);
					}
					counter++;
				});
				this.setState({ items: list });

				Swal.fire("Deleted!", "The book has been deleted.", "success");
			}
		});
	};

	render() {
		var { isLoaded, items } = this.state;

		return (
			<>
				<Container>
					<br />
					<Button outline color="success" onClick={() => this.showInsertModal()}>
						Insert book
					</Button>
					<br />

					<Table>
						<thead>
							<tr>
								<th>Id</th>
								<th>Title</th>
								<th>Description</th>
								<th>Pages</th>
								<th>Opciones</th>
							</tr>
						</thead>
						<tbody>
							{items.map((item) => (
								<tr>
									<td>{item.id}</td>
									<td>{item.title}</td>
									<td>{item.description.substring(0, 20)}</td>
									<td>{item.pageCount}</td>
									<td>
										<Button outline color="primary" onClick={() => this.showEditModal(item)}>
											Edit
										</Button>
										{"   "}
										<Button outline color="danger" onClick={() => this.deleteBook(item)}>
											Delete
										</Button>
										{"   "}
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Container>

				<Modal isOpen={this.state.insertModal}>
					<ModalHeader>
						<div>
							<h3>Insert book</h3>
						</div>
					</ModalHeader>

					<ModalBody>
						<FormGroup>
							<label>Id:</label>

							<input
								className="form-control"
								readOnly
								type="text"
								value={this.state.items.length + 1}
							/>
						</FormGroup>

						<FormGroup>
							<label>Title:</label>
							<input
								className="form-control"
								name="title"
								type="text"
								onChange={this.handleChange}
								value={this.state.form.title}
							/>
						</FormGroup>

						<FormGroup>
							<label>Description:</label>
							<input
								className="form-control"
								name="description"
								type="text"
								onChange={this.handleChange}
								value={this.state.form.Description}
							/>
						</FormGroup>

						<FormGroup>
							<label>Pages:</label>
							<input
								className="form-control"
								name="pageCount"
								type="text"
								onChange={this.handleChange}
								value={this.state.form.pageCount}
							/>
						</FormGroup>
					</ModalBody>

					<ModalFooter>
						<Button outline color="success" onClick={() => this.insertBook()}>
							Insert
						</Button>
						<Button outline color="danger" onClick={() => this.hideInsertModal()}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>

				<Modal isOpen={this.state.editModal}>
					<ModalHeader>
						<div>
							<h3>Edit Book</h3>
						</div>
					</ModalHeader>

					<ModalBody>
						<FormGroup>
							<label>Id:</label>

							<input className="form-control" readOnly type="text" value={this.state.form.id} />
						</FormGroup>

						<FormGroup>
							<label>Title:</label>
							<input
								className="form-control"
								name="title"
								type="text"
								onChange={this.handleChange}
								value={this.state.form.title}
							/>
						</FormGroup>

						<FormGroup>
							<label>Description:</label>
							<input
								className="form-control"
								name="description"
								type="text"
								onChange={this.handleChange}
								value={this.state.form.description}
							/>
						</FormGroup>

						<FormGroup>
							<label>Pages:</label>
							<input
								className="form-control"
								name="pageCount"
								type="text"
								onChange={this.handleChange}
								value={this.state.form.pageCount}
							/>
						</FormGroup>
					</ModalBody>

					<ModalFooter>
						<Button outline color="primary" onClick={() => this.editBook(this.state.form)}>
							Edit
						</Button>
						<Button outline color="danger" onClick={() => this.hideEditModal()}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</>
		);
	}
}

export default App;
