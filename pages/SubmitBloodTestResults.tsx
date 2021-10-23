import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  // Button,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
interface BloodTestConfig {
  name: string;
  threshold: number;
}

const getTestNamesUrl =
  "https://s3.amazonaws.com/s3.helloheart.home.assignment/bloodTestConfig.json";
let bloodTests: BloodTestConfig[] = [];
export default function SubmitBloodTestResults() {
  //user inputs
  const [userInputTestName, setUserInputTestName] =
    useState<string>("Test Name");
  const [userInputTestResult, setUserInputTestResult] = useState<number>(0);
  // handle view
  const [showResult, setShowResult] = useState<Boolean>(false);
  const [result, setResult] = useState<Boolean>(false);
  //
  const [identifiedBloodTest, setIdentifiedBloodTest] =
    useState<BloodTestConfig>();

  useEffect(() => {
    getTestNames();
  }, []);
  const getTestNames = async () => {
    await fetch(getTestNamesUrl)
      .then((response) => response.json())
      .then((data: { bloodTestConfig: BloodTestConfig[] }) => {
        //lower case response.name
        data.bloodTestConfig.forEach((bTest) => {
          bTest.name = bTest.name.toLowerCase();
        });
        bloodTests = data.bloodTestConfig;
      });
  };

  const handleBloodTest = () => {
    const bTest = identifyBloodTest();
    if (bTest !== undefined) {
      setIdentifiedBloodTest(bTest);
      setShowResult(true);
      bTest.threshold >= userInputTestResult
        ? setResult(true)
        : setResult(false);
    } else {
      setShowResult(false);
      Alert.alert("The Blood Test You Typed Is Unknown", "Please Reenter");
    }
  };

  const identifyBloodTest = () => {
    const userInput = remove_WhiteSpace_And_Special_Chars(
      userInputTestName.toLowerCase()
    );
    let mostMatches = 0;
    let mostMatchesBloodTest: BloodTestConfig = {
      name: "",
      threshold: -1,
    };
    bloodTests.forEach((bloodTest) => {
      let numOfMatches = checkCompatibility(bloodTest.name, userInput);
      if (mostMatches < numOfMatches) {
        mostMatches = numOfMatches;
        mostMatchesBloodTest = bloodTest;
      }
    });
    if (mostMatches === 0) {
      return;
    }
    return mostMatchesBloodTest;
  };
  const checkCompatibility = (bloodTestName: string, userInput: string) => {
    // this turns each bloodTest to an array of strings, and searches for each word if it's in user's input
    const arr = bloodTestName.split(" ");
    let numOfMatches = 0;

    arr.forEach((word) => {
      if (userInput.search(word) >= 0) {
        numOfMatches += 1;
      }
    });
    return numOfMatches;
  };

  const remove_WhiteSpace_And_Special_Chars = (userInput: string) => {
    //this turns "hello - World!" to "hello_World"
    const newString = userInput.replace(/[^A-Z0-9]+/gi, "_");
    return newString;
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputForm}>
        <Image
          style={styles.HelloHeartImg}
          source={{
            uri: "https://uploads-ssl.webflow.com/5d5c09963ef06a876ff2fb31/5d66b48b5e626fcd1d2b5f9c_HelloHeart_Logo_FullColor_RGB-p-500.png",
          }}
        />
        <View style={styles.InputTitle}>
          <Text style={styles.txt}>Test Name:</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setUserInputTestName(value)}
        />
        <View style={styles.InputTitle}>
          <Text style={styles.txt}>Result:</Text>
        </View>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          onChangeText={(value) => setUserInputTestResult(Number(value))}
        />
        <TouchableOpacity onPress={handleBloodTest}>
          <Text style={styles.btn}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.result}>
        {showResult ? (
          result ? (
            <>
              <Text style={styles.txt} numberOfLines={1} adjustsFontSizeToFit>
                Your {identifiedBloodTest?.name} blood test result is GOOD!
              </Text>
              <Text style={styles.txt}>Good!</Text>
              <Image
                style={styles.resultImg}
                source={{
                  uri: "https://i.pinimg.com/564x/32/c0/7f/32c07f1b29822841522c90947d127c2a.jpg",
                }}
              />
            </>
          ) : (
            <>
              <Text style={styles.txt} numberOfLines={1} adjustsFontSizeToFit>
                Your {identifiedBloodTest?.name} blood test result is BAD!
              </Text>
              <Image
                style={styles.resultImg}
                source={{
                  uri: "https://i.pinimg.com/736x/b7/57/e0/b757e029d3743b6da461434fbc4f713d--symbols-emoticons-heart-pictures.jpg",
                }}
              />
            </>
          )
        ) : (
          <View />
        )}
      </View>
      <View style={styles.signature}>
        <Text style={{ fontFamily: "Zapfino" }}>Made By Amit Shahal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: StatusBar.currentHeight || 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  result: {
    flex: 6,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputForm: {
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  HelloHeartImg: {
    height: 60,
    width: "90%",
  },
  InputTitle: {
    width: "90%",
    justifyContent: "flex-start",
  },

  input: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "rgb(244,36,64)",
    width: "90%",
    height: 45,
  },
  txt: {
    fontFamily: "Futura",
    fontWeight: "400",
    fontSize: 20,
  },
  btn: {
    top: 4,
    fontFamily: "Futura",
    fontWeight: "400",
    fontSize: 30,
  },
  signature: {
    flex: 1,
  },
  resultImg: {
    width: "90%",
    // height: undefined,
    aspectRatio: 1.2,
  },
});
