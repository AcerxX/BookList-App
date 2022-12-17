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
        nickname: false,
        email: false,
        password: false,
        agreed: false,
    });

    const [registration, setRegistration] = useState({
        nickname: '',
        email: '',
        password: '',
        agreed: false,
    });

    const {assets, colors, gradients, sizes} = useTheme();

    const handleChange = useCallback(
        (value) => {
            setRegistration((prevState) => ({...prevState, ...value}));
        },
        [setRegistration],
    );

    const handleSignUp = useCallback(() => {
        if (!Object.values(isValid).includes(false)) {
            /** send/save registration data */
            console.log('handleSignUp', registration);

            const {nickname, email, password} = registration;

            ApiService.getUserByEmail(email)
                .then(({status}) => {
                    if (status === 200) {
                        alert("There is already an account created with this email!");
                    } else {
                        Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512, password)
                            .then((encodedPassword) => {
                                ApiService.registerUser(nickname, email, encodedPassword)
                                    .then(({data}) => {
                                        // Save user in storage a.k.a login
                                        AsyncStorage.setItem(Globals.STORAGE_USER_KEY, JSON.stringify(data))
                                            .then(() => {
                                                setLoggedUser(data.nickname);
                                                setUserData(data);
                                                navigation.navigate("Home");

                                                return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                                            });
                                    })
                                    .catch((error) => {
                                        console.error(error);

                                        alert(error);
                                    })
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }, [isValid, registration]);

    useEffect(() => {
        setIsValid((state) => ({
            ...state,
            nickname: regex.nickname.test(registration.nickname),
            email: regex.email.test(registration.email),
            password: regex.password.test(registration.password),
            agreed: registration.agreed,
        }));
    }, [registration, setIsValid]);

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
                            {t('register.title')}
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
                                {t('register.subtitle')}
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
                                    marginBottom={sizes.m}
                                    label={t('common.nickname')}
                                    placeholder={t('common.nicknamePlaceholder')}
                                    success={Boolean(registration.nickname && isValid.nickname)}
                                    danger={Boolean(registration.nickname && !isValid.nickname)}
                                    onChangeText={(value) => handleChange({nickname: value})}
                                />
                                <Input
                                    autoCapitalize="none"
                                    textContentType={"username"}
                                    marginBottom={sizes.m}
                                    label={t('common.email')}
                                    keyboardType="email-address"
                                    placeholder={t('common.emailPlaceholder')}
                                    success={Boolean(registration.email && isValid.email)}
                                    danger={Boolean(registration.email && !isValid.email)}
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
                                    success={Boolean(registration.password && isValid.password)}
                                    danger={Boolean(registration.password && !isValid.password)}
                                />
                            </Block>
                            {/* checkbox terms */}
                            <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
                                <Checkbox
                                    marginRight={sizes.sm}
                                    checked={registration?.agreed}
                                    onPress={(value) => handleChange({agreed: value})}
                                />
                                <Text paddingRight={sizes.s}>
                                    {t('common.agree')}
                                    <Text
                                        semibold
                                        onPress={() => {
                                            Linking.openURL('https://www.creative-tim.com/terms');
                                        }}>
                                        {t('common.terms')}
                                    </Text>
                                </Text>
                            </Block>
                            <Button
                                onPress={handleSignUp}
                                marginVertical={sizes.s}
                                marginHorizontal={sizes.sm}
                                gradient={gradients.primary}
                                disabled={Object.values(isValid).includes(false)}>
                                <Text bold white transform="uppercase">
                                    {t('common.signup')}
                                </Text>
                            </Button>
                            <Button
                                primary
                                outlined
                                shadow={!isAndroid}
                                marginVertical={sizes.s}
                                marginHorizontal={sizes.sm}
                                onPress={() => navigation.navigate('Login')}>
                                <Text bold primary transform="uppercase">
                                    {t('common.signinExisting')}
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
