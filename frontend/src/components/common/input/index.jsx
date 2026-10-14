import {Input} from "antd";

export default function CustomInput({
  prefixIcon,
  suffixIcon,
  className = "",
  ...props
}) {
  return (
    <Input
      {...props}
      className={className}
      prefix={prefixIcon}
      suffix={suffixIcon}
    />
  );
}
