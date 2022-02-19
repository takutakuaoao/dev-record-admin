import { Textarea } from "@chakra-ui/react";

interface Props {
  placeholder?: string;
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  currentValue?: string;
}

const TextArea: React.VFC<Props> = ({ placeholder, name, handleChange, currentValue }) => {
  return (
    <>
      <Textarea placeholder={placeholder} minH={"400px"} name={name} onChange={handleChange} value={currentValue} />
    </>
  );
};

export default TextArea;
