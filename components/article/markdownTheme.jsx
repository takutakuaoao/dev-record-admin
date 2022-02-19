import { Box } from "@chakra-ui/react";
import { UnorderedList } from '@chakra-ui/layout';
import Heading from "./heading";
import Paragraph from "./paragraph";

function getCoreProps(props) {
    return props['data-sourcepos']
        ? { 'data-sourcepos': props['data-sourcepos'] }
        : {};
}


const markdownTheme = {
    h2: props => {
        const { children } = props;
        return (
            <Heading text={children} />
        )
    },
    p: props => {
        const { children } = props;
        return (
            <Paragraph content={children} />
        )
    },
    ul: props => {
        const { ordered, children, depth } = props;
        const attrs = getCoreProps(props);
        let Element = UnorderedList;
        let styleType = 'disc';
        if (ordered) {
            Element = OrderedList;
            styleType = 'decimal';
        }
        if (depth === 1) styleType = 'circle';
        return (
            <Element
                spacing={2}
                as={ordered ? 'ol' : 'ul'}
                styleType={styleType}
                pl={4}
                mb={4}
                {...attrs}
            >
                {children}
            </Element>
        );
    },
};

export default markdownTheme
