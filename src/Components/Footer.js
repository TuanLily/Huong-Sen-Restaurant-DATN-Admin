import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container-fluid d-flex justify-content-between">
                <nav className="pull-left">
                    <ul className="nav">
                        <li className="nav-item">
                            Hương Sen Restaurant
                        </li>
                    </ul>
                </nav>
                <div className="copyright">
                    2024, bản quyền <i className="fa fa-heart heart text-danger"></i> thuộc về
                    <Link to="/dashboard"> DOM TEAM</Link>
                </div>
            </div>
        </footer>
    )
}
