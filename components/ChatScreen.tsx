import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { create } from 'zustand';

type Message = {
  text: string;
  time: number;
  user: string;
}

interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] }))
}));

export default function ChatScreen({navigation}: {navigation: any}) {
  const [textMessage, setTextMessage] = useState<string>('');
  const messages = useChatStore((state) => state.messages);

  return (
    <View style={styles.container}>
      <Button title="Home" onPress={() => {
                navigation.navigate('Home');
            }}/>
            <Button title="Profile" onPress={() => {
                navigation.navigate('Profile');
            }}/>
      <View>
        {/* <BackgroundMusic /> */}
        <Text>Open up App.tsx to start working on your app!</Text>

        <TextInput style={styles.input} onChangeText={setTextMessage} value={textMessage}/>

        <Button
          title="Add Message"
          onPress={() => {
            useChatStore.getState().addMessage({
              text: textMessage,
              time: Date.now(),
              user: 'me'
            });
          }}
        />
      </View>

      <Button
        title="Search band"
        onPress={() => {
          searchBandName(textMessage);
        }}/>
      
      <View style={styles.messages}>
          {messages.map((message, index) => (
            <Text key={index}>{message.text}</Text>
          ))}
        <StatusBar style="auto" />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    display: "flex",
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  messages: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    height: 300,
    width: "80%",
    backgroundColor: 'blue',
    overflow: 'scroll',
  },

  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const searchBandName = async (searchTerm: string) => {
  console.log("Searching for: " + searchTerm);

  const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchTerm}&api_key=${process.env.EXPO_PUBLIC_LASTFM_API_KEY}&format=json`;

  // Make a post request to api url
  const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
  });
  
  // Parse the response
  const data = await response.json();
  console.log(data);
}