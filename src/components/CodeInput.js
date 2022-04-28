import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View, Pressable, Text } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const CodeInput = ({ code, setCode, codeLength }) => {
  const [containerIsFocused, setContainerIsFocused] = useState(false);

  const codeDigitsArray = new Array(codeLength).fill(0);

  const inputRef = useRef(null);

  const handleOnPress = () => {
    setContainerIsFocused(true);
    console.log("hello");
    inputRef?.current?.focus();
  };

  const handleOnBlur = () => {
    setContainerIsFocused(false);
  };

  const toDigitInput = (_val, idx) => {
    const emptyInputChar = " ";
    const digit = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === codeLength - 1;
    const isCodeFull = code.length === codeLength;
    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    const containerStyle =
      containerIsFocused && isFocused
        ? { ...styles.inputContainer, ...styles.inputContainerFocused }
        : styles.inputContainer;

    return (
      <View key={idx} style={containerStyle}>
        <Text style={styles.inputText}>{digit}</Text>
      </View>
    );
  };

  return (
    <View>
      <Pressable style={styles.inputsContainer} onPress={handleOnPress}>
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref={inputRef}
        value={code}
        onSubmitEditing={handleOnBlur}
        onChangeText={setCode}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={codeLength}
        style={styles.hiddenCodeInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hiddenCodeInput: {
    position: "absolute",
    // height: 0,
    // width: 0,
    left: -100,
    opacity: 0,
  },
  inputsContainer: {
    width: wp("75%"),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    borderColor: "#cccccc",
    borderWidth: 2,
    borderRadius: 4,
    padding: 20,
  },
  inputContainerFocused: {
    borderColor: "#0f5181",
  },
  inputText: {
    fontSize: 24,
  },
});

export default CodeInput;
