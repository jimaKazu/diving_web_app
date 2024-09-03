import {memo,VFC} from "react";
import {Box, Image, Center} from "@chakra-ui/react";
import companyIcon from "../../image/homeImage.jpg";

//コンポーネントの型定義はVFC
export const Home:VFC = memo(() => {

    return (
        <>
            <Box>
                <Image w="100vw" h="88vh" mt={4} src={companyIcon}  boxShadow="2xl" />
            </Box>
        </>
    )

});