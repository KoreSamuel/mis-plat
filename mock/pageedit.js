export default {
  'get /api/pageedit': {
    code: 0,
    message: 'success',
    info: {
      page_name: '测试页面',
      page_config: {
        url: 'xxx/ssss',
        fields: {
          searchFields: [
            {
              key: 'name',
              label: '姓名',
              displayType: 'string'
            },
            {
              key: 'sex',
              label: '性别',
              displayType: 'checkbox',
              extra: [
                {
                  label: '男',
                  value: 1
                },
                {
                  label: '女',
                  value: 2
                }
              ]
            }
          ],
          showFields: [
            {
              key: 'name',
              label: '姓名',
              displayType: 'string'
            },
            {
              key: 'sex',
              label: '性别',
              displayType: 'checkbox',
              extra: [
                {
                  label: '男',
                  value: 1
                },
                {
                  label: '女',
                  value: 2
                }
              ]
            }
          ]
        }
      }
    }
  }
}
