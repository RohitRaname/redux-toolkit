import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import ModalComponent from "./Modal";

import { calculateTotals, getCartItems } from "./features/cart/cartSlice";

function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(getCartItems("rohit"));
  }, []);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  return (
    <>
      <main>
        {/* isOpen && <ModalComponent/> */}

        {isOpen && <ModalComponent />}
        <Navbar />
        <CartContainer />
      </main>
    </>
  );
}
export default App;
