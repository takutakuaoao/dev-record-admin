import { Box, Center, Flex, Text } from "@chakra-ui/react";

export default function Header() {
    return (
        <>
            <Center h="62px" bg="gray.800" w="100%">
                <Flex w="100%" maxW="750px" color="white">
                    <Text fontWeight="bold" fontSize="lg">WEB Record</Text>
                </Flex>
            </Center>
        </>
    )
}
