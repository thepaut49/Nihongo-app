import React from "react";

const styleAboutPage = {
  padding: "1em",
};

class AboutPage extends React.Component {
  render() {
    return (
      <div style={styleAboutPage}>
        <h2>About</h2>
        <p>
          This website is made by a web developer passionate about manga and
          Japanese animation who wanted to share his tool to help other people
          to read mangas in japanese.
        </p>
        <h3>Application architecture</h3>
        <p>This app is divided in 2 parts, a back-end and a front-end.</p>
        <h4>Back-end</h4>
        <p>
          The back-end uses Java 11 with the frameworks Spring Boot and
          hibernate.
        </p>
        <h5>List of dependencies :</h5>
        <ul>
          <li>maven-jar-plugin: 3.1.1</li>
          <li>spring-boot-starter-parent: 2.4.2</li>
          <li>spring-boot-starter-data-jpa</li>
          <li>spring-boot-starter-data-rest</li>
          <li>spring-boot-starter-web</li>
          <li>mysql-connector-java: runtime</li>
          <li>spring-boot-starter-test:test</li>
          <li>keycloak-spring-boot-starter: keycloak.version</li>
        </ul>
        <h4>Front-end</h4>
        <p>The front-end uses javascript and the framework React js.</p>
        <h5>List of dependencies :</h5>
        <ul>
          <li>bootstrap: 5.0.1</li>
          <li>immer: 9.0.2</li>
          <li>jwt-decode: 3.1.2</li>
          <li>keycloak-js: 13.0.0</li>
          <li>prop-types: 15.7.2</li>
          <li>flux: 4.0.1,</li>
          <li>react: 17.0.2,</li>
          <li>react-dom: 17.0.2</li>
          <li>react-redux: 7.2.4</li>
          <li>react-router-dom: 5.2.0</li>
          <li>react-toastify: 7.0.4</li>
          <li>reactjs-popup: 2.0.4</li>
          <li>redux: 4.1.0</li>
          <li>redux-thunk: 2.3.0</li>
          <li>reselect: 4.0.0</li>
          <li>web-vitals: 0.2.4</li>
        </ul>
      </div>
    );
  }
}

export default AboutPage;
