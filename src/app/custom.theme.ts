import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    // Primary palette at the same level as colorScheme
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    },
    // ColorScheme with light and dark modes
    colorScheme: {
      light: {
        surface: {
          bento: '#e0e0e0'
        }
      },
      dark: {
        surface: {
          bento: '#000000'
        }
      }
    }
  }
});

export default MyPreset;
