import { Heading, Text } from "@chakra-ui/react";

export default function Title(props) {
    return (
        <>
            <Text bg="#445273" color="white" p="6" fontSize="2xl" fontWeight="bold">
                {props.text}
            </Text>
        </>
    )
}
