import React from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from './userProfile';

export const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="#">
            <img src="./images/logoEasyWork.jpg" alt="EasyWork" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="">
                  Profile pracodawców
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Moja kariera
                </Link>

                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <Link className="dropdown-item" to="#">
                    Kreator CV
                  </Link>
                  <Link className="dropdown-item" to="#">
                    Kalkulator wynagrodzeń
                  </Link>
                  <Link className="dropdown-item" to="#">
                    Zarobki
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <nav class="nav justify-content-">
            <a class="nav-link" href="login">Logowanie</a>
          </nav>
        </div>
      </nav>
    </header>
  );
}
