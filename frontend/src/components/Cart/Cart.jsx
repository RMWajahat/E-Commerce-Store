import { IoMdCloseCircleOutline, IoIosArrowRoundBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import "./Cart.css";
import { NavLink } from "react-router-dom";

const Cart = (props) => {
    const [total, setTotal] = useState(0);
    const [cartitems, setCartitems] = useState([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("cartItems"));
        if (storedProducts && Array.isArray(storedProducts)) {
            setCartitems(storedProducts);
        }
    }, []);

    useEffect(() => {
        // Update the local storage whenever cartitems change
        localStorage.setItem("cartItems", JSON.stringify(cartitems));

        // Update total when cartitems change
        const newTotal = cartitems.reduce((acc, product) => acc + product.price * product.qty, 0);
        setTotal(newTotal);
    }, [cartitems]);

    const removeFromCart = (productId) => {
        const updatedCart = cartitems.filter(product => product._id !== productId);
        setCartitems(updatedCart);
    };

    return (
        <div className="cartcontainer ">
            <div className="head">
                <h1>Your Cart <span>({cartitems?.length})</span></h1>
                <IoMdCloseCircleOutline style={{ cursor: "pointer", color: "black", fontSize: "2rem", padding: "5px" }} onClick={() => {
                    props.setShowCart(false);
                }} />
            </div>
            <div className="allcarts">
                {cartitems.length ? <>
                    <div>
                        {cartitems.map((product) => (
                            <div className="cartitem" key={product._id}>
                                <div className="left">
                                    <img alt={product.productImages[0].url} src={product.productImages[0].url} />
                                </div>
                                <div className="right">
                                    <div className="detail">
                                        <h1>{product.name}</h1>
                                        <small>{product.description}</small>
                                    </div>
                                    <div className="otherremove">
                                        <div className="pricing">
                                            <span className="newone">${product.price}</span>
                                        </div>
                                        <button className="remove" onClick={() => removeFromCart(product._id)}>
                                            Remove <MdDelete />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </> : <span className="isempty">Your Cart is Empty😢 <br /> <NavLink to={"products"} onClick={() => {
                    props.setShowCart(false);
                }} >Come Let's go to shop <IoIosArrowRoundBack className="goback" /></NavLink> </span>
                }
            </div>
            <div className="totalncheckout">
                <div className="totalpricing">
                    <h1>Total: </h1>
                    <small>${total}</small>
                </div>
                <NavLink to={"payment"} style={{ backgroundColor: "black", color: "aliceblue" }} onClick={() => {
                    props.setShowCart(false);
                }} className="checkoutpayment">Checkout</NavLink>
            </div>
        </div>
    );
}

export default Cart;