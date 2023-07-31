import { listTopInvokeInterfaceInfoUsingGET } from '@/services/api-open-platform-backend/analysisController';
import { PageContainer } from '@ant-design/pro-components';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

/**
 * 接口分析
 */
const InterfaceAnalysis: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * 加载Top3接口信息
   */
  useEffect(() => {
    setLoading(true);
    listTopInvokeInterfaceInfoUsingGET().then((res) => {
      if (res.data) {
        setData(res.data);
      }
    });
    setLoading(false);
  }, []);

  const chartData = data.map((item) => {
    return {
      value: item.totalNum,
      name: item.name,
    };
  });

  const options = {
    title: {
      text: '接口调用次数 Top3',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <PageContainer>
      <ReactECharts
        loadingOption={{
          showLoading: loading,
        }}
        option={options}
      />
    </PageContainer>
  );
};

export default InterfaceAnalysis;
