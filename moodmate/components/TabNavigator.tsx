import { StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import QuoteUploader from "./QuoteUploader";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import MoodPage from "./MoodPage";
import TimerScreen from "./TimerComponents/TimerScreen";
import JournalPage from "./JournalPage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CalendarScreen from "./CalendarScreen";
import QuotePage from "./QuotePage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home Screen" component={HomeScreen} />
      <Stack.Screen name="MoodPage" component={MoodPage} />
      <Stack.Screen name="Journal" component={JournalPage} />
      <Stack.Screen name="Upload" component={QuoteUploader} />
      <Stack.Screen name="Quotes" component={QuotePage} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "#006D77",
        tabBarStyle: {
          backgroundColor: "white",
          height: 55,
        },
        tabBarItemStyle: {
          margin: 4,
          padding: 4,
          borderRadius: 30,
        },
      }}
    >
      <Tab.Screen
        name="Meditate"
        component={TimerScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return focused ? null : (
              <Text style={{ fontSize: 10, color: "grey" }}>Meditate</Text>
            );
          },
          tabBarIcon: ({ color, focused }) => {
            return (
              <Icon
                name="meditation"
                size={focused ? 40 : 30}
                color={focused ? "white" : color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ({ focused }) => {
            return focused ? null : (
              <Text style={{ fontSize: 10, color: "grey" }}>Home</Text>
            );
          },
          tabBarIcon: ({ color, focused }) => {
            return (
              <Icon
                name="home-variant"
                size={focused ? 40 : 30}
                color={focused ? "white" : color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Journal"
        component={CalendarScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return focused ? null : (
              <Text style={{ fontSize: 10, color: "grey" }}>Journal</Text>
            );
          },
          tabBarIcon: ({ color, focused }) => {
            return (
              <Icon
                name="calendar-month"
                size={focused ? 40 : 30}
                color={focused ? "white" : color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
