import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { firestore } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function NameTest() {
  const [names, setNames] = useState<string[] | undefined>(undefined);
  const [size, setSize] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "test"));
        setSize(querySnapshot.size);
        const documents = querySnapshot.docs.map((doc) => {
          const firstName = doc.data().firstName;
          const lastName = doc.data().lastName;

          if (firstName && lastName) {
            return firstName + " " + lastName;
          } else {
            return "N/A";
          }
        });

        setNames(documents);
      } catch (error) {
        console.log("Error fetching data!", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      {names ? (
        names.map((name) => (
          <Text key={name} style={styles.text}>
            {name}
          </Text>
        ))
      ) : (
        <Text style={styles.text} key="loading">
          Loading...
        </Text>
      )}
      <Text style={styles.text}>Number of docs: {size}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
  },
});
