import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function UserListScreen() {
  const [users, setUsers] = useState([]);

  const BASE_URL = 'https://burtgel-backend.onrender.com';

  useEffect(() => {
    fetch(`${BASE_URL}/api/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('❌ Хэрэглэгч авахад алдаа:', err.message));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Хэрэглэгчид:</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} ({item.role}) - {item.phone}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  item: { marginBottom: 10 }
});
