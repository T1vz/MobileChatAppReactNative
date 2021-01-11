import React, { useContext, useEffect, useState } from 'react';

import {
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TextInput,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';

function ChatPage() {

    const [client, setClient] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])

    const auth = useContext(AuthContext)

    const ConnectHandler = () => {
        setClient(new WebSocket('ws://192.168.1.19:8999'))
        alert('connected!')
    }
    const SendHandler = () => {
        var msg = {
            type: "message",
            text: text,
            // TODO: userId, deviceId
            username: auth.username,
            date: Date.now()
        };
        client.send(JSON.stringify(msg))
        setText('')
    }

    useEffect(() => {
        if (client) {
            client.onopen = function () {
                setText('Connected')
                setIsConnected(true)
            }
            client.onmessage = (message) => {
                const mes = JSON.parse(message.data)
                if (mes.type === 'messages') {
                    setMessages(mes.text)
                }
                else {
                    if (mes.type === 'message') {
                        setText(mes.text)
                        setMessages([...messages, mes.text])
                    }
                }
            }
        }
    }, [client])

    return (
        <ScrollView>
            {isConnected || <Button onPress={ConnectHandler} title={'Connect'}></Button>}
            <StatusBar barStyle="dark-content" />
            <TextInput onChangeText={texte => setText(texte)} value={text} />
            <Button onPress={SendHandler} title={'Send'}></Button>
            <View>
                {messages.map((elem, index) => {
                    return (
                        <View key={index} >
                            <Text >{new Date(elem.date).toLocaleTimeString() + ':' + elem.username}</Text>
                            <Text >{elem.text}</Text>
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

export default ChatPage
