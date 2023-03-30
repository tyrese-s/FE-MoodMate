import { useForm, useController } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Button, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SelectList } from "react-native-dropdown-select-list";
import React from "react";


export default function JournalPage () {
    const [selected, setSelected] = React.useState("");
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmit = (data: any): void => {
        console.log(data);
      }

      interface Props {
        name: string;
        control: any;
      }

const Input = (props: Props) => {
    const { name, control } = props;
    const { field } = useController({
      control,
      defaultValue: "",
      name,
    });
    return (
      <TextInput
        value={field.value}
        multiline
        numberOfLines={4}
        maxLength={40}
        onChangeText={field.onChange}
        style={styles.textField}
      />
    );
  };

  const howImFeeling = [
    {key:'1', value:'1'},
    {key:'2', value:'2'},
    {key:'3', value:'3'},
    {key:'4', value:'4'},
    {key:'5', value:'5'},
    {key:'6', value:'6'},
    {key:'7', value:'7'},
    {key:'8', value:'8'},
    {key:'9', value:'9'},
    {key:'10', value:'10'},
]
    return (
        <SafeAreaView>
            <KeyboardAwareScrollView>
            <Text style={styles.title}>Mood:</Text>
            <Input name="Mood" control={control} />
            <Text style={styles.title}>Overview</Text>
            <Input name="Overview" control={control}/>
            <Text style={styles.title}>Food & Drink</Text>
            <Input name="Food&Drink" control={control}  />
            <Text style={styles.title}>Exercise</Text>
            <Input name="Exercise" control={control} />
            <Input name="HowImFeelig" control={control}/>
            <Text style={styles.title}>How are you feeling?</Text>
            <SelectList 
                setSelected={(value: string) => setSelected(value)} 
                data={howImFeeling} 
                save="value"/>
            <Button title="Submit Journal entry" onPress={handleSubmit(onSubmit)} />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center',
        paddingTop: 16,
        paddingBottom: 4,
    },
    textField: {
        backgroundColor: "silver"
    }
})