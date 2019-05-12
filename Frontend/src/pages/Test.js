import React, {Component} from 'react'
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default class Test extends Component {


    render() {
        return <div style={{height: '100%', background: '#32dd44'}}>
            <Container className='d-flex flex-column' style={{height: '100%', background:'#943541'}}>
                <Row className='justify-content-end'>
                    hiiiii
                </Row>
                <Row className='justify-content-center'>
                    saaaasblabla
                </Row>
                <Row style={{flex:1, background: '#4d92d4'}}>
                    fffffffhiiiii
                </Row>
            </Container>
        </div>
    }

}
