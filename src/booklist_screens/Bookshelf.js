import React, {useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Text} from '../components/';
import {Alert, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";

const Bookshelf = ({navigation, route: {params: {bookshelf}}}) => {
    const {t} = useTranslation();

    const {userData} = useData();

    const {assets, colors, fonts, gradients, sizes} = useTheme();

    const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
    const IMAGE_VERTICAL_SIZE =
        (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
    const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
    const IMAGE_VERTICAL_MARGIN =
        (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

    const [books, setBooks] = useState([]);

    useEffect(() => {
        setBooks(bookshelf.books);
    }, [navigation]);

    const handleDelete = () => {
        Alert.alert(
            'Confirm',
            'Are you sure you want to delete this Shelf?',
            [
                {text: t('common.cancel'), onPress: () => alert('Cancel Pressed'), style: 'cancel'},
                {text: t('common.delete'), onPress: () => alert('YES Pressed')},
            ],
            {cancelable: false}
        )
    }

    const deleteShelf = () => {

    }

    return (
        <Block safe>
            <Block scroll>
                <Block>
                    <Image
                        background
                        style={{flex: 1, width: null, height: null}}
                        source={assets[`card${(bookshelf.id % 4) + 1}`]}
                    >
                        <Block row flex={0.4} color="rgba(0,0,0,0.3)" paddingTop={sizes.padding}>
                            <Block flex={8}>
                                <TouchableOpacity
                                    style={{marginLeft: sizes.sm}}
                                    onPress={() =>
                                        navigation.navigate("Shelves")
                                    }>
                                    <AntDesign name="left" size={24} color={colors.white}/>
                                </TouchableOpacity>
                            </Block>

                            <Block flex={1}>
                                <TouchableOpacity onPress={handleDelete} marginRight={sizes.sm}>
                                    <AntDesign name="delete" size={24} color={colors.white}/>
                                </TouchableOpacity>
                            </Block>
                        </Block>
                        <Block flex={1} color="rgba(0,0,0,0.3)" paddingBottom={sizes.md}>
                            <Text h3 white center>
                                {bookshelf.name}
                            </Text>
                        </Block>
                        <Block flex={2} color="rgba(0,0,0,0.3)" paddingBottom={sizes.padding}
                               paddingHorizontal={sizes.padding}>
                            <Block>
                                <Button gradient={gradients.primary} marginBottom={sizes.base}
                                        onPress={() => null}>
                                    <Text white bold transform="uppercase">
                                        {t('bookshelf.add_single_button')}
                                    </Text>
                                </Button>
                            </Block>
                            <Block row>
                                <Block paddingRight={sizes.sm}>
                                    <Button gradient={gradients.dark} marginBottom={sizes.base}
                                            onPress={() => alert("Comming really soon!")}>
                                        <Text white bold transform="uppercase">
                                            <AntDesign name="barcode" size={16} color={colors.white}/>
                                            {t('bookshelf.scan_barcode')}
                                        </Text>
                                    </Button>
                                </Block>
                                <Block>
                                    <Button gradient={gradients.dark}
                                            marginBottom={sizes.base}
                                            onPress={() => alert("It's comming soon and it's gonna be ✨")}
                                    >
                                        <Text white bold transform="uppercase">
                                            {t('bookshelf.ai_camera')}
                                        </Text>
                                    </Button>
                                </Block>
                            </Block>
                        </Block>
                    </Image>
                </Block>

                <Block marginVertical={sizes.sm} paddingHorizontal={sizes.sm}>
                    <Text h5 semibold>
                        {t('bookshelf.books_list')}
                    </Text>
                </Block>

                {books.length > 0 &&
                    <Block row justify="space-between" wrap="wrap" paddingHorizontal={sizes.m}>
                        <Block>
                            {books.map((book, index) => {
                                if (index % 2 === 0) {
                                    return <Image
                                        key={`book-${book.id}`}
                                        resizeMode="cover"
                                        source={{"uri": book.imageUrl}}
                                        style={{
                                            width: IMAGE_VERTICAL_SIZE,
                                            height: IMAGE_VERTICAL_SIZE * 1.6,
                                            marginBottom: sizes.m
                                        }}
                                    />
                                }
                            })}
                        </Block>
                        <Block marginLeft={sizes.m}>
                            {books.map((book, index) => {
                                if (index % 2 === 1) {
                                    return <Image
                                        key={`book-${book.id}`}
                                        resizeMode="cover"
                                        source={{"uri": book.imageUrl}}
                                        style={{
                                            width: IMAGE_VERTICAL_SIZE,
                                            height: IMAGE_VERTICAL_SIZE * 1.6,
                                            marginBottom: sizes.m
                                        }}
                                    />
                                }
                            })}
                        </Block>
                    </Block>
                }

                {books.length === 0 &&
                    <Block center paddingHorizontal={sizes.sm}>
                        <Text size={16} center>{t("bookshelf.no_books")}</Text>
                    </Block>
                }
            </Block>
        </Block>
    );
};

export default Bookshelf;
