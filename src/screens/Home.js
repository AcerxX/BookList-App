import React, {useCallback, useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Product, Text} from '../components/';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Globals from "../Globals";
import {useNavigation} from "@react-navigation/core";

const Home = ({navigation}) => {
    const {t} = useTranslation();

    const {following, trending} = useData();

    const {assets, colors, fonts, gradients, sizes} = useTheme();

    const [tab, setTab] = useState(0);
    const [products, setProducts] = useState(following);

    const handleProducts = useCallback(
        (tab) => {
            setTab(tab);
            setProducts(tab === 0 ? following : trending);
        },
        [following, trending, setTab, setProducts],
    );

    useEffect(() => {
        AsyncStorage.getItem(Globals.STORAGE_USER_KEY)
            .then((userInfo) => {
                if (userInfo === null) {
                    navigation.navigate("Login");
                } else {
                    console.log(userInfo);
                }
            });
    }, []);

    return (
        <Block>
            {/* search input */}
            <Block color={colors.card} flex={0} padding={sizes.padding}>
                <Input search placeholder={t('common.search')}/>
            </Block>

            {/* toggle products list */}
            <Block
                row
                flex={0}
                align="center"
                justify="center"
                color={colors.card}
                paddingBottom={sizes.sm}>
                <Button onPress={() => handleProducts(0)}>
                    <Block row align="center">
                        <Block
                            flex={0}
                            radius={6}
                            align="center"
                            justify="center"
                            marginRight={sizes.s}
                            width={sizes.socialIconSize}
                            height={sizes.socialIconSize}
                            gradient={gradients?.[tab === 0 ? 'primary' : 'secondary']}>
                            <Image source={assets.extras} color={colors.white} radius={0}/>
                        </Block>
                        <Text p font={fonts?.[tab === 0 ? 'medium' : 'normal']}>
                            {t('home.following')}
                        </Text>
                    </Block>
                </Button>
                <Block
                    gray
                    flex={0}
                    width={1}
                    marginHorizontal={sizes.sm}
                    height={sizes.socialIconSize}
                />
                <Button onPress={() => handleProducts(1)}>
                    <Block row align="center">
                        <Block
                            flex={0}
                            radius={6}
                            align="center"
                            justify="center"
                            marginRight={sizes.s}
                            width={sizes.socialIconSize}
                            height={sizes.socialIconSize}
                            gradient={gradients?.[tab === 1 ? 'primary' : 'secondary']}>
                            <Image
                                radius={0}
                                color={colors.white}
                                source={assets.documentation}
                            />
                        </Block>
                        <Text p font={fonts?.[tab === 1 ? 'medium' : 'normal']}>
                            {t('home.trending')}
                        </Text>
                    </Block>
                </Button>
            </Block>

            {/* products list */}
            <Block
                scroll
                paddingHorizontal={sizes.padding}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: sizes.l}}>
                <Block row wrap="wrap" justify="space-between" marginTop={sizes.sm}>
                    {products?.map((product) => (
                        <Product {...product} key={`card-${product?.id}`}/>
                    ))}
                </Block>
            </Block>
        </Block>
    );
};

export default Home;
