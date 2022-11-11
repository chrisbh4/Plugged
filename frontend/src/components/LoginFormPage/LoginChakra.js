import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import * as sessionActions from "../../store/session";

import LoginFormModal from "../LoginFormModal";
import {
    Button,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    VStack,
    Select,
    Center,
    Box,
    Flex,
} from '@chakra-ui/react'



function LoginChakra() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleCredentials = (e) => setCredential(e.target.value)
    const handlePassword = (e) => {
      console.log(e.target.value)
      return setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Inside Handle Submit")

      const data = await dispatch(sessionActions.login({ credential, password }))

      console.log(data)

      if (data?.errors) {
        setErrors(data.errors)
        return
      }
      navigate('/home')
      return data
    };

    return (
      <>
        <Button onClick={onOpen}>Log In</Button>

<Modal isOpen={isOpen} onClose={onClose} size='3xl'>
    <ModalOverlay

        backdropFilter='auto'
        backdropInvert='80%'
        backdropBlur='2px'
    />
    <ModalContent>
        <ModalHeader
            bg={'black'}
            color='white'
        >
            <Center fontSize={'30px'}>
                SNKR MRKT
            </Center>
        </ModalHeader>
        <ModalCloseButton mt='3px' backgroundColor='white' _hover={{ bg: 'white' }} />
        <ModalBody>
            <Center pb='20px'>
                <Box borderBottom='4px' borderColor='gray.300' width={'35%'} _hover={{ borderColor: 'black' }}>
                    <Center fontSize={'md'} pb='13px' fontWeight='bold'  >
                            Log In
                         </Center>
                </Box>
                <Box borderBottom='4px' borderColor='gray.300' width={'35%'} _hover={{ borderColor: 'black' }}>
                    <Center fontSize={'md'} pb='13px' fontWeight='bold'>Log In </Center>
                </Box>
            </Center>



            <FormControl onSubmit={handleSubmit}>

                <VStack spacing={8} w='70%'
                    pos={'relative'}
                    left='15%'
                >
                    <Box color={'red.400'} fontSize='lg' fontWeight={'bold'}>
                        {errors.map((error, idx) => <Text key={idx}>{error}</Text>)}

                    </Box>

                   <Input
                placeholder='Enter Email'
                type="text"
                id="email"
                value={credential}
                onChange={handleCredentials}
                required
                size={'lg'}
              />

              <Input
                placeholder='Enter Password'
                type="password"
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                size={'lg'}
                 />


                    <Button
                        // className="signup-submit"
                        type="submit"
                        onClick={handleSubmit}
                        bg='black'
                        color={'white'}
                    >
                        Log In
                    </Button>
                </VStack>
            </FormControl>
        </ModalBody>

        <ModalFooter>
            <Button bg='black' color={'white'} mr={3} onClick={onClose}>
                Close
            </Button>
        </ModalFooter>
    </ModalContent>
</Modal>
      </>
    )
  }

  export default LoginChakra
