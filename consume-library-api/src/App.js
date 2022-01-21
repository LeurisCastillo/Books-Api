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
import axios from "axios";

const url = "https://localhost:44331/api/Books";

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
		fetch(url)
			.then((res) => res.json())
			.then((result) => {
				this.setState({
					isLoaded: true,
					items: result,
				});
			})
			.catch((error) => {
				Swal.fire({
					icon: "error",
					title: "Something went wrong!",
					text: "The data could not be loaded",
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

	insertBook = async () => {
		delete this.state.form.id;
		await axios
			.post(url, this.state.form)
			.then((res) => {
				var newData = { ...this.state.form };
				newData.id = this.state.items.length + 1;
				var list = this.state.items;
				list.push(newData);
				this.setState({ items: list, insertModal: false });

				this.hideInsertModal();
				Swal.fire("Success!", "The book has been added!", "success");
			})
			.catch((error) => {
				this.hideInsertModal();

				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Something went wrong!",
				});
			});
	};

	editBook = (data) => {
		var counter = 0;
		var list = this.state.items;
		list.map((item) => {
			if (data.id === item.id) {
				axios
					.put(`${url}/${this.state.form.id}`, this.state.form)
					.then((res) => {})
					.catch((error) => {
						this.setState({ editModal: false });

						Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Something went wrong!",
						});
					});

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
					if (data.id === item.id) {
						axios
							.delete(`${url}/${counter + 1}`)
							.then((res) => {})
							.catch((error) => {
								Swal.fire({
									icon: "error",
									title: "Oops...",
									text: "Something went wrong!",
								});
							});

						list.splice(counter, 1);
						Swal.fire("Deleted!", "The book has been deleted.", "success");
					}
					counter++;
				});
				this.setState({ items: list });
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
