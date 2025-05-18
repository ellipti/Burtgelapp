import { StyleSheet, Text, View, Modal, SafeAreaView } from 'react-native'
import React from 'react'
import NButton from './NButton'

const ModalComfirmDelete = ({visible, cancel, deleteItem, item }) => {
  return (
    <Modal visible={visible} animationType='fade'>
    <SafeAreaView 
        style={{
            flex: 1, 
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <Text >{item}-г устгахдаа итгэлтэй байна уу?</Text>
        <View 
            style ={{
                flexDirection: 'row', 
                marginTop: 20,
                
                justifyContent: "space-evenly"
               
            }}
        >
        <NButton style={css.button} title='Болих' onPress={cancel}/>
        <NButton style={css.button} title='Устгах' onPress={deleteItem}/>
        </View>
    </SafeAreaView>
    </Modal>
  )
}

export default ModalComfirmDelete

const css = StyleSheet.create({
    button: {
        width: '20%'
    }
})