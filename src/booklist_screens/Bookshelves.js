import React, {useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Text} from '../components/';
import * as ApiService from "../service/ApiService";
import {TouchableOpacity} from "react-native";

const Bookshelves = ({navigation}) => {
        const {t} = useTranslation();

        const {userData} = useData();

        const {assets, colors, fonts, gradients, sizes} = useTheme();

        const [bookshelves, setBookshelves] = useState([]);

        useEffect(() => {
            ApiService.getUserById(userData.id)
                .then(({data}) => {
                    setBookshelves(data.bookshelfList);
                });
        }, []);

        return (
            <Block padding={sizes.sm}>
                <Block flex={0}>
                    <Button gradient={gradients.primary} marginBottom={sizes.base}>
                        <Text white bold transform="uppercase">
                            📚 Add a BookShelf
                        </Text>
                    </Button>
                </Block>
                <Block flex={0.03}>
                    <Text h5 semibold>
                        {t('bookshelves.shelves_list')}
                    </Text>
                </Block>
                <Block scroll flex={1}>
                    {bookshelves.map((bookshelf) => {
                        return <Block card padding={0} marginTop={sizes.sm}>
                            <TouchableOpacity
                                onPress={() => {
                                    alert("DADA")
                                }}
                            >
                                <Image
                                    background
                                    resizeMode="cover"
                                    source={assets.card5}
                                    radius={sizes.cardRadius}>
                                    <Block color="rgba(0,0,0,0.3)" padding={sizes.padding}>
                                        <Text h4 white marginVertical={sizes.sm} center>
                                            {bookshelf.name}
                                        </Text>
                                    </Block>
                                </Image>
                            </TouchableOpacity>
                        </Block>
                    })}
                </Block>
            </Block>
        );
    }
;

export default Bookshelves;
