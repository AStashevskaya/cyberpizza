const Router = require('express')
const Cart = require('../models/Cart')
const router = new Router()

router.post('/api/carts', createCart)
router.get('/api/carts', getCarts)
router.patch('/api/carts/:id', getCart)

async function createCart(req, res) {
  const cart = req.body

  const newCart = new Cart(cart)

  try {
    await newCart.save()

    console.log(newCart)

    res.status(201).json(newCart)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

async function getCarts(req, res) {
    try {
        const carts = await Cart.find()
    
        res.status(200).json(carts)
      } catch (error) {
        res.status(404).json({ message: error.message })
      }
  }

//   async function getCart(req, res) {
//     try {
//         // console.log(req)
//         const { cart_id } = req.account;

//         console.log(cart_id)

//         // const cartInfo = await fetchCart(cart_id);
    
//         // res.json(cartInfo);
//       } catch (error) {
//         res.status(404).json({ message: error.message })
//       }
//   } 
async function getCart(req, res) {
    const { id: _id } = reg.params;
    const products = req.body
    
    const updateCart = await Cart.findByIdAndUpdate(_id, products, { new: true })
    res.json(updatedCart)
    // try {
    //     // console.log(req)
    //     const { cart_id } = req.account;

    //     console.log(cart_id)

    //     // const cartInfo = await fetchCart(cart_id);
    
    //     // res.json(cartInfo);
    //   } catch (error) {
    //     res.status(404).json({ message: error.message })
    //   }
  }  


module.exports = router