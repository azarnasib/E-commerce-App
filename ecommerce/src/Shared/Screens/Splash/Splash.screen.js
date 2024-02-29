import react from "react";
import {View,Text,StyleSheet,ActivityIndicator} from 'react-native';
import { COLORS } from "../../theme/Colors";

const Splash = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>EShop</Text>
            <ActivityIndicator
            size={'large'}
            color={COLORS.secondary}
            style={{marginVertical:20}}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.primary,
        justifyContent:'center',
        alignItems:'center'
    },
    heading:{
        color:COLORS.secondary,
        fontSize:55,
        fontWeight:'900',
    }
});

export default Splash;