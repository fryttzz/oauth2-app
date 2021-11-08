import React from "react";
import { View } from "react-native";
import * as AuthSession from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Button";
import { SignInContent } from "../../components/SignInContent";

import { styles } from "./styles";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

type AuthResponse = {
  type: string;
  params: {
    access_token: string;
  };
};

export function SignIn() {
  const navigation = useNavigation();

  //obter informações do usuário
  async function handleSignIn() {
    const RESPONSE_TYPE = "token";
    const ESCOPE = encodeURI("profile email");
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${ESCOPE}`;
    const { type, params } = (await AuthSession.startAsync({
      authUrl,
    })) as AuthResponse;
    if (type === "success") {
      navigation.navigate("Profile", { token: params.access_token });
    }
  }

  return (
    <View style={styles.container}>
      <SignInContent />

      <Button
        title="Entrar com Google"
        icon="social-google"
        onPress={handleSignIn}
      />
    </View>
  );
}
