import { Component } from 'react';
import { Form, Input, Select, Button, Radio, Icon } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class DetailFields extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayType: '',
      sk: [0],
    };
  }

  okHandler = (e) => {
    e.preventDefault();
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.extra) {
          values.extra = values.extra.filter(k => k); // 去除空元素
        }
        onOk(values);
        this.props.form.resetFields();
        this.setState({
          displayType: '',
          sk: [0]
        })
      }
    });
  };

  handleDisplayTypeChange(value) {
    this.setState({ displayType: value })
  }
  addSearchOption() {
    this.setState(prevState => ({
      // 为保证每个option唯一，每次增加取数组最后一位加1
      sk: [...prevState.sk, prevState.sk[prevState.sk.length - 1] + 1]
    }))
  }
  removeSearchOption(index) {
    this.setState(prevState => ({
      // 会出现数组不连续情况，需要在提交的时候去除空元素
      sk: prevState.sk.filter(k => k !== index)
    }))
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <Form onSubmit={this.okHandler}>
          <p>详情页区域</p>
          <FormItem {...formItemLayout} label='字段名称' hasFeedback>
            {
              getFieldDecorator('label', {
                rules: [{
                  required: true,
                  message: '请输入字段名称'
                }]
              })(<Input placeholder='请输入字段名称' />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='字段KEY' hasFeedback>
            {
              getFieldDecorator('key', {
                rules: [{
                  required: true,
                  message: '请输入字段KEY'
                }]
              })(<Input placeholder='请输入字段KEY' />)
            }
          </FormItem>
          <FormItem {...formItemLayout} label='字段显示类型' hasFeedback>
            {
              getFieldDecorator('displayType', {
                rules: [{
                  required: true,
                  message: '请选择字段显示类型'
                }]
              })(
                <Select placeholder='请选择字段显示类型' onChange={(value) => this.handleDisplayTypeChange(value)}>
                  <Option value="input">input</Option>
                  <Option value="checkbox">checkbox</Option>
                  <Option value="select">select</Option>
                  <Option value="datepicker">datepicker</Option>
                  <Option value="textarea">textarea</Option>
                </Select>
              )
            }
          </FormItem>
          {/* select */}
          {this.state.displayType === 'select' ?
            <>
              <FormItem style={{ display: this.state.displayType === 'select' ? 'block' : 'none' }} {...formItemLayout} label='select默认值' hasFeedback>
                {
                  getFieldDecorator('default', {
                    rules: [{
                      required: true,
                      message: '请输入select默认值'
                    }]
                  })(<Input placeholder='请输入select默认值' />)
                }
              </FormItem>
              {
                this.state.sk.map((item, index) => {
                  return <div key={index} style={{ position: 'relative' }}>
                    <FormItem {...formItemLayout} label='option label' hasFeedback>
                      {
                        getFieldDecorator(`extra[${item}].label`, {
                          rules: [{
                            required: true,
                            message: '请输入option label'
                          }]
                        })(<Input placeholder='请输入option label' />)
                      }
                    </FormItem>
                    <FormItem {...formItemLayout} label='option value' hasFeedback>
                      {
                        getFieldDecorator(`extra[${item}].value`, {
                          rules: [{
                            required: true,
                            message: '请输入option value'
                          }]
                        })(<Input placeholder='请输入option value' />)
                      }
                    </FormItem>
                    <p style={{ position: 'absolute', right: 28, bottom: 30, fontSize: 20, width: 50, textAlign: 'left' }}>
                      {1 !== this.state.sk.length ? <Icon onClick={() => this.removeSearchOption(item)} style={{ cursor: 'pointer' }} type="minus-circle-o" /> : null}
                      {index === this.state.sk.length - 1 ? <Icon onClick={() => this.addSearchOption()} style={{ cursor: 'pointer', marginLeft: 8 }} type="plus-circle-o" /> : null}
                    </p>
                  </div>
                })
              }
            </> : null}
          {/* select end */}
          {/* checkbox */}
          {this.state.displayType === 'checkbox' ?
            <>
              <FormItem {...formItemLayout} label="是否单选CheckBox">
                {getFieldDecorator('singlebox', {
                  rules: [{
                    required: true,
                    message: '请选择是否单选CheckBox'
                  }]
                })(
                  <RadioGroup>
                    <Radio value={true}>是</Radio>
                    <Radio value={false}>否</Radio>
                  </RadioGroup>)
                }
              </FormItem>
              <FormItem {...formItemLayout} label='checkbox label' hasFeedback>
                {
                  getFieldDecorator('extra[0].label', {
                    rules: [{
                      required: true,
                      message: '请输入checkbox label'
                    }]
                  })(<Input placeholder='请输入checkbox label' />)
                }
              </FormItem>
              <FormItem {...formItemLayout} label='checkbox value' hasFeedback>
                {
                  getFieldDecorator('extra[0].value', {
                    rules: [{
                      required: true,
                      message: '请输入checkbox value'
                    }]
                  })(<Input placeholder='请输入checkbox value' />)
                }
              </FormItem>
            </> : null}
          {/* checkbox end */}
          <FormItem>
            <Button type="primary" htmlType="submit">添加</Button>
          </FormItem>
        </Form>
      </span>
    );
  }
}

export default Form.create()(DetailFields);
