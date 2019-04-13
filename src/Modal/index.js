import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import React from 'react';
import './antModal.css'

export class ANTModalImpl extends React.Component {
    state = { id: '', isVisible: false, name: '', username: '', isLiked: null }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id && this.props.id !== nextProps.id) {
            const currentUserInstance = nextProps.users.find((user) => user.id === nextProps.id)
            const { name, email, website, phone, username, isLiked } = currentUserInstance;
            this.props.form.setFields({
                name: {
                    value: name
                },
                email: {
                    value: email
                },
                website: {
                    value: website
                },
                phone: {
                    value: phone
                },
            });
            this.setState({ id: nextProps.id, isLiked, name, username, isVisible: true })
        }
    }

    handleSubmit = () => {
        const { form: { validateFieldsAndScroll, resetFields }, onClose } = this.props;
        const { username, id, isLiked } = this.state;
        let hasFormError = null;
        let userValues = null;
        validateFieldsAndScroll((err, values) => {
            hasFormError = err;
            userValues = values;
        });
        if (hasFormError) {
            return;
        }
        this.setState({ isVisible: false })
        onClose({ ...userValues, username, isLiked, id })
        resetFields();
    }

    handleCancel = () => {
        const { form: { resetFields }, onClose } = this.props
        this.setState({ isVisible: false })
        resetFields();
        onClose(null)
    }

    render() {
        const { name, isVisible } = this.state;
        const { getFieldDecorator } = this.props.form;
        return <div>
            < Modal
                title={`Edit User ${name}`}
                visible={isVisible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
            >
                <Form.Item
                    label="Name"
                >
                    {getFieldDecorator('name', {
                        preserve: false,
                        rules: [{
                            required: true, message: 'Please input name!',
                        }],
                    })(
                        <Input name="name" />
                    )}
                </Form.Item>
                <Form.Item
                    label="Email"
                >
                    {getFieldDecorator('email', {
                        preserve: false,
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input name="email" />
                    )}
                </Form.Item>
                <Form.Item
                    label="Phone"
                >
                    {getFieldDecorator('phone', {
                        preserve: false,
                        rules: [{
                            required: true, message: 'Please input Phone Number!',
                        }],
                    })(
                        <Input name="phone" />
                    )}
                </Form.Item>
                <Form.Item
                    label="Website"
                >
                    {getFieldDecorator('website', {
                        preserve: false,
                        rules: [{
                            required: true, message: 'Please input website name!',
                        }],
                    })(
                        <Input name="website" />
                    )}
                </Form.Item>
            </Modal>
        </div >
    }
}
export const ANTModal = Form.create({ name: 'coordinated' })(ANTModalImpl);
