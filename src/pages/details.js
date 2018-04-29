import React from 'react';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import { Container, Row, Col } from 'react-grid-system';

import withAuthorization from '../helpers/withAuthorization';
import { authCondition } from '../helpers/helpers';

class CounterDetails extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  render() {
    const id = this.props.match.params.id

    return (
      <Container>
        <Row>
          <Col xs={12}>
            {id}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default compose(
  withAuthorization(authCondition)
)(withRouter(CounterDetails))