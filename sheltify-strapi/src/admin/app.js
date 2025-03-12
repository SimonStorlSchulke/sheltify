const config = {
  locales: ["de"],
  theme: {
    colors: {
      alternative100: '#f6ecfc',
      alternative200: '#e0c1f4',
      alternative500: '#ac73e6',
      alternative600: '#9736e8',
      alternative700: '#8312d1',
      buttonNeutral0: '#ffffff',
      buttonPrimary500: '#377c1b',
      buttonPrimary600: '#377c1b',
      danger100: '#fcecea',
      danger200: '#f5c0b8',
      danger500: '#ff7864',
      danger600: '#fa644d',
      danger700: '#e4553f',
      neutral0: '#fff',
      neutral100: '#f6f6f9',
      neutral1000: '#181826',
      neutral150: '#efedea',
      neutral200: '#e4e0dc',
      neutral300: '#ddd',
      neutral400: '#c4c4c4',
      neutral500: '#aaaaaa',
      neutral600: '#7c7c7c',
      neutral700: '#626262',
      neutral800: '#424242',
      neutral900: '#272727',
      primary100: '#f7edd7',
      primary200: '#87df65',
      primary500: '#6bc049',
      primary600: '#4fa12f',
      primary700: '#377c1b',
      secondary100: '#fff3ea',
      secondary200: '#fff5dd',
      secondary500: '#ffedc2',
      secondary600: '#f8e2ad',
      secondary700: '#f5d895',
      success100: '#eafbe7',
      success200: '#c6f0c2',
      success500: '#5cb176',
      success600: '#328048',
      success700: '#2f6846',
      warning100: '#fdf4dc',
      warning200: '#fae7b9',
      warning500: '#f29d41',
      warning600: '#d9822f',
      warning700: '#be5d01',
    }
  },
  translations: {
    de: {
      "app.components.LeftMenu.navbrand.title": "Sheltify Admin",
    }
  }
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
