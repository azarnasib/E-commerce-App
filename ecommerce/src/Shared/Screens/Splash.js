import react from 'react';
import {View,Text,StyleSheet,ActivityIndicator} from 'react-native';
import {COLORS} from '../../Shared/Themes/Colors';

const Splash=props=>{
return (
    <View style={styles.container}>
    <Text style={styles.heading}>EShop</Text>
    <ActivityIndicator
    color={COLORS.Secondary}
    size={'large'}
    style={{marginVertical: 34}}
    
    />
    
    </View>
)

}

const styles =StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.Primary,
        justifyContent:'center',
        alignItems: 'center'
    },

    heading: {
       fontSize: 60,
       fontWeight:'bold',
       color:COLORS.Secondary,
       alignSelf: 'center'
    }
})

export default Splash;