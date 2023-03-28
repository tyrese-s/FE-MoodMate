import {useNavigation} from '@react-navigation/native';
import React, { useContext } from 'react';
import { useForm, useController } from 'react-hook-form';
import { Text, TextInput, View, Alert, StyleSheet, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthContext } from '../App';

const Input = ({ name, control, secureTextEntry }) => {
    const {field, } = useController({
        control,
        defaultValue: '',
        name,
    });
    return (
        <TextInput
            value={field.value}
            onChangeText={field.onChange}
            secureTextEntry={secureTextEntry}
            style={styles.field} 
        />
    )
}

export default function LoginForm() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const { setUser } = useContext(AuthContext);
    const nav = useNavigation();

    const onSubmit = (data) => {
    const {email, password } = data;
    
    console.log(data);  

    if (email !== '' && password !== '') setUser(true);
      else { alert("Input details") };
    };
  
    return (
      <KeyboardAwareScrollView style={styles.layout}>
          <Text>Email</Text>
          <Input name='email' control={control} secureTextEntry={false} />
          <Text>Password</Text>
          <Input name='password' control={control} secureTextEntry={true} />
          <Button title="Login" onPress={handleSubmit(onSubmit)} />
          <Button title="Sign Up" onPress={() => nav.navigate('SignUp')} />
      </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
    layout: {
      flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    },
      title: {
          fontSize: 32,
          marginBottom: 16,
          padding: 64,
      },
      field: {
          backgroundColor: 'silver'
      }
});