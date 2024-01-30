import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import {Title} from '../../../common/index'
import CartItem from "./CartItem"
import { removeItemFromCart } from '../../../../services/operations/course'
import { useNavigate } from 'react-router-dom'
import { getCartFullDetails } from '../../../../services/operations/course'

export default function Cart() {
  const { cart } = useSelector(state => state.cart)
  const { token } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleRemoveFromCart = (id) => {
    dispatch(removeItemFromCart(id, token, navigate))
  }
  useEffect(() => {
    let isCancelled = false
    const getCartDetails = () => {
      !isCancelled &&
        dispatch(getCartFullDetails(token, navigate))
    }
    return () => {
      isCancelled = true
      getCartDetails()
    }
  })
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
