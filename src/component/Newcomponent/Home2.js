import React from 'react';
import { Jumbotron } from '../foothead/Jumbotron';
import { Col } from 'react-bootstrap';
import { Layout } from '../foothead/Layout';

export const Home2 = () => (
  <div>
  <Jumbotron />
  <Layout>
  <div>
    <div className='row'>
      <Col sm={7}>
        <img
          className='img-fluid'
          src={'./asset/urs-middle.png'}
          alt='react-mid'
        />
      </Col>  
      <Col sm={5}>
        <h2>React Hunt </h2>
        <p>
          ReactJS is one of the best JavaScript libraries which is widely known
          for its adjustable and extensible nature. We make the best use of its
          exceptional feature of component reusability. Our experts attain
          outcomes by splitting the interface segments into the smaller
          components. This process of breaking down a web app into several
          independent components consumes lesser efforts and results in highly
          scalable and robust ReactJS application. Moreover, it has broadened
          its scope by creating awesome user interfaces and web applications.
          So, hire ReactJS developer from us and let your dreams of having great
          online presence come true.{' '}
        </p>
      </Col>
    </div>
    <div className='row'>
      
      <Col sm={5}>
        <h2>React Hunt </h2>
        <p>
          ReactJS is one of the best JavaScript libraries which is widely known
          for its adjustable and extensible nature. We make the best use of its
          exceptional feature of component reusability. Our experts attain
          outcomes by splitting the interface segments into the smaller
          components. This process of breaking down a web app into several
          independent components consumes lesser efforts and results in highly
          scalable and robust ReactJS application. Moreover, it has broadened
          its scope by creating awesome user interfaces and web applications.
          So, hire ReactJS developer from us and let your dreams of having great
          online presence come true.{' '}
        </p>
      </Col>
    </div>
  </div>
  </Layout>
  </div>
);
