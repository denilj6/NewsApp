import { Component } from "react";
import React from "react";
import { View, Text, Image, Dimensions, AsyncStorage, Platform, PermissionsAndroid, TextInput, Picker, ToastAndroid, FlatList, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/AntDesign';

interface Props {
    navigation?: any;
}
interface State {
    name: string;
    newsList: any,
    isLoading: boolean
}

export default class AddProducts extends Component<Props, State> {
    textInputField: TextInput;
    constructor(props: Props) {
        super(props);
        this.state = {
            name: 'sports',
            newsList: [],
            isLoading: true
        }

    }
    componentDidMount() {
        this.fetchNews()
    }
    fetchNews = () => {
        fetch('https://api.serpwow.com/live/search?api_key=D32FA103130644708C02CA6A1AD62FE0&q=' + this.state.name + '&google_domain=google.co.uk&location=United+Kingdom&gl=uk&hl=en&page=2')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    newsList: responseJson,
                    isLoading: false
                })

            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderItem = (items: any) => {
        let item = items.item
        return (
            <View style={{ flex: 1, margin: 5, elevation: 10, backgroundColor: '#fff', padding: 10 }}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('DetailPage',{data:item})}>
                    <View >
                        <Text style={{ color: '#000', fontSize: 14, marginLeft: 25, fontWeight: 'bold', textAlign: 'center' }}>{item.title}</Text>
                        <Text numberOfLines={2} style={{ color: '#000', fontSize: 14 }}>{item.snippet}</Text>
                    </View>
                </TouchableOpacity>
            </View>


        )

    }
    renderNewsList = () => {
        return (
            <View>
                <FlatList
                    key={Math.random()}
                    data={this.state.newsList.organic_results}
                    renderItem={(item: any) => this.renderItem(item)}
                />
            </View>
        )
    }
    applyFilter = () => {
        this.setState({
            isLoading: true
        })
        this.fetchNews()
    }
    onChangeSearchText = (serachText: string) => {
        this.setState({
            name: serachText
        })
    }
    renderSearchBox = () => {
        return (
            <TouchableOpacity onPress={() => this.textInputField.focus()} style={{ borderWidth: 1, borderColor: '#000', maxHeight: 50, margin: 5, borderRadius: 5, flexDirection: 'row' }}>
                <TextInput
                    ref={(ref) => { this.textInputField = ref }}
                    placeholder='Search for news'
                    returnKeyType={"search"}
                    style={{
                        alignSelf: 'center', flex: 1, height: 50,
                        marginLeft: 5, color: '#000',
                        paddingLeft: this.state.name === '' ? 35 : 10, marginTop: 5
                    }}
                    onSubmitEditing={(event) => this.applyFilter()}
                    onChangeText={this.onChangeSearchText}
                    value={this.state.name}
                />
                <View  style={{ marginTop: 10, margin: 5 }}>
                    <Ionicons name={'search1'} size={30} color={'#000'} />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <View style={{ flex: 1, backgroundColor: '#E8EBEF' }}>
                    <View style={{ flexDirection: 'row', backgroundColor: '#689EDB', height: 50, padding: 10 }}>
                        <Image style={{ width: 30, height: 30 }}
                            source={require('../assets/splash.png')} />
                        <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginLeft: 10, marginTop: 5 }}>Todays News</Text>
                    </View>
                    {this.renderSearchBox()}
                    {!!this.state.isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : <View>

                        {this.state.newsList.organic_results.length > 0 ? this.renderNewsList() :
                            <Text style={{ color: '#000', marginTop: 10, fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}>{'No item found.....'}</Text>
                        }
                    </View>}


                </View>
            </View>
        )
    }
}