import { Icon } from "@chakra-ui/react";
import { ImCancelCircle } from "react-icons/im";

const CancelIcon: React.VFC = () => {
  return (
    <Icon
      as={ImCancelCircle}
      fontSize="3xl"
      color="red.700"
    />
  );
};

export default CancelIcon;
