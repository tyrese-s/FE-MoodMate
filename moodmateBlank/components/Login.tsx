import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';

export default function Login () {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("username"));
  console.log(watch("password"));


    return (
      <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
          <form style={styles.form}>
            <View style={styles.formInput}>
            <label htmlFor='username'>Username</label>
            <input placeholder='username' {...register("username", { required: true })} id='username' style={styles.input}/>
            {errors.username && <span>This field is required</span>}
            </View>
            <View style={styles.formInput}>
            <label htmlFor='password'>Password</label>
            <input placeholder='password'{...register("password", { required: true })} id='password' style={styles.input}/>
            {errors.password && <span>This field is required</span>}
            <Button title="submit" onPress={handleSubmit(onSubmit)}   />
            </View>
          </form>
        </SafeAreaView> 
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
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 200,
    height: '100%',
    width: '60%',
  },
  formInput: {
    margin:'10px'
  },
  input:{
    width: '90%',
    padding: 6,
    borderRadius: 7,
    borderWidth: 1

  }
})

// on styling branch