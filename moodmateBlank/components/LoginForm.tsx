import React, { useContext } from 'react';
import { useForm, useController } from 'react-hook-form';
import { Text, TextInput, View, Alert, StyleSheet, Button } from 'react-native';
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

  const onSubmit = (data: {}) => {
    const {email, password } = data;
    console.log(data);
    if (email !== '' && password !== '') setUser(true);
      else { alert("Input details") };
};
  
    return (
      <View>
            <Text>Email</Text>
            <Input name='email' control={control} secureTextEntry={false} />
            <Text>Password</Text>
            <Input name='password' control={control} secureTextEntry={true} />
            <Button title="Login" onPress={handleSubmit(onSubmit)} />
      </View>
  );
}

const styles = StyleSheet.create({
    field: {
        backgroundColor: 'silver'
    }
  });