import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

import {
    View,
    Text,
    Button,
    TextInput,
  } from 'react-native';

function AuthPage() {
    const auth = useContext(AuthContext)
    const [text, setText] = useState('')
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({email:'', password:'', username:''})

    const LoginHandler = async () => {
        try {
          const data = await request('http://192.168.1.19:5000/api/auth/login', 'POST', {email:form.email, password:form.password})
          auth.login(data.token, data.userId, data.username)
          console.log('auth', auth)
          setText(data.token)
        } catch (e) {
          
        }
    }
    const EmailChangeHandler = (e) => {
        setForm({...form, email: e})
      }
    const PasswordChangeHandler = (e) => {
        setForm({...form, password: e})
        console.log('auth', auth)
    }

    useEffect(()=>{
        console.log('form', form)
      }, [form])
    
    useEffect(()=>{
        console.log(error)
        clearError()
    }, [error, clearError])
    return (
        <View>
            <TextInput value={form.email} onChangeText={EmailChangeHandler}></TextInput>
            <TextInput value={form.password} onChangeText={PasswordChangeHandler}></TextInput>
            <Button onPress={LoginHandler} title={"Login"}></Button>
            <Text>{text}</Text>
        </View>
    )
}

export default AuthPage
