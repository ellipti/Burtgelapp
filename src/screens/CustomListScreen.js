import { Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, {useState} from 'react';
import NInput from '../components/NInput';
import NButton from '../components/NButton';

const CustomListScreen = () => {
  const [text, setText] = useState('');
  const [persons, setPersons] = useState([
    {name: "Amaraa", color: "#C4E038"},
    {name: "bold", color: "#C4E538"},
    {name: "tamir", color: "#FDA7DF"},
    {name: "uuganaa", color: "#D980FA"},
    {name: "bolor", color: "#009432"}
  ]);

  const handleClick = name => {
    Alert.alert(`Сайн байна уу: ${name}`);
  }

  const addNewItem = () => {
    if (text.trim().length === 0) return;
    setPersons(persons => [...persons, { name: text, color: "#C4E038" }]);
    setText('');
  }

  return (
    <View>
      <View style={css.addContainer}>
        <NInput 
          style={css.addInput} 
          placeholder="Хэрэглэгчийн нэр"
          value={text}
          onChangeText={setText}
        />
        <NButton title="Нэмэх" onPress={addNewItem} />
    </View>


    <ScrollView style={css.myList}>
        {persons.map((el, index) => (
          <View  key={index} style={{...css.listItem, backgroundColor: el.color}}>
            <Text>{index +1}. {el.name}</Text>
          </View>
      ))}
    </ScrollView>
   
    </View>
    
  );

};

export default CustomListScreen;

const css = StyleSheet.create({
  myList:{
    marginHorizontal: 20
  },
  listItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  addContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addInput: {
    width: "60%"
  }
});
