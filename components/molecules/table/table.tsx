import {
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface Data {
    id: string;
    url: string;
    showData: string[];
}

interface Props {
  headList: string[];
  dataList: Data[];
}

const Table: React.VFC<Props> = ({ headList, dataList }) => {
  return (
    <ChakraTable variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          {headList.map((head, index) => {
            return <Th key={index}>{head}</Th>;
          })}
        </Tr>
      </Thead>
      <Tbody>
        {dataList.map((item) => {
          return (
            <Tr key={item.id}>
              {item.showData.map((aData, index) => {
                return (
                  <Td w="20%" key={index}>
                    <NextLink href={item.url} passHref>
                      <Link>{aData}</Link>
                    </NextLink>
                  </Td>
                );
              })}
            </Tr>
          );
        })}
      </Tbody>
    </ChakraTable>
  );
};

export default Table;
