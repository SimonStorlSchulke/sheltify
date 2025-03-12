module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/mailform/custom-post',
        handler: 'mailform.customPostAction',
        config: {
          policies: [],
          middlewares: ['plugin::users-permissions.rateLimit'],
        },
      },
    ],
  };