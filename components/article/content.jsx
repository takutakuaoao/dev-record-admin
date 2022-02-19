import { Box } from "@chakra-ui/react";
import Title from "./title";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown'
import markdownTheme from "./markdownTheme";

export default function Content(props) {
    return (
        <>
            <Box w="100%" maxW="750px" minH="100vh" bg="white" boxShadow="lg">
                <Title text={props.title} />
                <Box p="6" className="markdownContent">
                    <ReactMarkdown components={ChakraUIRenderer(markdownTheme)} skipHtml>{props.content}</ReactMarkdown>
                </Box>
            </Box>
        </>
    )
}
