interface Prop {
  name: string;
  value: string;
}

const SelectItem: React.VFC<Prop> = ({ name, value }) => {
  return (
    <option value={value}>
      {name}
    </option>
  );
};

export default SelectItem;
