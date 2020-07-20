import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, ThemeProvider } from 'react-native-elements';

export default function Login() {

    return( 
        <ThemeProvider>
            <Input
            placeholder='BASIC INPUT'
            />

            <Input
            placeholder='INPUT WITH ICON'
            leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
            />

            <Input
            placeholder='INPUT WITH CUSTOM ICON'
            leftIcon={
                <Icon
                name='user'
                size={24}
                color='black'
                />
            }
            />

            <Input
            placeholder='INPUT WITH ERROR MESSAGE'
            errorStyle={{ color: 'red' }}
            errorMessage='ENTER A VALID ERROR HERE'
            />
        </ThemeProvider>
    );
}
