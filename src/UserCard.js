import React from 'react';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Popconfirm from 'antd/lib/popconfirm/index';
import Card from 'antd/lib/card';

export const UserCard = (props) => {
    return <Card
        className="card card-1"
        style={{ width: 300 }}
    >
        <div className="avatar  " ><img alt={props.username} src={`https://avatars.dicebear.com/v2/avataaars/${props.username}.svg?options[mood][]=happy`} /></div>
        <Row className="user-info" >
            <div className="username" >{props.name}</div>
            <div className="user-data" ><Icon type="mail" />{props.email}</div>
            <div className="user-data" ><Icon type="phone" />{props.phone}</div>
            <div className="user-data" ><Icon type="global" />{props.website}</div>
        </Row>
        <Row className="icon-container" >
            <Icon
                theme={props.isLiked ? 'filled' : 'outlined'}
                onClick={() => props.onLikeClick(props.id)}
                className={props.isLiked ? 'is-liked' : ''}
                type="heart"
            />
            <Icon
                onClick={() => props.onClickEdit(props.id)}
                theme="filled"
                type="edit"
            />
            <Popconfirm title={`Are you sure delete user ${props.name}?`}
                onConfirm={() => props.onClickDelete(props.id)}
                okText="Yes"
                cancelText="No">
                <Icon
                    theme="filled"
                    type="delete"
                />
            </Popconfirm>
        </Row>
    </Card>
}

