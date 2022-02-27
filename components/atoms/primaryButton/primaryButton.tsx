import { Button } from "@chakra-ui/react";

interface Props {
  onClick: (e: any) => void;
  text: string;
}

const PrimaryButton: React.VFC<Props> = ({ onClick, text }) => {
  return (
    <Button bg="#445273" color="white" onClick={onClick}>
      {text}
    </Button>
  );
};

export default PrimaryButton;
