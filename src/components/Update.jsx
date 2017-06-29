import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
// import { getManager } from '../actions'
import Manager from '../components/Manager';
import NotLogin from '../components/notLogin'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class UpdateInfoForm extends React.Component {

    static propTypes = {
    manager: PropTypes.object.isRequired,
    // users: PropTypes.object.isRequired,
    fetchUpdate: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (id) => (e) => {
    // console.log('e: ', e);
    e.preventDefault();
    let name = this.props.form.getFieldValue('nickname' + id);
    let email = this.props.form.getFieldValue('email' + id);
    let phone = this.props.form.getFieldValue('phone' + id);
    // console.log("phone="+ phone);
    this.props.fetchUpdate(id, name, email, phone);
    // this.props.form.validateFieldsAndScroll((err, values) => {
      // if (!err) {
        // browserHistory.push('/updateInfo');
        // console.log('Received values of form: ', values);
      // }
    // });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const handleSubmit = this.handleSubmit;
    const { manager, users } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map((website) => {
      return <AutoCompleteOption key={website}>{website}</AutoCompleteOption>;
    });

    if (!manager.isLogin) {
      return <NotLogin/>
    }

    return (

      <div>
        {
          users.map(function(user){
            return      <Form onSubmit={handleSubmit(user.id)}>
                          

                          <FormItem
                            {...formItemLayout}
                            label={(
                              <span>
                                用户名&nbsp;
                                <Tooltip title="What do you want other to call you?">
                                  <Icon type="question-circle-o" />
                                </Tooltip>
                              </span>
                            )}
                            hasFeedback
                          >
                            {getFieldDecorator('nickname' + user.id, {
                              initialValue: user.name,
                              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                            })(
                              <Input />
                            )}
                          </FormItem>




                          <FormItem
                            {...formItemLayout}
                            label="E-mail"
                            hasFeedback
                          >
                            {getFieldDecorator('email' + user.id, {
                              initialValue: user.email,
                              rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                              }, {
                                 message: 'Please input your E-mail!',
                              }],
                            })(
                              <Input />
                            )}
                          </FormItem>


                          <FormItem
                            {...formItemLayout}
                            label="Phone"
                          >
                            {getFieldDecorator('phone' + user.id, {
                              initialValue: user.phone,
                              rules: [{  message: 'Please input your phone number!' }],
                            })(
                              <Input addonBefore={prefixSelector} />
                            )}
                          </FormItem>
                          
                          <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                            {getFieldDecorator('agreement', {
                              valuePropName: 'checked',
                            })(
                              <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                            )}
                          </FormItem>
                          <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">update</Button>
                          </FormItem>




                        </Form>
          })
        }


      </div>
    );
  }
}

const UpdateInfo = Form.create()(UpdateInfoForm);


export default UpdateInfo
