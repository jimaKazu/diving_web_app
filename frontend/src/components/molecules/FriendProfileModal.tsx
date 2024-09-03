import { memo, VFC } from "react";
import {
    Box,
    Flex,
    Stack,
    Center,
    Divider,
    Heading,
    Image,
    Text,
    Badge,
    Button,
    Icon,
    Textarea,
    Table,
    Tbody,
    Tr,
    Td,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    Input,
    FormControl,
    FormLabel,
    NumberInputField,
    NumberIncrementStepper,
    NumberInputStepper,
    NumberInput,
    NumberDecrementStepper,
    Select,
    ModalFooter,
  } from "@chakra-ui/react";
  import { BsFillCaretDownFill, BsAwardFill } from "react-icons/bs";
  import { FcElectricalSensor, FcBusinessman, FcReadingEbook } from "react-icons/fc";
  import { AiOutlineSetting } from "react-icons/ai";
  import { Scrollbar } from "react-scrollbars-custom"; // Ensure this is installed and used correctly


import { User } from "../../types/api/user";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  friend:User;
};

export const FriendProfileModal: VFC<Props> = memo(({ isOpen, onClose,friend }) => {
  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white">
        <ModalBody pt={10}>
        <Stack spacing={5} h="full">
            <Center>
              <Flex>
                <Stack spacing={10} direction="row">
                  <Image
                    src={friend?.img}
                    fallbackSrc="https://via.placeholder.com/150"
                    alt="topPic"
                    borderRadius="full"
                    boxSize="170"
                    shadow="dark-lg"
                  />
                  <Box>
                    <Stack spacing={5}>
                      <Center>
                        <Flex>
                          <Heading
                            fontFamily="Franklin Gothic Medium"
                            textShadow="1px 1px"
                            color="gray.600"
                            letterSpacing={5}
                            fontSize="3xl"
                          >
                            {friend?.username}
                          </Heading>
                        </Flex>
                      </Center>
                      <Center>
                        <Flex>
                          <Stack direction="row">
                            <Badge fontSize="20" colorScheme="green">
                              <Icon mb={1.5} mr={1} as={FcElectricalSensor} w={5} h={5} />
                              {friend?.dive_cnt} dive
                            </Badge>
                            <Badge fontSize="20" colorScheme="red">
                              <Icon mb={1.5} mr={1} as={BsAwardFill} color="orange.300" w={5} h={5} />
                              {friend?.license}
                            </Badge>
                          </Stack>
                        </Flex>
                      </Center>
                      <Flex>
                        <Stack spacing={2} direction="row">
                          <Button letterSpacing={1} rightIcon={<BsFillCaretDownFill />} colorScheme="blue" variant="solid">
                            フォロー
                          </Button>
                          <Button letterSpacing={1} rightIcon={<BsFillCaretDownFill />} colorScheme="blue" variant="solid">
                            フォロワー
                          </Button>
                        </Stack>
                      </Flex>
                    </Stack>
                  </Box>
                </Stack>
              </Flex>
            </Center>
            <Center>
              <Divider m="auto" w="70%" borderColor="gray.300" />
            </Center>
            <Box flex="1" overflow="auto">
              <Scrollbar style={{ width: '100%', height: 'calc(90vh - 300px)' }}> {/* Adjust height as needed */}
                <Center>
                  <Box w="70%">
                    <Text letterSpacing={1} color="gray.500">
                      自己紹介
                    </Text>
                    <Textarea isDisabled placeholder="No profile" value={friend?.profile} />
                  </Box>
                </Center>
                <Center>
                  <Divider m="auto" w="70%" borderColor="gray.300" />
                </Center>
                <Center>
                  <Box w="70%" mt={5}>
                    <Text color="gray.500">プロフィール</Text>
                    <Table variant="" colorScheme="">
                      <Tbody>
                        <Tr borderBottom="1px solid" borderColor="gray.200">
                          <Td color="gray.500">
                            <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                            名前
                          </Td>
                          <Td color="gray.500">{friend?.fullname}</Td>
                        </Tr>
                        <Tr borderBottom="1px solid" borderColor="gray.200">
                          <Td color="gray.500">
                            <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                            年齢
                          </Td>
                          <Td color="gray.500">{friend?.old}</Td>
                        </Tr>
                        <Tr borderBottom="1px solid" borderColor="gray.200">
                          <Td color="gray.500">
                            <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                            居住地
                          </Td>
                          <Td color="gray.500">{friend?.fromAddress}</Td>
                        </Tr>
                        <Tr borderBottom="1px solid" borderColor="gray.200">
                          <Td color="gray.500">
                            <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                            ダイビング歴
                          </Td>
                          <Td color="gray.500">{friend?.diving_history}</Td>
                        </Tr>
                        <Tr borderBottom="1px solid" borderColor="gray.200">
                          <Td color="gray.500">
                            <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                            好きなダイビングスポット
                          </Td>
                          <Td color="gray.500">{friend?.like_diving_spots}</Td>
                        </Tr>
                        <Tr borderBottom="1px solid" borderColor="gray.200">
                          <Td color="gray.500">
                            <Icon pb={1} as={FcReadingEbook} w={8} h={8} />
                            好きな魚
                          </Td>
                          <Td color="gray.500">{friend?.like_fish}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Box>
                </Center>
              </Scrollbar>
              <Text>　</Text>
            </Box>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});