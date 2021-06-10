import React, { Component } from 'react';

export class Przepisy extends Component {
    static displayName = Przepisy.name;

    constructor(props) {
        super(props);
        this.displayName = this.constructor.name;
        this.apiAddress = 'https://localhost:44321/api/foods';
        this.state = {
            items: [],
            newProductName: '',
            newPrzepis: '',
            editedProduct: {}
            
        };
        this.handleNewProductNameChange =
            this.handleNewProductNameChange.bind(this);
        this.handleNewPrzepisChange =
            this.handleNewPrzepisChange.bind(this);
        this.handleEditProductNameChange =
            this.handleEditProductNameChange.bind(this);
        this.handleEditPrzepisChange =
            this.handleEditPrzepisChange.bind(this);
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {
        fetch(this.apiAddress)
            .then(res => res.json())
            .then(data => this.setState({ items: data }))
            .catch(err => console.log(err))
          //  .catch (err => console.log(err));
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
        this.setState({ newPrzepis: event.target.value });
    }

    handleEditProductNameChange(event) {
        
        this.setState({
            editedProduct: {
                ...this.state.editedProduct,
                name: event.target.value
            }
        });
    }

    handleEditPrzepisChange(event) {
        

        this.setState({
            editedProduct: {
                ...this.state.editedProduct,
                przepis: event.target.value
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
                    { "inStock": false, "name": this.state.newProductName }
                )
            }

        //alert(fetchOptions.body);

        const fetchAddress = edit ?
            (this.apiAddress + '/' + this.state.editedProduct.id) :
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


                        {item.id}. {item.name}.<br/> {item.przepis}
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
                                />
                                <input
                                    class="form-control"
                                    value={this.state.editedProduct.przepis}
                                    onChange={this.handleEditPrzepisChange}
                                />
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

                <h2>Przepisy </h2>
             
                {listItems}
            </div>
        );

    }
}
