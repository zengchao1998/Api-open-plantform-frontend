import { listInterfaceInfoByPageUsingGET } from '@/services/api-open-platform-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { List, message, PaginationProps } from 'antd';
import React, { useEffect, useState } from 'react';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);

  /**
   * 加载数据
   */
  const loadData = async (current: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGET({
        current: current,
        pageSize: pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      message.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData(1, 10);
  }, []);

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <PageContainer title="在线接口平台">
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiLink = `/interface_info/${item.id}`;
          return (
            <List.Item
              actions={[
                <a key={item.id} href={apiLink}>
                  查看
                </a>,
              ]}
            >
              <List.Item.Meta
                title={<a href={apiLink}>{item.name}</a>}
                description={item.description}
              />
            </List.Item>
          );
        }}
        pagination={{
          pageSize: 10,
          total,
          itemRender,
          showTotal(total) {
            return 'Total items: ' + total;
          },
          onChange(page, pageSize) {
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
