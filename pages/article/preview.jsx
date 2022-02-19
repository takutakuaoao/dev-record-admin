import { Box, Center } from "@chakra-ui/react";
import Content from "../../components/article/content";
import Header from "../../components/article/header";

// export default function Preview(req, res) {
export default Preview = function Preview() {
    // res.setPreviewData({})
    // res.end('Preview mode enabled')
    const content = [
        "## 東京リージョンと大阪リージョンで提供されているサービスの差分を知りたい\n",
        "こんにちは、のんピ(@non____97)です。\n",
        "皆さんは**東京リージョン**と**大阪リージョン**で提供されているサービスの差分を知りたいと思ったことはありますか? 私はあります。\n",
        "- test\n",
        "- test\n",
        "```php\n",
        "function test() {\n",
        "$test = 'test'; \n",
        "} \n",
    ].join("")

    return (
        <>
            <Box bg="gray.100" minH="100vh">
                <Header />
                <Center py="8">
                    <Content content={content} title="【React Hooks】useEffectの基本的な動きを理解して使いこなそう" />
                </Center>
            </Box>
        </>
    )
}
