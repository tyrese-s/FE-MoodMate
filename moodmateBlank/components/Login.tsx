import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Constants from 'expo-constants';
import { useForm } from 'react-hook-form';

export default function Login () {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("username"));
  console.log(watch("password"));


    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <form style={styles.form}>
            <label htmlFor='username'>Username</label>
            <input placeholder='username' {...register("username", { required: true })} id='username'/>
            {errors.username && <span>This field is required</span>}
            <label htmlFor='password'>Password</label>
            <input placeholder='password'{...register("password", { required: true })} id='password'/>
            {errors.password && <span>This field is required</span>}
            <Button title="submit" onPress={handleSubmit(onSubmit)}  />
          </form>
        </View> 
      </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '50%',
  }
});