import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import NButton from "../components/NButton";


const Home = ({ navigation }) => {
  return (
    <View>
      <Text style={{ textAlign: "center", marginVertical: 20 }}>
        Амазон номын дэлгүүр
      </Text>

      <NButton
        onPress={() => navigation.navigate("Login")}
        title="Логин дэлгэц"
      />
      <NButton
        onPress={() => navigation.navigate("Flexbox")}
        title="Flexbox"
      />
      
      <NButton
        onPress={() => navigation.navigate("Flatlist")}
        title="Flatlist"
      />
      <NButton
        onPress={() => navigation.navigate("CustomList")}
        title="Customlist"
      />
    </View>
  );
};

export default Home;
