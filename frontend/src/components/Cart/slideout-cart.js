import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { purchaseFromCart } from "../../store/shoppingCart";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Image,
  Grid,
  GridItem,
  useDisclosure,
  SimpleGrid,
  Link,
  Box,
  Center
} from '@chakra-ui/react'



function SlideOutCart() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const shoppingCart = useSelector((state) => state.shoppingCart);
const cart = Object.values(shoppingCart);

const purchaseTheCart = async () => {
  await dispatch(purchaseFromCart())
  alert("Order has been Placed")
  navigate('/')
  return
}

let total = 0.00;
cart.forEach((item) => {
    total += parseFloat(item.price)
})


const totalPriceOfShoes = total.toFixed(2)
const feePrices = total * 0.01
const stateTax = 2
const pricePostTaxes = total + stateTax + feePrices

const emptyCart = <h1 className="empty-cart">Shoppping Cart is empty </h1>

    return (
      <>
        <Button ref={btnRef} colorScheme='black' onClick={onOpen} >
        <i className="fas fa-shopping-cart" style={{fontSize:"13px"}}></i>
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
          size='lg'

        >
          <DrawerOverlay />
          <DrawerContent  >
            <DrawerCloseButton    />
            <DrawerHeader >
            {/* <h2 className="total-price">{totalPriceOfShoes > 0 ? `Market Price : $${totalPriceOfShoes}` : emptyCart}</h2> */}
            </DrawerHeader>

            <DrawerBody>
            <div className="cart-container">
                {cart.map((item) => (
                    <>



<SimpleGrid columns={4} alignContent='center' alignItems={'center'} rows={1} gap={6}>
  <GridItem w='100%' h='auto' >
    <Image src={item.img} borderRadius='full' boxSize='150px' ></Image>
  </GridItem>

  <GridItem w='100%' pos='relative' left='10%' textAlign={'center'} ><Link _hover={{textDecoration: "none"}}  href={`/shoes/${item.shoeId}`} >{item.title}</Link></GridItem>
  <GridItem w='100%' textAlign={'center'} >{item.price} </GridItem>
  <GridItem w='100%' textAlign={'center'} ><Button bg='red.300' fontSize='20px' fontWeight='bold' _hover={{ bg: "black", textColor: "red", border: "2px" }}>X</Button> </GridItem>

</SimpleGrid>
                    </>
                ))}
                <Box>
                <h2 className="total-price">{totalPriceOfShoes > 0 ? `Market Price : $${totalPriceOfShoes}` : emptyCart}</h2>
                <h2 className="total-price">{totalPriceOfShoes > 0 ? `Site fee 1.5%  : ${feePrices.toFixed(2)}` : null}</h2>
                <h2 className="total-price">{totalPriceOfShoes > 0 ? `State Tax: ${stateTax.toFixed(2)}` : null}</h2>
                <h2 className="total-price">{totalPriceOfShoes > 0 ? `Total: ${pricePostTaxes.toFixed(2)}` : null}</h2>
                <Center>
                {totalPriceOfShoes > 0 ? <Button bg='red.300' mt='4%'> <Link href='/cart' > Checkout </Link></Button> : null}
                </Center>
                </Box>
            </div>
            </DrawerBody>

            <DrawerFooter>
              <Button variant='outline' mr={3} bg='red.300' onClick={onClose}>
                Close
              </Button>

            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

export default SlideOutCart ;
