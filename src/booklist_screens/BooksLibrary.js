import React, {useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Text} from '../components/';

const BooksLibrary = ({navigation}) => {
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
        // TODO GET BOOKS LIBRARY
    }, [navigation]);

    return (
        <Block safe>
            <Block scroll>
                <Block marginHorizontal={sizes.s} marginTop={sizes.s}>
                    <Image
                        background
                        style={{flex: 1, width: null, height: null}}
                        source={{uri: `https://www.shutterstock.com/image-photo/collection-old-books-on-wooden-600w-1564582792.jpg`}}
                        radius={sizes.cardRadius}
                    >
                        <Block marginBottom={sizes.xl} marginTop={sizes.sm} color="rgba(255, 255, 255, 0.3)"
                               paddingHorizontal={sizes.sm}>
                            <Text center h2 semibold color={colors.dark}>
                                Hello Andreea!
                            </Text>
                        </Block>

                        <Block paddingTop={sizes.padding}
                               paddingHorizontal={sizes.padding}>

                            <Block row>
                                <Block paddingRight={sizes.sm}>
                                    <Button gradient={gradients.dark} marginBottom={sizes.base}
                                            onPress={() => navigation.navigate("BrowseBooks")}>
                                        <Text white bold transform="uppercase">
                                            📚 Browse books
                                        </Text>
                                    </Button>
                                </Block>
                                <Block>
                                    <Button gradient={gradients.dark}
                                            marginBottom={sizes.base}
                                            onPress={() => alert("It's comming soon and it's gonna be ✨")}
                                    >
                                        <Text white bold transform="uppercase">
                                            📖 Add a book
                                        </Text>
                                    </Button>
                                </Block>
                            </Block>
                        </Block>
                    </Image>
                </Block>


                <Block marginVertical={sizes.sm} paddingHorizontal={sizes.sm}>
                    <Text h5 semibold>
                        Romance
                    </Text>
                </Block>
                <Block scroll horizontal>
                    <Block>
                        <Image
                            key={`book-1`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_155428_1_1378731562.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                </Block><Block marginVertical={sizes.sm} paddingHorizontal={sizes.sm}>
                <Text h5 semibold>
                    Romance
                </Text>
            </Block>
                <Block scroll horizontal>
                    <Block>
                        <Image
                            key={`book-1`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_155428_1_1378731562.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                </Block><Block marginVertical={sizes.sm} paddingHorizontal={sizes.sm}>
                <Text h5 semibold>
                    Romance
                </Text>
            </Block>
                <Block scroll horizontal>
                    <Block>
                        <Image
                            key={`book-1`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_155428_1_1378731562.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                    <Block marginLeft={sizes.m}>
                        <Image
                            key={`book-2`}
                            resizeMode="cover"
                            source={{"uri": `https://cdn1.dol.ro/dol.ro/cs-content/cs-photos/products/original/_138076_1_1365428305.jpg`}}
                            style={{
                                width: IMAGE_VERTICAL_SIZE,
                                height: IMAGE_VERTICAL_SIZE * 1.6,
                                marginBottom: sizes.m
                            }}
                        />
                    </Block>
                </Block>

                {/*{books.length > 0 &&*/}
                {/*    <Block row justify="space-between" wrap="wrap" paddingHorizontal={sizes.m}>*/}
                {/*        <Block>*/}
                {/*            {books.map((book, index) => {*/}
                {/*                if (index % 2 === 0) {*/}
                {/*                    return <Image*/}
                {/*                        key={`book-${book.id}`}*/}
                {/*                        resizeMode="cover"*/}
                {/*                        source={{"uri": book.imageUrl}}*/}
                {/*                        style={{*/}
                {/*                            width: IMAGE_VERTICAL_SIZE,*/}
                {/*                            height: IMAGE_VERTICAL_SIZE * 1.6,*/}
                {/*                            marginBottom: sizes.m*/}
                {/*                        }}*/}
                {/*                    />*/}
                {/*                }*/}
                {/*            })}*/}
                {/*        </Block>*/}
                {/*        <Block marginLeft={sizes.m}>*/}
                {/*            {books.map((book, index) => {*/}
                {/*                if (index % 2 === 1) {*/}
                {/*                    return <Image*/}
                {/*                        key={`book-${book.id}`}*/}
                {/*                        resizeMode="cover"*/}
                {/*                        source={{"uri": book.imageUrl}}*/}
                {/*                        style={{*/}
                {/*                            width: IMAGE_VERTICAL_SIZE,*/}
                {/*                            height: IMAGE_VERTICAL_SIZE * 1.6,*/}
                {/*                            marginBottom: sizes.m*/}
                {/*                        }}*/}
                {/*                    />*/}
                {/*                }*/}
                {/*            })}*/}
                {/*        </Block>*/}
                {/*    </Block>*/}
                {/*}*/}

                {/*{books.length === 0 &&*/}
                {/*    <Block center paddingHorizontal={sizes.sm}>*/}
                {/*        <Text size={16} center>{t("bookshelf.no_books")}</Text>*/}
                {/*    </Block>*/}
                {/*}*/}
            </Block>
        </Block>
    );
};

export default BooksLibrary;
