import React, {useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Input, Text} from '../components/';
import {FlatList} from "react-native";
import * as ApiService from "../service/ApiService";
import SearchBookItem from "../components/SearchBookItem";

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
                        <SearchBookItem title={item.title} authorName={item.authorName} imageUrl={item.imageUrl}
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
