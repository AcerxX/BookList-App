import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';

import {createDrawerNavigator, DrawerContentScrollView, useIsDrawerOpen,} from '@react-navigation/drawer';

import Screens from './Screens';
import {Block, Button, Image, Text} from '../components';
import {useData, useTheme, useTranslation} from '../hooks';
import Globals from "../Globals";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

/* drawer menu screens navigation */
const ScreensStack = () => {
    const {colors} = useTheme();
    const isDrawerOpen = useIsDrawerOpen();
    const animation = useRef(new Animated.Value(0)).current;

    const scale = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.88],
    });

    const borderRadius = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 16],
    });

    const animatedStyle = {
        borderRadius: borderRadius,
        transform: [{scale: scale}],
    };

    useEffect(() => {
        Animated.timing(animation, {
            duration: 200,
            useNativeDriver: true,
            toValue: isDrawerOpen ? 1 : 0,
        }).start();
    }, [isDrawerOpen, animation]);

    return (
        <Animated.View
            style={StyleSheet.flatten([
                animatedStyle,
                {
                    flex: 1,
                    overflow: 'hidden',
                    borderColor: colors.card,
                    borderWidth: isDrawerOpen ? 1 : 0,
                },
            ])}>
            {/*  */}
            <Screens/>
        </Animated.View>
    );
};

/* custom drawer menu */
const DrawerContent = (props) => {
    const {navigation} = props;
    const {t} = useTranslation();
    const {isDark, handleIsDark, userData} = useData();
    const [active, setActive] = useState('Home');
    const {assets, colors, gradients, sizes} = useTheme();
    const labelColor = colors.text;

    const handleNavigation = useCallback(
        (to) => {
            setActive(to);
            navigation.navigate(to);
        },
        [navigation, setActive],
    );

    const handleLogout = useCallback(() => {
        AsyncStorage.removeItem(Globals.STORAGE_USER_KEY)
            .then(() => {
                navigation.navigate("Login");
            })
    }, []);

    // screen list for Drawer menu
    const screens = [
        {name: t('screens.home'), to: 'Home', icon: assets.home},
        {name: t('screens.books_library'), to: 'BooksLibrary', icon: assets.components},
        // {name: t('screens.lists'), to: 'Shelves', icon: assets.components},
        {name: t('screens.friends'), to: 'Friends', icon: assets.profile},

        {name: t('screens.components'), to: 'Components', icon: assets.components},
        {name: t('screens.articles'), to: 'Articles', icon: assets.document},
    ];

    return (
        <DrawerContentScrollView
            {...props}
            scrollEnabled
            removeClippedSubviews
            renderToHardwareTextureAndroid
            contentContainerStyle={{paddingBottom: sizes.padding}}>
            <Block paddingHorizontal={sizes.padding}>
                <Block flex={0} row align="center" marginBottom={sizes.l}>
                    <Image
                        radius={0}
                        width={33}
                        height={33}
                        color={colors.text}
                        source={assets.logo}
                        marginRight={sizes.sm}
                    />
                    <Block>
                        <Text size={12} semibold>
                            {t('app.name')}
                        </Text>
                        <Text size={12} semibold>
                            {userData.nickname}
                        </Text>
                    </Block>
                </Block>

                {screens?.map((screen, index) => {
                    const isActive = active === screen.to;
                    return (
                        <Button
                            row
                            justify="flex-start"
                            marginBottom={sizes.s}
                            key={`menu-screen-${screen.name}-${index}`}
                            onPress={() => handleNavigation(screen.to)}>
                            <Block
                                flex={0}
                                radius={6}
                                align="center"
                                justify="center"
                                width={sizes.md}
                                height={sizes.md}
                                marginRight={sizes.s}
                                gradient={gradients[isActive ? 'primary' : 'white']}>
                                <Image
                                    radius={0}
                                    width={14}
                                    height={14}
                                    source={screen.icon}
                                    color={colors[isActive ? 'white' : 'black']}
                                />
                            </Block>
                            <Text p semibold={isActive} color={labelColor}>
                                {screen.name}
                            </Text>
                        </Button>
                    );
                })}

                <Block
                    flex={0}
                    height={1}
                    marginRight={sizes.md}
                    marginVertical={sizes.sm}
                    gradient={gradients.menu}
                />

                {/*<Text semibold transform="uppercase" opacity={0.5}>*/}
                {/*    {t('menu.documentation')}*/}
                {/*</Text>*/}

                <Button
                    row
                    justify="flex-start"
                    // marginTop={sizes.sm}
                    marginBottom={sizes.s}
                    onPress={handleLogout}>
                    <Block
                        flex={0}
                        radius={6}
                        align="center"
                        justify="center"
                        width={sizes.md}
                        height={sizes.md}
                        marginRight={sizes.s}
                        gradient={gradients.white}>
                        <Image
                            radius={0}
                            width={14}
                            height={14}
                            color={colors.danger}
                            source={assets.close}
                        />
                    </Block>
                    <Text p color={colors.danger}>
                        {t('menu.logout')}
                    </Text>
                </Button>

                {/*<Block row justify="space-between" marginTop={sizes.sm}>*/}
                {/*    <Text color={labelColor}>{t('darkMode')}</Text>*/}
                {/*    <Switch*/}
                {/*        checked={isDark}*/}
                {/*        onPress={(checked) => {*/}
                {/*            handleIsDark(checked);*/}
                {/*            Alert.alert(t('pro.title'), t('pro.alert'));*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</Block>*/}
            </Block>
        </DrawerContentScrollView>
    );
};

/* drawer menu navigation */
export default () => {
    const {gradients} = useTheme();

    return (
        <Block gradient={gradients.light}>
            <Drawer.Navigator
                drawerType="slide"
                overlayColor="transparent"
                sceneContainerStyle={{backgroundColor: 'transparent'}}
                drawerContent={(props) => <DrawerContent {...props} />}
                drawerStyle={{
                    flex: 1,
                    width: '60%',
                    borderRightWidth: 0,
                    backgroundColor: 'transparent',
                }}>
                <Drawer.Screen name="Screens" component={ScreensStack}/>
            </Drawer.Navigator>
        </Block>
    );
};
