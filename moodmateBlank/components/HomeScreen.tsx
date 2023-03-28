import { Button, StyleSheet, Text, View } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../App';


export default function HomeScreen () {
  const { setUser } = useContext(AuthContext);

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Home Dashboard</Text>
      <Button title='Logout' onPress={() => {setUser(false)}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
   form: {
    width: '50%',
  }
});