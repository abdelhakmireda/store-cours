import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { CartContext } from "../../_context/CartContext";
import { useUser } from "@clerk/nextjs";
import OrderApis from "../../_utils/OrderApis"
import CartApis from "../../_utils/CartApis";
import Swal from 'sweetalert2'; // Importer SweetAlert

const CheckoutForm = ({ amount }) => {
    const {cart,setCart} = useContext(CartContext);
    const {user} = useUser();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState();
    const [errormassage, setErrorMessage] = useState();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        } 
        const handleError = (error) => {
            setLoading(false)
            setErrorMessage(error.message)
        }
        createOrder();
        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }
        const res = await fetch('api/create-intent', {
            method: 'POST',
            body: JSON.stringify({
                amount: amount
            })
        })
        const clientSecret = await res.json()
        const result = await stripe.confirmPayment({
            clientSecret,
                elements,
            confirmParams: {
                return_url: "http://localhost:3000",
            },
        });
        if (result.error) {
            console.log(result.error.message);
        }
    };
    const createOrder = ()=>{
        let productIds = [];
        cart.forEach(el=>{
            productIds.push(el?.product?.id)
        })

    const data = {
        data:{
            email:user.primaryEmailAddress.emailAddress,
            username:user.fullName,
            amount,
            products:productIds
        }
    }
        OrderApis.createOrder(data).then((res) =>{
            if(res){
                cart.forEach(el=>{
                    CartApis.deleteCartItem(el?.id).then(result =>{
                        Swal.fire({
                            icon: "success",
                            title: "Payment Successful",
                            showConfirmButton: false,
                            timer: 2000
                        })
                    })
                })
            }
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mx-32 md:mx-[320px] mt-12"><PaymentElement />
                <button className="bg-primary p-2 text-white rounded-md w-full mt-4">submit</button>
            </div>
        </form>
    )
}
export default CheckoutForm