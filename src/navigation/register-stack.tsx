import { AuthHeader } from "@/components/auth/auth-header";
import { RegisterContextProvider } from "@/providers/register-context-provider";
import { RegisterScreen1 } from "@/screens/auth/register-screen-1";
import { RegisterIndividualScreen2 } from "@/screens/auth/register-individual-screen-2";
import { RootStackParamList } from "@/types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RegisterStack() {
    return (
        <RegisterContextProvider>
            <Stack.Navigator initialRouteName="Register1" screenOptions={{header:() => null}}>
                <Stack.Screen name="Register1" component={RegisterScreen1}/>
                <Stack.Screen name="RegisterIndividual2" component={RegisterIndividualScreen2}/>
            </Stack.Navigator>
        </RegisterContextProvider>
    )
}