import { Component } from "react";
import axios from "axios";
import "./index.css"

class Home extends Component {
    state = {
        initialState: true,
        editedName: "",
        editedEmail: "",
        editedGender: "",
        editedStatus: "",
        userId: "",
        updatedData: "",
        usersList: []
    }

    componentDidMount () {
        this.renderUserDetails()
    }


    renderUserDetails = async () => {
        try {
            const response = await axios.get('https://gorest.co.in/public/v2/users');
            this.setState({
                editedGender: response.data[0].gender, 
                editedStatus: response.data[0].status,
                editedEmail: response.data[0].email,
                editedName: response.data[0].name,
                userId: response.data[0].id,
                usersList: response.data.slice(1)
            })
        } catch (error) {
            console.log(error)
        }
    }

    onClickEdtBtn = () => {
        this.setState(perv => ({initialState: !perv.initialState}))
    }

    onClickSaveBtn = () => {
        const {editedEmail, editedGender, editedName, editedStatus} = this.state
        const updatedData = {
            name: editedName,
            email: editedEmail,
            gender: editedGender,
            status: editedStatus
        }
        this.setState(perv => ({initialState: !perv.initialState, updatedData}), this.handleUpdate)
    }

    handleUpdate = () => {
        const {updatedData, userId} = this.state
        const config = {
            headers: {
                "Authorization": "Bearer cbda4f94df558662e666ca3a9f8ea689f2767e53731651d21b02db5f3c88b3cc"
            }
        }
        axios.put(`https://gorest.co.in/public/v2/users/${userId}`, updatedData, config)
        .then((response) => {
            console.log("Updated", response.data)
            this.setState((prev) => ({usersList: [response.data, ...prev.usersList] }))
        })
        .catch((error) => {
            console.error("Error handling Update", error)
        })
    }

    onClickExportBtn = () => {
        const {usersList} = this.state
        try {
            const csv = json2csv.parse(usersList)
            const blob = new Blob([csv], {type: "text/csv"})

            const link = document.createElement("a")
            link.herf = window.URL.createObjectURL(blob)
            link.download = "usersList.csv"
            link.click()
        } catch (error) {
            console.error("Error Exporting CSV", error)
        }
    }

    onChangeName = (event) => {
        this.setState({editedName: event.target.value})
    }

    onChangeEmail = (event) => {
        this.setState({editedEmail: event.target.value})
    }

    onChangeGender = (event) => {
        this.setState({editedGender: event.target.value})
    }

    onChangeStatus = (event) => {
        this.setState({editedStatus: event.target.value})
    }

    render(){
        const {initialState, editedEmail, editedName, editedGender, editedStatus, usersList} = this.state
        return(
            <>
                {
                    initialState ? (
                        <div className="main-container">
                            <div className="sub-container">
                                <h1 className="heading">User Details</h1>
                                <div className="form-container">
                                    <label className="label-heading1">Name</label>
                                    <p className="result">{editedName}</p>
                                    <label className="label-heading1">Email</label>
                                    <p className="result">{editedEmail}</p>
                                    <label className="label-heading1">Gender</label>
                                    <p className="result">{editedGender}</p>
                                    <label className="label-heading1">Status</label>
                                    <p className="result">{editedStatus}</p>
                                    <button onClick={this.onClickEdtBtn} className="button">Edit Details</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="main-container">
                            <div className="sub-container">
                                <h1 className="heading">Edit User Details</h1>
                                <div className="form-container">
                                    <label className="label-heading">Name</label>
                                    <input onChange={this.onChangeName} className="input" type="text" value={editedName} placeholder="Enter Name" />
                                    <label className="label-heading">Email</label>
                                    <input onChange={this.onChangeEmail}  className="input" type="text" value={editedEmail} placeholder="Enter Email" />
                                    <label className="label-heading">Gender</label>
                                    <div className="input-container">
                                        <input onChange={this.onChangeGender} value={"male"} checked={editedGender === "male"}  className="radio" type="radio" name="gender" />
                                        <label  className="radio-heading">Male</label>
                                        <input  onChange={this.onChangeGender} value={"female"} checked={editedGender === "female"}  className="radio" type="radio" name="gender" />
                                        <label  className="radio-heading">Female</label>
                                    </div>
                                    <label className="label-heading">Status</label>
                                    <div className="input-container">
                                        <input onChange={this.onChangeStatus} value={"active"} checked={editedStatus === "active"}  className="radio" type="radio" name="status" />
                                        <label className="radio-heading">Active</label>
                                        <input onChange={this.onChangeStatus} value={"inactive"} checked={editedStatus === "inactive"}  className="radio" type="radio" name="status" />
                                        <label className="radio-heading">Inactive</label>
                                    </div>
                                    <button onClick={this.onClickSaveBtn} className="button">Save Details</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        )
    }
}

export default Home