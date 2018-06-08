import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Accordion, AccordionItem, AccordionItemTitle, AccordionItemBody } from 'react-accessible-accordion';

import '../styles/accordion.css';

import CounterName from '../components/CounterName';
import CounterTime from '../components/CounterTime';
import CounterMessage from '../components/CounterMessage';
import CounterSet from '../components/CounterSet';

export default () =>
  <Grid>
    <Row middle="xs" top="sm" style={{minHeight: '100vh'}}>
      <Col xsOffset={1} xs={10} smOffset={3} sm={6} lgOffset={4} lg={4} style={{marginTop: 110}}>
        <Accordion style={{margin: '25px auto'}}>
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
              <h3>Message</h3>
              <div className="accordion__arrow" role="presentation"/>
            </AccordionItemTitle>
            <AccordionItemBody>
              <CounterMessage/>
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
    </Row>
  </Grid>;
