import React from "react";

import { connect } from "react-redux";

// reactstrap components
import {
	Row,
	Col,
	Container,
	CardBody,
	Card,
	CardHeader,
	CardTitle,
	Button,
	Input,
	Collapse,
	InputGroupAddon,
	InputGroupText,
	UncontrolledTooltip,
	InputGroup,
} from "reactstrap";

import { userPicUrl } from "config";
import SocialButtons from "../../components/SocialButtons";
import { nameChangedHandler } from "helpers/input";
import Controller_Profile from "_controllers/Profile";
import OptionCountries from "./OptionCountries";

class AuthorData extends React.Component {
	constructor() {
		super();
		this.state = { editing: false };
		this.profile = new Controller_Profile();
	}

	toggleEditing = () => {
		this.setState({ editing: !this.state.editing });
	};

	handlePicPicker = (e) => {
		const file = e.target.files[0];
		this.profile.handle_pic_selected(file);
	};

	handleDataUpdate = (e) => {
		e.preventDefault();
		this.profile.updateUserData(e.target);
	};

	render() {
		let profile = this.props.profile;

		let pic_url;

		if (profile.pic_url) {
			pic_url = userPicUrl + profile.pic_url;
		} else {
			pic_url = require("assets/img/noPic.jpg");
		}

		return (
			<>
				<Card className="shadow mb-4">
					<CardBody>
						<Container>
							<Row>
								<Col xs="12" lg="4" className="order-lg-2 mx-auto d-flex">
									<img
										src={pic_url}
										style={{
											borderRadius: "50%",
											cursor: "pointer",
											width: 180,
											height: 180,
										}}
										className="m-auto"
										onClick={this.profile.handleClickPic}
										alt={profile.name}
									/>
								</Col>
								<Col xs="12" lg="8" className="order-lg-1">
									<h1 data-aos="fade-up" data-aos-delay="100">
										Hola !!!
									</h1>
									<p className="mb-4" data-aos="fade-up" data-aos-delay="200">
										{profile.description}
									</p>
									<p data-aos="fade-up" data-aos-delay="300">
										<SocialButtons data={profile} />
									</p>
								</Col>
							</Row>
						</Container>
					</CardBody>
					<Input
						className="form-control d-none"
						id="input-pic"
						type="file"
						accept="image/*"
						onChange={this.handlePicPicker}
					/>
				</Card>

				<Card className="shadow mb-4">
					<CardHeader>
						<CardTitle tag="h5" className="m-0">
							<i className="fa fa-user mr-3" />
							Datos del perfíl
							{this.props.userData ? (
								this.props.userData.user_name === profile.user_name ? (
									<Button
										className="m-0  py-2 px-3"
										onClick={this.toggleEditing}
									>
										<i className="fa fa-pencil-alt" /> editar
									</Button>
								) : null
							) : null}
						</CardTitle>
					</CardHeader>
					<CardBody>
						<form onSubmit={this.handleDataUpdate} id="form-user-data">
							<h5 className="heading-small text-muted mb-4">
								Información principal:
							</h5>

							<div className="form-group row showcase_row_area">
								<div className="col-md-4 text-right">
									<label className="h6" htmlFor="input10">
										Nombre de cuenta:
									</label>
								</div>
								<div className="col-md-8 showcase_content_area">
									{this.state.editing ? (
										<Input
											id="input10"
											value={"@" + profile.user_name}
											type="text"
											disabled
										/>
									) : (
										<p>@{profile.user_name}</p>
									)}
								</div>
							</div>

							<div className="form-group row showcase_row_area">
								<div className="col-md-4 text-right">
									<label className="h6" htmlFor="input20">
										Correo electrónico:
									</label>
								</div>
								<div className="col-md-8 showcase_content_area">
									{this.state.editing ? (
										<Input defaultValue={profile.email} type="email" disabled />
									) : (
										<p>{profile.email}</p>
									)}
								</div>
							</div>

							<div className="form-group row showcase_row_area">
								<div className="col-md-4 text-right">
									<label className="h6" htmlFor="input30">
										Nombre completo:
									</label>
								</div>
								<div className="col-md-8 showcase_content_area">
									{this.state.editing ? (
										<Input
											name="name"
											defaultValue={profile.name}
											placeholder="Mi nombre completo"
											type="text"
											onChange={nameChangedHandler}
											minLength="8"
											maxLength="60"
											required
										/>
									) : (
										<p>
											{profile.name && profile.name !== "" ? (
												<p>{profile.name}</p>
											) : (
												<p>no definido</p>
											)}
										</p>
									)}
								</div>
							</div>

							<hr className="my-4" />
							<h5 className="heading-small text-muted mb-4">Redes Sociales:</h5>

							<OptionCountries
								editing={this.state.editing}
								parent_reference={this}
								whatsapp_number={profile.whatsapp_number}
								area_code={profile.area_code}
							/>

							<div className="form-group row showcase_row_area">
								<div className="col-md-4 text-right">
									<label className="h6" htmlFor="input40">
										Enlace de Facebook:
									</label>
								</div>
								<div className="col-md-8 showcase_content_area">
									{this.state.editing ? (
										<InputGroup>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="fab fa-facebook-square" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												id="input40"
												name="link_facebook"
												defaultValue={profile.link_facebook}
												placeholder="Enlace de su perfil de facebook"
												type="text"
											/>
											<InputGroupAddon
												onClick={(e) => {
													window.open(
														document.getElementById("input40").value,
														"blank"
													);
												}}
												id={"tooltip475038074"}
												addonType="append"
												style={{ cursor: "pointer" }}
											>
												<InputGroupText>
													<i className="fa fa-external-link-alt" />
												</InputGroupText>
											</InputGroupAddon>
											<UncontrolledTooltip delay={0} target="tooltip475038074">
												Provar enlace
											</UncontrolledTooltip>
										</InputGroup>
									) : profile.link_facebook && profile.link_facebook !== "" ? (
										<a href={profile.link_facebook}>{profile.link_facebook}</a>
									) : (
										<p>no definido</p>
									)}
								</div>
							</div>

							<div className="form-group row showcase_row_area">
								<div className="col-md-4 text-right">
									<label className="h6" htmlFor="input50">
										Enlace de Twitter:
									</label>
								</div>
								<div className="col-md-8 showcase_content_area">
									{this.state.editing ? (
										<InputGroup>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="fab fa-twitter" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												id="input50"
												name="link_twitter"
												defaultValue={profile.link_twitter}
												placeholder="Enlace de su perfil de twitter"
												type="text"
											/>
											<InputGroupAddon
												onClick={(e) => {
													window.open(
														document.getElementById("input50").value,
														"blank"
													);
												}}
												id="tooltip475038073"
												addonType="append"
												style={{ cursor: "pointer" }}
											>
												<InputGroupText>
													<i className="fa fa-external-link-alt" />
												</InputGroupText>
											</InputGroupAddon>
											<UncontrolledTooltip delay={0} target="tooltip475038073">
												Provar enlace
											</UncontrolledTooltip>
										</InputGroup>
									) : profile.link_twitter && profile.link_twitter !== "" ? (
										<a href={profile.link_twitter}>{profile.link_twitter}</a>
									) : (
										<p>no definido</p>
									)}
								</div>
							</div>

							<div className="form-group row showcase_row_area">
								<div className="col-md-4 text-right">
									<label className="h6" htmlFor="input60">
										Enlace de Instagram:
									</label>
								</div>
								<div className="col-md-8 showcase_content_area">
									{this.state.editing ? (
										<InputGroup>
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="fab fa-instagram" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												id="input60"
												name="link_instagram"
												defaultValue={profile.link_instagram}
												placeholder="Enlace de su perfil de instagram"
												type="text"
											/>
											<InputGroupAddon
												onClick={(e) => {
													window.open(
														document.getElementById("input60").value,
														"blank"
													);
												}}
												id={"tooltip487838073"}
												addonType="append"
												style={{ cursor: "pointer" }}
											>
												<InputGroupText>
													<i className="fa fa-external-link-alt" />
												</InputGroupText>
											</InputGroupAddon>
											<UncontrolledTooltip delay={0} target="tooltip487838073">
												Provar enlace
											</UncontrolledTooltip>
										</InputGroup>
									) : profile.link_instagram &&
									  profile.link_instagram !== "" ? (
										<a href={profile.link_instagram}>
											{profile.link_instagram}
										</a>
									) : (
										<p>no definido</p>
									)}
								</div>
							</div>

							<Collapse isOpen={this.state.editing}>
								<hr className="my-4" />

								<h5 className="heading-small text-muted">Acerca de tí:</h5>

								<div className="form-group row showcase_row_area">
									<div className="col-md-4 text-right">
										<label className="h6" htmlFor="input20">
											Tu descripción:
										</label>
									</div>
									<div className="col-md-8 showcase_content_area">
										{this.state.editing ? (
											<Input
												className="mb-0"
												name="description"
												placeholder="Escribe algo acerca de tí..."
												rows="3"
												defaultValue={profile.description}
												type="textarea"
												maxLength="160"
											/>
										) : (
											<p>{profile.description}</p>
										)}
									</div>
								</div>

								<div className="text-center">
									<Button type="submit" className="my0" color="primary">
										Guardar cambios <i className="fa fa-save mr-2"></i>
									</Button>
								</div>
							</Collapse>
						</form>
					</CardBody>
				</Card>
			</>
		);
	}
}

const mapStateToProps = (state) => ({
	userData: state.userData,
});

export default connect(mapStateToProps)(AuthorData);
