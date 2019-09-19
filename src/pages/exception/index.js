import React from "react";
import { Link } from "react-router-dom";

export default class ExceptionPage extends React.Component {
  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    return (
      <div>
        <h2>404</h2>
        <ul>
          <li>
            <button onClick={this.goBack} type="button">back</button>
          </li>
          <li>
            <Link to="/">
              <button type="button">home page</button>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
