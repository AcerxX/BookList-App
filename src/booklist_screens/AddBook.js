import React, {useEffect, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks';
import {Block, Input, Text} from '../components';
import {FlatList} from "react-native";
import * as ApiService from "../service/ApiService";
import useDebounce from "../hooks/useDebounce";
import SearchBookItem from "../components/SearchBookItem";
import {useNavigation} from "@react-navigation/core";


const AddBook = () => {
    const {t} = useTranslation();

    const {userData} = useData();

    const {colors, fonts, gradients, sizes, assets} = useTheme();

    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const navigation = useNavigation();

    useEffect(
        () => {
            if (debouncedSearchTerm) {
                handleSearchChange(debouncedSearchTerm);
            }
        },
        [debouncedSearchTerm]
    );

    const handleSearchChange = (searchTerm) => {
        ApiService.searchByName(searchTerm)
            .then(({data: {books}}) => {
                setBooks(books);
            });
    }


    return (
        <Block>
            <Block color={colors.card} flex={0} padding={sizes.padding}>
                <Input search placeholder={t('common.search') + " a book by name or author"}
                       onChangeText={setSearchTerm}/>
            </Block>

            {books.length > 0 &&
                <FlatList
                    paddingHorizontal={sizes.padding}
                    marginTop={sizes.sm}
                    data={books}
                    renderItem={({item}) => (
                        <SearchBookItem
                            title={item.title}
                            authorName={item.authorName}
                            imageUrl={item.imageUrl}
                            brand={item.brand.name}
                            onPress={() => navigation.navigate("BookInfo", {bookInfo: item})}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            }

            {books.length === 0 &&
                <Block center>
                    <Text size={16} center>Start adding a book by either searching it or scanning it's ISBN.</Text>
                </Block>
            }
        </Block>
    );
};

export default AddBook;
