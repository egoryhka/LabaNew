import myRequest from "@/utils/request";
import { Select, SelectProps } from "antd";
import React from "react";

interface CustomSelectProps extends SelectProps{
  url: string
}

export default (props: CustomSelectProps) => {
  const [options, setOptions] = React.useState([]);
  React.useEffect(() => {
    myRequest(props.url).then(res => {
      //console.log(res);
      setOptions(res);
    });
  }, []);

  return <Select options={options} {...props}> </Select>;
};