import myRequest from "@/utils/request";
import { WordCloud, WordCloudConfig } from "@ant-design/charts";
import { Access, useAccess } from "@umijs/max";
import { Spin } from "antd";
import React from "react";
import { history } from "@umijs/max";
import { useModel } from "@umijs/max";

interface ChartItem {
  name: string | null
  value: number | null
}

export default () => {
  const access = useAccess();
  const { initialState } = useModel('@@initialState');
  const { setSelectedDirectionText } = useModel('useSelectedDirectionModel');
  const [chartData, setChartData] = React.useState<ChartItem[]>([]);
  const [loadingChart, setLoadingChart] = React.useState(false);

  React.useEffect(() => {
    setLoadingChart(true);
    myRequest(`/Diplom/GetDiplomsDistribution`).then((res: any) => {
      setChartData(res);
      setLoadingChart(false);
    });
  }, []);

  const config: WordCloudConfig = {
    data: chartData,
    height: 400,
    wordField: 'name',
    weightField: 'value',
    colorField: 'name',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [20, 48],
      rotation: 0,
    },
    random: () => 0.5,
    interactions: [
      {
        type: 'element-active',
      },
    ],
    onEvent(chart, event) {
      if (event.type === 'plot:click') {
        const clickedText = event.data?.data.text;
        if (clickedText) {
          setSelectedDirectionText(clickedText);
          history.push('/diplom');
        }
      }
    },
  };

  return (
    <div style={{ textAlign: "center", fontSize: 30 }}>
      <Access accessible={access.isAuthorized}>WELCOME   {initialState?.user?.login}
        <Spin spinning={loadingChart}>
          <WordCloud {...config} />
        </Spin>
      </Access>
      <Access accessible={!access.isAuthorized}>PLEASE   REGISTER / LOGIN</Access>
    </div>
  );
}
