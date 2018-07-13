import { Alert } from 'react-native'

export const convertPhoneNumber = (phone) => {
    if(phone.length == 10){
        return phone.substr(0, 3) + '-' + phone.substr(3, 3) + '-' + phone.substr(6, 4)
    }
    if(phone.length == 11){
        return phone.substr(0, 1) + '-' + phone.substr(1, 3) + '-' + phone.substr(4, 3) + phone.substr(7, 4)
    }
}

export const convertTransferDate = (date) => {
    const D = new Date(date)
    return  (D.getMonth() + 1) + '/' + D.getDate() + '/' + D.getFullYear()
}

export const MyAlert = (title, msg) => {
    Alert.alert(
        title,
        msg,
        [
            { text: 'OK', onPress: () => {} },
        ]
    );
}