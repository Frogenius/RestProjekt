import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.displayName = this.constructor.name;
        this.apiAddress = 'https://localhost:44321/api/foods';
        this.state = {
            items: [],
            newProductName: '',
            newPrzepis: '',
            editedProduct: {
                name: '',
                przepis: ''
            }
        };
        this.handleNewProductNameChange =
            this.handleNewProductNameChange.bind(this);
        this.handleNewPrzepisChange =
            this.handleNewPrzepisChange.bind(this);
        this.handleEditProductNameChange =
            this.handleEditProductNameChange.bind(this);
        
    }

    componentDidMount() {
        this.getProducts();
       
    }

    getProducts() {
        fetch(this.apiAddress)
            .then(res => res.json())
            .then(data => this.setState({ items: data }))
            .catch(err => console.log(err))
            
    }

    

    deleteProduct(id) {
        fetch(`${this.apiAddress}/${id}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    alert('Id not found');
                }
                this.getProducts();
            })
            .catch(err => console.log(err));
    }

    handleNewProductNameChange(event) {
        this.setState({ newProductName: event.target.value });
    }
    handleNewPrzepisChange(event) {
        //alert(event.target.value)
        this.setState({ newPrzepis: event.target.value });
    }

    handleEditProductNameChange(event) {
        this.setState({
            editedProduct: {
                ...this.state.editedProduct.name,
                name: event.target.value
            }
        });
    }
    handleEditPrzepisChange(event) {
        this.setState({
            editedProduct: {
                ...this.state.editedProduct.przepis,
                name: event.target.value
            }
        });
    }

    saveProduct(edit) {
        const fetchOptions = edit ?
            {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(this.state.editedProduct)
            } :
            {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(
                    { "InStock": false, "Name": this.state.newProductName, "Przepis": this.state.newPrzepis }
                )
            }

     /*   savePrzepis() {
            fetch('${this.apiAddress}/${id}', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ "przepis": this.state.newPrzepis })
            })
                .then(response => {
                    if (!response.ok) {
                        alert('Error! Couldnt add the item');
                    }
                    this.getProducts();
                })
                .catch(err => console.log(err))
        }*/

        const fetchAddress = edit ?
            (this.apiAddress+'/'+this.state.editedProduct.id) :
            this.apiAddress;
       

        fetch(fetchAddress, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    alert("Error! Couldn't add the item");
                }
                this.getProducts();
            })
            .catch(err => console.log(err));

        this.setState({ newProductName: '' });

      
        this.setState({ newPrzepis: '' });
    }
            

    editProduct(item) {
        const itemsChanged = this.state.items        
            .map(_item => ({
                ..._item, "edit": (item.edit ?
                    !item.edit && _item.id === item.id :
                    _item.id === item.id)
            }));
        this.setState({ items: itemsChanged });
        this.setState({
            editedProduct: itemsChanged.find(i => i.id === item.id)
        });
    }

    render() {

        const listItems = this.state.items
            .map((item, index) => (

                <div class="mb-2" key={index.toString()}>

                    
                    <div class="col col-form-label">


                        {item.id}. {item.name}. {item.przepis}
                    </div>
                    <div class="col col-form-label2">


                         {item.przepis}
                    </div>
                    <div class="ml-2">
                        
                        <button
                            class="btn btn-danger ml-2"
                            onClick={() => this.deleteProduct(item.id)}>
                            Delete
                        </button>
                        <button
                            class="btn btn-warning ml-2"
                            onClick={() => this.editProduct(item)}>
                            Edit
                        </button>
                        {item.edit && this.state.editedProduct.edit &&
                            <div class="form-inline mt-2">
                                <div class="form-group ml-2">
                                    <input
                                        class="form-control"
                                        value={this.state.editedProduct.name}
                                    onChange={this.handleEditProductNameChange}
                                    onChange={this.handleEditPrzepisChange}                                />
                                    <button
                                        class="btn btn-primary ml-2"
                                        onClick={() => this.saveProduct(true)}>
                                        EditSave
                                </button>
                                </div>
                            </div>

                        }
                    </div>
                </div>))
        return (
            <div>

                <div class="form-inline mb-2">
                    <div class="form-group">
                        <input
                            
                            placeholder="New product"
                            class="form-control"
                            value={this.state.newProductName}
                            onChange={this.handleNewProductNameChange} />
                        
                    <br/>
                        <input
                            
                            placeholder="New recept"
                            class="form-control1"
                            value={this.state.newPrzepis}
                            onChange={this.handleNewPrzepisChange} />
                        <button
                            class="btn btn-primary ml-2"
                            onClick={() => this.saveProduct()}>
                            SaveNew
                        </button>
                    </div>
                </div>
              
                
            </div>
        );
    }
}