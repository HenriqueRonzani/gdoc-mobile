import { AuthHeader } from "@/components/auth/auth-header";
import { RegisterContextProvider } from "@/providers/register-context-provider";
import { RegisterScreen1 } from "@/screens/auth/register-screen-1";
import { RegisterIndividualScreen2 } from "@/screens/auth/register-individual-screen-2";
import { RootStackParamList } from "@/types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegisterScreen3 } from "@/screens/auth/register-screen-3";
import { RegisterScreen4 } from "@/screens/auth/register-screen-4";
import { RegisterOrganizationScreen2 } from "@/screens/auth/register-organization-screen-2";

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RegisterStack() {
    return (
        <RegisterContextProvider>
            <Stack.Navigator initialRouteName="Register1" screenOptions={{header:() => null}}>
                <Stack.Screen name="Register1" component={RegisterScreen1}/>
                <Stack.Screen name="RegisterIndividual2" component={RegisterIndividualScreen2}/>
                <Stack.Screen name="RegisterCompany2" component={RegisterOrganizationScreen2}/>
                <Stack.Screen name="Register3" component={RegisterScreen3}/>
                <Stack.Screen name="Register4" component={RegisterScreen4}/>
            </Stack.Navigator>
        </RegisterContextProvider>
    )
}