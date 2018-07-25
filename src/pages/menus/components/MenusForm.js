import { Component } from 'react';
import { Form, Input, Button, Icon, Divider } from 'antd';

const FormItem = Form.Item;

class MenusForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  okHandler = (e) => {
    e.preventDefault();
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
      }
    });
  };
  addMenuItem() {
    this.props.handleAdd();
  }
  removeMenuItem(item) {
    this.props.handleRemove(item)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <Form onSubmit={this.okHandler} style={{ width: 700 }}>
          {this.props.data && this.props.data.length > 0 ?
            this.props.data.map((item, index) => {
              return <div key={index} style={{ position: 'relative', overflow: 'hidden' }}>
                <FormItem style={{ display: 'none' }}>
                  {
                    getFieldDecorator(`item[${index}].menu_id`, {
                      initialValue: item.menu_id,
                    })(<Input />)
                  }
                </FormItem>
                <FormItem style={{ width: 300, float: 'left' }} {...formItemLayout} label='菜单名称' hasFeedback>
                  {
                    getFieldDecorator(`item[${index}].menu`, {
                      initialValue: item.menu,
                      rules: [{
                        required: true,
                        pattern: /^[a-zA-Z\$_][a-zA-Z\_]*$/,
                        message: '请输入菜单名称'
                      }]
                    })(<Input style={{ width: 200 }} placeholder='请输入菜单名称(英文)' />)
                  }
                </FormItem>
                <FormItem style={{ width: 300, float: 'left' }} {...formItemLayout} label='菜单别名' hasFeedback>
                  {
                    getFieldDecorator(`item[${index}].menu_name`, {
                      initialValue: item.menu_name,
                      rules: [{
                        required: false
                      }]
                    })(<Input style={{ width: 200 }} placeholder='请输入菜单别名(中文)' />)
                  }
                </FormItem>
                <FormItem style={{ width: 300, float: 'left' }} {...formItemLayout} label='菜单URL' hasFeedback>
                  {
                    getFieldDecorator(`item[${index}].menu_url`, {
                      initialValue: item.menu_url
                    })(<Input style={{ width: 200 }} placeholder='请输入菜单URL（选填）' />)
                  }
                </FormItem>
                <p style={{ position: 'absolute', right: 28, bottom: 30, fontSize: 20, width: 50, textAlign: 'left' }}>
                  {1 !== this.props.data.length ? <Icon onClick={() => this.removeMenuItem(item)} style={{ cursor: 'pointer' }} type="minus-circle-o" /> : null}
                  {index === this.props.data.length - 1 ? <Icon onClick={() => this.addMenuItem()} style={{ cursor: 'pointer', marginLeft: 8 }} type="plus-circle-o" /> : null}
                </p>
                <Divider style={{ margin: '10px 0' }} />
              </div>
            }) :
            <Icon onClick={() => this.addMenuItem()} style={{ cursor: 'pointer', marginLeft: 8 }} type="plus-circle-o" />
          }
          <FormItem>
            <Button type="primary" htmlType="submit">确认保存</Button>
          </FormItem>
        </Form>
      </span>
    );
  }
}

export default Form.create()(MenusForm);
