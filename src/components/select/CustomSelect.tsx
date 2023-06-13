import myRequest from "@/utils/request";
import { Select, SelectProps, Spin } from "antd";
import React from "react";

interface CustomSelectProps extends SelectProps {
  url: string,
}

export default (props: CustomSelectProps) => {
  const [options, setOptions] = React.useState<{ value: number, label: string }[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    myRequest(props.url).then((res: { value: number, label: string }[]) => {
      setLoading(false);
      setOptions(res);
    });
  }, []);

  return <Spin spinning={loading}>
    <Select options={options} {...props} style={{ minWidth: '150px' }}></Select>
  </Spin>;
};