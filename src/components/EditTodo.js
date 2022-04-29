import { useEffect, useState } from 'react'
import classnames from 'classnames';

const EditTodo = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [index, setIndex] = useState(0);

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        setName(props.todo.name);
        setEmail(props.todo.email);
        setIndex(props.todo.index);
    }, [])

    const closeEditPopup = () => {
        props.close()
    }

    const updateTodo = () => {
        if (name === '') {
            setNameError('Name is required');
        }
        if (email === '') {
            setEmailError('Email is required');
        }
        if (name !== '' && email !== '') {
            props.updateTodo(name, email, index);
            closeEditPopup();
        }
    }

    return (
        <div className="popup">
            <div className="background-overlay" onClick={closeEditPopup}></div>
            <div className="popup-inner col-md-4">
                <div className="card">
                    <div className="card-body">
                        <div className="clearfix">
                            <div className="float-start">
                                <h5 className="card-title">Edit todo</h5>
                            </div>
                            <div className="float-end">
                                <i className="fa fa-times" onClick={closeEditPopup} />
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
                        <div className='form-group mb-3'>
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
                        <div className='form-group'>
                            <button className="btn btn-primary w-100" onClick={updateTodo}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTodo