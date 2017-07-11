/// <reference path="../typings/index.d.ts" />
import Actions from './karma.store.actions.tsx'
import Component from './karma.component.tsx'
import { Router, Route, Link } from 'react-router'
import * as React from 'react'

interface IComponentProps extends React.Props<ProductView> {
  dispatch: any
  loggedInUser: any
  companyInfo: any
  createProduct: Function
  purchaseProduct: Function
}

interface IComponentState {
  name?: any
  description?: any
  price?: number
  quantity?: number
}

class ProductView extends Component<IComponentProps, IComponentState> {
  constructor() {
    super()
    this.state = { name: '', description: '', price: 0, quantity: 0 }
  }
  
  componentWillMount () {
  }

  _nameChanged(ev) {
    this.setState({ name: ev.currentTarget.value })
  }

  _descriptionChanged(ev) {
    this.setState({ description: ev.currentTarget.value })
  }

  _priceChanged(ev) {
    this.setState({ price: parseFloat(ev.currentTarget.value) })
  }

  _quantityChanged(ev) {
    this.setState({ quantity: parseInt(ev.currentTarget.value) })
  }
  
  _createProduct(member, ev) {
    if (confirm('Are you sure?')) {
      this.props.createProduct(this.state.name, this.state.description, this.state.price, this.state.quantity)
    }
  }
  
  _buyProduct(product) {
    if (confirm('Are you sure you want to buy ' + product.Name + ' for ' + product.Price + '₭?')) {
      this.props.purchaseProduct(product.ID, product.Price)
    }
  }
  
  render() {
    var products = this.props.companyInfo.products
    var karmaBalance = this.props.loggedInUser.Balance
    var loggedInUser = this.props.loggedInUser

    var createProductView = loggedInUser.Role == 'Administrator' ? (
        <div>
          <div className="form">
            <div className="columns six">
                <input type="text" placeholder="Product name..." value={this.state.name} onChange={this._nameChanged.bind(this)} />
            </div>
            <div className="columns three">
              <input type="text" placeholder="Product price..." value={this.state.price} onChange={this._priceChanged.bind(this)} />
            </div>
            <div className="columns three">
              <input type="text" placeholder="Product quantity..." value={this.state.quantity} onChange={this._quantityChanged.bind(this)} />
            </div>
          </div>
          <div className="form">
            <div className="columns twelve">
              <textarea type="text" placeholder="Product description..." value={this.state.description} onChange={this._descriptionChanged.bind(this)}></textarea>
            </div>
          </div>
          <div className="form">
            <div className="columns twelve">
              <button className="button-primary" onClick={this._createProduct.bind(this)}>Create</button>
            </div>
          </div>
        </div>) : ''

    return (
      <div className="product_view">
        <h5>Products</h5>
        {createProductView}
        { products.map((product) => {
          var disabled = karmaBalance < product.Price ? 'disabled' : ''
          return (
            <div key={product.ID} disabled={disabled}>
              {product.Name} <button disabled={disabled} onClick={this._buyProduct.bind(this, product)}>Buy for {product.Price}₭</button>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ProductView