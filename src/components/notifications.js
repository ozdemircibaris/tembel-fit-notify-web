import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Button, Table, Icon, Menu, Modal, Form, Input, Checkbox } from 'semantic-ui-react';
import { fetchNotifications, createTimedNotification, createNowNotification } from '../actions/notificationAction';
import moment from 'moment';
import 'moment/locale/tr';

class Notifications extends Component {
    state = {
        titleValue: '',
        descriptionValue: '',
        dateValue: '',
        pageValue: '',
        modalVisible: false,
        nowNotificationValue: false
    }
    componentWillMount() {
        this.props.fetchNotifications()
    }
    componentDidUpdate() {
        const { createNotificationFinallyValue } = this.props;
          if(createNotificationFinallyValue == "finally") {
            this.props.fetchNotifications()
        }
    }

    onTitleValue = (e, { value }) => this.setState({ titleValue: value })
    onDescriptionValue = (e , { value }) => this.setState({ descriptionValue: value })
    onDateValue = (e, { value }) => this.setState({ dateValue: value })
    onPageValue = (e, { value }) => this.setState({ pageValue: value })
    onCreateTimedNotification = () => {
        const { titleValue, descriptionValue, dateValue, pageValue } = this.state;
        this.props.createTimedNotification(
            titleValue,
            descriptionValue,
            dateValue,
            pageValue
        )
    }

    onCreateNowNotification = () => {
        const { titleValue, descriptionValue, pageValue } = this.state;
        this.props.createNowNotification(
            titleValue,
            descriptionValue,
            pageValue
        )
    }

    onNowNotificationChanged = (e, { value }) => this.setState((prevState) => ({ nowNotificationValue: !prevState.nowNotificationValue }))

    render() {
        const { notificationValues } = this.props;
        const { modalVisible, nowNotificationValue } = this.state;
        return (
            <Container style={{ marginTop: 20 }}>
                <Modal
                    onClose={() => this.setState({ modalVisible: false })}
                    onOpen={() => this.setState({ modalVisible: true })}
                    open={modalVisible}
                    trigger={<Button>NEW NOTIFICATION</Button>}>
                    <Modal.Header>Kategori Ekle</Modal.Header>
                    <Modal.Content>
                    <Form>
                        <Form.Field
                            id='form-input-control-brand'
                            control={Input}
                            label='Bildirim Adı'
                            onChange={this.onTitleValue}
                            placeholder='Bildirim Adı' />
                        <Form.Field
                            id='form-input-control-brand'
                            control={Input}
                            label='Bildirim detayı'
                            onChange={this.onDescriptionValue}
                            placeholder='Bildirim detayı' />
                        <Form.Field
                            id='form-input-control-brand'
                            type='datetime-local'
                            control={Input}
                            disabled={nowNotificationValue}
                            label='Bildirim tarihi'
                            onChange={this.onDateValue}
                            placeholder='Bildirim detayı' />
                        <Form.Field
                            id='form-input-control-brand'
                            control={Input}
                            label='Sayfa Adı'
                            onChange={this.onPageValue}
                            placeholder='Sayfa Adı' />
                        <Form.Field>
                            <Checkbox
                                style={{ marginTop: 20 }}
                                onChange={this.onNowNotificationChanged}
                                checked={nowNotificationValue}
                                label='Şimdi yolla' />
                        </Form.Field>
                    </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => this.setState({ modalVisible: false })}>
                        Nope
                        </Button>
                        <Button
                        content="Create"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => {
                            if(nowNotificationValue == true) {
                                this.onCreateNowNotification()
                            } else {
                                this.onCreateTimedNotification()
                            }
                            this.setState({ modalVisible: false })
                        }}
                        positive
                        />
                    </Modal.Actions>
                </Modal>
                <Table celled selectable inverted style={{ marginTop: 20 }}>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Başlık</Table.HeaderCell>
                        <Table.HeaderCell>Açıklama</Table.HeaderCell>
                        <Table.HeaderCell>Tarih</Table.HeaderCell>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {
                        notificationValues.map((item, index) => {
                            return(
                                <Table.Row key={item.id}>
                                <Table.Cell collapsing> {item.id} </Table.Cell>
                                <Table.Cell> {item.title} </Table.Cell>
                                <Table.Cell> {item.description} </Table.Cell>
                                <Table.Cell collapsing> {moment(item.date).format("LLLL")} </Table.Cell>
                                <Table.Cell collapsing>
                                    <Button
                                        inverted
                                        color="red"
                                        style={{ marginRight: 10 }}>
                                        Sil
                                    </Button>
                                    <Button
                                        inverted
                                        color="olive"
                                        style={{ marginRight: 10 }}>
                                        Güncelle
                                    </Button>
                                    <Button
                                        inverted
                                        color="brown">
                                        Detay
                                    </Button>
                                </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Menu floated='right' pagination>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a'>1</Menu.Item>
                            <Menu.Item as='a'>2</Menu.Item>
                            <Menu.Item as='a'>3</Menu.Item>
                            <Menu.Item as='a'>4</Menu.Item>
                            <Menu.Item as='a' icon>
                                <Icon name='chevron right' />
                            </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    const { notificationValues, createNotificationFinallyValue } = state.NotificationReducer;
    return { notificationValues, createNotificationFinallyValue }
}

export default connect(
    mapStateToProps,
    {
        fetchNotifications,
        createTimedNotification,
        createNowNotification
    }
)(Notifications)