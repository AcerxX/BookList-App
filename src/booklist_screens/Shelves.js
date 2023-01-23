import React, {useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Text} from '../components/';
import * as ApiService from "../service/ApiService";
import {TextInput, TouchableOpacity} from "react-native";

const Shelves = ({navigation}) => {
        const {t} = useTranslation();

        const {userData} = useData();

        const {assets, colors, fonts, gradients, sizes} = useTheme();

        const [bookshelves, setBookshelves] = useState([]);
        const [newBookshelfName, setNewBookshelfName] = useState("");
        const [displayNewBookshelfCard, setDisplayNewBookshelfCard] = useState(false);

        const addNewBookshelf = () => {
            ApiService.addBookshelf(userData.id, newBookshelfName)
                .then(({data}) => {
                    refreshBookshelfList();
                    handleDiscardNewBookshelfCard();
                })
                .catch((err) => {
                    console.error(err);

                    alert(t("common.error"))
                })
        }

        const handleDiscardNewBookshelfCard = () => {
            setDisplayNewBookshelfCard(false);
            setNewBookshelfName("");
        }

        function refreshBookshelfList() {
            ApiService.getUserById(userData.id)
                .then(({data}) => {
                    setBookshelves(data.bookshelfList.sort((a, b) => b.id - a.id));
                });
        }

        useEffect(() => {
            refreshBookshelfList();
        }, [navigation]);

        return (
            <Block padding={sizes.sm}>
                <Block flex={0}>
                    <Button gradient={gradients.primary} marginBottom={sizes.base}
                            onPress={() => setDisplayNewBookshelfCard(true)}>
                        <Text white bold transform="uppercase">
                            {t('shelves.add_button')}
                        </Text>
                    </Button>
                </Block>
                <Block flex={0.03}>
                    <Text h5 semibold>
                        {t('shelves.shelves_list')}
                    </Text>
                </Block>
                <Block scroll flex={1}>
                    {displayNewBookshelfCard &&
                        <Block card padding={0} marginTop={sizes.sm}>
                            <Image
                                background
                                resizeMode="cover"
                                source={assets[`card${Math.floor(Math.random() * 3) + 1}`]}
                                radius={sizes.cardRadius}>
                                <Block color="rgba(0,0,0,0.3)" padding={sizes.padding}>
                                    <TextInput marginVertical={sizes.sm}
                                               placeholder={"A Shelf Needs A Name"}
                                               style={{
                                                   fontWeight: 'bold',
                                                   fontSize: "24",
                                                   color: 'white',
                                                   textAlign: "center"
                                               }}
                                               value={newBookshelfName}
                                               onChangeText={setNewBookshelfName}
                                    />
                                </Block>
                                <Block row color="rgba(0,0,0,0.3)" padding={sizes.padding}>
                                    <Block marginRight={sizes.sm}>
                                        <Button gradient={gradients.success} marginBottom={sizes.base}
                                                onPress={addNewBookshelf}>
                                            <Text white bold transform="uppercase">
                                                {t('common.save')}
                                            </Text>
                                        </Button>
                                    </Block>
                                    <Block marginLeft={sizes.sm}>
                                        <Button gradient={gradients.danger} marginBottom={sizes.base}
                                                onPress={handleDiscardNewBookshelfCard}>
                                            <Text white bold transform="uppercase">
                                                {t('common.cancel')}
                                            </Text>
                                        </Button>
                                    </Block>
                                </Block>
                            </Image>
                        </Block>
                    }


                    {bookshelves.map((bookshelf) => {
                        return <Block card padding={0} marginTop={sizes.sm}>
                            <TouchableOpacity
                                key={`bookshelf-${bookshelf.id}`}
                                onPress={() => {
                                    navigation.navigate("Bookshelf", {bookshelf: bookshelf})
                                }}
                            >
                                <Image
                                    background
                                    resizeMode="cover"
                                    source={assets[`card${(bookshelf.id % 4) + 1}`]}
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

export default Shelves;
