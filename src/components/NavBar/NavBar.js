import React from 'react';
import { Link } from 'react-router-dom';
import Glyphicon from '@strongdm/glyphicon'
import { Button, Grid, Row, Col, Nav } from 'react-bootstrap';

const NavBar = (props) => {

    return (
        <div className="navBar">
            <span>
                <Nav className="navBar">
                    <Nav.Item>
                       { props.name && 
                         <Nav.Link className="navLink" href="/sheet">Bingo Sheet</Nav.Link> 
                       }
                    </Nav.Item>
                    { props.name && 
                        <Nav.Item>
                            <Nav.Link className="navLink" href="/key">Bingo Key</Nav.Link>
                    </Nav.Item>
                    }
                    <span className="glyphs">
                        <Nav.Item>
                            <Glyphicon glyph="user"> {props.name ? props.name : "anonymous"}</Glyphicon>
                            { props.name && 
                                <Button onClick={props.logout} title="log out"><Glyphicon glyph="log-out"></Glyphicon></Button>
                            }
                            { !props.name &&
                                <Button onClick={props.login} title="log in"><Glyphicon glyph="log-in"></Glyphicon></Button>
                            }
                        </Nav.Item>
                    </span>
                </Nav>
            </span>      
        </div>
    )
}

export default NavBar;