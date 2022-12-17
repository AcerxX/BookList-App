import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';
import * as ApiService from "../service/ApiService";
import * as Crypto from 'expo-crypto';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Globals from "../Globals";
import * as Haptics from "expo-haptics";

const isAndroid = Platform.OS === 'android';

const Register = ({navigation}) => {
    const {isDark} = useData();
    const {t} = useTranslation();

    const {setLoggedUser, setUserData} = useData();

    const [isValid, setIsValid] = useState({
        email: false,
        password: false,
    });

    const [login, setLogin] = useState({
        email: '',
        password: '',
    });

    const {assets, colors, gradients, sizes} = useTheme();

    const handleChange = useCallback(
        (value) => {
            setLogin((prevState) => ({...prevState, ...value}));
        },
        [setLogin],
    );

    const handleSignIn = useCallback(() => {
        if (!Object.values(isValid).includes(false)) {
            /** send/save registration data */
            console.log('handleSignIn', login);

            const {email, password} = login;

            ApiService.getUserByEmail(email)
                .then(({status, data}) => {
                    if (status === 404) {
                        alert("We don't know any account with this email!");
                        return;
                    }

                    Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512, password)
                        .then((encodedPassword) => {
                            if (data.password !== encodedPassword) {
                                alert("Although we know an account that has this email, the password you provided is not correct.");
                            } else {
                                AsyncStorage.setItem(Globals.STORAGE_USER_KEY, JSON.stringify(data))
                                    .then(() => {
                                        setLoggedUser(data.nickname);
                                        setUserData(data);
                                        navigation.navigate("Home");

                                        return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                                    });
                            }
                        });
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [isValid, login]);

    useEffect(() => {
        setIsValid((state) => ({
            ...state,
            email: regex.email.test(login.email),
            password: regex.password.test(login.password),
        }));
    }, [login, setIsValid]);

    return (
        <Block safe marginTop={sizes.md}>
            <Block paddingHorizontal={sizes.s}>
                <Block flex={0} style={{zIndex: 0}}>
                    <Image
                        background
                        resizeMode="cover"
                        padding={sizes.sm}
                        radius={sizes.cardRadius}
                        source={assets.background}
                        height={sizes.height * 0.3}>

                        <Text h4 center white marginBottom={sizes.md} marginTop={sizes.md}>
                            {t('login.title')}
                        </Text>
                    </Image>
                </Block>
                {/* register form */}
                <Block
                    keyboard
                    behavior={!isAndroid ? 'padding' : 'height'}
                    marginTop={-(sizes.height * 0.2 - sizes.l)}>
                    <Block
                        flex={0}
                        radius={sizes.sm}
                        marginHorizontal="8%"
                        shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
                    >
                        <Block
                            blur
                            flex={0}
                            intensity={90}
                            radius={sizes.sm}
                            overflow="hidden"
                            justify="space-evenly"
                            tint={colors.blurTint}
                            paddingVertical={sizes.sm}>
                            <Text p semibold center>
                                {t('login.subtitle')}
                            </Text>
                            {/* social buttons */}
                            <Block row center justify="space-evenly" marginVertical={sizes.m}>
                                <Button outlined gray shadow={!isAndroid} onPress={() => alert("NOT YET IMPLEMENTED!")}>
                                    <Image
                                        source={assets.facebook}
                                        height={sizes.m}
                                        width={sizes.m}
                                        color={isDark ? colors.icon : undefined}
                                    />
                                </Button>
                                <Button outlined gray shadow={!isAndroid} onPress={() => alert("NOT YET IMPLEMENTED!")}>
                                    <Image
                                        source={assets.apple}
                                        height={sizes.m}
                                        width={sizes.m}
                                        color={isDark ? colors.icon : undefined}
                                    />
                                </Button>
                                <Button outlined gray shadow={!isAndroid} onPress={() => alert("NOT YET IMPLEMENTED!")}>
                                    <Image
                                        source={assets.google}
                                        height={sizes.m}
                                        width={sizes.m}
                                        color={isDark ? colors.icon : undefined}
                                    />
                                </Button>
                            </Block>
                            <Block
                                row
                                flex={0}
                                align="center"
                                justify="center"
                                marginBottom={sizes.sm}
                                paddingHorizontal={sizes.xxl}>
                                <Block
                                    flex={0}
                                    height={1}
                                    width="50%"
                                    end={[1, 0]}
                                    start={[0, 1]}
                                    gradient={gradients.divider}
                                />
                                <Text center marginHorizontal={sizes.s}>
                                    {t('common.or')}
                                </Text>
                                <Block
                                    flex={0}
                                    height={1}
                                    width="50%"
                                    end={[0, 1]}
                                    start={[1, 0]}
                                    gradient={gradients.divider}
                                />
                            </Block>
                            {/* form inputs */}
                            <Block paddingHorizontal={sizes.sm}>
                                <Input
                                    autoCapitalize="none"
                                    textContentType={"username"}
                                    marginBottom={sizes.m}
                                    label={t('common.email')}
                                    keyboardType="email-address"
                                    placeholder={t('common.emailPlaceholder')}
                                    success={Boolean(login.email && isValid.email)}
                                    danger={Boolean(login.email && !isValid.email)}
                                    onChangeText={(value) => handleChange({email: value})}
                                />
                                <Input
                                    secureTextEntry
                                    textContentType={"password"}
                                    autoCapitalize="none"
                                    marginBottom={sizes.m}
                                    label={t('common.password')}
                                    placeholder={t('common.passwordPlaceholder')}
                                    onChangeText={(value) => handleChange({password: value})}
                                    success={Boolean(login.password && isValid.password)}
                                    danger={Boolean(login.password && !isValid.password)}
                                />
                            </Block>

                            <Button
                                onPress={handleSignIn}
                                marginVertical={sizes.s}
                                marginHorizontal={sizes.sm}
                                gradient={gradients.primary}
                                disabled={Object.values(isValid).includes(false)}>
                                <Text bold white transform="uppercase">
                                    {t('common.signin')}
                                </Text>
                            </Button>

                            <Button
                                primary
                                outlined
                                shadow={!isAndroid}
                                marginVertical={sizes.s}
                                marginHorizontal={sizes.sm}
                                onPress={() => navigation.navigate('Register')}>
                                <Text bold primary transform="uppercase">
                                    {t('common.signupNew')}
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
};

export default Register;
