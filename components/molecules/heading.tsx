import { Heading } from "@chakra-ui/react";

interface Prop {
    title: string
}

const H1: React.VFC<Prop> = ({title}) => {
  return (
    <Heading color="#445273" borderBottom="2px" borderBottomColor="#445273">
      {title}
    </Heading>
  );
};

export default H1
