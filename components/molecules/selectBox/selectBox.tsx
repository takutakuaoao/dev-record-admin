import { Select } from "@chakra-ui/react";
import { ReactElement } from "react";
import SelectItem from "../../atoms/selectItem";

interface Prop {
  children: ReactElement<typeof SelectItem>[];
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  currentValue?: string|number
}

const SelectBox: React.VFC<Prop> = ({ children, name, handleChange, currentValue }) => {
  return <Select focusBorderColor="#445273" name={name} onChange={handleChange} value={currentValue}>{children}</Select>;
};

export default SelectBox;
