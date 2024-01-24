import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

// import YoutubeIframe from "react-native-youtube-iframe";

export default function RecipeDetails(props) {
  const [isFav, setIsFav] = useState(false);
  let item = props.route.params;
  const navigation = useNavigation();
  const [mealDetails, setmealDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  const ingredientsIndexs = (mealDetails) => {
    if (!mealDetails) return [];
    let indexs = [];
    for (let i = 0; i <= 20; i++) {
      if (mealDetails["strIngredient" + i]) {
        indexs.push(i);
      }
    }
    return indexs;
  };

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (res && res.data) {
        setmealDetails(res.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log("categry", error);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className=" bg-white flex-1">
      <StatusBar style="light" />

      {/* recipe image */}
      <View className="flex-row justify-center">
        <Image
          sharedTranstionTag={item.strMeal}
          source={{ uri: item.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            marginTop: 10,
          }}
        />
      </View>
      {/* back btn */}
      <Animated.View
        entering={FadeIn.duration(1000).delay(200)}
        className="absolute w-full mt-10  flex-row justify-between items-center  ">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="bg-white flex justify-center items-center rounded-full p-1 w-12 h-12 ml-5 ">
          <AntDesign name="arrowleft" size={hp(3.5)} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsFav(!isFav)}
          className="bg-white flex justify-center items-center rounded-full p-1 w-12 h-12 mr-5 ">
          <AntDesign
            name="heart"
            size={hp(3.5)}
            color={isFav ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* meal description */}
      {loading ? (
        <Loading size="large" className="mt-20" />
      ) : (
        <View>
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="flex justify-between pt-8 space-y-4 px-4">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700">
              {mealDetails?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className=" font-semibold text-neutral-500 flex-1">
              {mealDetails?.strArea}
            </Text>
          </Animated.View>

          {/* misc */}
          <Animated.View
            entering={FadeInDown.duration(700)
              .delay(100)
              .springify()
              .damping(12)}
            className="flex-row justify-around">
            <View className="flex rounded-full p-2 bg-amber-300">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="flex justify-center items-center bg-white rounded-full">
                <AntDesign name="clockcircleo" size={24} color="black" />
              </View>
              <View className="flex justify-center items-center space-y-3 py-2">
                <Text
                  style={{ fontSize: hp(2) }}
                  className=" text-neutral-700 font-bold">
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className=" text-neutral-700 font-bold">
                  Mins
                </Text>
              </View>
            </View>

            <View className="flex rounded-full p-2 bg-amber-300">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="flex justify-center items-center bg-white rounded-full">
                <Entypo name="users" size={24} color="black" />
              </View>
              <View className="flex justify-center items-center space-y-3 py-2">
                <Text
                  style={{ fontSize: hp(2) }}
                  className=" text-neutral-700 font-bold">
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className=" text-neutral-700 font-bold">
                  Servings
                </Text>
              </View>
            </View>

            <View className="flex rounded-full p-2 bg-amber-300">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="flex justify-center items-center bg-white rounded-full">
                <MaterialIcons
                  name="local-fire-department"
                  size={24}
                  color="black"
                />
              </View>
              <View className="flex justify-center items-center space-y-3 py-2">
                <Text
                  style={{ fontSize: hp(2) }}
                  className=" text-neutral-700 font-bold">
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className=" text-neutral-700 font-bold">
                  Cal
                </Text>
              </View>
            </View>

            <View className="flex rounded-full p-2 bg-amber-300">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="flex justify-center items-center bg-white rounded-full">
                <Octicons name="stack" size={24} color="black" />
              </View>
              <View className="flex justify-center items-center space-y-3 py-2">
                <Text
                  style={{ fontSize: hp(2) }}
                  className=" text-neutral-700 font-bold"></Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className=" text-neutral-700 font-bold">
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* ingredients */}

          <Animated.View
            entering={FadeInDown.duration(700)
              .delay(200)
              .springify()
              .damping(12)}
            className="space-y-4 mt-2 mb-3">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700 p-3">
              ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexs(mealDetails).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{ width: hp(1.5), height: hp(1.5) }}
                      className=" bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-4">
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className=" font-extrabold text-neutral-700">
                        {mealDetails["strMeasure" + i]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className=" font-medium text-neutral-600">
                        {mealDetails["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* intructions */}
          <Animated.View
            entering={FadeInDown.duration(700)
              .delay(300)
              .springify()
              .damping(12)}
            className="space-y-4  p-2">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700 p-3 ">
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
              {mealDetails?.strInstructions}
            </Text>
          </Animated.View>

          {/* recipe video */}
          {mealDetails.strYoutube && (
            <Animated.View
              entering={FadeInDown.duration(700)
                .delay(400)
                .springify()
                .damping(12)}
              className="ml-2 p-3">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold text-neutral-700">
                Recipe Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(mealDetails.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
