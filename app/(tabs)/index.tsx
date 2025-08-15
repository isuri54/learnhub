import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { API_BASE_URL } from '@env';

export default function App() {
  useEffect(() => {
    fetch("http://192.168.1.100:5000/api/test")
      .then(res => res.json())
      .then(data => {
        console.log("Response from backend:", data);
      })
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <View>
      <Text>Teachers Connect</Text>
    </View>
  );
}
