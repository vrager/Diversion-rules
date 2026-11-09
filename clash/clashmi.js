function main(config) {

  // ================================================================
  // Clash Mi / Mihomo Perfect-Rules v1.7 (Strict ES5 Compatible)
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

    "fake-ip-range": "198.18.0.1/16",

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

    "
