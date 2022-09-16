import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
  Link
} from '@chakra-ui/react'



function SlideOutCart() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const shoppingCart = useSelector((state) => state.shoppingCart);
const cart = Object.values(shoppingCart);

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
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
          Open
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
            <h2 className="total-price">{totalPriceOfShoes > 0 ? `Plug Price : $${totalPriceOfShoes}` : emptyCart}</h2>
            </DrawerHeader>

            <DrawerBody>
            <div className="cart-container">
                {cart.map((item) => (
                    <>



<SimpleGrid columns={4} alignContent='center' alignItems={'center'} rows={1} gap={6}>
  <GridItem w='100%' h='auto' >
    <Image src={item.img} borderRadius='full' boxSize='150px' ></Image>
  </GridItem>

  <GridItem w='100%' textAlign={'center'} ><Link _hover={{textDecoration: "none"}}  href={`/shoes/${item.shoeId}`} >{item.title}</Link></GridItem>
  <GridItem w='100%' textAlign={'center'} >{item.price} </GridItem>
  <GridItem w='100%' textAlign={'center'} ><Button bg='red.300' fontSize='20px' fontWeight='bold' _hover={{ bg: "black", textColor: "red", border: "2px" }}>X</Button> </GridItem>

</SimpleGrid>
                    </>
                ))}
            </div>
            </DrawerBody>

            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

export default SlideOutCart ;
