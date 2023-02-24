
import { getCart } from "./utils.js";

const form = document.querySelector('form');

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const cart = getCart()
    const firstname = document.getElementById('firstName').value.trim();
    const lastname = document.getElementById('lastName').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const email = document.getElementById('email').value.trim();

    const firstnameError = document.getElementById('firstNameErrorMsg');
    const lastnameError = document.getElementById('lastNameErrorMsg');
    const addressError = document.getElementById('addressErrorMsg');
    const cityError = document.getElementById('cityErrorMsg');
    const emailError = document.getElementById('emailErrorMsg');

    let error = false;

    if (cart.length <= 0) {
        error = true
        alert('Pour commander vous devez séléctioner des articles !')
    }

    if (firstname === '') {
        firstnameError.innerHTML = 'Please enter your first name';
        error = true;
    } else {
        firstnameError.innerHTML = '';
    }

    if (lastname === '') {
        lastnameError.innerHTML = 'Please enter your last name';
        error = true;
    } else {
        lastnameError.innerHTML = '';
    }

    if (address === '') {
        addressError.innerHTML = 'Please enter your address';
        error = true;
    } else {
        addressError.innerHTML = '';
    }

    if (city === '') {
        cityError.innerHTML = 'Please enter your city';
        error = true;
    } else {
        cityError.innerHTML = '';
    }

    if (email === '') {
        emailError.innerHTML = 'Please enter your email';
        error = true;
    } else if (!validateEmail(email)) {
        emailError.innerHTML = 'Please enter a valid email';
        error = true;
    } else {
        emailError.innerHTML = '';
    }

    if (!error) {
        const body = {
            contact: {
                firstName: firstname,
                lastName: lastname,
                address,
                city,
                email
            },
            products: cart.map(item => {
                return item.id
            })
        }
        console.log(body, 'submit body');
        const response = await fetch("http://localhost:3000/api/products/order", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body) 

        });
        console.log("🚀 ~ file: form.js:91 ~ response", response)
        if(response.ok) {
            const res = await response.json();
            console.log("🚀 ~ file: form.js:85 ~ res", res)
            window.location.assign(`/front/html/confirmation.html?order_id=${res.orderId}`)
        } else {
            alert('une erreur est survenue réessayer plus tard !')
        }
    }
});

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
