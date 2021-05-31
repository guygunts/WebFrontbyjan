
let url = `http://localhost:4201`
const PROXY_CONFIG = [
    {
        context: "/loginmenu",
        target: `${url}/ionic/login`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/loginmenu": ""
        }
    }, {
        context: "/basicdrivergetView",
        target: `${url}/ionic/basicdrivergetView`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/basicdrivergetView": ""
        }
    }, {
        context: "/basicdrivergetinsert",
        target: `${url}/ionic/basicdrivergetinsert`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/basicdrivergetinsert": ""
        }
    }, {
        context: "/basicdrivergetupdate",
        target: `${url}/ionic/basicdrivergetupdate`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/basicdrivergetupdate": ""
        }

    }, {
        context: "/basicdrivergetdelete",
        target: `${url}/ionic/basicdrivergetdelete`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/basicdrivergetdelete": ""
        }
    }, {
        context: "/propertygetView",
        target: `${url}/ionic/propertygetView`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/propertygetView": ""
        }
    }, {
        context: "/propertygetinsert",
        target: `${url}/ionic/propertygetinsert`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/propertygetinsert": ""
        }
    }, {
        context: "/propertygetupdate",
        target: `${url}/ionic/propertygetupdate`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/propertygetupdate": ""
        }

    }, {
        context: "/propertygetdelete",
        target: `${url}/ionic/propertygetdelete`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/propertygetdelete": ""
        }
    }, {
        context: "/trafficgetView",
        target: `${url}/ionic/trafficgetView`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/trafficgetView": ""
        }
    }, {
        context: "/trafficgetinsert",
        target: `${url}/ionic/trafficgetinsert`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/trafficgetinsert": ""
        }
    }, {
        context: "/trafficgetupdate",
        target: `${url}/ionic/trafficgetupdate`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/trafficgetupdate": ""
        }

    }, {
        context: "/trafficgetdelete",
        target: `${url}/ionic/trafficgetdelete`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/trafficgetdelete": ""
        }
    },{
        context: "/technicalgetView",
        target: `${url}/ionic/technicalgetView`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/technicalgetView": ""
        }
    }, {
        context: "/technicalgetinsert",
        target: `${url}/ionic/technicalgetinsert`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/technicalgetinsert": ""
        }
    }, {
        context: "/technicalgetupdate",
        target: `${url}/ionic/technicalgetupdate`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/technicalgetupdate": ""
        }

    }, {
        context: "/technicalgetdelete",
        target: `${url}/ionic/technicalgetdelete`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/technicalgetdelete": ""
        }
    },{
        context: "/questiongetView",
        target: `${url}/ionic/questiongetView`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/questiongetView": ""
        }
    }, {
        context: "/questiongetinsert",
        target: `${url}/ionic/questiongetinsert`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/questiongetinsert": ""
        }
    }, {
        context: "/questiongetupdate",
        target: `${url}/ionic/questiongetupdate`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/questiongetupdate": ""
        }

    }, {
        context: "/questiongetdelete",
        target: `${url}/ionic/questiongetdelete`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/questiongetdelete": ""
        }
    },{
        context: "/penaltygetView",
        target: `${url}/ionic/penaltygetView`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/penaltygetView": ""
        }
    }, {
        context: "/penaltygetinsert",
        target: `${url}/ionic/penaltygetinsert`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/penaltygetinsert": ""
        }
    }, {
        context: "/penaltygetupdate",
        target: `${url}/ionic/penaltygetupdate`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/penaltygetupdate": ""
        }

    }, {
        context: "/penaltygetdelete",
        target: `${url}/ionic/penaltygetdelete`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/penaltygetdelete": ""
        }
    },{
        context: "/typedriverlicensegetView",
        target: `${url}/ionic/typedriverlicensegetView`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/typedriverlicensegetView": ""
        }
    }, {
        context: "/typedriverlicensegetinsert",
        target: `${url}/ionic/typedriverlicensegetinsert`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/typedriverlicensegetinsert": ""
        }
    }, {
        context: "/typedriverlicensegetupdate",
        target: `${url}/ionic/typedriverlicensegetupdate`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/typedriverlicensegetupdate": ""
        }

    }, {
        context: "/typedriverlicensegetdelete",
        target: `${url}/ionic/typedriverlicensegetdelete`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/typedriverlicensegetdelete": ""
        }
    },{
        context: "/examgetView",
        target: `${url}/ionic/examgetView`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/examgetView": ""
        }
    }, {
        context: "/examgetinsert",
        target: `${url}/ionic/examgetinsert`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/examgetinsert": ""
        }
    }, {
        context: "/examgetupdate",
        target: `${url}/ionic/examgetupdate`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/examgetupdate": ""
        }

    }, {
        context: "/examgetdelete",
        target: `${url}/ionic/examgetdelete`,
        secure: false,
        logLevel: "debug",
        changeOrigin: true,
        pathRewrite: {
            "^/examgetdelete": ""
        }
    }
]
module.exports = PROXY_CONFIG;
