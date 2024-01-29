import React from 'react'
import Title from '../Title'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from "../../../common/CartItem"
import { nanoid } from '@reduxjs/toolkit'
import { removeItemFromCart } from '../../../../services/operations/course'
import { useNavigate } from 'react-router-dom'
export default function Cart() {
  const { cart } = useSelector(state => state.cart)
  const { token } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleRemoveFromCart = (id) => {
    dispatch(removeItemFromCart(id, token, navigate))
  }
  return (
    <>
      <div className=''>
        <Title>Cart</Title>
        <div className=''>
          {
            cart?.length > 0 ? cart?.map(cartItem => <CartItem key={nanoid()} cartItem={cartItem} handleRemoveFromCart={handleRemoveFromCart} />) : <div className='grid w-full h-full max-md:place-items-center'>
              <div className="text-2xl font-bold text-white">
                Cart is Empty
              </div>
            </div>
          }
        </div>
      </div>
    </>
  )
}
