module.exports = ({env}) => ({
    ezforms: {
        config:{
          captchaProvider: {
            name: 'none',
          },
          notificationProviders: []
        },
    },
    upload: {
      config: {
        breakpoints: {
          xlarge: 1920,
          large: 1000,
          medium: 750,
          small: 500,
        },
      }
    },
    email: {
      config: {
        provider: 'sendgrid',
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: env('SENDGRID_DEFAULT_FROM'),
          defaultReplyTo: env('SENDGRID_DEFAULT_TO'),
        },
      },
    },
    'users-permissions': {
    config: {
      ratelimit: {
        // 1 mail every 5sec allowed
        interval: 5000,
        max: 1
      }
    }
  }
});
