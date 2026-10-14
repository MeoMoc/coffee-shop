import {Button} from "antd";

const CustomButton = ({children, className, ...rest}) => {
  return <Button {...rest}>{children}</Button>;
};

export default CustomButton;
