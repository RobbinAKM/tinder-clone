import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import tw from "tailwind-rn";
import { useAuth } from "../hooks/useAuth";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/core";

import { addDoc, collection } from "firebase/firestore";

const ModalScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    addDoc(collection(db, "users"), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: job,
      age: age,
    })
      .then(() => navigation.navigate("Home"))
      .catch((err) => alert(err.message));
  };

  return (
    <View style={tw("flex-1 items-center pt-1 ")}>
      <Image
        style={tw("h-20 w-full")}
        resizeMode="contain"
        source={{ url: "https://links.papareact.com/2pf" }}
      />
      <Text style={tw("text-xl text-gray-500 p-2 font-bold")}>
        Welcome {user.displayName}
      </Text>

      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        Step 1: The profile picture
      </Text>
      <TextInput
        value={image}
        onChangeText={(text) => setImage(text)}
        style={tw("text-center text-xl pb-2")}
        placeholder="enter a profile picture URL"
      ></TextInput>

      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        Step 2: The Job
      </Text>
      <TextInput
        value={job}
        onChangeText={(text) => setJob(text)}
        style={tw("text-center text-xl pb-2")}
        placeholder="enter your job"
      ></TextInput>

      <Text style={tw("text-center p-4 font-bold text-red-400")}>
        Step 3: The Age
      </Text>
      <TextInput
        maxLength={2}
        keyboardType="numeric"
        value={age}
        onChangeText={(text) => setAge(text)}
        style={tw("text-center text-xl pb-2")}
        placeholder="enter your age"
      ></TextInput>

      <TouchableOpacity
        disabled={incompleteForm}
        style={tw("w-64 p-3 rounded-xl absolute bottom-10")}
        onPress={updateUserProfile}
      >
        <Text
          style={[
            tw("text-center text-white text-xl bg-red-400 "),
            incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
          ]}
        >
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
