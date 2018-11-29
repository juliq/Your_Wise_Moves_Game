import React, { Component } from "react";
import axios from "axios";

/* Import Components */

import Input from "../InfoPage/Input";
import Select from "../InfoPage/Select";
import Button from "../InfoPage/Button";
import swal from 'sweetalert';


class FacilitatorForm extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 'false' };

        this.state = {
            newFacilitator: {
                username: '',
                password: '',
                first_name: '',
                last_name: '',
                email: '',
                organization: '',
                phone_number: '',
                is_facilitator: '',
                is_admin: '',
            },

            is_facilitator_options: [
                { value: true, label: 'True' },
                { value: false, label: 'False' }
            ],

            is_admin_options: [
                { value: true, label: 'True' },
                { value: false, label: 'False' }
            ],

        };

        if (props.action === 'edit') {
            this.state.newFacilitator = props.facilitator  // this will pre-populate the newMember in the state with the data that we pass in through the member prop
        }       // the member prop is on the AdminPage

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDeleteFacilitator = this.handleDeleteFacilitator.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    /* This lifecycle hook gets executed when the component mounts */

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
            prevState => ({
                newFacilitator: {
                    ...prevState.newFacilitator,
                    [name]: value
                }
            }),
            () => console.log(this.state.newFacilitator)
        );
    }

    handleTextArea(e) {
        console.log("Inside handleTextArea");
        let value = e.target.value;
        this.setState(
            prevState => ({
                newFacilitator: {
                    ...prevState.newFacilitator,
                    about: value
                }
            }),
            () => console.log(this.state.newFacilitator)
        );
    }

    handleFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.newFacilitator);
        axios.post('/api/user/register', { ...this.state.newFacilitator }) // newFacilitator includes all the db fields
            .then((response) => {
                console.log('this is the response for add facilitator', response.status);
                if (response.status === 201) {
                    this.handleClearForm()
                    swal("Good job!", "Your facilitator was added to the database!", "success");
                }
            }).catch((error) => {
                console.log('error making get', error);
            });

    }

    handleClearForm() {
        this.setState({
            newFacilitator: {
                username: '',
                password: '',
                first_name: '',
                last_name: '',
                email: '',
                organization: '',
                phone_number: '',
                is_facilitator: '',
                is_admin: '',
            }
        });
    }

    // DON'T WANT TO ACTUALLY DELETE FACILITATOR -- JUST WOULD CHANGE is_facilitator TO FALSE
    handleDeleteFacilitator(e) {
        let fName = this.state.newFacilitator.first_name
        let lName = this.state.newFacilitator.last_name
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete('/api/user/register', { data: { first_name: fName, last_name: lName } })//in axios delete, in order to send a body, need to include body as the value of the data key
                        .then((response) => {
                            if (response.status === 200) {

                                swal("Your file has been deleted!", {
                                    icon: "success",
                                });
                            }
                            console.log('this is the response for the facilitator info', response);
                        }).catch((error) => {
                            console.log('error deleting facilitator', error);
                        });

                } else {
                    swal("Your file is safe!");
                }
            });
        e.preventDefault();
    }

    handleUpdate(e) {
        e.preventDefault();
        console.log({ ...this.state.newFacilitator, id: this.props.facilitator.id });
        axios.put('/api/user/register/', { ...this.state.newFacilitator, id: this.props.facilitator.id }) // newFacilitator includes all the db fields
            .then((response) => {
                console.log('this is the response for update facilitator', response.status);
                if (response.status === 200) {
                    swal("Your facilitator was updated in the database!", "success");
                }
            }).catch((error) => {
                console.log('error making update', error);
            });
    }


    render() {
        return (
            <div>
                <form className="container-fluid" style={{ height: "100%" }} onSubmit={this.handleFormSubmit}>
                    {/* Row 1 */}

                    <div className="row">
                        <div>Username:
                            <label>
                                <input
                                    type="text"
                                    name="username"
                                    value={this.state.newFacilitator.username}
                                    onChange={this.handleInput}
                                    placeholder="Username"
                                />
                            </label>
                        </div>
                        {this.props.action === 'add' && 
                        <div>Password:
                            <label>
                                <input
                                    type="text"
                                    name="password"
                                    value={this.state.newFacilitator.password}
                                    onChange={this.handleInput}
                                    placeholder="Password"
                                />
                            </label>
                        </div>
                        }
                    </div>

                    <div className="row">
                        <div>First Name:
                            <label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={this.state.newFacilitator.first_name}
                                    onChange={this.handleInput}
                                    placeholder="First Name"
                                />
                            </label>
                        </div>

                        <div>Last Name:
                            <label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={this.state.newFacilitator.last_name}
                                    onChange={this.handleInput}
                                    placeholder="Last Name"
                                />
                            </label>
                        </div>
                    </div>


                    {/* Row 2 */}
                    <div className="row">
                        <div>Email:
                            <label>
                                <input
                                    type="text"
                                    name="email"
                                    value={this.state.newFacilitator.email}
                                    onChange={this.handleInput}
                                    placeholder="Email"
                                />
                            </label>
                        </div>
                        <div>Organization:
                            <label>
                                <input
                                    type="text"
                                    name="organization"
                                    value={this.state.newFacilitator.organization}
                                    onChange={this.handleInput}
                                    placeholder="Organization"
                                />
                            </label>
                        </div>
                        <div>Phone Number:
                            <label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={this.state.newFacilitator.phone_number}
                                    onChange={this.handleInput}
                                    placeholder="Phone Number"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Row 4 */}
                    <div className="row">
                        <div>Facilitator?
                            <label>
                                <Select
                                    // title={"Facilitator"}
                                    name={"is_facilitator"}
                                    options={this.state.is_facilitator_options}
                                    value={this.state.newFacilitator.is_facilitator}
                                    placeholder={"True or False"}
                                    handleChange={this.handleInput}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Row 5 */}
                    <div className="row">
                        <div>Administrator?
                            <label>
                                <Select
                                    // title={"Administrator"}
                                    name={"is_admin"}
                                    options={this.state.is_admin_options}
                                    value={this.state.newFacilitator.is_admin}
                                    placeholder={"True or False"}
                                    handleChange={this.handleInput}
                                />
                            </label>
                        </div>
                    </div>


                    <Button
                        action={this.props.action === 'add' ? this.handleFormSubmit : this.handleUpdate} //if the action is add, the function called will be handleFormSubmit
                        type={"primary"}
                        title={this.props.action === 'add' ? "Submit" : "Update"} //if this.props.action = add, then show the submit button
                        style={buttonStyle}         //add is on the InfoPage -- if not add, it will be edit
                    />{" "}
                    {/*Submit */}
                    <Button
                        action={this.handleClearForm}
                        type={"secondary"}
                        title={"Clear"}
                        style={buttonStyle}
                    />{" "}
                    {/* Clear the form */}
                    {this.props.action === 'edit' ? //if this.props.action == 'edit', then the delete button will also show
                        <Button
                            action={this.handleDeleteFacilitator}
                            type={"secondary"}
                            title={"Delete"}
                            style={buttonStyle}
                        />      // if this.props.action is anything else, (add), then show null/nothing
                        : null}
                </form>
            </div>
        );
    }
}

const buttonStyle = {
    margin: "10px 10px 10px 10px"
};

export default FacilitatorForm;