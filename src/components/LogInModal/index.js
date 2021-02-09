import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./styles.css"

export default function LogInModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Link
                onClick={handleShow}
                className="accoutNameLink"
            >
                <strong>{props.name}</strong>
            </Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Image
                        src={props.profileImage}
                        className="modalProfilImage"
                        roundedCircle
                    />
                    <Modal.Title className="modalTitle">
                        {props.name}
                        <br></br>
                        {props.email}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ margin: "0 auto" }}>
                    <Link to={`/profile/${props.accountName}`} onClick={handleClose}>
                        View Profile
                    </Link>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" style={{ width: "70%", margin: "0 auto" }} onClick={props.logOut}>
                        Sign Out
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
