import React from "react";
import { Container, Row } from "reactstrap";
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li>
                  {//TODO: Colocar referencias del footer
                  }
                  <a href="" target="_blank">
                    JLV Technologies
                  </a>
                </li>
                <li>
                  <a href="" target="_blank">
                    GitHub REPO
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                  >
                    Licencia
                  </a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <div className="copyright">
                &copy; {1900 + new Date().getYear() + ' '}
                 by JLV Technologies
              </div>
            </div>
          </Row>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
