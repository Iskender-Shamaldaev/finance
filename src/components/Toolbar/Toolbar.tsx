import React from 'react';
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../app/hook";
import {transactionOpenModal} from "../../store/transactionsSlice";


const Toolbar = () => {
    const dispatch = useAppDispatch();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
            <div className="container">
                <NavLink className="nav-link navbar-brand" to="/">Finance</NavLink>
                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/categories">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <button
                                onClick={() => dispatch(transactionOpenModal())}
                                className="nav-link"
                            >
                                Add
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Toolbar;