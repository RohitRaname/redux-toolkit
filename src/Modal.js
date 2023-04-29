import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { toggleModal } from "./features/modal/modalSlice";
import { clearCart } from "./features/cart/cartSlice";
import { useDispatch } from "react-redux";

const ModalComponent = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Modal show={true} keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>Remove All Items From your shopping cart</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(clearCart());
              dispatch(toggleModal());
            }}
          >
            Confirm
          </Button>
          <Button variant="danger" onClick={() => dispatch(toggleModal())}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
