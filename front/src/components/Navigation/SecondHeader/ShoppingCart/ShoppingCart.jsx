import { useState, useEffect, useRef } from "react";
import {  useSelector } from "react-redux";
import { GiShoppingCart } from "react-icons/gi";


import "./ShoppingCart.css";
function ShoppingCart() {
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    // Keep from bubbling up to document and triggering closeMenu
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return undefined;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  



  return (
    <>
      <button className="shopping-cart-button" onClick={toggleMenu}>
<GiShoppingCart />
      </button>

      {showMenu && (
        <div className={"shopping-cart-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <div
                className="shop-title"
              >
                Shopping Cart
                </div>


            <div
            className="notif-example"
            >
                <div
                    className="cart-item"
                >
                    <p
                    className="cart-item-title"
                    >Example Item #1</p>

                    <div
                    className="remove-cart-item">
                    X
                    </div>
                </div>

                <p
                className="cart-price"
                >price: $10.99</p>

            </div>






            <div
            className="notif-example"
            >
                <div
                    className="cart-item"
                >
                <p
                className="cart-item-title"
                >Example Item #2</p>

                <div
                className="remove-cart-item">
                   X
                </div>
                </div>
                <p
                className="cart-price"
                >price: $10.99</p>
            </div>
            <div
            className="notif-example"
            >
                <div
                    className="cart-item"
                >
                <p
                className="cart-item-title"
                >Example Item #3</p>

                <div
                className="remove-cart-item">
                   X
                </div>
                </div>
                <p
                className="cart-price"
                >price: $10.99</p>
            </div>
            <div
            className="notif-example"
            >
                <div
                    className="cart-item"
                >
                <p
                className="cart-item-title"
                >Example Item #4</p>

                <div
                className="remove-cart-item">
                   X
                </div>
                </div>
                <p
                className="cart-price"
                >price: $10.99</p>
            </div>
            <div
            className="notif-example"
            >
                <div
                    className="cart-item"
                >
                <p
                className="cart-item-title"
                >Example Item #5</p>

                <div
                className="remove-cart-item">
                   X
                </div>
                </div>
                <p
                className="cart-price"
                >price: $10.99</p>
            </div>
            <div
            className="notif-example"
            >
                <div
                    className="cart-item"
                >
                <p
                className="cart-item-title"
                >Example Item #6</p>

                <div
                className="remove-cart-item">
                   X
                </div>
                </div>
                <p
                className="cart-price"
                >price: $10.99</p>
            </div>
            <div
            className="notif-example"
            >
                <div
                    className="cart-item"
                >
                <p
                className="cart-item-title"
                >Example Item #7</p>

                <div
                className="remove-cart-item">
                   X
                </div>
                </div>
                <p
                className="cart-price"
                >price: $10.99</p>
            </div>
            <div
            className="notif-example"
            >
                <div
                    className="cart-item"
                >
                <p
                className="cart-item-title"
                >Example Item #8 </p>

                <div
                className="remove-cart-item">
                   X
                </div>
                </div>
                <p
                className="cart-price"
                >price: $10.99</p>
            </div>
            <div
            className="notif-example"
            >
                <div
                    className="cart-item"
                >
                <p
                className="cart-item-title"
                >Example Item #9 Subscription</p>

                <div
                className="remove-cart-item">
                   X
                </div>
                </div>
                <p
                className="cart-price"
                >price: $10.99</p>
            </div>
            <button
            className="see-more-messages">Proceed To Checkout</button>


            </>
          ) : (
            <div className="shopping-cart-dropdown-items">
                <h1>please log in</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ShoppingCart;
