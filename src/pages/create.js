import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';

import '../styles/accordion.css';

import CounterName from '../components/CounterName';
import CounterTime from '../components/CounterTime';
import CounterSet from '../components/CounterSet';

export default () =>
  <Container style={{height: '100vh'}}>
    <Row style={{height: '100vh'}}>
      <Col xs={1} sm={3} md={4}/>
      <Col xs={10} sm={6} md={4}>
        <Accordion style={{margin: "50% 0 0 0"}}>
          <AccordionItem>
            <AccordionItemTitle>
              <h3>Name</h3>
              <div className="accordion__arrow" role="presentation"/>
            </AccordionItemTitle>
            <AccordionItemBody>
              <CounterName/>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h3>Time</h3>
              <div className="accordion__arrow" role="presentation"/>
            </AccordionItemTitle>
            <AccordionItemBody>
              <CounterTime/>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h3>Overview</h3>
              <div className="accordion__arrow" role="presentation"/>
            </AccordionItemTitle>
            <AccordionItemBody>
              <CounterSet/>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </Col>
      <Col xs={1} sm={3} md={4}/>
    </Row>
  </Container>;
