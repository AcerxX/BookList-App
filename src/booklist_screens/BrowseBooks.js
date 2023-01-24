import React, {useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Image, Input, Text} from '../components/';
import {FlatList, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import * as ApiService from "../service/ApiService";

const BrowseBooks = ({navigation}) => {
    const {t} = useTranslation();

    const {userData} = useData();

    const {colors, fonts, gradients, sizes, assets} = useTheme();

    const [books, setBooks] = useState([]);

    const handleSearchChange = (searchTerm) => {
        ApiService.searchBook(searchTerm, userData.id)
            .then(({data: {_embedded: {books}}}) => {
                setBooks(books);
            });
    }

    useEffect(() => {
        handleSearchChange("");
    }, [navigation]);

    const BookItem = ({title, authorName, imageUrl}) => (
        <TouchableOpacity>
            <Block flex row justify="space-between" card marginBottom={sizes.s}>
                <Block flex={0.22}>
                    <Image
                        key={`book-2`}
                        resizeMode="cover"
                        source={{"uri": imageUrl}}
                        style={{
                            width: 50,
                            height: 50 * 1.6,
                        }}
                    />
                </Block>
                <Block flex={0.8} center>
                    <Text size={16} semibold>{`${title}`}</Text>
                    <Text size={16}>{authorName}</Text>
                </Block>

                <Block flex={0.07} center>
                    <AntDesign name="right" size={16} color={colors.dark}/>
                </Block>
            </Block>
        </TouchableOpacity>
    );

    return (
        <Block>
            <Block color={colors.card} flex={0} padding={sizes.padding}>
                <Input search placeholder={t('common.search') + " for a book"} onChangeText={handleSearchChange}/>
            </Block>

            {books.length > 0 &&
                <FlatList
                    paddingHorizontal={sizes.padding}
                    marginTop={sizes.sm}
                    data={books}
                    renderItem={({item}) => (
                        <BookItem title={item.title} authorName={item.authorName} imageUrl={item.imageUrl}
                                  onPress={() => navigation.navigate("UserProfile", {user: item})}/>
                    )}
                    keyExtractor={item => item.id}
                />
            }

            {books.length === 0 &&
                <Block center>
                    <Text size={16} center>Search for a reader using the search field on the top of this page.</Text>
                </Block>
            }
        </Block>
    );
};

export default BrowseBooks;
