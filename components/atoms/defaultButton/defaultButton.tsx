import { Button } from "@chakra-ui/react";

interface Props {
  text: string;
  onClick: (e: any) => void;
}

const DefaultButton: React.VFC<Props> = ({ text, onClick }) => {
  return (
    <Button colorScheme="gray" onClick={onClick}>
      {text}
    </Button>
  );
};

export default DefaultButton;
