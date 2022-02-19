import { Box, color, Text } from "@chakra-ui/react";

export default function Heading(props) {
    return (
        <>
            <Box borderBottomColor="#445273" borderBottomWidth="2px"  mb={4}>
                <Text fontSize="2xl" pb="2" fontWeight="bold">{props.text}</Text>
            </Box>
        </>
    )
}
