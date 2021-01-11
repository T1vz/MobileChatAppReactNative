import { useCallback, useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native';

const _storeData = async (id, jwtToken, username) => {
    try {
      await AsyncStorage.setItem(
        storageName,
        JSON.stringify({ userId: id, token: jwtToken, username })
      );
    } catch (error) {
      // Error saving data
    }
}
const _retrieveData = async (storage) => {
    try {
      const value = await AsyncStorage.getItem(storage);
      if (value !== null) {
        return JSON.parse(value)
      }
    } catch (error) {
      // Error retrieving data
    }
  }

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [username, setUsername] = useState(null)

    const login = useCallback((jwtToken, id, username) => {
        setToken(jwtToken)
        setUserId(id)
        setUsername(username)


        _storeData({ userId: id, token: jwtToken, username })
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setUsername(null)

        AsyncStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = _retrieveData(storageName)

        if (data && data.token) {
            login(data.token, data.userId, data.username)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, ready, username }
}