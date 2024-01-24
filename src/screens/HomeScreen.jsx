import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import Categries from "../components/Categries";
import axios from "axios";
import Recipe from "../components/Recipe";

export default function HomeScreen() {
  const [mealCategories, setMealCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [activeGategery, setActiveGategery] = useState("Beef");

  const handleChangeCategory = (category) => {
    getRecipe(category);
    setActiveGategery(category);
    setMeals([]);
  };

  useEffect(() => {
    getCategry();
    getRecipe();
  }, []);
  const getCategry = async () => {
    try {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (res && res.data) {
        setMealCategories(res.data.categories);
      }
    } catch (error) {
      console.log("categry", error);
    }
  };

  const getRecipe = async (category = "Beef") => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (res && res.data) {
        setMeals(res.data.meals);
      }
    } catch (error) {
      console.log("categry", error);
    }
  };

  return (
    <View className=" flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className=" space-y-6 pt-14">
        {/* avatar */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ width: hp(5.5), height: hp(5) }}
          />
          <AntDesign name="bells" size={hp(4)} color="gray" />
        </View>

        {/* greetings */}
        <View className="mx-4 space-y-3 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className=" text-neutral-600">
            Hello,Aflal!
          </Text>
          <Text
            style={{ fontSize: hp(3.8) }}
            className=" font-semibold text-neutral-600">
            Make your own food,
          </Text>
          <Text
            style={{ fontSize: hp(3.8) }}
            className=" font-semibold text-neutral-600">
            stay at <Text className=" text-amber-400">home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className=" flex-row items-center justify-center bg-black/5 p-[6px] rounded-full mx-3">
          <TextInput
            placeholder="search any recipe"
            placeholderTextColor="gray"
            style={{ fontSize: hp(1.7) }}
            className=" flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <EvilIcons name="search" size={hp(2.5)} color="black" />
        </View>

        {/* categaries */}
        <View>
          {mealCategories.length > 0 && (
            <Categries
              mealCategories={mealCategories}
              activeGategery={activeGategery}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          <Recipe meals={meals} mealCategories={mealCategories} />
        </View>
      </ScrollView>
    </View>
  );
}
