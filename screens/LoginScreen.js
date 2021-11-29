import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
import tw from "tailwind-rn";

const LoginScreen = () => {
  const { googleSignin, loading } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={tw("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tw("flex-1 ")}
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      ></ImageBackground>
      <TouchableOpacity
        onPress={googleSignin}
        style={[
          tw("abosolute bottom-40 w-52 bg-white p-4 rounded-2xl"),
          { marginHorizontal: "25%" },
        ]}
      >
        <Text style={tw("font-semibold text-center")}>
          Sign in & get swiping
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
