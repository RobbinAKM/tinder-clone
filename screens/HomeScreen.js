import React from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useAuth } from "../hooks/useAuth";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView>
      {/*Header*/}
      <View style={tw("items-center relative")}>
        <TouchableOpacity style={tw("absolute left-5 top-3")}>
          <Image
            style={tw("h-10 w-10 rounded-full")}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../tinder.png")} style={tw("h-14 w-14")} />
        </TouchableOpacity>
      </View>
      <Text>Welcome to the home screen</Text>
      <Button title="Go to Chat" onPress={() => navigation.navigate("Chat")} />
      <Button title="Logout" onPress={() => logout()} />
    </SafeAreaView>
  );
};

export default HomeScreen;
