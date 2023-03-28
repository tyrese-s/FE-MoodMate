import { Button, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';

export default function SignUpScreen () {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("username"));
  console.log(watch("password"));
  console.log(watch("firstName"));
  console.log(watch("lastName"));
  console.log(watch("email"));




    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <form style={styles.form}>
          <label htmlFor='firstName'>First Name</label>
            <input placeholder='First name' {...register("firstName", { required: true })} id='firstName'/>
            {errors.firstName && <span>This field is required</span>}
            <label htmlFor='lastName'>Last Name</label>
            <input placeholder='Last name' {...register("lastName", { required: true })} id='lastName'/>
            {errors.lastName && <span>This field is required</span>}
            <label htmlFor='email'>Email address</label>
            <input placeholder='Email address' {...register("email", { required: true })} id='email'/>
            {errors.email && <span>This field is required</span>}
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