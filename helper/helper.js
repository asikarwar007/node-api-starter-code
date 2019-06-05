
const userMoniterModel = require('../models/user_monitering')

module.exports = {
    find: async(modelname, query) =>{
        return await findDB(modelname, query)
    },
    findOne: async(modelname, query) =>{
        return await findone(modelname, query)
    },
    BrowserInfo: (Request,userinfo)=>{

        var ua = Request,
            $ = {};
        let browserinfo = {
            device_type: '',
            os: '',
            os_version: ''
        }
        browserinfo.user_id = userinfo.user_id
        browserinfo.user_type = userinfo.user_type
        browserinfo.lat = userinfo.lat
        browserinfo.lng = userinfo.lng
        browserinfo.ip = userinfo.ip
        browserinfo.url = userinfo.url
        if (/Linux/.test(ua)) {
            $.Linux = /Linux /.exec(ua);

            browserinfo.device_type = 'web'
            browserinfo.os = "linux"
            browserinfo.os_version = ''
        }

        if (/mobile/i.test(ua)) {
            $.Mobile = true;
            browserinfo.device_type = "mobile"
        }

        if (/like Mac OS X/.test(ua)) {
            $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
            $.iPhone = /iPhone/.test(ua);
            $.iPad = /iPad/.test(ua);

            browserinfo.device_type = 'mobile'
            browserinfo.os = "iphone"
            browserinfo.os_version = $.iOS
        }

        if (/Android/.test(ua)) {
            $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

            browserinfo.device_type = 'mobile'
            browserinfo.os = "android"
            browserinfo.os_version = $.Android
        }

        if (/webOS\//.test(ua)) {
            $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

            browserinfo.device_type = 'web'
            browserinfo.os = "webOS"
            browserinfo.os_version = $.webOS
        }

        if (/(Intel|PPC) Mac OS X/.test(ua)) {
            $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

            browserinfo.device_type = 'web'
            browserinfo.os = "mac"
            browserinfo.os_version = $.Mac
        }

        if (/Windows NT/.test(ua)) {
            $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];

            browserinfo.device_type = 'web'
            browserinfo.os = "windows"
            browserinfo.os_version = $.Windows
        }
       
        let saveData = userMoniterModel(browserinfo)
        saveData.save()
         
    }
}