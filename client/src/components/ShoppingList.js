import React, { Component } from "react";
import propTypes from 'prop-types';
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {connect} from 'react-redux';
import {getItems,deleteItem} from '../actions/itemActions';

class ShoppingList extends Component {

  componentDidMount(){
    this.props.getItems();
  }

    onDeleteClick=(id)=>{
      this.props.deleteItem(id);

    }
  render() {
    const { items } = this.props.item;
    return (
      <Container>
        
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name, amount }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this,_id)}
                  >
                    &times;
                  </Button>
                  Item: {name} , Amount: {amount}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}
ShoppingList.propTypes={
  getItems:propTypes.func.isRequired,
  deleteItem:propTypes.func.isRequired,
  item:propTypes.object.isRequired
}
const mapStateToProps=(state)=>({
  item:state.item
})
export default connect(mapStateToProps,{getItems,deleteItem})(ShoppingList);
