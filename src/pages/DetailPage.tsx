import { Component } from "react";
import React from "react";
import { View, Text, Image, Dimensions, AsyncStorage } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
    navigation: any;
}
interface State {
    newsData: any
}

export default class DetailPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            newsData: []
        }

    }
    componentDidMount() {
        const { params } = this.props.navigation.state
        this.setState({
            newsData: !!params ? (!!params.data ? params.data : {}) : {}
        })
    }
    renderDetails = () => {
        return (
            <ScrollView>
                <View>
                    <Text style={{ color: '#000', fontSize: 14, margin: 10, fontWeight: 'bold', textAlign: 'center' }}>{this.state.newsData.title}</Text>
                    <Text style={{ color: '#000', fontSize: 14 ,margin: 10,}}>{this.state.newsData.snippet}</Text>
                    <Text style={{ color: '#086CF1', fontSize: 14 ,margin: 10,}}>{'Page Link :'+this.state.newsData.link}</Text>
                    <Text style={{ color: '#086CF1', fontSize: 14 ,margin: 10,}}>{'Domain  :'+this.state.newsData.domain}</Text>

                </View>
            </ScrollView>

        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#689EDB', height: 50, padding: 10 }}>
                    <Image style={{ width: 30, height: 30 }}
                        source={require('../assets/splash.png')} />
                    <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold', textAlign: 'center', marginLeft: 10, marginTop: 5 }}>Details</Text>
                </View>
                {this.renderDetails()}
            </View>
        )
    }
}