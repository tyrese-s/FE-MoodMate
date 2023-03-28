import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, StyleSheet, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function LoginScreen() {
  const [pressed, setPressed] = useState(false);

  return (
    <KeyboardAwareScrollView>
      {!pressed ?
        <View style={styles.layout}>
          <LoginForm />
          <Button title="Sign Up" onPress={() => setPressed(true)} />
        </View>
      : <View style={styles.layout}>
          <SignUpForm />
        </View>
      }
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
    padding: 64,
  },
});