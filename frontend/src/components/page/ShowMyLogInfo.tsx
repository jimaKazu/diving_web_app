import { memo, VFC, useCallback, useEffect, useState } from "react";
import { Box, Table, Tr, Td, Tbody, Center, Heading, Divider, Flex, Image, Button, Text, useDisclosure } from "@chakra-ui/react";
import { Scrollbar } from "react-scrollbars-custom";
import { LogInfoModal } from "../molecules/LogInfoModal";
import { useLogInfo } from "../../hooks/useLogInfo";
import companyIcon from "../../image/summer-6877.gif";

export const ShowMyLogInfo: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { getLogInfo, getShowLogInfo, logInfoList, selectedLogInfo, deleteLogInfo } = useLogInfo();

  // ログ情報を取得する
  useEffect(() => {
    getLogInfo();
  }, [isOpen]);

  const onClickLogInfo = useCallback((log_id: number) => {
    setIsEditMode(true); // 編集モードではない
    getShowLogInfo({ log_id, logInfoList, onOpen });
  }, [logInfoList, getShowLogInfo, onOpen]);

  // 編集ボタンイベント
  const onEditClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, log_id: number) => {
    event.stopPropagation(); // 行クリックイベントを停止
    setIsEditMode(false); // 編集モードにする
    getShowLogInfo({ log_id, logInfoList, onOpen });
  }, [getShowLogInfo, logInfoList, onOpen]);

  // 削除ボタンイベント
  const onDeleteClick = useCallback((event: React.MouseEvent<HTMLButtonElement>, log_id: number, user_id: number) => {
    event.stopPropagation(); // 行クリックイベントを停止
    // 削除ボタンの処理をここに追加
    deleteLogInfo(log_id, user_id)
  }, [deleteLogInfo]);

  return (
    <>
      <Box w="100vw" h="90vh" backgroundImage={`url(${companyIcon})`} // 背景画像にGIFを設定
        backgroundSize="cover" // 背景画像がBox全体にフィットするように設定
        backgroundPosition="center" // 背景画像を中央に配置
        pt={10}
      >
        <Box
          m="auto"
          pt={10}
          w="4xl"
          // h={{ base: "md", sm: "sm", md: "xl", lg: "2xl", "2xl": "3xl" }}
          h="80vh"
          maxH="100%"
          borderWidth="1px"
          borderRadius="3xl"
          bg="white"
          shadow="md"
          display="flex"
          flexDirection="column"
        >
          <Center>
            <Box mb={10} w="70%">
              <Center>
                <Heading letterSpacing={5} mb={5} as="h1" color="orange.500">過去ログ情報一覧</Heading>
              </Center>
              <Divider m="auto" w="100%" borderColor="orange.200" />
            </Box>
          </Center>
          <Center>
            <Box w="80%">
              <Flex>
                <Text color="gray.500" w="20%" textAlign="center">ダイブ</Text>
                <Text color="gray.500" w="20%" textAlign="center">ダイビングスポット</Text>
                <Text color="gray.500" w="30%" textAlign="center">ダイビング日</Text>
              </Flex>
              <Box flex="1" overflow="auto">
                <Scrollbar style={{ width: '100%', height: 'calc(80vh - 250px)' }}>
                  <Table colorScheme="twitter">
                    <Tbody>
                      {logInfoList.map((logInfo) => (
                        <Tr
                          key={logInfo.log_id}
                          _hover={{ cursor: "pointer", opacity: 0.7 }}
                          onClick={() => onClickLogInfo(logInfo.log_id)}
                        >
                          <Td w="20%" textAlign="center" bg="orange.100" fontSize="xl" fontWeight="bold" color="red">{logInfo.num_of_dives}回目</Td>
                          <Td w="20%" textAlign="center" bg="gray.100" color="gray.500">{logInfo.dive_spots}</Td>
                          <Td w="30%" textAlign="center" bg="gray.100" color="gray.500">{logInfo.dive_date}</Td>
                          <Td w="15%" textAlign="center" bg="gray.100">
                            <Flex>
                              <Button
                                size="sm"
                                mr="3"
                                bg="orange.300"
                                colorScheme="orange"
                                onClick={(event) => onEditClick(event, logInfo.log_id)}
                              >
                                編集
                              </Button>
                              <Button
                                size="sm"
                                bg="orange.300"
                                colorScheme="orange"
                                onClick={(event) => onDeleteClick(event, logInfo.log_id, logInfo.user_id)}
                              >
                                削除
                              </Button>
                            </Flex>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Scrollbar>
              </Box>
            </Box>
          </Center>
        </Box>
      </Box>

      {/* モーダル */}
      <LogInfoModal
        isOpen={isOpen}
        onClose={onClose}
        selectedLogInfo={selectedLogInfo}
        isEditMode={isEditMode} // 編集モードのフラグを渡す
      />
    </>
  );
});
