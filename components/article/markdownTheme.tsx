import { UnorderedList, OrderedList } from '@chakra-ui/layout';
import { Box } from "@chakra-ui/react";
import Heading from "./heading";
import Paragraph from "./paragraph";

function getCoreProps(props: any) {
    return props['data-sourcepos']
        ? { 'data-sourcepos': props['data-sourcepos'] }
        : {};
}


const markdownTheme = {
    h2: (props: any) => {
        const { children } = props;
        return (
            <Heading text={children} />
        )
    },
    p: (props: any) => {
        const { children } = props;
        return (
            <Paragraph content={children} />
        )
    },
    ul: (props: any) => {
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
