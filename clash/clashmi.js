function main(config) {

  // ================================================================
  // Clash Mi / Mihomo Perfect-Rules v1.7 (Parallel Region Auto & Manual Node Groups)
  //
  // Architecture:
  //
  //   Airport Subscription
  //          ↓
  //   Preserve Airport Basic Groups
  //          ↓
  //   Node Groups: Global Auto + Parallel Region Auto & Manual Groups
  //          ↓
  //   Service Policy Groups: AI, YouTube, Google, etc.
  //          ↓
  //   Remote Rule Providers
  //
  // ================================================================


  // ================================================================
  // 1. Basic configuration
  // ================================================================

  config["mixed-port"] = 7890;

  config["mode"] = "rule";

  config["unified-delay"] = true;

  config["tcp-concurrent"] = true;

  config["log-level"] = "error";

  config["ipv6"] = false;

  config["allow-lan"] = false;

  config["find-process-mode"] = "always";

  config["keep-alive-interval"] = 30;

  config["keep-alive-idle"] = 30;

  config["disable-keep-alive"] = false;


  // ================================================================
  // 2. Profile
  // ================================================================

  config["profile"] = {

    "store-selected": true,

    "store-fake-ip": true

  };


  // ================================================================
  // 3. DNS
  // ================================================================

  config["dns"] = {

    "enable": true,

    "listen": "0.0.0.0:53",

    "prefer-h3": false,

    "ipv6": false,

    "enhanced-mode": "fake-ip",

    "fake-ip-range": "172.19.0.1/16",

    "fake-ip-filter": [

      "+.lan",
      "+.local",
      "+.localhost",
      "+.home.arpa",

      "time.*.com",
      "time.*.gov",
      "pool.ntp.org",

      "+.push.apple.com",

      "mesu.apple.com",
      "swscan.apple.com",

      "captive.apple.com",

      "connectivitycheck.gstatic.com",

      "connectivitycheck.android.com",

      "www.msftconnecttest.com",

      "www.msftncsi.com"

    ],

    "default-nameserver": [

      "223.5.5.5",
      "119.29.29.29"

    ],

    "nameserver": [

      "https://dns.alidns.com/dns-query",
      "https://doh.pub/dns-query"

    ],

    "nameserver-policy": {

      "geosite:cn": [

        "https://dns.alidns.com/dns-query",
        "https://doh.pub/dns-query"

      ],

      "geosite:private": [

        "https://dns.alidns.com/dns-query",
        "https://doh.pub/dns-query"

      ],

      "geolocation-!cn": [

        "https://cloudflare-dns.com/dns-query",
        "https://dns.google/dns-query"

      ]

    },

    "proxy-server-nameserver": [

      "https://dns.alidns.com/dns-query",
      "https://doh.pub/dns-query"

    ],

    "direct-nameserver": [

      "https://dns.alidns.com/dns-query",
      "https://doh.pub/dns-query"

    ],

    "fallback": [

      "https://cloudflare-dns.com/dns-query",
      "https://dns.google/dns-query"

    ],

    "fallback-filter": {

      "geoip": true,

      "geoip-code": "CN",

      "geosite": [

        "gfw"

      ],

      "domain": [

        "+.google.com",
        "+.googleapis.com",
        "+.googlevideo.com",
        "+.youtube.com",
        "+.github.com",
        "+.openai.com",
        "+.chatgpt.com",
        "+.anthropic.com",
        "+.claude.ai"

      ]

    }

  };


  // ================================================================
  // 4. TUN
  // ================================================================

  config["tun"] = {

    "enable": true,

    "device": "Clash Mi",

    "stack": "gvisor",

    "dns-hijack": [

      "0.0.0.0:53"

    ],

    "auto-route": true,

    "auto-detect-interface": false,

    "strict-route": true,

    "mtu": 1280,

    "inet4-address": [

      "172.19.0.1/30"

    ],

    "auto-redirect": false,

    "disable-icmp-forwarding": true

  };


  // ================================================================
  // 5. Sniffer
  // ================================================================

  config["sniffer"] = {

    "enable": true,

    "parse-pure-ip": true,

    "force-dns-mapping": true,

    "override-destination": true,

    "sniff": {

      "HTTP": {

        "ports": [

          80,
          "8080-8880"

        ]

      },

      "TLS": {

        "ports": [

          443,
          8443

        ]

      },

      "QUIC": {

        "ports": [

          443,
          8443

        ]

      }

    },

    "skip-domain": [

      "+.push.apple.com",
      "+.mijia.cloud"

    ]

  };


  // ================================================================
  // 6. NTP
  // ================================================================

  config["ntp"] = {

    "enable": true,

    "write-to-system": false,

    "server": "time.apple.com",

    "port": 123,

    "interval": 30

  };


  // ================================================================
  // 7. Original airport proxies
  // ================================================================

  var originalProxies = Array.isArray(config["proxies"])
    ? config["proxies"]
    : [];


  var proxyNames = [];

  originalProxies.forEach(function(proxy) {

    if (proxy && proxy.name) {

      proxyNames.push(proxy.name);

    }

  });


  // ================================================================
  // 8. Original airport proxy groups
  // ================================================================

  var originalGroups = Array.isArray(config["proxy-groups"])
    ? config["proxy-groups"]
    : [];


  // ================================================================
  // 9. Perfect-Rules icon CDN
  // ================================================================

  var iconBaseURL =
    "https://cdn.jsdelivr.net/gh/n0de-sudo/Perfect-Rules@main/Clash/icons/";


  var groupIcons = {

    "一键代理": "Proxy.png",

    "自动选择": "Proxy.png",

    "国内直连": "China.png",

    "AI": "AI.png",

    "YouTube": "YouTube.png",

    "Google": "Google.png",

    "GitHub": "GitHub.png",

    "网络检测": "Network-test.png",

    "Netflix": "Netflix.png",

    "Spotify": "Spotify.png",

    "Steam": "Steam.png",

    "Telegram": "Telegram.png",

    "TikTok": "TikTok.png",

    "Apple": "Apple.png",

    "Microsoft": "Microsoft.png",

    "香港": "Hong_Kong.png",

    "台湾": "Taiwan.png",

    "日本": "Japan.png",

    "新加坡": "Singapore.png",

    "韩国": "Korea.png",

    "美国": "United_States.png",

    "加拿大": "Other.png",

    "英国": "Other.png",

    "其他地区": "Other.png"

  };


  function getGroupIcon(name) {

    if (!groupIcons[name]) {

      return undefined;

    }

    return iconBaseURL + groupIcons[name];

  }


  // ================================================================
  // 10. Managed groups
  // ================================================================

  var managedGroups = {

    "一键代理": true,

    "自动选择": true,

    "国内直连": true,

    "AI": true,

    "YouTube": true,

    "Google": true,

    "GitHub": true,

    "网络检测": true,

    "Netflix": true,

    "Spotify": true,

    "Steam": true,

    "Telegram": true,

    "TikTok": true,

    "Apple": true,

    "Microsoft": true,

    "香港": true,

    "香港 自动": true,

    "台湾": true,

    "台湾 自动": true,

    "日本": true,

    "日本 自动": true,

    "新加坡": true,

    "新加坡 自动": true,

    "韩国": true,

    "韩国 自动": true,

    "美国": true,

    "美国 自动": true,

    "加拿大": true,

    "加拿大 自动": true,

    "英国": true,

    "英国 自动": true,

    "其他地区": true,

    "其他地区 自动": true

  };


  // ================================================================
  // 11. Built-in targets
  // ================================================================

  var builtinTargets = {

    "DIRECT": true,

    "REJECT": true,

    "REJECT-DROP": true,

    "PASS": true,

    "COMPATIBLE": true,

    "GLOBAL": true

  };


  // ================================================================
  // 12. Business group detection
  // ================================================================

  function isBusinessGroupName(name) {

    if (!name) {

      return false;

    }

    var text = String(name);


    var patterns = [

      /ai/i,

      /openai/i,

      /chatgpt/i,

      /claude/i,

      /gemini/i,

      /netflix/i,

      /disney/i,

      /disney\+/i,

      /youtube/i,

      /google/i,

      /github/i,

      /spotify/i,

      /steam/i,

      /tiktok/i,

      /telegram/i,

      /twitter/i,

      /x\.com/i,

      /facebook/i,

      /instagram/i,

      /流媒体/i,

      /媒体/i,

      /影音/i,

      /视频/i,

      /游戏/i,

      /游戏专用/i,

      /机场专用/i,

      /节点分流/i

    ];


    for (var i = 0; i < patterns.length; i++) {

      if (patterns[i].test(text)) {

        return true;

      }

    }


    return false;

  }


  // ================================================================
  // 13. Auto-select detection
  // ================================================================

  function isAutoSelectGroup(name) {

    if (!name) {

      return false;

    }


    return (

      /自动选择/i.test(name) ||

      /auto[\s_-]*select/i.test(name) ||

      /auto[\s_-]*test/i.test(name) ||

      /测速/i.test(name)

    );

  }


  // ================================================================
  // 14. Failover detection
  // ================================================================

  function isFailoverGroup(name) {

    if (!name) {

      return false;

    }


    return (

      /故障转移/i.test(name) ||

      /failover/i.test(name) ||

      /fallback/i.test(name)

    );

  }


  // ================================================================
  // 15. All-node detection
  // ================================================================

  function isAllNodeName(name) {

    if (!name) {

      return false;

    }


    return (

      /全部节点/i.test(name) ||

      /所有节点/i.test(name) ||

      /全部/i.test(name) ||

      /all[\s_-]*nodes?/i.test(name) ||

      /all[\s_-]*proxies?/i.test(name)

    );

  }


  function getProxyComposition(group) {

    var result = {

      total: 0,

      actualNodes: 0,

      groups: 0,

      builtin: 0,

      unknown: 0

    };


    if (

      !group ||

      !Array.isArray(group.proxies)

    ) {

      return result;

    }


    result.total =
      group.proxies.length;


    group.proxies.forEach(function(item) {

      if (!item) {

        return;

      }


      if (proxyNames.indexOf(item) !== -1) {

        result.actualNodes++;

        return;

      }


      if (builtinTargets[item]) {

        result.builtin++;

        return;

      }


      var referencedGroup =
        originalGroups.some(function(g) {

          return (

            g &&

            g.name === item

          );

        });


      if (referencedGroup) {

        result.groups++;

        return;

      }


      result.unknown++;

    });


    return result;

  }


  function isAllNodesGroup(group) {

    if (!group || !group.name) {

      return false;

    }


    var name =
      String(group.name);


    if (isAllNodeName(name)) {

      return true;

    }


    if (isBusinessGroupName(name)) {

      return false;

    }


    var composition =
      getProxyComposition(group);


    if (composition.total === 0) {

      return false;

    }


    if (composition.actualNodes < 2) {

      return false;

    }


    var ratio =
      composition.actualNodes /
      composition.total;


    if (ratio < 0.3) {

      return false;

    }


    if (composition.groups > 0) {

      if (composition.actualNodes >= 5) {

        return true;

      }

      return false;

    }


    return true;

  }


  // ================================================================
  // 16. Preserve airport basic groups
  // ================================================================

  var preservedGroups = [];


  originalGroups.forEach(function(group) {

    if (!group || !group.name) {

      return;

    }


    if (managedGroups[group.name]) {

      return;

    }


    var isBasic =

      isAutoSelectGroup(group.name) ||

      isFailoverGroup(group.name) ||

      isAllNodesGroup(group);


    if (!isBasic) {

      return;

    }


    var copied =
      JSON.parse(JSON.stringify(group));


    delete copied["hidden"];


    preservedGroups.push(copied);

  });


  // ================================================================
  // 17. Convert airport Auto-Select groups to URL-
