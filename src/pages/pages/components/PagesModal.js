

import { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class ProjectsModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { page_name, page_url, page_template, page } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal
          title="页面管理"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="页面名称"
              hasFeedback
            >
              {
                getFieldDecorator('page', {
                  initialValue: page,
                  rules: [{
                    required: true,
                    pattern: /^[a-zA-Z\$_][a-zA-Z\_]*$/,
                    message: '请填写项目名称'
                  }]
                })(<Input placeholder="请填写项目名称(英文)" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="页面别名"
              hasFeedback
            >
              {
                getFieldDecorator('page_name', {
                  initialValue: page_name,
                })(<Input placeholder="请填写项目别名(选填、中文)"/>)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="页面url"
              hasFeedback
            >
              {
                getFieldDecorator('page_url', {
                  initialValue: page_url,
                })(<Input placeholder="请填写项目url(选填)" />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="页面模板"
              hasFeedback
            >
              {
                getFieldDecorator('page_template', {
                  initialValue: page_template,
                  rules: [{
                    required: true,
                    message: '请选择页面模板'
                  }]
                })(
                  <Select placeholder="请选择页面模板">
                    <Option value="1">搜索页模板</Option>
                    <Option value="2">详情页模板</Option>
                    <Option value="3">其他</Option>
                  </Select>
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ProjectsModal);
