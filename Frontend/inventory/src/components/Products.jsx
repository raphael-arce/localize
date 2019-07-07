import React, {Component} from 'react'
import {Alert, Badge, Button, Form, Image, Modal, Table} from "react-bootstrap";
import {Env} from "../constants/Env";


export default class Products extends Component {

    constructor(props){
        super(props);
        this.state = {
            products: [],
            showModal: false,
            showAlert: false,
            alertVariant: 'success',
            alertText: '',
            submitType: 'create',
            form: {
                imgUrl: '',
                productName: '',
                productId: '',
                price: '',
                quantity: '',
                description: '',
                keywords: ''
            }
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        this.getProducts((error, result) => {
            if(error)
                console.log(error)
            else
                this.setState({products: result})
        })
    }

    handleShow(product) {
        if(!product)
            this.setState({ showModal: true, submitType: 'post' })
        else {
            this.setState ({
                showModal:true,
                form: {
                    imgUrl: product.imgUrl,
                    productName: product.productName,
                    productId: product.productId,
                    price: product.price,
                    quantity: product.quantity,
                    description: product.description,
                    keywords: product.keywords
                },
                submitType: 'put'
            })
        }
    }

    handleClose() {
        this.setState({
            showModal: false,
            form: {
                imgUrl: '',
                productName: '',
                productId: '',
                price: '',
                quantity: '',
                description: '',
                keywords: ''
            }
        })
    }

    handleChange(e) {
        let state = this.state;
        state.form[e.target.name] = e.target.value
        this.setState(state)
    }

    handleDismiss() {
        this.setState({showAlert: false, alertVariant:'success', alertText: ''})
    }

    handleSubmit() {
        this.handleClose();
        if(this.state.submitType === 'post') {
            let body = this.state.form
            this.postProduct(body, (error) => {
                if(error) {
                    this.setState({showAlert: true, alertVariant: 'danger', alertText: 'failure'})
                    console.log(error)
                }
                else {
                    this.setState({showAlert: true, alertVariant: 'success', alertText: 'success'}, () => {
                        this.getProducts((error, result) => {
                            if(error)
                                console.log(error)
                            else
                                this.setState({products: result})
                        })
                    });
                }
            } )

        }
        else if(this.state.submitType === 'put') {
            let body = this.state.form
            this.putProduct(body, (error) => {
                if(error) {
                    this.setState({showAlert: true, alertVariant: 'danger', alertText: 'failure'})
                    console.log(error)
                }
                else {
                    this.setState({showAlert: true, alertVariant: 'success', alertText: 'success'}, () => {
                        this.getProducts((error, result) => {
                            if(error)
                                console.log(error)
                            else
                                this.setState({products: result})
                        })
                    });
                }
            })
        }

    }

    handleDelete() {
        this.handleClose();
        this.deleteProduct(this.state.form.productId, (error) => {
            if(error) {
                this.setState({showAlert: true, alertVariant: 'danger', alertText: 'failure'})
                console.log(error)
            }
            else {
                this.setState({showAlert: true, alertVariant: 'success', alertText: 'success'}, () => {
                    this.getProducts((error, result) => {
                        if(error)
                            console.log(error)
                        else
                            this.setState({products: result})
                    })
                });
            }
        })
    }

    getProducts(cb) {
        fetch(Env.API_URL + '/products', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "include"
        })
            .then(data => data.json())
            .then(response => {
                if(response.error)
                    cb(response.error)
                else if(response.message === 'success') {
                    cb(null, response.result);
                }
            })
            .catch(error => {
                console.log(error);
                cb(error);
            });
    }

