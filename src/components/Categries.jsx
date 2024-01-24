import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Categries({
  activeGategery,
  handleChangeCategory,
  mealCategories,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className=" space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {mealCategories.map((cat, index) => {
          let isActive = activeGategery == cat.strCategory;
          return (
            <TouchableOpacity
              onPress={() => handleChangeCategory(cat.strCategory)}
              className=" mt-4 flex items-center space-y-1"
              key={index}>
              <View
                className={` rounded-full p-[6px] bg-amber-400 ${
                  isActive ? "bg-amber-400" : "bg-black/10"
                } `}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className=" rounded-full"
                />
              </View>
              <Text className=" text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
