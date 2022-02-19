import { Box, Flex } from "@chakra-ui/react"
import Sidebar from "../sidebar"

const CommonLayout = (props) => {
    const {children} = props

    return (
        <Flex>
            <Box w='15%' h='100vh' bg="#445273" p='4' pos="sticky" top="0">
                <Sidebar />
            </Box>
            <Box p="12" w="100%">
                <Box w="75%">
                    {children}
                </Box>
            </Box>
        </Flex>
    )
}

export default CommonLayout
