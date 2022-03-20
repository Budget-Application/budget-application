import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./LoginStyles";
import {
  PhoneAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../db/setup";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import PhoneInput from "react-native-phone-number-input";
import { getApp } from "firebase/app";
import { getUserDetails } from "../../db/apis/user";
import LoadingView from "../../components/loadingView";

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const [nextPage, setNextPage] = useState(false);
  const phoneInput = useRef(null);
  const recaptchaVerifier = useRef(null);
  const [UID, setUID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUID(user.uid);
        const userDetails = await getUserDetails(user.uid);
        setIsLoading(false);
        if (userDetails) {
          console.log("User is already signed-in");
          navigation.replace("Home", {
            id: userDetails.id,
            userDetails: userDetails,
          });
        } else {
          console.log("User signed in, but details not updated");
          navigation.navigate("UserDetails", {
            uid: user.uid,
            phoneNumber: user.phoneNumber,
          });
        }
      } else {
        console.log("User not signed in");
        setIsLoading(false);
      }
    });
  }, []);

  const onNext = async () => {
    if (validatePhoneNumber(phoneNumber)) {
      await signIn();
    }
  };

  const signIn = async () => {
    try {
      setNextPage(true);
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
    } catch (err) {
      console.log("Error Sending OTP: " + err.message);
      Alert.alert("Network Error", "Please try again later", [{ text: "OK" }]);
    }
  };

  const validatePhoneNumber = (number) => {
    if (number.match(/^\+?\d{10,14}$/)) {
      return true;
    } else {
      Alert.alert("Invalid phone number", "Please enter valid phone number", [
        { text: "OK" },
      ]);
      return false;
    }
  };

  return (
    <>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={getApp().options}
        title="Are you human?"
        cancelLabel="close"
      />
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: "100%" }}
          keyboardShouldPersistTaps="always"
        >
          <Image
            style={styles.logo}
            source={require("../../assets/icons/login.png")}
          />
          {nextPage ? (
            <>
              <Text style={styles.phoneTitle}>
                Enter OTP sent to your phone
              </Text>
              <TextInput
                style={{ ...styles.input, paddingRight: 16 }}
                placeholderTextColor="#aaaaaa"
                editable={!!verificationId}
                placeholder="6-digit OTP value"
                onChangeText={setVerificationCode}
                value={verificationCode}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  try {
                    const credential = PhoneAuthProvider.credential(
                      verificationId,
                      verificationCode
                    );
                    signInWithCredential(auth, credential).then(() => {
                      console.log(auth.currentUser);
                      navigation.navigate("UserDetails", {
                        uid: auth.currentUser.uid,
                        phoneNumber: auth.currentUser.phoneNumber,
                      });
                    });
                  } catch (err) {
                    Alert.alert("Invalid OTP", "Please try again later", [
                      { text: "OK" },
                    ]);
                  }
                }}
              >
                <Text style={styles.buttonTitle}>Verify</Text>
              </TouchableOpacity>
            </>
          ) : isLoading || !!auth.currentUser ? (
            <LoadingView />
          ) : (
            <>
              <Text style={styles.phoneTitle}>Enter your phone number</Text>

              <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode="IN"
                layout="first"
                withShadow
                autoFocus
                containerStyle={styles.input}
                textContainerStyle={{ paddingVertical: 0 }}
                onChangeFormattedText={(text) => {
                  setPhoneNumber(text);
                }}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={async () => onNext()}
              >
                <Text style={styles.buttonTitle}>Next</Text>
              </TouchableOpacity>
            </>
          )}
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}
