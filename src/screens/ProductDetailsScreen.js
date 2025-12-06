import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  Pressable,
  Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { addToCart as addToCartAction } from "../store/cartSlice";

const ProductDetailsScreen = () => {
  const product = useSelector((state) => state.products.selectedProduct);
  const { width } = useWindowDimensions();
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();

  const addToCart = () => {
    if (product) {
      dispatch(addToCartAction(product));
      alert("Produit ajouté au panier!");
    }
  };

  if (!product) return null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={product.images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />

      <View style={{ padding: 20 }}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        {product.description && (
          <Text style={styles.description}>{product.description}</Text>
        )}
      </View>

      <Pressable
        onPress={addToCart}
        style={[styles.button, isPressed && styles.buttonPressed]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        <FontAwesome5
          name="shopping-cart"
          size={18}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonPressed: {
    backgroundColor: "#333333",
    shadowOpacity: 0.5,
    elevation: 8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default ProductDetailsScreen;
