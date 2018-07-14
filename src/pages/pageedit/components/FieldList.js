import React from 'react'
import { Card, Tag, Table } from 'antd';

function FieldList(props) {
  const { list } = props;
  const columns = [
    { title: 'label', dataIndex: 'label' },
    { title: 'value', dataIndex: 'value' }
  ];
  return (
    <>
      {
        Array.isArray(list) && list.length ? list.map((item, index) => {
          return (
            <div key={index} style={{ marginLeft: '25%' }
            }>
              <Tag color="blue">{item.label}</Tag>
              <Card bodyStyle={{ padding: 10 }} key={index} style={{ width: 350, marginBottom: 10, }}>
                <p>字段key: {item.key}</p>
                <p>字段显示类型: {item.displayType}</p>
                {Array.isArray(item.extra) && item.extra.length ?
                  <Table rowKey="label" style={{ marginTop: 10 }} dataSource={item.extra} bordered size="small" pagination={false} columns={columns}></Table>
                  : null
                }
              </Card>

            </div>
          )
        }) : null
      }
    </>
  )
};


export default FieldList;
