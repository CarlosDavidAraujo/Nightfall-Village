import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function RoleCard({
  roleName,
  count,
  onMinus,
  onPlus,
  onClick,
  img,
  selected
}) {
  return (
    <TouchableOpacity onPress={onClick} style={styles.touchable}>
      <View>
        <TouchableOpacity style={styles.infoButton}>
          <Text>i</Text>
        </TouchableOpacity>
        <View>
          <Image source={{ uri: img }} style={styles.image} />
        </View>
        <Text style={styles.roleName}>{roleName}</Text>
        {selected && (
          <View>
            <TouchableOpacity onPress={onMinus} style={styles.numberButton}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={styles.count}>{count}</Text>
            <TouchableOpacity onPress={onPlus} style={styles.numberButton}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    alignItems: "center"
  },
  infoButton: {
    alignSelf: "flex-end"
  },
  roleName: {
    fontSize: 20,
    padding: 10
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  numberButton: {
    width: "20%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  count: {
    fontSize: 20,
    padding: 10
  }
});
