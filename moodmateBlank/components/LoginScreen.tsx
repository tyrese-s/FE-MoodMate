import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, StyleSheet, Text, View} from 'react-native';
import { AuthContext } from '../App';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const { setUser } = useContext(AuthContext);
  const [pressed, setPressed] = useState(false);

  const nav = useNavigation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: {}) => {
    console.log(data);
    setUser(true);
  };

  return (
    <KeyboardAwareScrollView>
      {!pressed ?
        <View style={styles.layout}>
          <Text style={styles.title}>Login Form Goes here</Text>
          <Button title="Login" onPress={handleSubmit(onSubmit)} />
          <Button title="Sign Up" onPress={() => setPressed(true)} />
        </View>
      : <View>
          <Text style={styles.title}>Sign Up Form Goes here</Text>
          <Button title="Submit & Login" onPress={handleSubmit(onSubmit)} />
        </View>
      }
      
      {/* <form style={styles.form}>
            <label htmlFor='username'>Username</label>
            <TextInput placeholder='username' {...register("username", { required: true })} id='username'/>
            {errors.username && <span>This field is required</span>}
            <label htmlFor='password'>Password</label>
            <TextInput placeholder='password'{...register("password", { required: true })} id='password'/>
            {errors.password && <span>This field is required</span>}
          </form> */}
              
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
  //  form: {
  //   width: '50%',
  // }
});