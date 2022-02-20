import { Alert, AlertIcon, Box, Button, Flex, Heading, Input } from "@chakra-ui/react"
import React from "react"
import CommonLayout from "../../components/templates/commonLayout"
import { useFormValue } from "../../hooks/useFormValue"
import { usePostSubmit } from "../../hooks/useSubmit"

const Store: React.VFC = () => {
    const { state, handleChange } = useFormValue({ "name": "", "slug": "" })
    const { submit, isComplete } = usePostSubmit(process.env.NEXT_PUBLIC_API_URL!, process.env.NEXT_PUBLIC_API_CATEGORY_STORE!, state)

    return (
        <CommonLayout>
            <Box mb='8'>
                <Heading color="#445273" borderBottom="2px" borderBottomColor="#445273">New Category</Heading>
            </Box>
            {isComplete ? <Box mb='6'><Alert status="success"><AlertIcon />登録しました。</Alert></Box> : <></>}
            <Box mb='6'>
                <Input placeholder='Category Name ...' focusBorderColor="#445273" onChange={handleChange} name="name" />
            </Box>
            <Box mb='6'>
                <Input placeholder='Category Slug ...' focusBorderColor="#445273" onChange={handleChange} name="slug" />
            </Box>
            <Flex mb="6" justify="flex-end">
                <Button bg="#445273" color="white" onClick={submit}>Create</Button>
            </Flex>
        </CommonLayout>
    )
}

export default Store
