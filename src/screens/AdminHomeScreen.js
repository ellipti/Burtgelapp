
// src/screens/AdminHomeScreen.js
import React, { useContext, useState, useEffect } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, LayoutAnimation, Platform,
  UIManager, Alert, Linking, Modal, ToastAndroid
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlayerContext } from '../contexts/PlayerContext';
import { AuthContext } from '../contexts/AuthContext';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AdminHomeScreen() {
  const { players, deletePlayer, toggleFavorite, updatePlayer } = useContext(PlayerContext);
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editNote, setEditNote] = useState('');
  const [editFacebook, setEditFacebook] = useState('');

  const openEditModal = (player) => {
    setSelectedPlayer(player);
    setEditName(player.name);
    setEditPhone(player.phone);
    setEditNote(player.note || '');
    setEditFacebook(player.facebook || '');
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    updatePlayer(selectedPlayer.id, {
      name: editName,
      phone: editPhone,
      note: editNote,
      facebook: editFacebook
    });
    setShowEditModal(false);
    ToastAndroid.show("✅ Амжилттай заслаа", ToastAndroid.SHORT);
  };

  const handleDeleteRequest = (player) => {
    setSelectedPlayer(player);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedPlayer) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      deletePlayer(selectedPlayer.id);
      setShowDeleteModal(false);
      setSelectedPlayer(null);
      ToastAndroid.show("🗑️ Амжилттай устгалаа", ToastAndroid.SHORT);
    }
  };

  const handleToggleFavorite = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    toggleFavorite(id);
  };

  const openFacebook = async (link) => {
    if (link && link.startsWith('http')) {
      const supported = await Linking.canOpenURL(link);
      if (supported) {
        Linking.openURL(link).catch(err => console.error('Failed to open FB:', err));
      } else {
        Alert.alert('⚠️ Боломжгүй', 'Facebook линк нээгдэх боломжгүй байна.');
      }
    }
  };

  const filteredPlayers = players
    .filter(p => (showFavorites ? p.favorite : true))
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      {/* Delete Modal */}
      <Modal visible={showDeleteModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Устгах уу?</Text>
            <Text style={styles.modalMessage}>
              {selectedPlayer?.name} тоглогчийг бүр мөсөн устгах уу?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setShowDeleteModal(false)} style={styles.modalCancel}>
                <Text style={styles.modalBtnText}>Цуцлах</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete} style={styles.modalDelete}>
                <Text style={styles.modalBtnText}>Устгах</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
     <Modal visible={showEditModal} transparent animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>✏️ Тоглогч засах</Text>

      <Text style={styles.inputLabel}>Нэр</Text>
      <TextInput
        style={styles.input}
        value={editName}
        onChangeText={setEditName}
        placeholder="Нэр оруулна уу"
      />

      <Text style={styles.inputLabel}>Утас</Text>
      <TextInput
        style={styles.input}
        value={editPhone}
        onChangeText={setEditPhone}
        keyboardType="phone-pad"
        placeholder="Утасны дугаар"
      />

      <Text style={styles.inputLabel}>Тайлбар</Text>
      <TextInput
        style={styles.input}
        value={editNote}
        onChangeText={setEditNote}
        placeholder="Тайлбар"
      />

      <Text style={styles.inputLabel}>Facebook линк</Text>
      <TextInput
        style={styles.input}
        value={editFacebook}
        onChangeText={setEditFacebook}
        placeholder="https://facebook.com/..."
      />

      <View style={styles.modalButtons}>
        <TouchableOpacity onPress={() => setShowEditModal(false)} style={styles.modalCancel}>
          <Text style={styles.modalBtnText}>Болих</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveEdit} style={styles.modalSave}>
          <Text style={styles.modalBtnText}>Хадгалах</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>


      {/* Header */}
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>👑 Админ самбар</Text>
        <TouchableOpacity onPress={() => { logout(); navigation.replace('Login'); }}>
          <Text style={styles.logout}>🚪 Гарах</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Хайх..."
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setShowFavorites(false)}>
          <Text style={styles.tabText}>📋 Бүх тоглогч</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setShowFavorites(true)}>
          <Text style={styles.tabText}>❤️ Favorite</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddUser')}>
        <Text style={styles.addButtonText}>➕ Тоглогч нэмэх</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => openEditModal(item)}>
              <View style={styles.cardHeader}>
                <Text style={styles.playerName}>{item.name}</Text>
                <Text style={styles.favoriteIcon}>{item.favorite ? '❤️' : '🤍'}</Text>
              </View>
              <Text style={styles.playerPhone}>📞 {item.phone}</Text>
              {item.note ? <Text style={styles.playerNote}>📝 {item.note}</Text> : null}
              {item.facebook && (
                <TouchableOpacity onPress={() => openFacebook(item.facebook)}>
                  <Text style={styles.fbLink}>🌐 Facebook линк харах</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleToggleFavorite(item.id)} style={styles.actionBtn}>
                <Text style={styles.actionText}>🌟 Favorite</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteRequest(item)} style={styles.actionBtnDanger}>
                <Text style={styles.actionText}>🗑️ Устгах</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>📭 Тоглогч бүртгэгдээгүй байна</Text>}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    inputLabel: {
  fontSize: 13,
  fontWeight: '500',
  color: '#555',
  alignSelf: 'flex-start',
  marginBottom: 4,
  marginTop: 8
},
input: {
  width: '100%',
  backgroundColor: '#f9f9f9',
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 8,
  fontSize: 14
},
modalSave: {
  backgroundColor: '#e74c3c',
  padding: 10,
  borderRadius: 6,
  flex: 1,
  marginLeft: 8
},
  container: { flex: 1, backgroundColor: '#fefefe', padding: 16 },
  headerWrapper: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#222' },
  logout: { fontSize: 16, color: '#e74c3c', fontWeight: '500' },
  search: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 10
  },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  tab: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#ecf0f1', borderRadius: 8 },
  tabText: { fontWeight: '600', color: '#333' },
  addButton: { backgroundColor: '#2ecc71', paddingVertical: 12, borderRadius: 10, marginBottom: 16 },
  addButtonText: { textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' },
  card: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 1 }, shadowRadius: 5, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  playerName: { fontSize: 18, fontWeight: '600', color: '#111' },
  favoriteIcon: { fontSize: 20 },
  playerPhone: { marginTop: 6, fontSize: 14, color: '#444' },
  playerNote: { marginTop: 4, fontSize: 13, color: '#888', fontStyle: 'italic' },
  fbLink: { marginTop: 6, color: '#2980b9', fontSize: 14, fontWeight: '500' },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 },
  actionBtn: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#3498db', borderRadius: 8, marginRight: 10 },
  actionBtnDanger: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#e74c3c', borderRadius: 8 },
  actionText: { color: '#fff', fontWeight: '500' },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 50, fontSize: 16, fontStyle: 'italic' },

  // Modal styles
  modalOverlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#fff', padding: 20, borderRadius: 10,
    width: '80%', alignItems: 'center'
  },
  modalTitle: {
    fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#c0392b'
  },
  modalMessage: {
    fontSize: 14, color: '#333', marginBottom: 20, textAlign: 'center'
  },
  modalButtons: {
    flexDirection: 'row', justifyContent: 'space-between', width: '100%'
  },
  modalCancel: {
    backgroundColor: '#bdc3c7', padding: 10, borderRadius: 6, flex: 1, marginRight: 8
  },
  modalDelete: {
    backgroundColor: '#e74c3c', padding: 10, borderRadius: 6, flex: 1
  },
  modalBtnText: {
    color: '#fff', textAlign: 'center', fontWeight: '600'
  }
});
