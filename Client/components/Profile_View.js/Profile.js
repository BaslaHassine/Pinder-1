import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView, ImageBackground, Dimensions} from "react-native";
import { StatusBar } from "expo-status-bar";
import CarouselCards from "./CarouselCards";
import server_IP from "../../config/Server_IP";

const { width, height } = Dimensions.get('window');


export default class ProfileView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id : 5, //=> hardcoded
      user_info: {},
      user_pets: [],
    };
  }

componentDidMount(){
  this.getUserInfo()
}  

getUserInfo() {
  const { user_id } = this.state
  fetch(`http://${server_IP}:3000/users/${user_id}`, {
      headers: { "content-type": "application/json" },
      method: "GET",
    })
      .then(async (result) => {
        result = await result.json();
        if (result.success) {
          this.setState({ user_info: result.user });
        }
      })
      .catch((err) => console.log(err));
  };



  render() {
    console.log(this.state)

    const { user_info } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground style={{width: width, height: height}} source={require("../../assets/Profile_View/bg.png")}>
        <View style={{ height: 80, backgroundColor: "#F0F0F0" }}>
          <Text style={styles.name}>{`${user_info.first} ${user_info.last}`}</Text>
        </View>
        <ScrollView>
          <View style={styles.header}>
            <View>
              <Image
                style={styles.avatar}
                source={{
                  uri: user_info.photo,
                }}
              />
            </View>

            <View style={{ marginEnd: 50 }}>
              <Text style={styles.count}>(4)</Text>
              <Image
                style={styles.Icon}
                source={require("../../assets/Profile_View/icons8-pets-30.png")}
              />
            </View>

            <View style={{ marginEnd: 50 }}>
              <Text style={styles.count}>(200)</Text>
              <Image
                style={styles.Icon}
                source={require("../../assets/Profile_View/icons8-puzzle-matching-50.png")}
              />
            </View>
          </View>
       
          <View style={styles.body}>
            <CarouselCards />
          </View>
        </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    marginTop: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    alignSelf: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "#F0F0F0",
  },
  name: {
    paddingTop: 40,
    marginStart: 15,
    color: "#363636",
    fontWeight: "bold",
      fontSize: 25,
      textAlign: "left",
       
    },
  
  count: {
    alignSelf: "center",
    color: "#757E90",
    fontWeight: "bold",
    fontSize: 16,
  },
  Icon: {
    width: 40,
    height: 40,
  },
  body: {
    alignSelf: "center",
    alignItems: "center",
  },
});
