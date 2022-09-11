export let cfg = {

    //apiUrl: 'https://admin.zakatyuk.com/api/',
    apiUrl: 'https://admin.i-carekaltim.id/api/',

    account:{
        account:'account',
        changePassword:'account/change-password',
        resetPasswordFinish:'account/reset-password/finish',
        resetPasswordInit:'account/reset-password/init',
        activate:'activate',
        authenticate:'authenticate',
        register:'register'
    },


    category:{
        categories:'categories',
        search:'_search/categories'
    },

    donation:{
        donations:'donations',
        mydonations:'donations',
        search:'_search/donations',
        mysearch:'_search/my-donations'
    },
    
    program:{
        programs:'programs',
        search:'_search/programs'
    },

    news:{
        news:'news',
        search:'_search/news'
    },

    about:{
        about:'abouts',
    },

    bank:{
        banks:'banks',
    },

    banner:{
        banners:'banners',
    },

    public:{
        programs:'public/programs',
        stories:'public/stories',
        news:'public/news',
        search:'_search/stories'
    },

    jwt:{
        authenticate:'authenticate'
    },

    // user:{
    //     users:'account',
    //     authorities:'users/authorities',
    //     search:'_search/users'
    // },

    user:{
        users:'users',
        authorities:'users/authorities',
    }

};
