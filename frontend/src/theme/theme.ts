import {extendTheme} from "@chakra-ui/react";

const theme = extendTheme({
    breakpoints: {
        base: "0em", // 0px
        sm: "30em",  // 480px
        md: "78em",  // 768px
        lg: "96em",  // 992px
        "2xl": "100em", // 1536px
      },
    styles:{
        global:{
            body:{
                backgroundColor:"orange.50",
                color: "gray.800"
            }
        }
    }
});

export default theme;