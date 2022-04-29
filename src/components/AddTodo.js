import React from 'react'
import classnames from 'classnames';

const AddTodo = (props) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const [nameError, setNameError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');

    const closeAddPopup = () => {
        props.close()
    }

    const addTodo = () => {
        if (name === '') {
            setNameError('Name is required');
        }
        if (email === '') {
            setEmailError('Email is required');
        }
        if (name !== '' && email !== '') {
            props.addTodo(name, email);
            closeAddPopup();
        }
    }

    return (
        <div className="popup">
            <div className="background-overlay" onClick={closeAddPopup}></div>
            <div className="popup-inner col-md-4">
                <div className="card">
                    <div className="card-body">
                        <div className="clearfix">
                            <div className="float-start">
                                <h5 className="card-title">Add todo</h5>
                            </div>
                            <div className="float-end">
                                <i className="fa fa-times" onClick={closeAddPopup} />
                            </div>
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="text" 
                                className={classnames('form-control', {'is-invalid': nameError})}
                                placeholder="Enter name" 
                                name='name'
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                    setNameError('')
                                }}
                            />
                            {nameError && <span className="text-danger">{nameError}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <input 
                                type="text" 
                                className={classnames('form-control', {'is-invalid': emailError})} 
                                placeholder="Enter email" 
                                name='email'
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setEmailError('')
                                }}
                            />
                            {emailError && <span className="text-danger">{emailError}</span>}
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary w-100" onClick={addTodo}>Add</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddTodo