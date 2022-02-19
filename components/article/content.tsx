import { Box } from "@chakra-ui/react";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import React from "react";
import ReactMarkdown from 'react-markdown'
import markdownTheme from "./markdownTheme";
import Title from "./title";

interface Props {
    title: string;
    content: string;
}

const Content:React.VFC<Props> = ({title, content}) => {
    return (
        <>
            <Box w="100%" maxW="750px" minH="100vh" bg="white" boxShadow="lg">
                <Title text={title} />
                <Box p="6" className="markdownContent">
                    <ReactMarkdown components={ChakraUIRenderer(markdownTheme)} skipHtml>{content}</ReactMarkdown>
                </Box>
            </Box>
        </>
    )
}

export default Content
