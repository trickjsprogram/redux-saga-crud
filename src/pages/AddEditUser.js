import React, { useState, useEffect } from "react";
import { MDBValidation, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { createUserStart, updateUserStart } from "../redux/actions";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { users } = useSelector((state) => state.data);
  const { name, email, phone, address } = formValue;
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setEditMode(true);
      const singleUser = users.find((item) => item.id === Number(id));
      setFormValue({ ...singleUser });
    }
  }, [id]);

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && address) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success("User Added Successfully");
        setTimeout(() => history.push("/"), 500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        setEditMode(false);
        toast.success("User Updated Successfully");
        setTimeout(() => history.push("/"), 500);
      }
    }
  };
  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      {/* <form onSubmit={handleSubmit}> */}
      <p className="fs-2 fw-bold">
        {editMode ? "Update User Detail" : "Add User Detail"}
      </p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={name || ""}
          name="name"
          type="text"
          onChange={onChange}
          required
          label="Name"
          validation="Please provide a name."
          invalid
        />
        <br />
        <MDBInput
          value={email || ""}
          name="email"
          onChange={onChange}
          required
          label="Email"
          type="email"
          validation="Please provide an email."
          invalid
        />
        <br />
        <MDBInput
          value={phone || ""}
          name="phone"
          onChange={onChange}
          required
          label="Phone"
          type="number"
          validation="Please provide a phone no."
          invalid
        />
        <br />
        <MDBInput
          value={address || ""}
          name="address"
          type="text"
          onChange={onChange}
          required
          label="Address"
          validation="Please provide an address"
          invalid
        />
        <br />
        <div className="col-12">
          <MDBBtn style={{ marginRight: "10px" }} type="submit">
            {editMode ? "Update" : "Add"}
          </MDBBtn>
          <MDBBtn onClick={() => history.push("/")} color="danger">
            Go Back
          </MDBBtn>
        </div>
      </div>
      {/* </form> */}
    </MDBValidation>
  );
};

export default AddEditUser;