    postProduct(body, cb) {
        fetch(Env.API_URL + '/products', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(body)
        })
            .then(data => data.json())
            .then(response => {
                if(response.error)
                    cb(response.error)
                else {
                    cb(null);
                }
            })
            .catch(error => {
                console.log(error);
                cb(error);
            });
    }

    putProduct(body, cb) {
        fetch(Env.API_URL + '/products/' + body.productId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(body)
        })
            .then(data => data.json())
            .then(response => {
                if(response.error)
                    cb(response.error)
                else {
                    cb(null);
                }
            })
            .catch(error => {
                console.log(error);
                cb(error);
            });
    }

    deleteProduct(productId, cb) {
        fetch(Env.API_URL + '/products/' + productId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "include"
        })
            .then(data => data.json())
            .then(response => {
                if(response.error)
                    cb(response.error)
                else {
                    cb(null);
                }
            })
            .catch(error => {
                console.log(error);
                cb(error);
            });
    }

    render() {
        return (
            <>
                <h3>
                    Products
                    <Button variant='secondary' className='ml-3' onClick={() => this.handleShow()}>Add</Button>
                </h3>
                <Alert variant={this.state.alertVariant} show={this.state.showAlert} dismissible onClose={this.handleDismiss}>
                    {this.state.alertText}
                </Alert>

                <Table striped bordered hover size="xs" responsive="xl">
                    <thead>
                    <tr>
                        <th key='headerImg' style={{width: '100px'}}>Image</th>
                        <th key='headerProductName' style={{width: '100px'}}>Product Name</th>
                        <th key='headerProductId' style={{width: '100px'}}>Product ID</th>
                        <th key='headerPrice' style={{width: '100px'}}>Price</th>
                        <th key='headerQuantity' style={{width: '100px'}}>Quantity</th>
                        <th key='headerDescription' style={{width: '100px'}}>Description</th>
                        <th key='headerKeywords' style={{width: '100px'}}>Keywords</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.products.map(product => {
                        return (
                            <tr key={product._id} onClick={() => this.handleShow(product)}>
                                <td key={product._id + 'img'}>
                                    <Image style={{height:'100px', width:'100px'}} src={product.imgUrl}/>
                                </td>
                                <td key={product._id + 'productName'}>{product.productName}</td>
                                <td key={product._id + 'productId'}>{product.productId}</td>
                                <td key={product._id + 'price'}>{product.price}</td>
                                <td key={product._id + 'quantity'}>{product.quantity}</td>
                                <td key={product._id + 'description'}>{product.description}</td>
                                <td key={product._id + 'keywords'}>{product.keywords.map(keyword => { return (
                                    <Badge className='ml-1' pill variant="info" key={product._id + keyword}>
                                        {keyword}
                                    </Badge>
                                ) })}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formProductName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control placeholder="Name" onChange={this.handleChange} name='productName' value={this.state.form.productName}/>
                            </Form.Group>
                            <Form.Group controlId="formProductId">
                                <Form.Label>Product ID</Form.Label>
                                <Form.Control placeholder="ID" onChange={this.handleChange} name='productId' value={this.state.form.productId} />
                            </Form.Group>
                            <Form.Group controlId="formPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control placeholder="Price" onChange={this.handleChange} name='price' value={this.state.form.price} />
                            </Form.Group>
                            <Form.Group controlId="formQuantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control placeholder="Quantity" onChange={this.handleChange} name='quantity' value={this.state.form.quantity} />
                            </Form.Group>
                            <Form.Group controlId="formImageUrl">
                                <Form.Label>Image</Form.Label>
                                <Form.Control placeholder="Enter url" onChange={this.handleChange} name='imgUrl' value={this.state.form.imgUrl} />
                            </Form.Group>
                            <Form.Group controlId="formProductDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows="3" onChange={this.handleChange} name='description' value={this.state.form.description} placeholder="Description"/>
                            </Form.Group>
                            <Form.Group controlId="formProductKeywords">
                                <Form.Label>Keywords</Form.Label>
                                <Form.Control as="textarea" rows="2" onChange={this.handleChange} name='keywords' value={this.state.form.keywords} placeholder="Keyword1,Keyword2,Keyword3..." />
                            </Form.Group>
                            {this.state.submitType === 'put' ? <Button variant='danger' onClick={() => this.handleDelete()}> Delete</Button> : null}
                            <Button variant='secondary' onClick={() => this.handleSubmit()} className='float-right'>Save</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }

}
