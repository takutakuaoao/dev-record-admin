import { Input as ChakraInput } from "@chakra-ui/react";

interface Props {
  placeholder: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.VFC<Props> = ({ placeholder, name, onChange }) => {
  return (
    <ChakraInput
      placeholder={placeholder}
      focusBorderColor="#445273"
      name={name}
      onChange={onChange}
    />
  );
};

export default Input;
