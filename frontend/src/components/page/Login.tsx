import { memo, VFC, useState, ChangeEvent, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Image,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
  Heading,
  Divider,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import companyIcon from "../../image/summer-6877.gif";
import { useLoginAuth } from "../../hooks/useLoginAuth";

export const Login: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setID] = useState('');
  const [pw, setPW] = useState('');
  const [show, setShow] = useState(false);
  const history = useHistory();
  const { login } = useLoginAuth();

  const onChangeID = (e: ChangeEvent<HTMLInputElement>) => setID(e.target.value);
  const onChangePW = (e: ChangeEvent<HTMLInputElement>) => setPW(e.target.value);
  const handleClick = () => setShow(!show);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const onClickLogin = useCallback(() => {
    login(id, pw, onClose);
  }, [id, pw, login, onClose]);

  const onClickAccountAdd = useCallback(() => {
    history.push("/accountAdd");
  }, [history]);

  return (
    <>
      <Image w="100vw" h="100vh" src={companyIcon} boxShadow="2xl" display="block" />
      <Modal isOpen={isOpen} autoFocus={false} motionPreset="slideInBottom" onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="rgba(255, 255, 255, 0.9)" h="80vh" shadow="dark-lg">
          <ModalBody mt="15vh" color="gray.700" mx={4}>
            <Stack spacing={5}>
              <Center><Heading color="orange.500" letterSpacing={5}>ログイン</Heading></Center>
              <Center><Divider w="70%" borderColor="orange.400" /></Center>
            </Stack>
            <Stack mt={5} spacing={5}>
              <FormControl>
                <FormLabel color="orange.600">ユーザネーム</FormLabel>
                <Input isInvalid errorBorderColor="orange.300" value={id} onChange={onChangeID} />
              </FormControl>
              <FormControl>
                <FormLabel color="orange.600">パスワード</FormLabel>
                <InputGroup>
                  <Input isInvalid type={show ? "text" : "password"} errorBorderColor="orange.300" value={pw} onChange={onChangePW} placeholder="password" />
                  <InputRightElement width="4.5rem" pr={1}>
                    <Button color="gray" size="sm" onClick={handleClick}>
                      {show ? "表示" : "非表示"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter mb="10">
            <Stack w="100%" spacing={5}>
              <Button w="100%" letterSpacing={5} colorScheme="orange" onClick={onClickAccountAdd}>アカウント登録はこちら</Button>
              <Button w="100%" letterSpacing={5} colorScheme="orange" onClick={onClickLogin}>ログイン</Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
