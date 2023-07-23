import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';

export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => void;
  open: boolean;
};

// 新建接口
const CreateModal: React.FC<Props> = (props) => {
  const { open, columns, onCancel, onSubmit } = props;

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        key="create"
        type="form"
        columns={columns}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};

export default CreateModal;
