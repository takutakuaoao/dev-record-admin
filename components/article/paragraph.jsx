import { Box } from "@chakra-ui/react";

export default function Paragraph(props) {
    return (
        <>
            <Box mb="4">
                {props.content}
            </Box>
        </>
    )
}
