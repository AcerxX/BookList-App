import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Articles, Components, Home, Pro} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import Register from "../booklist_screens/Register";
import Login from "../booklist_screens/Login";
import Friends from "../booklist_screens/Friends";
import {TouchableOpacity} from "react-native";
import useTheme from "../hooks/useTheme";

import {AntDesign} from '@expo/vector-icons';
import UserProfile from "../booklist_screens/UserProfile";
import Users from "../booklist_screens/Users";
import {useNavigation} from "@react-navigation/core";
import Shelves from "../booklist_screens/Shelves";
import Bookshelf from "../booklist_screens/Bookshelf";
import BooksLibrary from "../booklist_screens/BooksLibrary";
import BrowseBooks from "../booklist_screens/BrowseBooks";

const Stack = createStackNavigator();

export default () => {
    const {t} = useTranslation();
    const navigation = useNavigation();
    const screenOptions = useScreenOptions();

    const {icons, colors, gradients, sizes} = useTheme();

    return (
        <Stack.Navigator screenOptions={screenOptions.stack}>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{title: t('navigation.home')}}
            />

            <Stack.Screen
                name="Shelves"
                component={Shelves}
                options={{title: t('navigation.bookshelves')}}
            />

            <Stack.Screen
                name="Friends"
                component={Friends}
                options={{
                    title: t('navigation.friends'),
                    headerRight: () =>
                        <TouchableOpacity
                            style={{marginRight: sizes.sm}}
                            onPress={() =>
                                navigation.navigate("Users")
                            }>
                            <AntDesign name="plus" size={24} color={colors.icon}/>
                        </TouchableOpacity>

                }}
            />

            <Stack.Screen
                name="Components"
                component={Components}
                options={screenOptions.components}
            />

            <Stack.Screen
                name="BooksLibrary"
                component={BooksLibrary}
                options={{title: t('navigation.books_library')}}
            />

            <Stack.Screen
                name="Articles"
                component={Articles}
                options={{title: t('navigation.articles')}}
            />

            <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro}/>

            <Stack.Screen
                name="UserProfile"
                component={UserProfile}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Users"
                component={Users}
                options={{
                    headerLeft: () =>
                        <TouchableOpacity
                            style={{marginLeft: sizes.sm}}
                            onPress={() =>
                                navigation.navigate("Friends")
                            }>
                            <AntDesign name="left" size={24} color={colors.icon}/>
                        </TouchableOpacity>,
                    headerRight: () => <></>
                }}
            />

            <Stack.Screen
                name="BrowseBooks"
                component={BrowseBooks}
                options={{
                    headerTitle: "Your Books",
                    headerTitleAlign: "center",
                    headerTitleStyle: {fontSize: 22},
                    headerLeft: () =>
                        <TouchableOpacity
                            style={{marginLeft: sizes.sm}}
                            onPress={() =>
                                navigation.navigate("BooksLibrary")
                            }>
                            <AntDesign name="left" size={24} color={colors.icon}/>
                        </TouchableOpacity>,
                    headerRight: () => null
                }}
            />

            <Stack.Screen
                name="Bookshelf"
                component={Bookshelf}
                options={{
                    headerShown: false,
                    headerLeft: () =>
                        <TouchableOpacity
                            style={{marginLeft: sizes.sm}}
                            onPress={() =>
                                navigation.navigate("Shelves")
                            }>
                            <AntDesign name="left" size={24} color={colors.icon}/>
                        </TouchableOpacity>,
                    headerRight: () => <></>
                }}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};
