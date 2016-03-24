/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    TextInput,
    View,
    ListView,
    AlertIOS,
    TouchableHighlight
} from 'react-native';

var MOCKED_PAGES_DATA = [
    {
        pageName: 'Standard page'
    }
];

var api = require('./api');

class v4react extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: null
        };
    }

    componentDidMount() {

    }

    render() {
        console.log('rendering');

        if (this.state.customer !== null) {
            // if we have a customer - show him/her
            return this.renderCustomer(this.state.customer);
        }
        else if (this.state.loggingIn) {
            // if were logging in - show the loading view
            return this.renderLoadingView();
        }
        else {
            // default to the login view
            return this.renderLoginView();
        }
    }

    renderCustomer(customer) {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {customer.url}
                </Text>
                <Text>
                    {customer.site.title}
                </Text>
                <Text>
                    {customer.site.subtitle}
                </Text>
                <Text>
                    {customer.site.design}
                </Text>
                <Text>
                    {customer.site.colorThemeName}
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu
                </Text>
            </View>
        );
    }

    loginClicked() {
        this.setState({loggingIn: true});

        // get data
        this.api = new api();
        this.api.login(this.state.username, this.state.password).then(json => {
            this.api.getCustomer().then(customer => {
                this.setState({
                    customer: customer,
                    loggingIn: false
                });
            });
        }).catch(error => {
            this.setState({loggingIn: false});
            AlertIOS.alert('Could not log in with the supplied credentials: ' + error.error_description);
        });
    }

    renderLoginView() {
        return (
            <View style={styles.container}>
                <View style={styles.inputblock}>
                    <Text style={{
                        textAlign: 'center'
                    }}>Login</Text>
                </View>
                <View style={styles.inputblock}>
                    <Text style={{ width: 85 }}>Username</Text>
                    <TextInput style={styles.textinput} onChangeText={(username) => this.setState({username})} value={this.state.username}/>
                </View>
                <View style={styles.inputblock}>
                    <Text style={{ width: 85 }}>Password</Text>
                    <TextInput style={styles.textinput} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                </View>
                <View style={styles.inputblock}>
                    <TouchableHighlight style={styles.button} onPress={this.loginClicked.bind(this)}>
                        <View>
                            <Text style={styles.buttonText}>Button!</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading customer...
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        marginTop: 10
    },
    textinput: {
        flex: 1,
        padding: 5,
        marginLeft: 10,
        borderColor: '#666',
        borderWidth: 1,
        alignSelf: 'stretch'
    },
    inputblock: {
        height: 30,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        margin: 10,
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('v4react', () => v4react);
