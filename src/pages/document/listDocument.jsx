import './style-document.css'
import {Link} from "react-router-dom"
import {Button, Card} from 'react-bootstrap';

const ListDocument = () => {
    return (
        <div className="container py-5">
            <div className="contenNav mb-5">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page">Pepres</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page">Notulen</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page">Nota Dinas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page">Undangan</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page">ST</Link>
                    </li>
                </ul>
                <input type="text" className="form-control" placeholder="Search"/>
            </div>
            
            <div className='row'>
                <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6'>
                    <Card
                        style={{
                            width: '100%'
                        }}>
                        <Card.Img variant="top" src="holder.js/100px180"/>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of the
                                card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6'>
                    <Card
                        style={{
                            width: '100%'
                        }}>
                        <Card.Img variant="top" src="holder.js/100px180"/>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of the
                                card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6'>
                    <Card
                        style={{
                            width: '100%'
                        }}>
                        <Card.Img variant="top" src="holder.js/100px180"/>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of the
                                card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6'>
                    <Card
                        style={{
                            width: '100%'
                        }}>
                        <Card.Img variant="top" src="holder.js/100px180"/>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of the
                                card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6'>
                    <Card
                        style={{
                            width: '100%'
                        }}>
                        <Card.Img variant="top" src="holder.js/100px180"/>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of the
                                card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6'>
                    <Card
                        style={{
                            width: '100%'
                        }}>
                        <Card.Img variant="top" src="holder.js/100px180"/>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the bulk of the
                                card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default ListDocument