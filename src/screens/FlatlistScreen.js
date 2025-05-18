import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import NInput from '../components/NInput'
import NButton from '../components/NButton'
import ModalComfirmDelete from '../components/ModalComfirmDelete'
import { BaseNavigationContainer } from '@react-navigation/native'

const FlatlistScreen = () => {
    const [item, setItem] = useState('');
    const [showModal, setshowModal] = useState(false);
    const [text, setText] = useState('');
    const [persons, setPersons] = useState([
        {name: "Amaraa", ID: "01", about: "асуудалгүй хэрэглэгч", phoneNumber:'99119911', fbLink: 'lllll'},
        {name: "bold", color: "#C4E538"},
        {name: "tamir", color: "#FDA7DF"},
        {name: "uuganaa", color: "#D980FA"},
        {name: "boloro", color: "#009432"},
    ])
    
const handleClick = name => {
    let sum = 0;
    persons.forEach(el => {
        sum = sum + el.name.length;
        console.log(el.name + " ===> " + el.name.length);
        console.log("нийлбэр : " + sum );
    });

    if (sum % 2 == 1) Alert.alert(`Нийлбэр : ${sum} бөгөөд сонгой юм байна`);
    else Alert.alert(`Нийлбэр : ${sum} бөгөөд тэгш юм байна`);

    // setItem(name);
    // setshowModal(true)
  
}

const deleteItem = () => {
    setPersons(oldPersons => oldPersons.filter(el => el.name !== item));
    setshowModal(false)
}

const addNewItem = () => {
    setPersons(persons => [...persons, {name: text, ID: "#009432"}])
    
}
  return (
    <View>
        <ModalComfirmDelete deleteItem={deleteItem} item={item} visible={showModal} cancel={()=>setshowModal(false)} />
        <View style={[css.addContainer, {flexDirection: 'column', gap: 10}]}>
            <NInput 
                style={css.addInput} 
                placeholder="Хэрэглэгчийн нэр"
                onChangeText ={(newText) => setText(newText)}/>
            <NInput 
                style={css.addInput} 
                placeholder="Хэрэглэгчийн ID"
                onChangeText ={(newText) => setText(newText)}/>
            <NInput 
                style={css.addInput} 
                placeholder="Тайлбар"
                onChangeText ={(newText) => setText(newText)}/>
            <NInput 
                style={css.addInput} 
                placeholder="Утасны дугаар"
                onChangeText ={(newText) => setText(newText)}/>
            <NInput 
                style={css.addInput} 
                placeholder="Facebook линк"
                onChangeText ={(newText) => setText(newText)}/>
            <NButton title={"Нэмэх"} onPress={addNewItem}/>
            </View>
        <FlatList 
        keyExtractor={(person)=>{person.color}}
        data={persons} 
        renderItem={({ item, index})=> (
            <TouchableOpacity onPress={()=> handleClick(item.name)}>
            <View style={{backgroundColor: item.color, padding: 10, marginHorizontal: 30}}>
                <Text>{item.name} - {item.ID} - {item.about} - {item.phoneNumber} - {item.fbLink}</Text>
            </View>
            </TouchableOpacity>)}
    />
    </View>
  );
}

export default FlatlistScreen;

const css = StyleSheet.create({
    addContainer: {
        flexDirection: "row",
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        
    }, addInput: {
        width: "60%"
    }

});