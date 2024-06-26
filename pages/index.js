'use client'

import { get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from './firebaseConfig';
import Head from 'next/head';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { onValue, query, limitToLast } from 'firebase/database';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const measurementsRef = ref(database, 'measurements');
    get(measurementsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dataAsArray = Object.entries(data).map(([id, value]) => ({ id, ...value }));
        const lastMeasurement = dataAsArray[dataAsArray.length - 1];
        setUsers([lastMeasurement]);
      } else {
        console.log('No data available');
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const [lastTenMeasurements, setLastTenMeasurements] = useState([]);

  useEffect(() => {
    const lastTenMeasurementsRef = ref(database, 'measurements');
    onValue(query(lastTenMeasurementsRef, limitToLast(100)), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const lastTenMeasurements = Object.keys(data).map((key, i) => ({
          id: key,
          ...data[key],
        }));
        setLastTenMeasurements(lastTenMeasurements);
      } else {
        console.log('No data available');
      }
    }, {
      onlyOnce: true,
    });
  }, []);
  return (
    <>
    <Head>
  <meta charSet="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
  />
  <title>Home - Brand</title>
  <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i,600,600i&display=swap"
  />
  <link rel="stylesheet" href="assets/fonts/simple-line-icons.min.css" />
  <link rel="stylesheet" href="assets/css/Footer-Clean-icons.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.11.1/baguetteBox.min.css"
  />
  <link rel="stylesheet" href="assets/css/vanilla-zoom.min.css" />
    </Head>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n    .clean-hero .text-center {\n        position: absolute;\n        top: 10%; /* Adjust this value to move the text up */\n        color: rgb(255, 255, 255);\n    }\n\n    .feature-box .icon {\n        font-size: 30px;\n        position: absolute;\n        left: 15px;\n        top: 15px;\n        width: 30px;\n        text-align: center;\n        color: #3b99e0;\n    }\n\n\n"
    }}
  />
  <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
    <div className="container">
      <a className="navbar-brand logo" href="#">
        <strong>Trash.Pi</strong>
      </a>
      <button
        data-bs-toggle="collapse"
        className="navbar-toggler"
        data-bs-target="#navcol-1"
      >
        <span className="visually-hidden">Toggle navigation</span>
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navcol-1">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link active" href="dashboard">
              Dashboard
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <main className="page landing-page" style={{ paddingTop: 100 }}>
    <section className="clean-block monitoring">
      <div className="text-center mb-5">
        <h1>Dashboard</h1>
      </div>
      <div className="container">
        {/* Row 1 */}
        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            {/* Your content for column 1, row 1 goes here */}
            <div className="card shadow border-start-primary py-2">
              <div className="card-body">
                <div className="row align-items-center no-gutters">
                  <div className="col me-2">
                    <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                      <span>Kapasitas Tempat Sampah 1</span>
                    </div>
                    {users.map((user) => (
                      <div key = {user.id} className="text-dark fw-bold h5 mb-0">
                        <span>{parseFloat(user.trash_can_1).toFixed(1)}% </span>
                      </div>
                    ))}
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {/* Your content for column 2, row 1 goes here */}
            <div className="card shadow border-start-primary py-2">
              <div className="card-body">
                <div className="row align-items-center no-gutters">
                  <div className="col me-2">
                    <div className="text-uppercase text-primary fw-bold text-xs mb-1">
                      <span>Kapasitas Tempat Sampah 2</span>
                    </div>
                    {users.map((user) => (
                      <div key = {user.id} className="text-dark fw-bold h5 mb-0">
                        <span>{parseFloat(user.trash_can_2).toFixed(1)}% </span>
                      </div>
                    ))}
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Row 2 */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            {/* Your content for column 1, row 2 goes here */}
            <div className="card shadow border-start-info py-2">
              <div className="card-body">
                <div className="row align-items-center no-gutters">
                  <div className="col me-2">
                    <div className="text-uppercase text-info fw-bold text-xs mb-1">
                      <span>Kapasitas Tersisa TS1:</span>
                    </div>
                    <div className="row g-0 align-items-center">
                      <div className="col-auto">
                      {users.map((user) => (
                        <div key = {user.id} className="text-dark fw-bold h5 mb-0 me-3">
                          <span>{(100 - user.trash_can_1).toFixed(1)}% </span>
                        </div>
                      ))}
                      </div>
                      <div className="col">
                        <div className="progress progress-sm">
                        {users.map((user) => {
                          const remainingCapacity1 = 100 - user.trash_can_1;
                          return (
                            <div
                              className="progress-bar bg-info"
                              aria-valuenow={remainingCapacity1}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: `${remainingCapacity1}%` }}
                            >
                              <span className="visually-hidden">{`${remainingCapacity1}%`}</span>
                            </div>
                          );
                        })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {/* Your content for column 2, row 2 goes here */}
            <div className="card shadow border-start-info py-2 mb-5">
              <div className="card-body">
                <div className="row align-items-center no-gutters">
                  <div className="col me-2">
                    <div className="text-uppercase text-info fw-bold text-xs mb-1">
                      <span>Kapasitas Tersisa TS2:</span>
                    </div>
                    <div className="row g-0 align-items-center">
                      <div className="col-auto">
                        {users.map((user) => (
                          <div key = {user.id} className="text-dark fw-bold h5 mb-0 me-3">
                            <span>{(100 - user.trash_can_2).toFixed(1)}% </span>
                          </div>
                        ))}
                      </div>
                      <div className="col">
                        <div className="progress progress-sm">
                        {users.map((user) => {
                          const remainingCapacity2 = 100 - user.trash_can_2;
                          return (
                            <div
                              className="progress-bar bg-info"
                              aria-valuenow={remainingCapacity2}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              style={{ width: `${remainingCapacity2}%` }}
                            >
                              <span className="visually-hidden">{`${remainingCapacity2}%`}</span>
                            </div>
                          );
                        })}
                        </div>
                      </div>                    
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <LineChart
            width={1000}
            height={400}
            data={lastTenMeasurements.map((measurement, i) => ({
              name: `Measurement ${i + 1}`,
              'Remaining Capacity TS1': 100 - measurement.trash_can_1,
              'Remaining Capacity TS2': 100 - measurement.trash_can_2,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Remaining Capacity TS1" stroke="#8884d8" />
            <Line type="monotone" dataKey="Remaining Capacity TS2" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </section>
    <section className="clean-block features">
      <div className="container">
        <div className="block-heading">
          <h2 className="text-info">Features</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-5 feature-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              fill="currentColor"
              className="bi bi-clock icon"
              viewBox="0 0 16 16"
            >
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
            </svg>
            <h4>Real-Time</h4>
            <p>
              Trash bin capacity can be monitored in real time with a realtime database
            </p>
          </div>
          <div className="col-md-5 feature-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              fill="currentColor"
              className="bi bi-graph-up icon"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"
              />
            </svg>
            <h4>Analytical</h4>
            <p>
              The results of monitoring can be used as analysis in regulating the period and implementation of waste management.
            </p>
          </div>
          <div className="col-md-5 feature-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={30}
              height={30}
              fill="currentColor"
              className="bi bi-bell icon"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
            </svg>
            <h4>Notifications</h4>
            <p>
              Can provide notifications when trash bin capacity reaches 100%
            </p>
          </div>
          <div className="col-md-5 feature-box">
            <i className="icon-refresh icon" />
            <h4>Responsive</h4>
            <p>
              Can provide responses to short distance users via LED and long distance users via notifications.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section className="clean-block about-us">
      <div className="container">
        <div className="block-heading">
          <h2 className="text-info">Our Team</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-6 col-lg-4">
            <div className="card text-center clean-card">
              <img
                className="card-img-top w-100 d-block"
                src="assets/img/avatars/ii.jpg"
              />
              <div className="card-body info">
                <h4 className="card-title">Rizki Maula</h4>
                <p className="card-text">3332210011</p>
                <div className="icons">
                  <a href="#">
                    <i className="icon-social-facebook" />
                  </a>
                  <a href="#">
                    <i className="icon-social-instagram" />
                  </a>
                  <a href="#">
                    <i className="icon-social-twitter" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="card text-center clean-card">
              <img
                className="card-img-top w-100 d-block"
                src="assets/img/avatars/yafi.jpg"
              />
              <div className="card-body info">
                <h4 className="card-title">Muhammad Yafi Agung</h4>
                <p className="card-text">3332210026</p>
                <div className="icons">
                  <a href="#">
                    <i className="icon-social-facebook" />
                  </a>
                  <a href="#">
                    <i className="icon-social-instagram" />
                  </a>
                  <a href="#">
                    <i className="icon-social-twitter" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-4">
            <div className="card text-center clean-card">
              <img
                className="card-img-top w-100 d-block"
                src="assets/img/avatars/homs.jpg"
              />
              <div className="card-body info">
                <h4 className="card-title">M. Homsi Awaludin</h4>
                <p className="card-text">3332210035</p>
                <div className="icons">
                  <a href="#">
                    <i className="icon-social-facebook" />
                  </a>
                  <a href="#">
                    <i className="icon-social-instagram" />
                  </a>
                  <a href="#">
                    <i className="icon-social-twitter" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.1/firebase-database.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
  <script src="assets/bootstrap/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.11.1/baguetteBox.min.js"></script>
  <script src="assets/js/vanilla-zoom.js"></script>
  <script src="assets/js/theme.js"></script>
  <script src="assets/js/chart.min.js"></script>
</>

  );
}
