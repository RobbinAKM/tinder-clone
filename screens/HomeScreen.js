import React, { useRef } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useAuth } from "../hooks/useAuth";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";

const dummy_data = [
  {
    id: 123,
    firstName: "Beyonce",
    lastName: "Knowles",
    occupation: "singer",
    age: 27,
    photoURL:
      "https://media.architecturaldigest.com/photos/6112a33f8c1207bc593eff74/16:9/w_2560%2Cc_limit/1253172998",
  },
  {
    id: 456,
    firstName: "Lady",
    lastName: "Gaga",
    occupation: "singer",
    age: 27,
    photoURL:
      "https://i.iheart.com/v3/surl/aHR0cDovL2ltYWdlLmloZWFydC5jb20vaW1hZ2VzL292ZXJyaWRlLzM5MzM1XzgzZWVmNDY0LWY3ZjktNDg4ZC1iOWIxLWQ5NWYyNjQ0Njg5MS5qcGc=?ops=fit%28720%2C720%29&sn=eGtleWJhc2UyMDIxMTExMDqHHqZxzWHhYawuHEZEE6CQoJXx6Wv2-3ZcfLSiFY4n-A%3D%3D&surrogate=1cOXl179JY-syhxYSCX6Q1a_Mcu6UO8d-F4oJzpZf1hcUbJr4aImzdIKFFetygNPS64eVhZi8UeimHPdvhcGNBhxXpkXOvVbMpxVCYguL2hCf_qr55C-RoNmSf8csWZ82Z9sFYcuj6mGIRW_CH6qEHfCYbM7UcXhThma3D6xWGaT9xh2bs5vbSaAu8qwNdcOghyN6JYuyiI2fDSv7TXrChavSrrpF1EVZcaLY7LzwhQRiJMOO1KL9A-F6ybrpwAv",
  },
  {
    id: 789,
    firstName: "Theo",
    lastName: "James",
    occupation: "actor",
    age: 27,
    photoURL:
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Theo_James_March_18%2C_2014_%28cropped%29.jpg",
  },
  {
    id: 321,
    firstName: "Janelle ",
    lastName: "Monáe",
    occupation: "singer",
    age: 27,
    photoURL:
      "https://images.genius.com/b8d2b82d71c34291aea0783839b83acf.1000x1000x1.jpg",
  },
  {
    id: 654,
    firstName: "Dylan",
    lastName: " O'Brien",
    occupation: "singer",
    age: 27,
    photoURL: "https://pbs.twimg.com/media/DOMLbwqXUAEAsXj.jpg",
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const swipeRef = useRef(null);

  return (
    <SafeAreaView style={tw("flex-1")}>
      {/*Header*/}
      <View style={tw("items-center relative")}>
        <TouchableOpacity style={tw("absolute left-5 top-3")} onPress={logout}>
          <Image
            style={tw("h-10 w-10 rounded-full")}
            source={{ uri: user.photoURL }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={require("../tinder.png")} style={tw("h-14 w-14")} />
        </TouchableOpacity>

        <TouchableOpacity
          style={tw("absolute right-5 top-3")}
          onPress={() => navigation.navigate("Chat")}
        >
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>

      {/*Card*/}
      <View style={tw("flex-1 -mt-6")}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={dummy_data}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={() => console.log("left")}
          onSwipedRight={() => console.log("right")}
          overlayLabels={{
            left: {
              title: "Bitch Bye",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "Match",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          renderCard={(card) => (
            <View
              key={card.id}
              style={tw("h-3/4 bg-white rounded-xl relative")}
            >
              <Image
                style={tw("absolute top-0 h-full w-full rounded-xl")}
                source={{ uri: card.photoURL }}
              />
              <View
                style={[
                  tw(
                    "absolute bottom-0 bg-white w-full h-20 justify-between items-center flex-row px-6 py-2 rounded-b-xl"
                  ),
                  styles.cardShadow,
                ]}
              >
                <View>
                  <Text style={tw("text-xl font-bold")}>
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>{card.occupation}</Text>
                </View>
                <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={tw("flex-row flex justify-evenly bottom-8")}>
        <TouchableOpacity
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-red-200"
          )}
          onPress={() => swipeRef.current.swipeLeft()}
        >
          <Entypo name="cross" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw(
            "items-center justify-center rounded-full w-16 h-16 bg-green-200"
          )}
          onPress={() => swipeRef.current.swipeRight()}
        >
          <AntDesign name="heart" size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#0000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
