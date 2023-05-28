import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../AppContext";
import PasswordInput from "../../components/PasswordInput";
import TextInputWithValidation from '../../components/TextInputWithValidation'
import "./Login.css";
import SelectWithValidation from "../../components/SelectWithValidation";

const SignupPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const { loggedIn } = useContext(UserContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get("from");

    const doPasswordsMatch = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    useEffect(() => {
        const generateUsername = () => {
            if (firstName.trim() === "" && lastName.trim() === "") {
                setUsername("");
            } else {
                const generatedUsername = `${firstName}.${lastName}`;
                setUsername(generatedUsername);
            }
        };

        generateUsername();
    }, [firstName, lastName]);

    const handleSubmit = (e) => {
        e.preventDefault();


        if (doPasswordsMatch(password, confirmPassword)) {
            setPasswordError("");

            const user = {
                name: firstName + " " + lastName,
                username,
                email,
                password,
                role
            };

            // TODO: Send the user object to the backend and get the backend response
            console.log("User: ", user);
        } else {
            setPasswordError("Passwords do not match");
        }

    };

    return (
        <div className="page-container">
            {loggedIn && (
                <Navigate to={from ? ("/" + from) : "/"} replace={true} />
            )}
            <div className="page-card">
                <h2 className="page-title">Create Account</h2>
                <form className="page-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="text-input readonly"
                        required
                        value={username}
                        readOnly
                    />
                    <div className="input-group">
                        <TextInputWithValidation
                            placeholder="First Name"
                            required={true}
                            value={firstName}
                            regex={/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/}
                            regexErrorMsg="Invalid Character"
                            parentOnChange={setFirstName}
                        />
                        <TextInputWithValidation
                            placeholder="Last Name"
                            required={true}
                            value={lastName}
                            regex={/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/}
                            regexErrorMsg="Invalid Character"
                            parentOnChange={setLastName}
                        />
                    </div>
                    <TextInputWithValidation
                        placeholder="Email"
                        required={true}
                        value={email}
                        regex={/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/}
                        regexErrorMsg="Invalid Email"
                        parentOnChange={setEmail}
                    />
                    <PasswordInput
                        placeholder="Password"
                        showInfo={true}
                        onChange={setPassword}
                        passwordError={passwordError}
                        checkPattern={true}
                    />
                    <PasswordInput
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        passwordError={passwordError}
                        checkPattern={true}
                    />
                    <SelectWithValidation
                        placeholder="Select a Role"
                        required={true}
                        value={role}
                        parentOnChange={setRole}
                        options={[
                            { label: "Customer", value: "customer" },
                            { label: "Admin", value: "admin" }
                        ]}
                    />
                    <button type="submit" className="primary-button">
                        Sign Up
                    </button>
                </form>
                <Link className="switch" to="/login">
                    Already a member? Login
                </Link>
            </div>
        </div>
    );
};

export default SignupPage;