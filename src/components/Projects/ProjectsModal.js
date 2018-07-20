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
    const { site_name, site_desc, site_template } = this.props.record;
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
          title="管理项目"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="项目名称"
              hasFeedback
            >
              {
                getFieldDecorator('site_name', {
                  initialValue: site_name,
                  rules: [{
                    required: true,
                    message: '请输入项目名称'
                  }]
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="项目描述"
              hasFeedback
            >
              {
                getFieldDecorator('site_desc', {
                  initialValue: site_desc,
                })(<Input />)
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="项目模板"
              hasFeedback
            >
              {getFieldDecorator('site_template', {
                initialValue: site_template,
                rules: [{
                  required: true,
                  message: '请选择项目模板'
                }]
              })(
                <Select placeholder="Please select a template">
                  <Option value={"1"}>标准</Option>
                  <Option value={"2"}>其他</Option>
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ProjectsModal);
