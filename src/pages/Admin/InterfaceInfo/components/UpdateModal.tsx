import { ProColumns, ProTable } from '@ant-design/pro-components';
import { ProFormInstance } from '@ant-design/pro-form/lib';
import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';

export type Props = {
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => void;
  open: boolean;
};

// 更新接口
const UpdateModal: React.FC<Props> = (props) => {
  const { open, columns, onCancel, onSubmit, values } = props;
  const formRef = useRef<ProFormInstance>();
  // 动态检测values的值变化
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values);
    }
  }, [values]);

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        key="update"
        type="form"
        columns={columns}
        formRef={formRef}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};

export default UpdateModal;
