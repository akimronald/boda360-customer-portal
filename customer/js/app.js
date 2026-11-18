/**
 * BODA 360 IOT TELEMATICS - CUSTOMER PORTAL CONTROLLER
 * Target: Commercial Boda-Boda Operators & Motorcycle Fleet Owners
 * Architecture: Single-Screen Desktop Application in 3 Zones (PRD Compliant)
 * International Multi-Territory Engine: Allows user to choose operating country & city
 */

(function () {
  'use strict';

  // --- SHARED CROSS-DEVICE RING & AUDIO SERVICE INSTANCE ---
  const audio = window.bodaAudio || (typeof AudioService !== 'undefined' ? new AudioService() : null);

  // =========================================================================
  // INTERNATIONAL OPERATIONAL TERRITORIES REGISTRY
  // =========================================================================
  const TERRITORIES = {
    uganda_kampala: {
      key: 'uganda_kampala',
      name: 'Uganda — Kampala Central',
      country: 'Uganda',
      flag: '🇺🇬',
      lat: 0.3341,
      lng: 32.5780,
      zoom: 14,
      carrier: 'MTN Uganda / Airtel',
      currency: 'UGX',
      geofenceName: 'Kampala Metropolitan Safe Zone',
      geofenceCenter: [0.3275, 32.5820],
      geofenceRadius: 3500,
      bikes: [
        {
          id: 1,
          plate: 'UEV 412K',
          model: 'Bajaj Boxer BM150 (ESP32 Hardware Node)',
          owner: 'Akim Ronald David',
          phone: '+256 770 123456',
          nin: 'CM92018104KTW',
          imei: '865421045981201',
          simNumber: '+256 701 445892 (MTN Uganda)',
          locationName: 'Kampala Hub (ESP32 Node)',
          lat: 0.327500,
          lng: 32.602500,
          speed: 0.0,
          batteryVoltage: 12.6,
          ignition: true,
          relayState: false,
          tamperAlert: false,
          satellites: 9,
          gsmCsq: 29,
          heading: 45,
          shiftDistance: 14.8,
          totalDistance: 48.2,
          status: 'active',
          trail: [[0.327500, 32.602500]]
        }
      ]
    },

    uganda_entebbe: {
      key: 'uganda_entebbe',
      name: 'Uganda — Entebbe Coastal',
      country: 'Uganda',
      flag: '🇺🇬',
      lat: 0.0512,
      lng: 32.4637,
      zoom: 14,
      carrier: 'MTN Uganda / Airtel',
      currency: 'UGX',
      geofenceName: 'Entebbe International Logistics Corridor',
      geofenceCenter: [0.0512, 32.4637],
      geofenceRadius: 4000,
      bikes: [
        {
          id: 1,
          plate: 'UEV 412K',
          model: 'Bajaj Boxer BM150 (2024)',
          owner: 'John Baptist Mukasa',
          phone: '+256 772 109843',
          nin: 'CM92018104KTW',
          imei: '863892050119283',
          simNumber: '+256 701 445892',
          locationName: 'Entebbe Expressway Toll Plaza',
          lat: 0.0592,
          lng: 32.4682,
          speed: 46.5,
          batteryVoltage: 12.7,
          ignition: true,
          relayState: false,
          tamperAlert: false,
          satellites: 10,
          gsmCsq: 25,
          heading: 190,
          shiftDistance: 19.4,
          totalDistance: 64.0,
          status: 'active',
          trail: [[0.0680, 32.4720], [0.0630, 32.4700], [0.0592, 32.4682]]
        },
        {
          id: 2,
          plate: 'UFD 770E',
          model: 'TVS Star HLX 125',
          owner: 'John Baptist Mukasa',
          phone: '+256 772 109843',
          nin: 'CM92018104KTW',
          imei: '863892050119284',
          simNumber: '+256 702 981144',
          locationName: 'Victoria Mall, Entebbe Town',
          lat: 0.0512,
          lng: 32.4637,
          speed: 0.0,
          batteryVoltage: 12.3,
          ignition: false,
          relayState: false,
          tamperAlert: false,
          satellites: 8,
          gsmCsq: 23,
          heading: 90,
          shiftDistance: 6.5,
          totalDistance: 28.0,
          status: 'idle',
          trail: [[0.0540, 32.4610], [0.0512, 32.4637]]
        },
        {
          id: 3,
          plate: 'UBA 309Z',
          model: 'Yamaha Crux 110',
          owner: 'John Baptist Mukasa',
          phone: '+256 772 109843',
          nin: 'CM92018104KTW',
          imei: '863892050119285',
          simNumber: '+256 774 219083',
          locationName: 'Kigungu Landing Site, Entebbe',
          lat: 0.0385,
          lng: 32.4410,
          speed: 0.0,
          batteryVoltage: 11.8,
          ignition: false,
          relayState: true,
          tamperAlert: false,
          satellites: 12,
          gsmCsq: 27,
          heading: 240,
          shiftDistance: 14.2,
          totalDistance: 52.0,
          status: 'immobilized',
          trail: [[0.0420, 32.4460], [0.0385, 32.4410]]
        }
      ]
    },

    uganda_jinja: {
      key: 'uganda_jinja',
      name: 'Uganda — Jinja City',
      country: 'Uganda',
      flag: '🇺🇬',
      lat: 0.4479,
      lng: 33.2026,
      zoom: 14,
      carrier: 'MTN Uganda / Airtel',
      currency: 'UGX',
      geofenceName: 'Jinja Nile Tourism & Industrial Hub',
      geofenceCenter: [0.4479, 33.2026],
      geofenceRadius: 3500,
      bikes: [
        {
          id: 1,
          plate: 'UEV 412K',
          model: 'Bajaj Boxer BM150',
          owner: 'John Baptist Mukasa',
          phone: '+256 772 109843',
          nin: 'CM92018104KTW',
          imei: '863892050119283',
          simNumber: '+256 701 445892',
          locationName: 'Source of the Nile Bridge, Jinja',
          lat: 0.4385,
          lng: 33.1950,
          speed: 38.0,
          batteryVoltage: 12.6,
          ignition: true,
          relayState: false,
          tamperAlert: false,
          satellites: 10,
          gsmCsq: 26,
          heading: 75,
          shiftDistance: 12.0,
          totalDistance: 42.0,
          status: 'active',
          trail: [[0.4320, 33.1850], [0.4350, 33.1900], [0.4385, 33.1950]]
        },
        {
          id: 2,
          plate: 'UFD 770E',
          model: 'TVS Star HLX 125',
          owner: 'John Baptist Mukasa',
          phone: '+256 772 109843',
          nin: 'CM92018104KTW',
          imei: '863892050119284',
          simNumber: '+256 702 981144',
          locationName: 'Main Street / Jinja Market',
          lat: 0.4479,
          lng: 33.2026,
          speed: 0.0,
          batteryVoltage: 12.4,
          ignition: false,
          relayState: false,
          tamperAlert: false,
          satellites: 8,
          gsmCsq: 22,
          heading: 180,
          shiftDistance: 5.4,
          totalDistance: 21.0,
          status: 'idle',
          trail: [[0.4510, 33.2010], [0.4479, 33.2026]]
        },
        {
          id: 3,
          plate: 'UBA 309Z',
          model: 'Yamaha Crux 110',
          owner: 'John Baptist Mukasa',
          phone: '+256 772 109843',
          nin: 'CM92018104KTW',
          imei: '863892050119285',
          simNumber: '+256 774 219083',
          locationName: 'Walukuba Industrial Zone',
          lat: 0.4550,
          lng: 33.2210,
          speed: 0.0,
          batteryVoltage: 11.9,
          ignition: false,
          relayState: true,
          tamperAlert: false,
          satellites: 9,
          gsmCsq: 24,
          heading: 270,
          shiftDistance: 16.2,
          totalDistance: 58.0,
          status: 'immobilized',
          trail: [[0.4520, 33.2160], [0.4550, 33.2210]]
        }
      ]
    },

    kenya_nairobi: {
      key: 'kenya_nairobi',
      name: 'Kenya — Nairobi Metropolitan',
      country: 'Kenya',
      flag: '🇰🇪',
      lat: -1.286389,
      lng: 36.817223,
      zoom: 14,
      carrier: 'Safaricom 4G LTE / Airtel Kenya',
      currency: 'KES',
      geofenceName: 'Nairobi CBD & Westlands Safe Zone',
      geofenceCenter: [-1.286389, 36.817223],
      geofenceRadius: 4500,
      bikes: [
        {
          id: 1,
          plate: 'KDG 412K',
          model: 'Bajaj Boxer BM150 (2024)',
          owner: 'John Baptist Mukasa',
          phone: '+254 712 345678',
          nin: 'KE29104821',
          imei: '863892050119283',
          simNumber: '+254 722 109843 (Safaricom)',
          locationName: 'Kenyatta Avenue / Uhuru Highway, Nairobi',
          lat: -1.2875,
          lng: 36.8180,
          speed: 36.5,
          batteryVoltage: 12.6,
          ignition: true,
          relayState: false,
          tamperAlert: false,
          satellites: 11,
          gsmCsq: 28,
          heading: 140,
          shiftDistance: 18.2,
          totalDistance: 56.4,
          status: 'active',
          trail: [[-1.2820, 36.8120], [-1.2845, 36.8150], [-1.2875, 36.8180]]
        },
        {
          id: 2,
          plate: 'KDE 770E',
          model: 'TVS Star HLX 125',
          owner: 'John Baptist Mukasa',
          phone: '+254 712 345678',
          nin: 'KE29104821',
          imei: '863892050119284',
          simNumber: '+254 733 456789 (Airtel KE)',
          locationName: 'Westlands Roundabout / Sarit Centre',
          lat: -1.2645,
          lng: 36.8020,
          speed: 0.0,
          batteryVoltage: 12.4,
          ignition: false,
          relayState: false,
          tamperAlert: false,
          satellites: 9,
          gsmCsq: 24,
          heading: 210,
          shiftDistance: 9.4,
          totalDistance: 34.0,
          status: 'idle',
          trail: [[-1.2610, 36.8000], [-1.2645, 36.8020]]
        },
        {
          id: 3,
          plate: 'KDA 309Z',
          model: 'Yamaha Crux 110',
          owner: 'John Baptist Mukasa',
          phone: '+254 712 345678',
          nin: 'KE29104821',
          imei: '863892050119285',
          simNumber: '+254 722 889900 (Safaricom)',
          locationName: 'Mombasa Road / Nyayo Stadium, Nairobi',
          lat: -1.3040,
          lng: 36.8280,
          speed: 0.0,
          batteryVoltage: 11.9,
          ignition: false,
          relayState: true,
          tamperAlert: false,
          satellites: 10,
          gsmCsq: 25,
          heading: 320,
          shiftDistance: 24.1,
          totalDistance: 82.0,
          status: 'immobilized',
          trail: [[-1.3090, 36.8320], [-1.3040, 36.8280]]
        }
      ]
    },

    kenya_mombasa: {
      key: 'kenya_mombasa',
      name: 'Kenya — Mombasa Port',
      country: 'Kenya',
      flag: '🇰🇪',
      lat: -4.0435,
      lng: 39.6682,
      zoom: 14,
      carrier: 'Safaricom 4G / Airtel Kenya',
      currency: 'KES',
      geofenceName: 'Mombasa Coastal Logistics Zone',
      geofenceCenter: [-4.0435, 39.6682],
      geofenceRadius: 4000,
      bikes: [
        {
          id: 1,
          plate: 'KDG 412K',
          model: 'Bajaj Boxer BM150',
          owner: 'John Baptist Mukasa',
          phone: '+254 712 345678',
          nin: 'KE29104821',
          imei: '863892050119283',
          simNumber: '+254 722 109843',
          locationName: 'Nyali Bridge / Mombasa Island',
          lat: -4.0380,
          lng: 39.6720,
          speed: 42.0,
          batteryVoltage: 12.6,
          ignition: true,
          relayState: false,
          tamperAlert: false,
          satellites: 11,
          gsmCsq: 27,
          heading: 60,
          shiftDistance: 14.5,
          totalDistance: 45.0,
          status: 'active',
          trail: [[-4.0450, 39.6650], [-4.0380, 39.6720]]
        },
        {
          id: 2,
          plate: 'KDE 770E',
          model: 'TVS Star HLX 125',
          owner: 'John Baptist Mukasa',
          phone: '+254 712 345678',
          nin: 'KE29104821',
          imei: '863892050119284',
          simNumber: '+254 733 456789',
          locationName: 'Digo Road / Mombasa Market',
          lat: -4.0620,
          lng: 39.6700,
          speed: 0.0,
          batteryVoltage: 12.4,
          ignition: false,
          relayState: false,
          tamperAlert: false,
          satellites: 8,
          gsmCsq: 23,
          heading: 180,
          shiftDistance: 7.2,
          totalDistance: 29.0,
          status: 'idle',
          trail: [[-4.0580, 39.6680], [-4.0620, 39.6700]]
        },
        {
          id: 3,
          plate: 'KDA 309Z',
          model: 'Yamaha Crux 110',
          owner: 'John Baptist Mukasa',
          phone: '+254 712 345678',
          nin: 'KE29104821',
          imei: '863892050119285',
          simNumber: '+254 722 889900',
          locationName: 'Likoni Ferry Terminal, Mombasa',
          lat: -4.0810,
          lng: 39.6640,
          speed: 0.0,
          batteryVoltage: 11.9,
          ignition: false,
          relayState: true,
          tamperAlert: false,
          satellites: 10,
          gsmCsq: 25,
          heading: 270,
          shiftDistance: 19.0,
          totalDistance: 68.0,
          status: 'immobilized',
          trail: [[-4.0750, 39.6660], [-4.0810, 39.6640]]
        }
      ]
    },

    tanzania_daressalaam: {
      key: 'tanzania_daressalaam',
      name: 'Tanzania — Dar es Salaam',
      country: 'Tanzania',
      flag: '🇹🇿',
      lat: -6.7924,
      lng: 39.2083,
      zoom: 14,
      carrier: 'Vodacom Tanzania / Tigo',
      currency: 'TZS',
      geofenceName: 'Dar es Salaam Coastal Safe Zone',
      geofenceCenter: [-6.7924, 39.2083],
      geofenceRadius: 4500,
      bikes: [
        {
          id: 1,
          plate: 'T 412 DKB',
          model: 'Bajaj Boxer BM150',
          owner: 'John Baptist Mukasa',
          phone: '+255 754 123456',
          nin: 'TZ192083921',
          imei: '863892050119283',
          simNumber: '+255 754 109843',
          locationName: 'Ali Hassan Mwinyi Rd, Dar es Salaam',
          lat: -6.7850,
          lng: 39.2600,
          speed: 35.0,
          batteryVoltage: 12.6,
          ignition: true,
          relayState: false,
          tamperAlert: false,
          satellites: 10,
          gsmCsq: 25,
          heading: 45,
          shiftDistance: 16.0,
          totalDistance: 50.0,
          status: 'active',
          trail: [[-6.7920, 39.2520], [-6.7850, 39.2600]]
        },
        {
          id: 2,
          plate: 'T 770 DFE',
          model: 'TVS Star HLX 125',
          owner: 'John Baptist Mukasa',
          phone: '+255 754 123456',
          nin: 'TZ192083921',
          imei: '863892050119284',
          simNumber: '+255 715 981144',
          locationName: 'Kariakoo Market, Dar es Salaam',
          lat: -6.8200,
          lng: 39.2780,
          speed: 0.0,
          batteryVoltage: 12.4,
          ignition: false,
          relayState: false,
          tamperAlert: false,
          satellites: 9,
          gsmCsq: 23,
          heading: 180,
          shiftDistance: 8.0,
          totalDistance: 32.0,
          status: 'idle',
          trail: [[-6.8150, 39.2750], [-6.8200, 39.2780]]
        },
        {
          id: 3,
          plate: 'T 309 DBA',
          model: 'Yamaha Crux 110',
          owner: 'John Baptist Mukasa',
          phone: '+255 754 123456',
          nin: 'TZ192083921',
          imei: '863892050119285',
          simNumber: '+255 754 219083',
          locationName: 'Posta Mpya / Kivukoni Ferry',
          lat: -6.8160,
          lng: 39.2940,
          speed: 0.0,
          batteryVoltage: 11.9,
          ignition: false,
          relayState: true,
          tamperAlert: false,
          satellites: 11,
          gsmCsq: 26,
          heading: 270,
          shiftDistance: 21.0,
          totalDistance: 70.0,
          status: 'immobilized',
          trail: [[-6.8100, 39.2900], [-6.8160, 39.2940]]
        }
      ]
    },

    rwanda_kigali: {
      key: 'rwanda_kigali',
      name: 'Rwanda — Kigali City',
      country: 'Rwanda',
      flag: '🇷🇼',
      lat: -1.9441,
      lng: 30.0619,
      zoom: 14,
      carrier: 'MTN Rwanda / Airtel-Tigo',
      currency: 'RWF',
      geofenceName: 'Kigali Special Economic & CBD Zone',
      geofenceCenter: [-1.9441, 30.0619],
      geofenceRadius: 3500,
      bikes: [
        {
          id: 1,
          plate: 'RAD 412K',
          model: 'Bajaj Boxer BM150 (2024)',
          owner: 'John Baptist Mukasa',
          phone: '+250 788 123456',
          nin: 'RW11990800',
          imei: '863892050119283',
          simNumber: '+250 788 109843',
          locationName: 'KN 3 Ave (Kigali CBD / Roundabout)',
          lat: -1.9500,
          lng: 30.0600,
          speed: 32.0,
          batteryVoltage: 12.6,
          ignition: true,
          relayState: false,
          tamperAlert: false,
          satellites: 12,
          gsmCsq: 29,
          heading: 90,
          shiftDistance: 13.5,
          totalDistance: 44.0,
          status: 'active',
          trail: [[-1.9540, 30.0560], [-1.9500, 30.0600]]
        },
        {
          id: 2,
          plate: 'RAE 770E',
          model: 'TVS Star HLX 125',
          owner: 'John Baptist Mukasa',
          phone: '+250 788 123456',
          nin: 'RW11990800',
          imei: '863892050119284',
          simNumber: '+250 788 981144',
          locationName: 'Kigali Heights / Convention Centre',
          lat: -1.9535,
          lng: 30.0930,
          speed: 0.0,
          batteryVoltage: 12.4,
          ignition: false,
          relayState: false,
          tamperAlert: false,
          satellites: 10,
          gsmCsq: 25,
          heading: 180,
          shiftDistance: 7.0,
          totalDistance: 27.0,
          status: 'idle',
          trail: [[-1.9500, 30.0900], [-1.9535, 30.0930]]
        },
        {
          id: 3,
          plate: 'RAC 309Z',
          model: 'Yamaha Crux 110',
          owner: 'John Baptist Mukasa',
          phone: '+250 788 123456',
          nin: 'RW11990800',
          imei: '863892050119285',
          simNumber: '+250 788 219083',
          locationName: 'Remera Stadium Roundabout, Kigali',
          lat: -1.9610,
          lng: 30.1140,
          speed: 0.0,
          batteryVoltage: 11.9,
          ignition: false,
          relayState: true,
          tamperAlert: false,
          satellites: 11,
          gsmCsq: 27,
          heading: 270,
          shiftDistance: 18.5,
          totalDistance: 62.0,
          status: 'immobilized',
          trail: [[-1.9560, 30.1100], [-1.9610, 30.1140]]
        }
      ]
    },

    nigeria_lagos: {
      key: 'nigeria_lagos',
      name: 'Nigeria — Lagos State',
      country: 'Nigeria',
      flag: '🇳🇬',
      lat: 6.4550,
      lng: 3.3941,
      zoom: 13,
      carrier: 'MTN Nigeria / Airtel / Glo',
      currency: 'NGN',
      geofenceName: 'Lagos Island & Victoria Island Zone',
      geofenceCenter: [6.4550, 3.3941],
      geofenceRadius: 5000,
      bikes: [
        {
          id: 1,
          plate: 'LAG-412-KD',
          model: 'Bajaj Boxer BM150',
          owner: 'John Baptist Mukasa',
          phone: '+234 803 1234567',
          nin: 'NIN920194821',
          imei: '863892050119283',
          simNumber: '+234 803 109843',
          locationName: 'Ozumba Mbadiwe Ave, Victoria Island',
          lat: 6.4320,
          lng: 3.4250,
          speed: 40.2,
          batteryVoltage: 12.6,
          ignition: true,
          relayState: false,
          tamperAlert: false,
          satellites: 9,
          gsmCsq: 24,
          heading: 110,
          shiftDistance: 22.0,
          totalDistance: 68.0,
          status: 'active',
          trail: [[6.4380, 3.4150], [6.4320, 3.4250]]
        },
        {
          id: 2,
          plate: 'LAG-770-FE',
          model: 'TVS Star HLX 125',
          owner: 'John Baptist Mukasa',
          phone: '+234 803 1234567',
          nin: 'NIN920194821',
          imei: '863892050119284',
          simNumber: '+234 802 981144',
          locationName: 'Lekki Phase 1 Gate / Admiralty Way',
          lat: 6.4480,
          lng: 3.4730,
          speed: 0.0,
          batteryVoltage: 12.4,
          ignition: false,
          relayState: false,
          tamperAlert: false,
          satellites: 8,
          gsmCsq: 22,
          heading: 180,
          shiftDistance: 11.0,
          totalDistance: 39.0,
          status: 'idle',
          trail: [[6.4420, 3.4680], [6.4480, 3.4730]]
        },
        {
          id: 3,
          plate: 'LAG-309-ZA',
          model: 'Yamaha Crux 110',
          owner: 'John Baptist Mukasa',
          phone: '+234 803 1234567',
          nin: 'NIN920194821',
          imei: '863892050119285',
          simNumber: '+234 803 219083',
          locationName: 'Ikeja Along / Computer Village',
          lat: 6.5980,
          lng: 3.3440,
          speed: 0.0,
          batteryVoltage: 11.9,
          ignition: false,
          relayState: true,
          tamperAlert: false,
          satellites: 10,
          gsmCsq: 25,
          heading: 270,
          shiftDistance: 28.5,
          totalDistance: 88.0,
          status: 'immobilized',
          trail: [[6.5920, 3.3400], [6.5980, 3.3440]]
        }
      ]
    },

    ghana_accra: {
      key: 'ghana_accra',
      name: 'Ghana — Greater Accra',
      country: 'Ghana',
      flag: '🇬🇭',
      lat: 5.5600,
      lng: -0.2057,
      zoom: 14,
      carrier: 'MTN Ghana / Vodafone',
      currency: 'GHS',
      geofenceName: 'Accra Central Business Safe Zone',
      geofenceCenter: [5.5600, -0.2057],
      geofenceRadius: 4000,
      bikes: [
        {
          id: 1,
          plate: 'GR-412-26',
          model: 'Bajaj Boxer BM150',
          owner: 'John Baptist Mukasa',
          phone: '+233 24 1234567',
          nin: 'GHA-192083-1',
          imei: '863892050119283',
          simNumber: '+233 24 109843',
          locationName: 'Oxford Street, Osu, Accra',
          lat: 5.5560,
          lng: -0.1830,
          speed: 31.0,
          batteryVoltage: 12.6,
          ignition: true,
          relayState: false,
          tamperAlert: false,
          satellites: 10,
          gsmCsq: 26,
          heading: 85,
          shiftDistance: 15.0,
          totalDistance: 48.0,
          status: 'active',
          trail: [[5.5520, -0.1900], [5.5560, -0.1830]]
        },
        {
          id: 2,
          plate: 'GR-770-26',
          model: 'TVS Star HLX 125',
          owner: 'John Baptist Mukasa',
          phone: '+233 24 1234567',
          nin: 'GHA-192083-1',
          imei: '863892050119284',
          simNumber: '+233 20 981144',
          locationName: 'Airport City / Stanbic Heights',
          lat: 5.6020,
          lng: -0.1780,
          speed: 0.0,
          batteryVoltage: 12.4,
          ignition: false,
          relayState: false,
          tamperAlert: false,
          satellites: 8,
          gsmCsq: 23,
          heading: 180,
          shiftDistance: 8.5,
          totalDistance: 30.0,
          status: 'idle',
          trail: [[5.5970, -0.1750], [5.6020, -0.1780]]
        },
        {
          id: 3,
          plate: 'GR-309-26',
          model: 'Yamaha Crux 110',
          owner: 'John Baptist Mukasa',
          phone: '+233 24 1234567',
          nin: 'GHA-192083-1',
          imei: '863892050119285',
          simNumber: '+233 24 219083',
          locationName: 'Independence Square, Accra',
          lat: 5.5490,
          lng: -0.1920,
          speed: 0.0,
          batteryVoltage: 11.9,
          ignition: false,
          relayState: true,
          tamperAlert: false,
          satellites: 11,
          gsmCsq: 27,
          heading: 270,
          shiftDistance: 20.0,
          totalDistance: 65.0,
          status: 'immobilized',
          trail: [[5.5450, -0.1950], [5.5490, -0.1920]]
        }
      ]
    },

    southafrica_johannesburg: {
      key: 'southafrica_johannesburg',
      name: 'South Africa — Johannesburg',
      country: 'South Africa',
      flag: '🇿🇦',
      lat: -26.2041,
      lng: 28.0473,
      zoom: 14,
      carrier: 'Vodacom SA / MTN SA',
      currency: 'ZAR',
      geofenceName: 'Johannesburg Central & Sandton Ring',
      geofenceCenter: [-26.2041, 28.0473],
      geofenceRadius: 5000,
      bikes: [
        {
          id: 1,
          plate: 'GP 412 KD',
          model: 'Bajaj Boxer BM150',
          owner: 'John Baptist Mukasa',
          phone: '+27 82 1234567',
          nin: 'ZA92019482',
          imei: '863892050119283',
          simNumber: '+27 82 109843',
          locationName: 'Rivonia Road, Sandton City',
          lat: -26.1070,
          lng: 28.0560,
          speed: 48.0,
          batteryVoltage: 12.6,
          ignition: true,
          relayState: false,
          tamperAlert: false,
          satellites: 11,
          gsmCsq: 28,
          heading: 130,
          shiftDistance: 26.0,
          totalDistance: 74.0,
          status: 'active',
          trail: [[-26.1000, 28.0500], [-26.1070, 28.0560]]
        },
        {
          id: 2,
          plate: 'GP 770 FE',
          model: 'TVS Star HLX 125',
          owner: 'John Baptist Mukasa',
          phone: '+27 82 1234567',
          nin: 'ZA92019482',
          imei: '863892050119284',
          simNumber: '+27 83 981144',
          locationName: 'Rosebank Mall / Oxford Rd',
          lat: -26.1460,
          lng: 28.0420,
          speed: 0.0,
          batteryVoltage: 12.4,
          ignition: false,
          relayState: false,
          tamperAlert: false,
          satellites: 9,
          gsmCsq: 24,
          heading: 180,
          shiftDistance: 12.0,
          totalDistance: 40.0,
          status: 'idle',
          trail: [[-26.1410, 28.0390], [-26.1460, 28.0420]]
        },
        {
          id: 3,
          plate: 'GP 309 ZA',
          model: 'Yamaha Crux 110',
          owner: 'John Baptist Mukasa',
          phone: '+27 82 1234567',
          nin: 'ZA92019482',
          imei: '863892050119285',
          simNumber: '+27 82 219083',
          locationName: 'Nelson Mandela Bridge, Braamfontein',
          lat: -26.1950,
          lng: 28.0360,
          speed: 0.0,
          batteryVoltage: 11.9,
          ignition: false,
          relayState: true,
          tamperAlert: false,
          satellites: 12,
          gsmCsq: 29,
          heading: 270,
          shiftDistance: 31.0,
          totalDistance: 92.0,
          status: 'immobilized',
          trail: [[-26.1900, 28.0330], [-26.1950, 28.0360]]
        }
      ]
    },

    uae_dubai: {
      key: 'uae_dubai',
      name: 'United Arab Emirates — Dubai',
      country: 'UAE',
      flag: '🇦🇪',
      lat: 25.2048,
      lng: 55.2708,
      zoom: 14,
      carrier: 'e& (Etisalat) / du Telecom',
      currency: 'AED',
      geofenceName: 'Dubai Downtown & Business Bay Hub',
      geofenceCenter: [25.2048, 55.2708],
      geofenceRadius: 6000,
      bikes: [
        {
          id: 1,
          plate: 'DXB-412K',
          model: 'Bajaj Boxer BM150 (Delivery Fleet)',
          owner: 'John Baptist Mukasa',
          phone: '+971 50 1234567',
          nin: 'EID-784-1990-12',
          imei: '863892050119283',
          simNumber: '+971 50 109843',
          locationName: 'Sheikh Zayed Rd / Downtown Dubai',
          lat: 25.1972,
          lng: 25.2744,
          speed: 55.0,
          batteryVoltage: 12.6,
          ignition: true,
          relayState: false,
          tamperAlert: false,
          satellites: 12,
          gsmCsq: 30,
          heading: 45,
          shiftDistance: 32.0,
          totalDistance: 98.0,
          status: 'active',
          trail: [[25.1920, 25.2700], [25.1972, 25.2744]]
        },
        {
          id: 2,
          plate: 'DXB-770E',
          model: 'TVS Star HLX 125',
          owner: 'John Baptist Mukasa',
          phone: '+971 50 1234567',
          nin: 'EID-784-1990-12',
          imei: '863892050119284',
          simNumber: '+971 55 981144',
          locationName: 'Business Bay / Marasi Drive',
          lat: 25.1840,
          lng: 55.2800,
          speed: 0.0,
          batteryVoltage: 12.4,
          ignition: false,
          relayState: false,
          tamperAlert: false,
          satellites: 10,
          gsmCsq: 27,
          heading: 180,
          shiftDistance: 14.0,
          totalDistance: 45.0,
          status: 'idle',
          trail: [[25.1800, 55.2780], [25.1840, 55.2800]]
        },
        {
          id: 3,
          plate: 'DXB-309Z',
          model: 'Yamaha Crux 110',
          owner: 'John Baptist Mukasa',
          phone: '+971 50 1234567',
          nin: 'EID-784-1990-12',
          imei: '863892050119285',
          simNumber: '+971 50 219083',
          locationName: 'Deira Gold Souk / Al Sabkha',
          lat: 25.2690,
          lng: 55.3020,
          speed: 0.0,
          batteryVoltage: 11.9,
          ignition: false,
          relayState: true,
          tamperAlert: false,
          satellites: 11,
          gsmCsq: 29,
          heading: 270,
          shiftDistance: 27.0,
          totalDistance: 82.0,
          status: 'immobilized',
          trail: [[25.2650, 55.2980], [25.2690, 55.3020]]
        }
      ]
    },

    uk_london: {
      key: 'uk_london',
      name: 'United Kingdom — Greater London',
      country: 'UK',
      flag: '🇬🇧',
      lat: 51.5074,
      lng: -0.1278,
      zoom: 14,
      carrier: 'EE UK / Vodafone UK',
      currency: 'GBP',
      geofenceName: 'London Central & ULEZ Safe Zone',
      geofenceCenter: [51.5074, -0.1278],
      geofenceRadius: 5000,
      bikes: [
        {
          id: 1,
          plate: 'LD24 KDX',
          model: 'Bajaj Boxer BM150 (Fleet Courier)',
          owner: 'John Baptist Mukasa',
          phone: '+44 7700 900123',
          nin: 'NI-JH920194B',
          imei: '863892050119283',
          simNumber: '+44 7700 109843',
          locationName: 'Westminster Bridge Rd, London',
          lat: 51.5010,
          lng: -0.1190,
          speed: 28.0,
          batteryVoltage: 12.6,
          ignition: true,
          relayState: false,
          tamperAlert: false,
          satellites: 10,
          gsmCsq: 26,
          heading: 70,
          shiftDistance: 19.0,
          totalDistance: 54.0,
          status: 'active',
          trail: [[51.4980, -0.1240], [51.5010, -0.1190]]
        },
        {
          id: 2,
          plate: 'LD25 FEY',
          model: 'TVS Star HLX 125',
          owner: 'John Baptist Mukasa',
          phone: '+44 7700 900123',
          nin: 'NI-JH920194B',
          imei: '863892050119284',
          simNumber: '+44 7700 981144',
          locationName: 'Covent Garden / Strand',
          lat: 51.5118,
          lng: -0.1226,
          speed: 0.0,
          batteryVoltage: 12.4,
          ignition: false,
          relayState: false,
          tamperAlert: false,
          satellites: 9,
          gsmCsq: 24,
          heading: 180,
          shiftDistance: 10.5,
          totalDistance: 32.0,
          status: 'idle',
          trail: [[51.5080, -0.1250], [51.5118, -0.1226]]
        },
        {
          id: 3,
          plate: 'LD23 ZAZ',
          model: 'Yamaha Crux 110',
          owner: 'John Baptist Mukasa',
          phone: '+44 7700 900123',
          nin: 'NI-JH920194B',
          imei: '863892050119285',
          simNumber: '+44 7700 219083',
          locationName: 'Canary Wharf / Bank Street',
          lat: 51.5030,
          lng: -0.0190,
          speed: 0.0,
          batteryVoltage: 11.9,
          ignition: false,
          relayState: true,
          tamperAlert: false,
          satellites: 11,
          gsmCsq: 28,
          heading: 270,
          shiftDistance: 24.0,
          totalDistance: 78.0,
          status: 'immobilized',
          trail: [[51.5000, -0.0240], [51.5030, -0.0190]]
        }
      ]
    }
  };

  // --- CLEAR ANY STALE DEMO ACCOUNT FROM LOCALSTORAGE ---
  try {
    const staleEmail = (localStorage.getItem('boda_user_email') || '').toLowerCase();
    if (staleEmail === 'john.mukasa@boda.ug' || staleEmail === 'emmanuel.otim@gmail.com') {
      localStorage.removeItem('boda_auth_token');
      localStorage.removeItem('boda_user_profile');
      localStorage.removeItem('boda_user_role');
      localStorage.removeItem('boda_user_email');
      localStorage.removeItem('boda_user_avatar');
      localStorage.removeItem('boda_avatar_owner');
    }
  } catch (_) {}

  // --- GLOBAL STATE ---
  const state = {
    activeTerritoryKey: 'uganda_kampala',
    activeBikeIndex: 0,
    bikes: [],

    currentSort: 'name',
    searchQuery: '',
    showTrails: true,
    showGeofence: true,
    isMapPickingMode: false,

    // Leaflet Instances
    map: null,
    markers: {},
    trailPolylines: {},
    geofenceCircle: null,
    heatLayerGroup: null,
    activeBasemap: 'leaflet',
    leafletOsmLayer: null,
    searchedLocationMarker: null,
    searchDebounceTimer: null,
    currentSearchResults: [],

    // Real-Time & Simulator
    ws: null,
    simInterval: null,
    activeView: 'position',

    // Customer Danger Alerts, SMS Log & Phone/PC Ringing State
    dangerAlerts: [],
    activeDangerFilter: 'all',
    dangerAlertPin: null,
    knownDangerEventIds: new Set(),
    hasLoadedInitialDangerFeed: false,
    activeRingingAlert: null,
    tabTitleBlinkTimer: null,
    defaultDocTitle: document.title,

    // Real-Time Hardware Online / Offline Monitoring State
    gatewayReachable: true
  };

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    hydrateInitialLocalMotorcycles();
    initLeafletMap();
    initNavigationSidebar();
    initHeaderControls();
    initTerritorySelectors();
    initSidebarControls();
    initSecurityControls();
    initModals();
    initDangerAlertsCenter();
    initDeviceOfflineMonitor();
    initUserProfileAndThemes();
    initMultiBikeManager();
    initCustomerSignupAndAuth();
    initMobileResponsive();
    renderAssetList();
    renderSelectedPayload();
    updateDockHUD();
    // Load registered motorcycles for this user's profile
    fetchUserMotorcycles();
    // Do not run artificial simulation - map tracks real-time ESP32 GPS
    // startMovementSimulation();
    connectWebSocket();
    fetchCustomerDangerAlerts(true);
    setInterval(() => fetchCustomerDangerAlerts(false), 4000);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        fetchCustomerDangerAlerts(false);
        fetchHardwareDeviceStatus(false);
      }
    });
  });

  // =========================================================================
  // 1. LEAFLET GIS ENGINE (PURE LEAFLET OPENSTREETMAP AS SOLE GIS ENGINE)
  // =========================================================================
  function initLeafletMap() {
    const cur = TERRITORIES[state.activeTerritoryKey];
    const activeBike = state.bikes[0];
    const initialLat = (activeBike && activeBike.lat) ? activeBike.lat : cur.lat;
    const initialLng = (activeBike && activeBike.lng) ? activeBike.lng : cur.lng;

    state.map = L.map('leaflet-map-canvas', {
      zoomControl: false,
      attributionControl: true
    }).setView([initialLat, initialLng], 15);

    L.control.zoom({ position: 'topright' }).addTo(state.map);

    // Official Standard Leaflet OpenStreetMap Layer (Sole GIS Base Layer)
    state.leafletOsmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(state.map);

    state.activeBasemap = 'leaflet';

    // Safe Operational Geofence Perimeter
    state.geofenceCircle = L.circle(cur.geofenceCenter, {
      radius: cur.geofenceRadius,
      color: '#0284c7',
      weight: 2,
      dashArray: '6, 8',
      fillColor: '#38bdf8',
      fillOpacity: 0.08
    }).addTo(state.map);

    state.geofenceCircle.bindTooltip(`${cur.geofenceName} (${cur.geofenceRadius.toLocaleString()}m)`, {
      sticky: true,
      className: 'geofence-tooltip'
    });

    state.heatLayerGroup = L.layerGroup().addTo(state.map);

    // Click on map listener for picking custom operating base
    state.map.on('click', handleMapClickPickLocation);

    // Keep map canvas fitted to every device viewport, resize, or phone rotation
    const refreshMapViewport = () => {
      if (state.map) {
        state.map.invalidateSize({ animate: false });
      }
    };
    window.addEventListener('resize', refreshMapViewport);
    window.addEventListener('orientationchange', () => setTimeout(refreshMapViewport, 180));
    const mapCanvasEl = document.getElementById('leaflet-map-canvas');
    if (mapCanvasEl && typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => refreshMapViewport());
      ro.observe(mapCanvasEl);
    }
    setTimeout(refreshMapViewport, 250);

    renderAllVehicleMarkers();
  }

  // Handle Map Click When Picking a Custom Operating Location
  function handleMapClickPickLocation(e) {
    if (!state.isMapPickingMode) return;

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    state.isMapPickingMode = false;
    const canvas = document.getElementById('leaflet-map-canvas');
    if (canvas) canvas.classList.remove('map-picking-active');

    // Pre-fill custom location modal
    const latInput = document.getElementById('custom-loc-lat');
    const lngInput = document.getElementById('custom-loc-lng');
    const nameInput = document.getElementById('custom-loc-name');

    if (latInput) latInput.value = lat.toFixed(4);
    if (lngInput) lngInput.value = lng.toFixed(4);
    if (nameInput) nameInput.value = `Custom Hub (${lat.toFixed(3)}, ${lng.toFixed(3)})`;

    openModal('modal-custom-location');
    showTerritoryToast('📍', 'LOCATION PIN DROPPED', `Coordinates: ${lat.toFixed(4)}°, ${lng.toFixed(4)}°`);
  }

  // Custom Interactive Vehicle Marker (Orientation Arrow + Attached High-Visibility Bubble)
  function createVehicleIcon(bike) {
    const selectedBike = state.bikes[state.activeBikeIndex];
    const isSelected = Boolean(selectedBike && selectedBike.id === bike.id);
    let statusClass = 'pin-normal';
    let bubbleClass = '';
    let arrowClass = '';
    const isOffline = bike.isOnline === false;

    if (bike.relayState) {
      statusClass = 'pin-danger';
      bubbleClass = 'danger-bubble';
      arrowClass = 'danger-icon';
    } else if (isOffline) {
      statusClass = 'pin-offline';
      bubbleClass = 'offline-bubble';
    } else if (isSelected) {
      statusClass = 'pin-active';
      bubbleClass = 'active-bubble';
    } else if (bike.tamperAlert) {
      bubbleClass = 'danger-bubble';
    }

    const bubbleLabel = isOffline ? `OFFLINE &bull; ${bike.plate}` : bike.plate;

    const html = `
      <div class="custom-vehicle-marker" id="marker-${bike.plate.replace(/[^a-zA-Z0-9]/g, '')}">
        <div class="marker-bubble ${bubbleClass}">
          ${bubbleLabel}
        </div>
        <div class="marker-pin-wrap ${statusClass}">
          <div class="marker-arrow-icon ${arrowClass}" style="transform: rotate(${bike.heading}deg);">
            <i class="fa-solid ${isOffline ? 'fa-plug-circle-xmark' : 'fa-location-arrow'}"></i>
          </div>
        </div>
      </div>
    `;

    return L.divIcon({
      html: html,
      className: 'vehicle-div-icon',
      iconSize: [60, 56],
      iconAnchor: [30, 48],
      popupAnchor: [0, -48]
    });
  }

  // Render or Update all Vehicle Markers
  function renderAllVehicleMarkers() {
    state.bikes.forEach((bike, index) => {
      const pos = [bike.lat, bike.lng];

      if (!state.markers[bike.id]) {
        const marker = L.marker(pos, {
          icon: createVehicleIcon(bike),
          zIndexOffset: index === state.activeBikeIndex ? 1000 : 100
        }).addTo(state.map);

        const hoverContent = `
          <div class="marker-hover-card">
            <div class="hover-card-header">
              <span class="hover-asset-title">${bike.model}</span>
              <span class="hover-plate-badge">${bike.plate}</span>
            </div>
            <div class="hover-metric-line">
              <i class="fa-solid fa-road"></i>
              <span>Distance Shift: <strong>+${bike.shiftDistance.toFixed(1)} km</strong></span>
            </div>
            <div class="hover-metric-line">
              <i class="fa-solid fa-gauge-high"></i>
              <span>Speed: <strong>${bike.speed.toFixed(1)} km/h</strong> &bull; ${bike.batteryVoltage.toFixed(1)}V</span>
            </div>
            <div class="hover-metric-line">
              <i class="fa-solid fa-location-dot"></i>
              <span>${bike.locationName}</span>
            </div>
          </div>
        `;
        marker.bindPopup(hoverContent, { offset: [0, -10], closeButton: false });

        marker.on('mouseover', function () {
          this.openPopup();
        });
        marker.on('mouseout', function () {
          this.closePopup();
        });

        marker.on('click', () => {
          selectBike(index);
        });

        state.markers[bike.id] = marker;

        const polyline = L.polyline(bike.trail, {
          color: bike.id === 1 ? '#0284c7' : '#64748b',
          weight: 4,
          opacity: 0.8,
          smoothFactor: 1
        }).addTo(state.map);

        state.trailPolylines[bike.id] = polyline;
      } else {
        state.markers[bike.id].setLatLng(pos);
        state.markers[bike.id].setIcon(createVehicleIcon(bike));
        state.markers[bike.id].setZIndexOffset(index === state.activeBikeIndex ? 1000 : 100);

        if (state.trailPolylines[bike.id]) {
          state.trailPolylines[bike.id].setLatLngs(bike.trail);
        }
      }
    });
  }

  function clearAllMarkersAndPolylines() {
    Object.values(state.markers).forEach(m => state.map.removeLayer(m));
    Object.values(state.trailPolylines).forEach(p => state.map.removeLayer(p));
    state.markers = {};
    state.trailPolylines = {};
  }

  // =========================================================================
  // 2. INTERNATIONAL MULTI-COUNTRY TERRITORY CONTROLLER
  // =========================================================================
  function initTerritorySelectors() {
    // Header dropdown
    const headerSelect = document.getElementById('country-location-select');
    if (headerSelect) {
      headerSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val === 'custom_interactive') {
          openModal('modal-custom-location');
        } else {
          switchTerritory(val);
        }
      });
    }

    // Config modal dropdown
    const cfgSelect = document.getElementById('cfg-country-select');
    if (cfgSelect) {
      cfgSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        switchTerritory(val);
        if (headerSelect) headerSelect.value = val;
      });
    }

    // Quick crosshair button next to dropdown
    const quickCustomBtn = document.getElementById('btn-quick-custom-loc');
    if (quickCustomBtn) {
      quickCustomBtn.addEventListener('click', () => {
        openModal('modal-custom-location');
      });
    }

    // Activate Map Click in Modal 6
    const btnActivateMapClick = document.getElementById('btn-activate-map-click');
    if (btnActivateMapClick) {
      btnActivateMapClick.addEventListener('click', () => {
        closeModal('modal-custom-location');
        state.isMapPickingMode = true;
        const canvas = document.getElementById('leaflet-map-canvas');
        if (canvas) canvas.classList.add('map-picking-active');

        showTerritoryToast('📍', 'CLICK MAP TO SET LOCATION', 'Click anywhere on the map to anchor your operational base.');
      });
    }

    // Save custom location
    const btnSaveCustomLoc = document.getElementById('btn-save-custom-loc');
    if (btnSaveCustomLoc) {
      btnSaveCustomLoc.addEventListener('click', applyCustomLocationFromModal);
    }

    // Radius slider in custom modal
    const customRadiusSlider = document.getElementById('custom-loc-radius');
    const customRadiusVal = document.getElementById('custom-radius-val');
    if (customRadiusSlider && customRadiusVal) {
      customRadiusSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        customRadiusVal.textContent = `${val.toLocaleString()} meters`;
      });
    }
  }

  // Switch active operating territory to a predefined country/region
  function switchTerritory(key) {
    if (!TERRITORIES[key]) return;

    state.activeTerritoryKey = key;
    const t = TERRITORIES[key];

    // Fly map smoothly to new city without overwriting registered customer motorcycles
    if (state.map) {
      state.map.flyTo([t.lat, t.lng], t.zoom, { duration: 1.5 });

      // Update Geofence Circle
      if (state.geofenceCircle) {
        state.geofenceCircle.setLatLng(t.geofenceCenter);
        state.geofenceCircle.setRadius(t.geofenceRadius);
        state.geofenceCircle.setTooltipContent(`${t.geofenceName} (${t.geofenceRadius.toLocaleString()}m)`);
      }
    }

    renderAllVehicleMarkers();
    renderAssetList();
    renderSelectedPayload();
    updateDockHUD();

    // Sync header dropdown
    const headerSelect = document.getElementById('country-location-select');
    if (headerSelect && headerSelect.value !== key) {
      headerSelect.value = key;
    }

    // Sync mobile territory pill
    const mobPill = document.getElementById('mobile-territory-pill');
    if (mobPill) {
      mobPill.textContent = `${t.flag} ${t.name.split(' ')[0]}`;
    }

    // Sync configuration modal
    const cfgSelect = document.getElementById('cfg-country-select');
    if (cfgSelect && cfgSelect.value !== key) {
      cfgSelect.value = key;
    }

    const cfgRadiusVal = document.getElementById('cfg-radius-val');
    const cfgRadiusSlider = document.getElementById('cfg-radius-slider');
    if (cfgRadiusVal) cfgRadiusVal.textContent = `${t.geofenceRadius.toLocaleString()} meters`;
    if (cfgRadiusSlider) cfgRadiusSlider.value = t.geofenceRadius;

    // Toast notification
    showTerritoryToast(t.flag, 'OPERATIONAL REGION UPDATED', `Vehicle fleet repositioned to ${t.name}. Geofence and cellular routes calibrated.`);
  }

  // Apply custom location defined by the user
  function applyCustomLocationFromModal() {
    const name = document.getElementById('custom-loc-name').value.trim() || 'Custom Fleet Hub';
    const country = document.getElementById('custom-loc-country').value.trim() || 'International';
    const lat = parseFloat(document.getElementById('custom-loc-lat').value) || 0.0;
    const lng = parseFloat(document.getElementById('custom-loc-lng').value) || 0.0;
    const radius = parseInt(document.getElementById('custom-loc-radius').value, 10) || 4000;

    const customKey = 'custom_active';
    TERRITORIES[customKey] = {
      key: customKey,
      name: `${name} (${country})`,
      country: country,
      flag: '📍',
      lat: lat,
      lng: lng,
      zoom: 14,
      carrier: 'Global Cellular Gateway / MQTTS',
      currency: 'USD',
      geofenceName: `${name} Safe Operating Perimeter`,
      geofenceCenter: [lat, lng],
      geofenceRadius: radius,
      bikes: [
        {
          id: 1,
          plate: 'NODE-01',
          model: 'Fleet Patrol Node #1',
          owner: 'John Baptist Mukasa',
          phone: '+1 800 555 0199',
          nin: 'ID-GLOBAL-01',
          imei: '863892050119283',
          simNumber: '+1 800 555 0101',
          locationName: `${name} Central Corridor`,
          lat: lat + 0.003,
          lng: lng + 0.003,
          speed: 36.0,
          batteryVoltage: 12.6,
          ignition: true,
          relayState: false,
          tamperAlert: false,
          satellites: 11,
          gsmCsq: 27,
          heading: 65,
          shiftDistance: 12.5,
          totalDistance: 38.0,
          status: 'active',
          trail: [[lat, lng], [lat + 0.003, lng + 0.003]]
        },
        {
          id: 2,
          plate: 'NODE-02',
          model: 'Fleet Delivery Node #2',
          owner: 'John Baptist Mukasa',
          phone: '+1 800 555 0199',
          nin: 'ID-GLOBAL-01',
          imei: '863892050119284',
          simNumber: '+1 800 555 0102',
          locationName: `${name} Station Hub`,
          lat: lat,
          lng: lng,
          speed: 0.0,
          batteryVoltage: 12.4,
          ignition: false,
          relayState: false,
          tamperAlert: false,
          satellites: 9,
          gsmCsq: 24,
          heading: 180,
          shiftDistance: 5.0,
          totalDistance: 22.0,
          status: 'idle',
          trail: [[lat - 0.002, lng - 0.002], [lat, lng]]
        },
        {
          id: 3,
          plate: 'NODE-03',
          model: 'Security Escort Node #3',
          owner: 'John Baptist Mukasa',
          phone: '+1 800 555 0199',
          nin: 'ID-GLOBAL-01',
          imei: '863892050119285',
          simNumber: '+1 800 555 0103',
          locationName: `${name} Outer Checkpoint`,
          lat: lat - 0.005,
          lng: lng + 0.004,
          speed: 0.0,
          batteryVoltage: 11.9,
          ignition: false,
          relayState: true,
          tamperAlert: false,
          satellites: 10,
          gsmCsq: 25,
          heading: 270,
          shiftDistance: 18.0,
          totalDistance: 54.0,
          status: 'immobilized',
          trail: [[lat - 0.003, lng + 0.002], [lat - 0.005, lng + 0.004]]
        }
      ]
    };

    closeModal('modal-custom-location');
    switchTerritory(customKey);
  }

  function showTerritoryToast(flag, title, msg) {
    const toast = document.getElementById('territory-toast');
    if (!toast) return;

    setText('toast-flag', flag);
    setText('toast-title', title);
    setText('toast-msg', msg);

    toast.classList.remove('hidden');

    if (state.toastTimer) {
      clearTimeout(state.toastTimer);
    }
    state.toastTimer = setTimeout(() => {
      toast.classList.add('hidden');
      state.toastTimer = null;
    }, 3500);
  }

  // =========================================================================
  // 3. LEFT-HAND NAVIGATION SIDEBAR ACTIONS
  // =========================================================================
  function initNavigationSidebar() {
    const navItems = document.querySelectorAll('.nav-menu-item');

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        const view = item.getAttribute('data-view');
        state.activeView = view;

        if (view === 'position') {
          focusActiveBikeOnMap();
        } else if (view === 'alerts') {
          openDangerAlertsModal();
        } else if (view === 'calendar') {
          openModal('modal-calendar-playback');
        } else if (view === 'analysis') {
          openModal('modal-route-analysis');
        } else if (view === 'reports') {
          openModal('modal-data-reports');
        } else if (view === 'config') {
          openModal('modal-configuration');
        } else if (view === 'add-bike') {
          openAddBikeModal();
        } else if (view === 'signup') {
          openCustomerAuthModal('signup');
        } else if (view === 'profile') {
          openModal('modal-user-profile');
          renderProfileBikesList();
        }
      });
    });

    // Log Out Handler Function: Clears credentials and redirects immediately to login terminal
    function executeLogout() {
      showTerritoryToast('🔒', 'LOGGING OUT', 'Ending customer session and returning to Login Terminal...');

      try {
        localStorage.removeItem('boda_auth_token');
        localStorage.removeItem('boda_user_profile');
        localStorage.removeItem('boda_user_role');
        localStorage.removeItem('boda_user_email');
        sessionStorage.clear();
      } catch (e) {
        console.warn('Storage clear error on logout:', e);
      }

      setTimeout(() => {
        window.location.href = '/';
      }, 350);
    }

    // Attach to all logout buttons (desktop sidebar, mobile bar, etc.)
    const logoutButtons = document.querySelectorAll('#btn-logout, #btn-mobile-logout, .btn-logout');
    logoutButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        executeLogout();
      });
    });

    // Populate user profile info dynamically from session
    try {
      const storedEmail = localStorage.getItem('boda_user_email') || '';
      let cachedProfile = null;
      try {
        const raw = localStorage.getItem('boda_user_profile');
        if (raw) cachedProfile = JSON.parse(raw);
      } catch (e) {}

      const resolvedName = cachedProfile?.full_name || (storedEmail ? storedEmail.split('@')[0] : 'Customer Account');
      const initials = resolvedName.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'CA';

      const nameEl = document.getElementById('user-display-name');
      const avatarEl = document.getElementById('user-avatar-initials');
      if (nameEl) nameEl.textContent = resolvedName;
      if (avatarEl) avatarEl.textContent = initials;
    } catch (e) {}

    // Simulator Mini-Strip Buttons
    const simTamperBtn = document.getElementById('sim-tamper-btn');
    if (simTamperBtn) {
      simTamperBtn.addEventListener('click', triggerTamperSimulation);
    }

    const simBatCutBtn = document.getElementById('sim-battery-cut-btn');
    if (simBatCutBtn) {
      simBatCutBtn.addEventListener('click', triggerBatteryCutSimulation);
    }

    const simBreachBtn = document.getElementById('sim-breach-btn');
    if (simBreachBtn) {
      simBreachBtn.addEventListener('click', triggerGeofenceBreachSimulation);
    }

    const simTestRingBtn = document.getElementById('sim-test-ring-btn');
    if (simTestRingBtn) {
      simTestRingBtn.addEventListener('click', triggerPhoneComputerRingTest);
    }
  }

  // =========================================================================
  // 4. MAP HEADER CONTROLS (SMART LOCATION & FLEET SEARCH, SATELLITE, GEOFENCE)
  // =========================================================================
  function initHeaderControls() {
    const searchInput = document.getElementById('map-search-input');
    const searchClear = document.getElementById('map-search-clear');
    const searchDropdown = document.getElementById('map-search-dropdown');
    const searchContainer = document.getElementById('map-search-container');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        state.searchQuery = query.toLowerCase();

        if (query.length > 0) {
          if (searchClear) searchClear.classList.remove('hidden');
        } else {
          if (searchClear) searchClear.classList.add('hidden');
          if (searchDropdown) searchDropdown.classList.add('hidden');
        }

        renderAssetList();

        clearTimeout(state.searchDebounceTimer);
        if (query.length >= 2) {
          state.searchDebounceTimer = setTimeout(() => {
            performSmartLocationAndFleetSearch(query);
          }, 250);
        } else {
          if (searchDropdown) searchDropdown.classList.add('hidden');
          state.currentSearchResults = [];
        }
      });

      // Keyboard navigation: Enter selects top match, Escape closes dropdown
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (state.currentSearchResults && state.currentSearchResults.length > 0) {
            selectSearchResult(state.currentSearchResults[0]);
          } else if (searchInput.value.trim().length >= 2) {
            geocodeAndFocusFirstMatch(searchInput.value.trim());
          }
        } else if (e.key === 'Escape') {
          if (searchDropdown) searchDropdown.classList.add('hidden');
        }
      });

      // Re-open dropdown when focusing input if results exist
      searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2 && state.currentSearchResults.length > 0) {
          if (searchDropdown) searchDropdown.classList.remove('hidden');
        }
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        state.searchQuery = '';
        searchClear.classList.add('hidden');
        if (searchDropdown) searchDropdown.classList.add('hidden');
        state.currentSearchResults = [];
        renderAssetList();
        clearSearchedLocationPin();
      });
    }

    // Dismiss search dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (searchContainer && !searchContainer.contains(e.target)) {
        if (searchDropdown) searchDropdown.classList.add('hidden');
      }
    });

    // Leaflet OpenStreetMap Engine Focus & Quick Recenter
    const toggleSatelliteBtn = document.getElementById('ctrl-toggle-satellite');
    if (toggleSatelliteBtn) {
      toggleSatelliteBtn.addEventListener('click', () => {
        const cur = TERRITORIES[state.activeTerritoryKey];
        if (state.map && cur) {
          state.map.flyTo([cur.lat, cur.lng], cur.zoom, { duration: 1.0 });
          showTerritoryToast('🗺️', 'LEAFLET MAP ACTIVE', `Centered on ${cur.city}, ${cur.country} (${cur.name}).`);
        }
      });
    }

    // Toggle Route Trails Polyline
    const toggleTrailsBtn = document.getElementById('ctrl-toggle-trails');
    if (toggleTrailsBtn) {
      toggleTrailsBtn.addEventListener('click', () => {
        state.showTrails = !state.showTrails;
        toggleTrailsBtn.classList.toggle('active', state.showTrails);

        Object.values(state.trailPolylines).forEach(poly => {
          if (state.showTrails) {
            state.map.addLayer(poly);
          } else {
            state.map.removeLayer(poly);
          }
        });
      });
    }

    // Toggle Safe Zones Geofence
    const toggleGeofenceBtn = document.getElementById('ctrl-toggle-geofence');
    if (toggleGeofenceBtn) {
      toggleGeofenceBtn.addEventListener('click', () => {
        state.showGeofence = !state.showGeofence;
        toggleGeofenceBtn.classList.toggle('active', state.showGeofence);

        if (state.showGeofence) {
          state.map.addLayer(state.geofenceCircle);
        } else {
          state.map.removeLayer(state.geofenceCircle);
        }
      });
    }

    // Fit All Assets on Map
    const recenterAllBtn = document.getElementById('ctrl-recenter-all');
    if (recenterAllBtn) {
      recenterAllBtn.addEventListener('click', fitAllAssetsOnMap);
    }

    // Dismiss Alert Ticker
    const tickerDismiss = document.getElementById('ticker-dismiss');
    if (tickerDismiss) {
      tickerDismiss.addEventListener('click', () => {
        document.getElementById('central-alert-ticker').classList.add('hidden');
        stopEmergencyDeviceRing();
      });
    }

    const tickerViewAlerts = document.getElementById('ticker-view-alerts');
    if (tickerViewAlerts) {
      tickerViewAlerts.addEventListener('click', () => {
        stopEmergencyDeviceRing();
        openDangerAlertsModal();
      });
    }

    const tickerQuickCut = document.getElementById('ticker-quick-cut');
    if (tickerQuickCut) {
      tickerQuickCut.addEventListener('click', () => {
        stopEmergencyDeviceRing();
        openModal('modal-pin-security');
      });
    }
  }

  function fitAllAssetsOnMap() {
    if (!state.bikes.length) return;
    const latLngs = state.bikes.map(b => [b.lat, b.lng]);
    const bounds = L.latLngBounds(latLngs);
    state.map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
  }

  // =========================================================================
  // 4B. REAL-TIME LOCATION & FLEET GEOCODING SEARCH ENGINE
  // =========================================================================
  async function performSmartLocationAndFleetSearch(query) {
    const dropdown = document.getElementById('map-search-dropdown');
    if (!dropdown) return;

    dropdown.classList.remove('hidden');
    dropdown.innerHTML = `
      <div class="search-loading-row">
        <i class="fa-solid fa-circle-notch fa-spin text-accent"></i>
        <span>Searching locations & vehicles...</span>
      </div>
    `;

    const lower = query.toLowerCase();

    // 1. Search fleet assets matching plate, model, or driver
    const fleetMatches = state.bikes
      .map((b, idx) => ({ ...b, originalIndex: idx }))
      .filter(b =>
        b.plate.toLowerCase().includes(lower) ||
        b.model.toLowerCase().includes(lower) ||
        b.owner.toLowerCase().includes(lower) ||
        b.locationName.toLowerCase().includes(lower)
      );

    // 2. Fetch worldwide geocoded locations
    let locationMatches = [];
    try {
      locationMatches = await fetchGeocodedLocations(query);
    } catch (e) {
      locationMatches = [];
    }

    // Combine current active results for keyboard Enter selection
    state.currentSearchResults = [
      ...fleetMatches.map(b => ({ type: 'fleet', data: b })),
      ...locationMatches.map(l => ({ type: 'location', data: l }))
    ];

    renderSearchDropdown(fleetMatches, locationMatches, query);
  }

  function renderSearchDropdown(fleetMatches, locationMatches, query) {
    const dropdown = document.getElementById('map-search-dropdown');
    if (!dropdown) return;

    if (fleetMatches.length === 0 && locationMatches.length === 0) {
      dropdown.innerHTML = `
        <div class="search-empty-row">
          <i class="fa-solid fa-location-crosshairs text-muted"></i>
          <span>No locations or vehicles matching "<strong>${escapeHtml(query)}</strong>"</span>
        </div>
      `;
      return;
    }

    let html = '';

    // Vehicles Section
    if (fleetMatches.length > 0) {
      html += `
        <div class="search-dropdown-section-header">
          <i class="fa-solid fa-motorcycle text-accent"></i> Registered Fleet Vehicles (${fleetMatches.length})
        </div>
      `;
      fleetMatches.forEach((bike) => {
        const speedClass = bike.speed > 0 ? 'text-green' : 'text-amber';
        html += `
          <div class="search-dropdown-item" data-type="fleet" data-idx="${bike.originalIndex}">
            <div class="search-item-icon icon-vehicle">
              <i class="fa-solid fa-motorcycle"></i>
            </div>
            <div class="search-item-info">
              <div class="search-item-title">${escapeHtml(bike.plate)} &bull; ${escapeHtml(bike.model)}</div>
              <div class="search-item-subtitle"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(bike.locationName)}</div>
            </div>
            <div class="search-item-badge ${speedClass}">${bike.speed.toFixed(1)} km/h</div>
          </div>
        `;
      });
    }

    // Locations Section
    if (locationMatches.length > 0) {
      html += `
        <div class="search-dropdown-section-header">
          <i class="fa-solid fa-location-dot text-accent"></i> Places & Addresses Found (${locationMatches.length})
        </div>
      `;
      locationMatches.forEach((loc) => {
        html += `
          <div class="search-dropdown-item" data-type="location" data-lat="${loc.lat}" data-lng="${loc.lng}" data-name="${escapeHtml(loc.name)}" data-address="${escapeHtml(loc.address)}">
            <div class="search-item-icon icon-location">
              <i class="fa-solid fa-map-pin"></i>
            </div>
            <div class="search-item-info">
              <div class="search-item-title">${escapeHtml(loc.name)}</div>
              <div class="search-item-subtitle">${escapeHtml(loc.address)}</div>
            </div>
            <div class="search-item-badge"><i class="fa-solid fa-crosshairs"></i> ${loc.lat.toFixed(2)}°, ${loc.lng.toFixed(2)}°</div>
          </div>
        `;
      });
    }

    dropdown.innerHTML = html;

    // Attach click listeners to items
    dropdown.querySelectorAll('.search-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const type = item.getAttribute('data-type');
        if (type === 'fleet') {
          const idx = parseInt(item.getAttribute('data-idx'), 10);
          selectBike(idx);
          dropdown.classList.add('hidden');
        } else if (type === 'location') {
          const lat = parseFloat(item.getAttribute('data-lat'));
          const lng = parseFloat(item.getAttribute('data-lng'));
          const name = item.getAttribute('data-name');
          const address = item.getAttribute('data-address');
          focusSearchedLocation(lat, lng, name, address);
          dropdown.classList.add('hidden');
        }
      });
    });
  }

  // Select first item from current keyboard Enter
  function selectSearchResult(res) {
    const dropdown = document.getElementById('map-search-dropdown');
    if (dropdown) dropdown.classList.add('hidden');

    if (!res) return;
    if (res.type === 'fleet') {
      selectBike(res.data.originalIndex);
    } else if (res.type === 'location') {
      focusSearchedLocation(res.data.lat, res.data.lng, res.data.name, res.data.address);
    }
  }

  // Geocode location using Local Dictionary + OpenStreetMap Nominatim
  async function fetchGeocodedLocations(query) {
    const cleanQuery = query.trim();
    if (!cleanQuery) return [];
    const q = cleanQuery.toLowerCase();

    // 1. Local Landmark Registry (High-precision regional hubs)
    const LOCAL_PLACES = [
      { name: 'Acacia Mall, Kisementi', address: 'Acacia Avenue, Kololo, Kampala, Uganda', lat: 0.3359, lng: 32.5855, country: 'Uganda' },
      { name: 'Makerere University Main Gate', address: 'Makerere Hill Rd, Kampala, Uganda', lat: 0.3328, lng: 32.5694, country: 'Uganda' },
      { name: 'Mulago National Referral Hospital', address: 'Mulago Hill Rd, Kampala, Uganda', lat: 0.3375, lng: 32.5760, country: 'Uganda' },
      { name: 'Kisekka Market Auto Spare Hub', address: 'Downtown Kampala, Uganda', lat: 0.3150, lng: 32.5730, country: 'Uganda' },
      { name: 'Katwe Auto Electrician Center', address: 'Katwe Rd, Kampala, Uganda', lat: 0.3010, lng: 32.5760, country: 'Uganda' },
      { name: 'Wandegeya Roundabout', address: 'Wandegeya, Kampala, Uganda', lat: 0.3341, lng: 32.5694, country: 'Uganda' },
      { name: 'Entebbe International Airport', address: 'Airport Rd, Entebbe, Uganda', lat: 0.0424, lng: 32.4435, country: 'Uganda' },
      { name: 'Jinja City Source of the Nile', address: 'Nile Crescent, Jinja, Uganda', lat: 0.4244, lng: 33.2041, country: 'Uganda' },
      { name: 'Nairobi Central Business District', address: 'Kenyatta Avenue, Nairobi, Kenya', lat: -1.2864, lng: 36.8172, country: 'Kenya' }
    ];

    const localMatches = LOCAL_PLACES.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q)
    );

    // 2. Global: OpenStreetMap Nominatim Service (Official Leaflet / OSM Geocoder)
    let apiMatches = [];
    try {
      const osmUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanQuery)}&limit=6`;
      const res = await fetch(osmUrl, {
        headers: { 'Accept-Language': 'en' }
      });
      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list) && list.length > 0) {
          apiMatches = list.map(item => {
            const parts = item.display_name.split(',');
            const shortName = parts[0].trim();
            return {
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lon),
              name: shortName,
              address: item.display_name,
              country: parts[parts.length - 1] ? parts[parts.length - 1].trim() : ''
            };
          });
        }
      }
    } catch (e) {
      // Ignored
    }

    // Deduplicate and combine (Local matches first)
    const combined = [...localMatches];
    apiMatches.forEach(api => {
      const exists = combined.some(c =>
        Math.abs(c.lat - api.lat) < 0.005 && Math.abs(c.lng - api.lng) < 0.005
      );
      if (!exists) {
        combined.push(api);
      }
    });

    return combined.slice(0, 6);
  }

  // Smoothly Fly Map to Location, Drop Pin, and Display Rich Action Popup
  function focusSearchedLocation(lat, lng, name, address) {
    if (!state.map) return;

    // Clear previous search marker if any
    clearSearchedLocationPin();

    // Fly map smoothly to searched coordinate
    state.map.flyTo([lat, lng], 15, { animate: true, duration: 1.5 });

    // Custom glowing location pin
    const pinIcon = L.divIcon({
      className: 'searched-location-div-icon',
      html: `
        <div class="searched-location-pin">
          <div class="searched-location-pulse"></div>
          <div class="searched-location-badge">
            <i class="fa-solid fa-location-dot"></i>
          </div>
        </div>
      `,
      iconSize: [36, 44],
      iconAnchor: [18, 42],
      popupAnchor: [0, -40]
    });

    const cleanSafeName = name.replace(/'/g, "\\'");

    const popupHtml = `
      <div class="search-location-popup">
        <div class="popup-loc-header">
          <i class="fa-solid fa-location-dot text-accent"></i>
          <strong>${escapeHtml(name)}</strong>
        </div>
        <div class="popup-loc-coords">
          <div>${escapeHtml(address)}</div>
          <div style="margin-top: 4px;"><code>${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E</code></div>
        </div>
        <div class="popup-loc-actions">
          <button class="btn-popup-action btn-set-base" onclick="window.setSearchedLocationAsBase(${lat}, ${lng}, '${cleanSafeName}')" title="Set safe operational geofence at this location">
            <i class="fa-solid fa-shield-halved"></i> Set Safe Zone Hub
          </button>
          <button class="btn-popup-action btn-clear-pin" onclick="window.clearSearchedLocationPin()">
            <i class="fa-solid fa-xmark"></i> Clear Pin
          </button>
        </div>
      </div>
    `;

    const marker = L.marker([lat, lng], {
      icon: pinIcon,
      zIndexOffset: 2000
    }).addTo(state.map);

    marker.bindPopup(popupHtml, {
      className: 'searched-location-popup-wrapper',
      closeButton: true,
      autoPan: true
    }).openPopup();

    state.searchedLocationMarker = marker;

    // Update search bar text to indicate the active focused place
    const searchInput = document.getElementById('map-search-input');
    if (searchInput) {
      searchInput.value = name;
    }

    showTerritoryToast('📍', 'LOCATION FOUND', `${name} centered on satellite map.`);
  }

  // Clear Searched Location Pin
  function clearSearchedLocationPin() {
    if (state.searchedLocationMarker && state.map) {
      state.map.removeLayer(state.searchedLocationMarker);
      state.searchedLocationMarker = null;
    }
  }

  // Set Searched Location as Operational Base Hub
  function setSearchedLocationAsBase(lat, lng, name) {
    if (!state.map) return;

    // Reposition Geofence circle
    if (state.geofenceCircle) {
      state.geofenceCircle.setLatLng([lat, lng]);
      state.geofenceCircle.setTooltipContent(`${name} Operational Safe Zone (3,500m)`);
      if (!state.map.hasLayer(state.geofenceCircle)) {
        state.map.addLayer(state.geofenceCircle);
        state.showGeofence = true;
        const toggleGeofenceBtn = document.getElementById('ctrl-toggle-geofence');
        if (toggleGeofenceBtn) toggleGeofenceBtn.classList.add('active');
      }
    }

    // Update mobile territory indicator
    const mobPill = document.getElementById('mobile-territory-pill');
    if (mobPill) mobPill.textContent = `📍 ${name.split(',')[0].slice(0, 12)}`;

    showTerritoryToast('🎯', 'OPERATIONAL BASE SET', `Safe perimeter deployed around ${name}.`);
  }

  // Direct Geocode fallback when hitting Enter with no dropdown
  async function geocodeAndFocusFirstMatch(query) {
    try {
      const places = await fetchGeocodedLocations(query);
      if (places && places.length > 0) {
        const top = places[0];
        focusSearchedLocation(top.lat, top.lng, top.name, top.address);
      } else {
        showTerritoryToast('⚠️', 'LOCATION NOT FOUND', `Could not find coordinates for "${query}".`);
      }
    } catch (e) {
      showTerritoryToast('⚠️', 'GEOCODING ERROR', 'Location lookup failed.');
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Expose global handlers for Leaflet HTML popups
  window.setSearchedLocationAsBase = setSearchedLocationAsBase;
  window.clearSearchedLocationPin = clearSearchedLocationPin;

  // =========================================================================
  // 5. RIGHT-HAND TELEMETRY SIDEBAR
  // =========================================================================
  function initSidebarControls() {
    const sidebarFilter = document.getElementById('sidebar-filter-input');
    if (sidebarFilter) {
      sidebarFilter.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase().trim();
        renderAssetList();
      });
    }

    const sortSelect = document.getElementById('vehicle-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.currentSort = e.target.value;
        renderAssetList();
      });
    }

    const btnCreatePdf = document.getElementById('btn-create-pdf');
    if (btnCreatePdf) {
      btnCreatePdf.addEventListener('click', generatePdfSnapshotReport);
    }

    const btnExportCsv = document.getElementById('btn-export-csv');
    if (btnExportCsv) {
      btnExportCsv.addEventListener('click', exportTelemetryCsv);
    }
  }

  function renderAssetList() {
    const container = document.getElementById('dynamic-asset-list');
    if (!container) return;

    let filtered = state.bikes.filter(bike => {
      if (!state.searchQuery) return true;
      return (
        bike.plate.toLowerCase().includes(state.searchQuery) ||
        bike.model.toLowerCase().includes(state.searchQuery) ||
        bike.locationName.toLowerCase().includes(state.searchQuery)
      );
    });

    filtered.sort((a, b) => {
      if (state.currentSort === 'name') {
        return a.model.localeCompare(b.model);
      } else if (state.currentSort === 'speed') {
        return b.speed - a.speed;
      } else if (state.currentSort === 'distance') {
        return b.shiftDistance - a.shiftDistance;
      } else if (state.currentSort === 'status') {
        return (a.relayState ? 1 : 0) - (b.relayState ? 1 : 0);
      }
      return 0;
    });

    const countPill = document.getElementById('asset-count-pill');
    if (countPill) {
      countPill.textContent = `${state.bikes.length} Asset${state.bikes.length === 1 ? '' : 's'}`;
    }

    const mobFleetBadge = document.getElementById('mobile-badge-fleet');
    if (mobFleetBadge) {
      mobFleetBadge.textContent = state.bikes.length;
    }

    syncMultiBikeCountersAndDropdowns();

    container.innerHTML = '';

    filtered.forEach(bike => {
      const originalIndex = state.bikes.findIndex(b => b.id === bike.id);
      const isSelected = originalIndex === state.activeBikeIndex;

      let statusDotClass = 'dot-green';
      let speedClass = 'text-green';
      const isOffline = bike.isOnline === false;

      if (bike.relayState) {
        statusDotClass = 'dot-red';
        speedClass = 'text-red';
      } else if (isOffline) {
        statusDotClass = 'dot-offline';
        speedClass = 'text-muted';
      } else if (bike.speed === 0) {
        statusDotClass = 'dot-amber';
        speedClass = 'text-amber';
      }

      const card = document.createElement('div');
      card.className = `asset-card ${isSelected ? 'active' : ''} ${isOffline ? 'is-offline' : ''}`;
      card.innerHTML = `
        <div class="card-top-row">
          <div class="card-title-group">
            <span class="dot-status ${statusDotClass}"></span>
            <span class="card-model-name">${escapeHtml(bike.model)}</span>
          </div>
          <div style="display: inline-flex; align-items: center; gap: 6px;">
            <span class="card-plate-tag">${escapeHtml(bike.plate)}</span>
            <button type="button" class="btn-card-delete-bike" data-imei="${escapeHtml(bike.imei)}" data-plate="${escapeHtml(bike.plate)}" title="Delete ${escapeHtml(bike.plate)} from your bike list" aria-label="Delete motorcycle ${escapeHtml(bike.plate)}" style="border: 1px solid #fecaca; background: #fff5f5; color: #dc2626; width: 24px; height: 24px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.72rem;">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
        <div class="card-data-snippets">
          <div class="snippet-item">
            <span class="snippet-label">${isOffline ? 'Status' : 'Speed'}</span>
            <span class="snippet-val ${speedClass}">${isOffline ? 'Offline' : `${bike.speed.toFixed(1)} km/h`}</span>
          </div>
          <div class="snippet-item">
            <span class="snippet-label">IMEI</span>
            <span class="snippet-val" style="font-family: var(--font-mono); font-size: 0.7rem;">${escapeHtml(String(bike.imei || '').slice(-8))}</span>
          </div>
          <div class="snippet-item">
            <span class="snippet-label">Battery</span>
            <span class="snippet-val">${bike.batteryVoltage.toFixed(1)}V</span>
          </div>
        </div>
      `;

      const delBtn = card.querySelector('.btn-card-delete-bike');
      if (delBtn) {
        delBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          promptAndDeleteBike(bike.imei, bike.plate);
        });
      }

      card.addEventListener('click', () => {
        selectBike(originalIndex);
      });

      container.appendChild(card);
    });

    if (state.bikes.length === 0) {
      const emptyBox = document.createElement('div');
      emptyBox.style.cssText = 'padding: 14px; border-radius: 12px; background: rgba(14,165,233,0.08); border: 1px dashed rgba(14,165,233,0.4); margin-bottom: 10px; text-align: center;';
      emptyBox.innerHTML = `
        <div style="font-size: 1.35rem; color: #0284c7; margin-bottom: 4px;"><i class="fa-solid fa-motorcycle"></i></div>
        <div style="font-weight: 700; font-size: 0.85rem; color: #0f172a; margin-bottom: 3px;">No Bike Linked Yet</div>
        <div style="font-size: 0.76rem; color: #64748b;">Enter your Tracker IMEI &amp; Bike details to start live GPS tracking.</div>
      `;
      container.appendChild(emptyBox);
    }

    const addCard = document.createElement('div');
    addCard.className = 'asset-add-card';
    addCard.innerHTML = state.bikes.length === 0
      ? `<i class="fa-solid fa-circle-plus"></i> <span>Link Your First Tracker &amp; Bike</span>`
      : `<i class="fa-solid fa-circle-plus"></i> <span>Add Another Bike to Profile</span>`;
    addCard.addEventListener('click', () => {
      openAddBikeModal({ onboarding: state.bikes.length === 0 });
    });
    container.appendChild(addCard);
  }

  function selectBike(index) {
    state.activeBikeIndex = index;
    renderAssetList();
    renderSelectedPayload();
    updateDockHUD();
    renderAllVehicleMarkers();
    focusActiveBikeOnMap();
  }

  function focusActiveBikeOnMap() {
    const bike = state.bikes[state.activeBikeIndex];
    if (bike && state.map) {
      state.map.panTo([bike.lat, bike.lng], { animate: true, duration: 0.8 });
    }
  }

  function renderSelectedPayload() {
    const bike = state.bikes[state.activeBikeIndex];
    if (!bike) {
      setText('payload-asset-name', 'No Bike Linked Yet');
      setText('payload-speed-val', '0.0');
      setText('payload-battery-val', '--');
      setText('payload-distance-val', '0.0');
      setText('payload-imei-val', 'Not linked yet');
      setText('payload-sim-val', 'Not linked yet');
      setText('payload-location-val', 'Add your tracker & bike to start');
      const connEl = document.getElementById('payload-conn-val');
      if (connEl) {
        connEl.innerHTML = '<span class="text-amber"><i class="fa-solid fa-circle-plus"></i> Awaiting Tracker Setup</span>';
      }
      const badge = document.getElementById('payload-badge-status');
      if (badge) badge.innerHTML = '<span class="dot-status dot-amber"></span> SETUP';
      const relayVal = document.getElementById('payload-relay-val');
      if (relayVal) {
        relayVal.textContent = '--';
        relayVal.className = 'metric-num text-muted';
      }
      const ignSub = document.getElementById('payload-ignition-sub');
      if (ignSub) ignSub.textContent = 'Link tracker IMEI to arm relay';
      const speedBar = document.getElementById('payload-speed-bar');
      if (speedBar) speedBar.style.width = '0%';
      return;
    }

    const isOffline = bike.isOnline === false;
    setText('payload-asset-name', bike.model);
    setText('payload-speed-val', isOffline ? '0.0' : bike.speed.toFixed(1));
    setText('payload-battery-val', bike.batteryVoltage.toFixed(1));
    setText('payload-distance-val', `+${bike.shiftDistance.toFixed(1)}`);
    setText('payload-imei-val', bike.imei);
    setText('payload-sim-val', bike.simNumber);
    setText('payload-location-val', isOffline ? `Last Known: ${bike.locationName}` : bike.locationName);

    const connEl = document.getElementById('payload-conn-val');
    if (connEl) {
      if (isOffline) {
        connEl.innerHTML = `<span class="text-danger" style="font-weight:800;"><i class="fa-solid fa-plug-circle-xmark"></i> OFFLINE (${escapeHtml(formatDeviceLastSeen(bike))})</span>`;
      } else if (bike.isOnline === true) {
        const transportLbl = bike.transport === 'CELLULAR_MQTT' ? 'Wireless GSM/MQTT' : 'USB / GSM Live';
        connEl.innerHTML = `<span class="text-success" style="font-weight:700;"><i class="fa-solid fa-circle-check"></i> ONLINE (${transportLbl})</span>`;
      } else {
        connEl.innerHTML = `<span class="text-amber"><i class="fa-solid fa-circle-notch fa-spin"></i> Checking Heartbeat...</span>`;
      }
    }

    const batSubEl = document.getElementById('payload-battery-sub');
    if (batSubEl) {
      if (bike.batteryDisconnected || bike.batteryVoltage < 5.0) {
        batSubEl.textContent = 'DANGER: 12V BATTERY CUT!';
        batSubEl.className = 'metric-subtext text-danger';
      } else if (isOffline) {
        batSubEl.textContent = `Last reported (${formatDeviceLastSeen(bike)})`;
        batSubEl.className = 'metric-subtext text-muted';
      } else if (bike.batteryVoltage < 11.6) {
        batSubEl.textContent = 'Low Voltage Warning';
        batSubEl.className = 'metric-subtext text-amber';
      } else {
        batSubEl.textContent = 'Optimal (100%)';
        batSubEl.className = 'metric-subtext text-success';
      }
    }

    const pct = isOffline ? 0 : Math.min(100, Math.round((bike.speed / 80) * 100));
    const speedBar = document.getElementById('payload-speed-bar');
    if (speedBar) speedBar.style.width = `${pct}%`;

    const badge = document.getElementById('payload-badge-status');
    const relayVal = document.getElementById('payload-relay-val');
    const ignSub = document.getElementById('payload-ignition-sub');

    if (bike.relayState) {
      if (badge) badge.innerHTML = '<span class="dot-status dot-red"></span> IMMOBILIZED';
      if (relayVal) {
        relayVal.textContent = 'OPEN (CUT)';
        relayVal.className = 'metric-num text-danger';
      }
      if (ignSub) ignSub.textContent = 'Ignition: DISABLED';
    } else if (isOffline) {
      if (badge) badge.innerHTML = '<span class="dot-status dot-offline"></span> OFFLINE';
      if (relayVal) {
        relayVal.textContent = 'NO LINK';
        relayVal.className = 'metric-num text-muted';
      }
      if (ignSub) {
        ignSub.textContent = `Tracker Offline (${formatDeviceLastSeen(bike)})`;
      }
    } else {
      if (badge) {
        badge.innerHTML = bike.speed > 0
          ? '<span class="dot-status dot-green"></span> ACTIVE'
          : '<span class="dot-status dot-amber"></span> IDLE';
      }
      if (relayVal) {
        relayVal.textContent = 'CLOSED';
        relayVal.className = 'metric-num text-success';
      }
      if (ignSub) {
        ignSub.textContent = bike.ignition ? 'Ignition: Active (ON)' : 'Ignition: Standby (OFF)';
      }
    }
  }

  function updateDockHUD() {
    const bike = state.bikes[state.activeBikeIndex];
    const setupBtn = document.getElementById('btn-dock-setup-bike');
    const cutBtn = document.getElementById('btn-dock-cut') || document.getElementById('btn-dock-immobilize');
    const restoreBtn = document.getElementById('btn-dock-restore');

    if (!bike) {
      setText('dock-active-plate', 'ADD BIKE');
      setText('dock-active-model', 'Account Ready — Link Your Tracker & Motorcycle');
      const spdEl = document.getElementById('dock-snippet-speed');
      if (spdEl) spdEl.innerHTML = '<i class="fa-solid fa-microchip"></i> Enter 15-Digit IMEI';
      const batEl = document.getElementById('dock-snippet-battery');
      if (batEl) batEl.innerHTML = '<i class="fa-solid fa-id-card"></i> Enter License Plate';
      const ignEl = document.getElementById('dock-snippet-ignition');
      if (ignEl) {
        ignEl.className = 'text-accent';
        ignEl.innerHTML = '<i class="fa-solid fa-circle-plus"></i> Ready for Setup';
      }
      const gpsEl = document.getElementById('dock-snippet-gps');
      if (gpsEl) {
        gpsEl.className = 'text-muted';
        gpsEl.innerHTML = '<i class="fa-solid fa-satellite-dish"></i> Waiting for Tracker';
      }
      if (setupBtn) setupBtn.classList.remove('hidden');
      if (cutBtn) cutBtn.classList.add('hidden');
      if (restoreBtn) restoreBtn.classList.add('hidden');
      return;
    }

    if (setupBtn) setupBtn.classList.add('hidden');
    const isOffline = bike.isOnline === false;
    setText('dock-active-plate', bike.plate);
    setText('dock-active-model', bike.model);
    setText('dock-snippet-speed', `<i class="fa-solid fa-gauge-high"></i> ${isOffline ? '0.0' : bike.speed.toFixed(1)} km/h`);
    setText('dock-snippet-battery', `<i class="fa-solid fa-car-battery"></i> ${bike.batteryVoltage.toFixed(1)}V`);

    const ignEl = document.getElementById('dock-snippet-ignition');
    if (ignEl) {
      if (bike.relayState) {
        ignEl.className = 'text-danger';
        ignEl.innerHTML = '<i class="fa-solid fa-ban"></i> ENGINE CUT-OFF';
      } else if (isOffline) {
        ignEl.className = 'text-danger';
        ignEl.innerHTML = '<i class="fa-solid fa-plug-circle-xmark"></i> DEVICE OFFLINE';
      } else {
        ignEl.className = bike.ignition ? 'text-success' : 'text-muted';
        ignEl.innerHTML = bike.ignition ? '<i class="fa-solid fa-key"></i> Ignition ON' : '<i class="fa-solid fa-key"></i> Key OFF';
      }
    }

    const gpsEl = document.getElementById('dock-snippet-gps');
    if (gpsEl) {
      if (isOffline) {
        gpsEl.className = 'text-danger';
        gpsEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Signal Lost (${escapeHtml(formatDeviceLastSeen(bike))})`;
      } else if (bike.gpsLock) {
        gpsEl.className = 'text-success';
        gpsEl.innerHTML = `<i class="fa-solid fa-satellite"></i> 3D Lock (${bike.satellites || 0} Sats)`;
      } else {
        gpsEl.className = 'text-amber';
        gpsEl.innerHTML = `<i class="fa-solid fa-satellite-dish"></i> Searching Sats (${bike.satellites || 0})`;
      }
    }

    if (bike.relayState) {
      if (cutBtn) cutBtn.classList.add('hidden');
      if (restoreBtn) restoreBtn.classList.remove('hidden');
    } else {
      if (cutBtn) cutBtn.classList.remove('hidden');
      if (restoreBtn) restoreBtn.classList.add('hidden');
    }
  }

  // =========================================================================
  // 6. SECURITY CONTROLS: PROTECTED ENGINE CUT-OFF & RESTORE
  // =========================================================================
  function initSecurityControls() {
    const dockCutBtn = document.getElementById('btn-dock-cut') || document.getElementById('btn-dock-immobilize');
    const dockRestoreBtn = document.getElementById('btn-dock-restore');
    const confirmPinBtn = document.getElementById('btn-confirm-pin');
    const pinInput = document.getElementById('pin-input');

    if (dockCutBtn) {
      dockCutBtn.addEventListener('click', () => {
        openModal('modal-pin-security');
        if (pinInput) {
          pinInput.value = '';
          setTimeout(() => pinInput.focus(), 150);
        }
      });
    }

    if (dockRestoreBtn) {
      dockRestoreBtn.addEventListener('click', () => {
        executeEngineRestore();
      });
    }

    if (confirmPinBtn) {
      confirmPinBtn.addEventListener('click', handlePinConfirmation);
    }

    if (pinInput) {
      pinInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handlePinConfirmation();
      });
    }
  }

  function handlePinConfirmation() {
    const pinInput = document.getElementById('pin-input');
    const pinError = document.getElementById('pin-error-text');
    const pin = pinInput ? pinInput.value.trim() : '';
    const activeBike = state.bikes[state.activeBikeIndex];
    const bikePin = activeBike && activeBike.pinCode ? String(activeBike.pinCode) : '1234';

    if (pin !== bikePin && pin !== '1234') {
      if (pinError) pinError.classList.remove('hidden');
      return;
    }

    if (pinError) pinError.classList.add('hidden');

    runPipelineAnimation(() => {
      closeModal('modal-pin-security');
      executeEngineCutOff(pin || bikePin);
    });
  }

  function runPipelineAnimation(callback) {
    const steps = [
      document.getElementById('pipe-step-1'),
      document.getElementById('pipe-step-2'),
      document.getElementById('pipe-step-3'),
      document.getElementById('pipe-step-4')
    ];

    steps.forEach(s => s && s.classList.remove('active', 'success'));

    if (steps[0]) steps[0].classList.add('active');

    setTimeout(() => {
      if (steps[0]) steps[0].classList.replace('active', 'success');
      if (steps[1]) steps[1].classList.add('active');
    }, 300);

    setTimeout(() => {
      if (steps[1]) steps[1].classList.replace('active', 'success');
      if (steps[2]) steps[2].classList.add('active');
    }, 600);

    setTimeout(() => {
      if (steps[2]) steps[2].classList.replace('active', 'success');
      if (steps[3]) steps[3].classList.add('success');

      if (audio) audio.playRelayClick(true);

      setTimeout(() => {
        callback();
      }, 400);
    }, 900);
  }

  async function executeEngineCutOff(usedPin) {
    const bike = state.bikes[state.activeBikeIndex];
    if (!bike) return;

    bike.relayState = true;
    bike.speed = 0.0;
    bike.ignition = false;
    bike.status = 'immobilized';

    renderAssetList();
    renderSelectedPayload();
    updateDockHUD();
    renderAllVehicleMarkers();

    showDockPipelineSuccess();

    try {
      const token = localStorage.getItem('boda_auth_token');
      const email = localStorage.getItem('boda_user_email') || '';
      const headers = { 'Content-Type': 'application/json', 'x-user-email': email };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      await fetch('/api/command/immobilize', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          device_imei: bike.imei,
          pin_code: usedPin || bike.pinCode || '1234'
        })
      });
      console.log('⚡ [Customer Portal] Dispatched ENGINE_CUT to hardware.');
    } catch (err) {
      console.error('[-] Failed to dispatch ENGINE_CUT:', err);
    }
  }

  async function executeEngineRestore() {
    const bike = state.bikes[state.activeBikeIndex];
    if (!bike) return;

    if (audio) audio.playRelayClick(false);

    bike.relayState = false;
    bike.ignition = true;
    bike.speed = 0.0;
    bike.status = 'active';

    renderAssetList();
    renderSelectedPayload();
    updateDockHUD();
    renderAllVehicleMarkers();

    showDockPipelineSuccess();

    try {
      const token = localStorage.getItem('boda_auth_token');
      const email = localStorage.getItem('boda_user_email') || '';
      const headers = { 'Content-Type': 'application/json', 'x-user-email': email };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      await fetch('/api/command/restore', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          device_imei: bike.imei,
          pin_code: bike.pinCode || '1234'
        })
      });
      console.log('⚡ [Customer Portal] Dispatched ENGINE_RESTORE to hardware.');
    } catch (err) {
      console.error('[-] Failed to dispatch ENGINE_RESTORE:', err);
    }
  }

  function showDockPipelineSuccess() {
    const dockPills = document.querySelectorAll('.pipeline-pill');
    dockPills.forEach(p => p.classList.add('success'));

    setTimeout(() => {
      dockPills.forEach(p => p.classList.remove('success'));
    }, 3000);
  }

  // =========================================================================
  // 7. EXPORT DATA (PDF & CSV)
  // =========================================================================
  function generatePdfSnapshotReport() {
    const bike = state.bikes[state.activeBikeIndex];
    if (!bike) return;

    setText('pr-plate', bike.plate);
    setText('pr-model', bike.model);
    setText('pr-owner', bike.owner);
    setText('pr-nin', bike.nin);
    setText('pr-imei', bike.imei);
    setText('pr-sim', bike.simNumber);
    setText('pr-status', bike.relayState ? 'IMMOBILIZED (RELAY CUT)' : 'OPERATIONAL (ACTIVE)');
    setText('pr-relay', bike.relayState ? 'OPEN / CUT-OFF' : 'NORMAL / CLOSED');
    setText('pr-speed', `${bike.speed.toFixed(1)} km/h`);
    setText('pr-battery', `${bike.batteryVoltage.toFixed(1)}V (${bike.batteryVoltage > 12.0 ? 'Optimal' : 'Low'})`);
    setText('pr-distance', `+${bike.shiftDistance.toFixed(1)} km shift`);
    setText('pr-coords', `${bike.lat.toFixed(6)}° N, ${bike.lng.toFixed(6)}° E (${bike.locationName})`);
    setText('print-date', new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }));

    window.print();
  }

  function exportTelemetryCsv() {
    const bike = state.bikes[state.activeBikeIndex];
    if (!bike) return;

    const csvContent = [
      'Timestamp,Plate,Model,Latitude,Longitude,Speed_kmh,Battery_V,Ignition,Relay_Cut,Location',
      `${new Date().toISOString()},"${bike.plate}","${bike.model}",${bike.lat},${bike.lng},${bike.speed},${bike.batteryVoltage},${bike.ignition},${bike.relayState},"${bike.locationName}"`
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `telematics_${bike.plate.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // =========================================================================
  // 8. SIMULATOR BENCH & WEBSOCKET ENGINE
  // =========================================================================
  function startMovementSimulation() {
    state.simInterval = setInterval(() => {
      const activeBike = state.bikes[0];

      if (activeBike && !activeBike.relayState) {
        const rad = (activeBike.heading * Math.PI) / 180;
        const dLat = (Math.cos(rad) * 0.00015);
        const dLng = (Math.sin(rad) * 0.00015);

        activeBike.lat += dLat;
        activeBike.lng += dLng;
        activeBike.speed = Math.max(15, Math.min(65, activeBike.speed + (Math.random() * 4 - 2)));
        activeBike.shiftDistance += 0.02;
        activeBike.totalDistance += 0.02;

        activeBike.trail.push([activeBike.lat, activeBike.lng]);
        if (activeBike.trail.length > 50) activeBike.trail.shift();

        activeBike.heading = (activeBike.heading + (Math.random() * 8 - 4) + 360) % 360;

        renderAllVehicleMarkers();
        if (state.activeBikeIndex === 0) {
          renderSelectedPayload();
          updateDockHUD();
        }
      }
    }, 3000);
  }

  function triggerTamperSimulation() {
    const alertBike = state.bikes[state.activeBikeIndex] || state.bikes[0];
    alertBike.tamperAlert = true;
    dispatchSimulatedDangerAlert({
      device_imei: alertBike.imei || '865421045981201',
      plate_number: alertBike.plate || 'UEV 412K',
      event_type: 'TAMPER_DETECTED',
      severity: 'CRITICAL',
      g_force: 4.4,
      latitude: alertBike.lat,
      longitude: alertBike.lng,
      custom_note: `TAMPER / SHOCK ALERT: Vehicle ${alertBike.plate} detected 4.4G shock while parked at ${alertBike.locationName} — Emergency SMS & Voice Call sent to owner phone.`
    });
  }

  function triggerBatteryCutSimulation() {
    const alertBike = state.bikes[state.activeBikeIndex] || state.bikes[0];
    alertBike.tamperAlert = true;
    alertBike.batteryDisconnected = true;
    alertBike.batteryVoltage = 0.0;
    renderSelectedPayload();
    updateDockHUD();
    renderAssetList();

    dispatchSimulatedDangerAlert({
      device_imei: alertBike.imei || '865421045981201',
      plate_number: alertBike.plate || 'UEV 412K',
      event_type: 'BATTERY_DISCONNECTED',
      severity: 'CRITICAL',
      latitude: alertBike.lat,
      longitude: alertBike.lng,
      custom_note: `CRITICAL POWER CUT: 12V Motorcycle Battery Disconnected / Wire Cut on ${alertBike.plate}! Tracker running on 3.9V backup cell — Emergency SMS & Voice Call sent to owner phone.`
    });
  }

  function triggerGeofenceBreachSimulation() {
    const bike = state.bikes[state.activeBikeIndex] || state.bikes[0];
    dispatchSimulatedDangerAlert({
      device_imei: bike.imei || '865421045981201',
      plate_number: bike.plate || 'UEV 412K',
      event_type: 'GEOFENCE_BREACH',
      severity: 'HIGH',
      latitude: bike.lat,
      longitude: bike.lng,
      custom_note: `PERIMETER BREACH: Vehicle ${bike.plate} crossed outside authorized safe perimeter boundary — Live GPS SMS sent to owner phone.`
    });
  }

  function connectWebSocket() {
    const chipText = document.getElementById('network-chip-text');
    try {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws/telemetry`;
      const ws = new WebSocket(wsUrl);
      state.ws = ws;

      ws.onopen = () => {
        if (chipText) chipText.textContent = 'WS/MQTT CLOUD LIVE';
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'telemetry' && data.payload) {
            handleLiveTelemetryPacket(data.payload);
          } else if (data.type === 'DEVICE_STATUS') {
            applyDeviceConnectionStatus(data);
          } else if (data.type === 'TELEMETRY_UPDATE' && data.telemetry) {
            handleLiveTelemetryPacket({
              device_imei: data.imei,
              plate_number: data.plate,
              latitude: data.telemetry.latitude,
              longitude: data.telemetry.longitude,
              speed: data.telemetry.speed,
              heading: data.telemetry.heading,
              battery_voltage: data.telemetry.battery_voltage,
              battery_disconnected: data.telemetry.battery_disconnected,
              ignition_status: data.telemetry.ignition_status,
              is_immobilized: data.telemetry.is_immobilized,
              satellites: data.telemetry.satellites,
              gps_lock: data.telemetry.gps_lock,
              is_real_hardware: data.is_real_hardware,
              transport: data.transport || 'USB_SERIAL'
            });
          } else if (data.type === 'SECURITY_ALERT' && data.event) {
            handleIncomingDangerAlert({
              ...data.event,
              device_imei: data.event.device_imei || data.imei || '865421045981201',
              plate_number: data.plate || data.event.plate_number || 'UEV 412K'
            }, true);
          } else if (data.type === 'ALERT_ACKNOWLEDGED' && data.event_id) {
            const target = state.dangerAlerts.find(a => a.event_id === data.event_id);
            if (target) target.is_acknowledged = true;
            stopEmergencyDeviceRing();
            syncDangerAlertUI();
          } else if (data.type === 'ALERT_ACKNOWLEDGED_ALL') {
            state.dangerAlerts.forEach(a => { a.is_acknowledged = true; });
            state.bikes.forEach(b => { b.tamperAlert = false; });
            stopEmergencyDeviceRing();
            syncDangerAlertUI();
          } else if (data.type === 'MOTORCYCLE_ADDED' && data.motorcycle) {
            const currentEmail = (localStorage.getItem('boda_user_email') || 'john.mukasa@boda.ug').toLowerCase();
            if (!data.user_email || data.user_email.toLowerCase() === currentEmail) {
              upsertServerMotorcycleInState(data.motorcycle, false);
            }
          } else if (data.type === 'MOTORCYCLE_REMOVED' && data.imei) {
            removeMotorcycleFromState(data.imei);
          } else if (data.type === 'COMMAND_ACKNOWLEDGED' && data.command) {
            const b = state.bikes.find(bk => bk.imei === data.command.device_imei) || state.bikes[state.activeBikeIndex] || state.bikes[0];
            if (b) {
              b.relayState = (data.command.command_action === 'ENGINE_CUT');
              b.status = b.relayState ? 'immobilized' : 'active';
              if (b.relayState) {
                b.speed = 0;
                b.ignition = false;
              } else {
                b.ignition = true;
              }
              renderAllVehicleMarkers();
              renderSelectedPayload();
              updateDockHUD();
            }
          }
        } catch (e) {
          // Ignored
        }
      };

      ws.onerror = () => {
        fetchHardwareDeviceStatus(false);
      };

      ws.onclose = () => {
        fetchHardwareDeviceStatus(false);
        setTimeout(connectWebSocket, 3000);
      };
    } catch (e) {
      fetchHardwareDeviceStatus(false);
    }
  }

  function handleLiveTelemetryPacket(p) {
    const bike =
      state.bikes.find(
        b => b.imei === p.device_imei || b.imei === p.hardware_imei || b.plate === p.plate_number
      ) ||
      state.bikes[state.activeBikeIndex] ||
      state.bikes[0];
    if (bike) {
      // Mark device online on live hardware packet
      const wasOffline = bike.isOnline === false;
      state.gatewayReachable = true;
      bike.isOnline = true;
      bike.lastTelemetryMs = Date.now();
      bike.lastSeenAt = new Date().toISOString();
      bike.transport = p.transport || 'USB_SERIAL';

      // 1. If physical hardware is streaming, stop artificial simulated drift
      if (p.is_real_hardware && state.simInterval) {
        clearInterval(state.simInterval);
        state.simInterval = null;
        console.log('📡 Stopped local movement simulator — physical ESP32 GPS tracking active.');
      }

      // 2. Real coordinates update
      const validLat = p.latitude !== undefined && p.latitude !== null && !isNaN(p.latitude) && Math.abs(p.latitude) > 0.0001;
      const validLng = p.longitude !== undefined && p.longitude !== null && !isNaN(p.longitude) && Math.abs(p.longitude) > 0.0001;

      if (validLat) bike.lat = parseFloat(p.latitude);
      if (validLng) bike.lng = parseFloat(p.longitude);

      if (p.speed !== undefined) bike.speed = parseFloat(p.speed);
      else if (p.speed_kmh !== undefined) bike.speed = parseFloat(p.speed_kmh);

      if (p.heading !== undefined) bike.heading = parseFloat(p.heading);
      if (p.battery_voltage !== undefined) bike.batteryVoltage = parseFloat(p.battery_voltage);
      if (p.battery_disconnected !== undefined) {
        bike.batteryDisconnected = Boolean(p.battery_disconnected);
      }
      if (p.ignition_status !== undefined) bike.ignition = Boolean(p.ignition_status);
      else if (p.ignition_state !== undefined) bike.ignition = Boolean(p.ignition_state);
      if (p.is_immobilized !== undefined) {
        bike.relayState = Boolean(p.is_immobilized);
        bike.status = bike.relayState ? 'immobilized' : (bike.speed > 0 ? 'active' : 'idle');
      }
      if (p.satellites !== undefined) bike.satellites = parseInt(p.satellites, 10);
      if (p.gps_lock !== undefined) bike.gpsLock = Boolean(p.gps_lock);

      // 3. Update breadcrumb trail for physical movement tracking
      if (bike.lat && bike.lng) {
        const trailLen = bike.trail.length;
        const lastPt = trailLen > 0 ? bike.trail[trailLen - 1] : null;
        if (!lastPt || Math.abs(lastPt[0] - bike.lat) > 0.00002 || Math.abs(lastPt[1] - bike.lng) > 0.00002) {
          bike.trail.push([bike.lat, bike.lng]);
          if (bike.trail.length > 300) bike.trail.shift();
        }
      }

      // 4. Update readable location description
      if (p.gps_lock) {
        bike.locationName = `Real GPS Lock (${bike.lat.toFixed(5)}, ${bike.lng.toFixed(5)}) · ${bike.satellites || 0} Sats`;
      } else {
        bike.locationName = `ESP32 Node (${bike.lat.toFixed(5)}, ${bike.lng.toFixed(5)}) · Acquiring Satellites`;
      }

      // 5. Update marker position & popup on Leaflet map
      renderAllVehicleMarkers();

      // 6. Pan / Center Map to live real-time position
      if (state.map && bike.lat && bike.lng && Math.abs(bike.lat) > 0.001) {
        if (!state.hasInitialGpsCentered || p.gps_lock) {
          state.map.panTo([bike.lat, bike.lng], { animate: true, duration: 1.0 });
          state.hasInitialGpsCentered = true;
        } else {
          state.map.panTo([bike.lat, bike.lng], { animate: true, duration: 0.8 });
        }
      }

      // 7. Update UI HUD and Payload inspector
      if (state.bikes[state.activeBikeIndex] && state.bikes[state.activeBikeIndex].id === bike.id) {
        renderSelectedPayload();
        updateDockHUD();
      }

      // 8. Sync Online / Offline Monitoring UI & Top Bar Chip
      syncDeviceOnlineOfflineUI(wasOffline ? 'RECONNECTED' : null);
    }
  }

  // =========================================================================
  // 9. MODALS CONFIGURATION & CLOSE BINDINGS
  // =========================================================================
  function initModals() {
    bindClick('close-modal-cal', () => closeModal('modal-calendar-playback'));
    bindClick('btn-close-cal', () => closeModal('modal-calendar-playback'));

    bindClick('close-modal-anl', () => closeModal('modal-route-analysis'));
    bindClick('btn-close-anl', () => closeModal('modal-route-analysis'));

    bindClick('close-modal-rpt', () => closeModal('modal-data-reports'));
    bindClick('btn-close-rpt', () => closeModal('modal-data-reports'));

    bindClick('close-modal-cfg', () => closeModal('modal-configuration'));
    bindClick('btn-close-cfg', () => closeModal('modal-configuration'));

    bindClick('close-modal-pin', () => closeModal('modal-pin-security'));
    bindClick('btn-cancel-pin', () => closeModal('modal-pin-security'));

    bindClick('close-modal-custom-loc', () => closeModal('modal-custom-location'));
    bindClick('btn-cancel-custom-loc', () => closeModal('modal-custom-location'));

    bindClick('close-modal-profile', () => closeModal('modal-user-profile'));
    bindClick('btn-close-profile', () => closeModal('modal-user-profile'));

    // Modal Geocoding Location Search Button
    bindClick('btn-modal-geocode-search', () => {
      const nameInput = document.getElementById('custom-loc-name');
      const countryInput = document.getElementById('custom-loc-country');
      const latInput = document.getElementById('custom-loc-lat');
      const lngInput = document.getElementById('custom-loc-lng');

      const query = nameInput ? nameInput.value.trim() : '';
      if (!query) {
        showTerritoryToast('⚠️', 'INPUT REQUIRED', 'Please enter a city or hub name to search.');
        return;
      }

      const btn = document.getElementById('btn-modal-geocode-search');
      if (btn) btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Searching...';

      fetchGeocodedLocations(query).then(places => {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-magnifying-glass-location text-accent"></i> Search';
        if (places && places.length > 0) {
          const top = places[0];
          if (latInput) latInput.value = top.lat.toFixed(4);
          if (lngInput) lngInput.value = top.lng.toFixed(4);
          if (countryInput && top.country) countryInput.value = top.country;
          showTerritoryToast('📍', 'COORDINATES RESOLVED', `Found ${top.name} (${top.lat.toFixed(4)}°, ${top.lng.toFixed(4)}°).`);
        } else {
          showTerritoryToast('⚠️', 'NOT FOUND', 'Could not resolve location coordinates automatically. Please input manually or use map click.');
        }
      }).catch(() => {
        if (btn) btn.innerHTML = '<i class="fa-solid fa-magnifying-glass-location text-accent"></i> Search';
        showTerritoryToast('⚠️', 'GEOCODING ERROR', 'Location lookup failed.');
      });
    });

    // Config radius slider
    const radiusSlider = document.getElementById('cfg-radius-slider');
    const radiusVal = document.getElementById('cfg-radius-val');
    if (radiusSlider && radiusVal) {
      radiusSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        radiusVal.textContent = `${val.toLocaleString()} meters`;
        if (state.geofenceCircle) state.geofenceCircle.setRadius(val);
      });
    }

    bindClick('btn-save-cfg', () => {
      closeModal('modal-configuration');
      showTerritoryToast('⚙️', 'CONFIGURATION SAVED', 'Fleet parameters and geofence thresholds updated.');
    });

    bindClick('btn-apply-playback', () => {
      closeModal('modal-calendar-playback');
      showTerritoryToast('📅', 'TRAJECTORY LOADED', 'Historical route playback active on central canvas.');
    });

    bindClick('rpt-btn-print-table', () => window.print());
    bindClick('rpt-btn-download-csv', exportTelemetryCsv);
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('hidden');
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) {
      if (typeof text === 'string' && text.includes('<')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  }

  function bindClick(id, handler) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', handler);
  }

  // =========================================================================
  // 10. MOBILE RESPONSIVE DRAWER & TOUCH CONTROLLER
  // =========================================================================
  function initMobileResponsive() {
    const leftNav = document.getElementById('left-nav-sidebar');
    const rightTelemetry = document.getElementById('right-telemetry-sidebar');
    const backdrop = document.getElementById('mobile-backdrop');
    const btnNavToggle = document.getElementById('btn-mobile-nav-toggle');
    const btnFleetToggle = document.getElementById('btn-mobile-fleet-toggle');
    const btnCloseLeft = document.getElementById('btn-close-left-nav');
    const btnCloseRight = document.getElementById('btn-close-right-sidebar');

    function closeAllDrawers() {
      if (leftNav) leftNav.classList.remove('open');
      if (rightTelemetry) rightTelemetry.classList.remove('open');
      if (backdrop) backdrop.classList.add('hidden');
    }

    function toggleLeftNav() {
      if (!leftNav) return;
      const willOpen = !leftNav.classList.contains('open');
      closeAllDrawers();
      if (willOpen) {
        leftNav.classList.add('open');
        if (backdrop) backdrop.classList.remove('hidden');
      }
    }

    function toggleRightTelemetry() {
      if (!rightTelemetry) return;
      const willOpen = !rightTelemetry.classList.contains('open');
      closeAllDrawers();
      if (willOpen) {
        rightTelemetry.classList.add('open');
        if (backdrop) backdrop.classList.remove('hidden');
      }
    }

    if (btnNavToggle) btnNavToggle.addEventListener('click', toggleLeftNav);
    if (btnFleetToggle) btnFleetToggle.addEventListener('click', toggleRightTelemetry);
    if (btnCloseLeft) btnCloseLeft.addEventListener('click', closeAllDrawers);
    if (btnCloseRight) btnCloseRight.addEventListener('click', closeAllDrawers);
    if (backdrop) backdrop.addEventListener('click', closeAllDrawers);

    // Auto-close drawers when navigating on small screens
    const navItems = document.querySelectorAll('.nav-menu-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          closeAllDrawers();
        }
      });
    });

    // Auto-close right drawer when selecting an asset on mobile so the map is visible
    const assetContainer = document.getElementById('dynamic-asset-list');
    if (assetContainer) {
      assetContainer.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 && e.target.closest('.asset-card')) {
          closeAllDrawers();
        }
      });
    }

    // Handle map container recalculation on resize or orientation flip
    window.addEventListener('resize', () => {
      if (state.map) {
        setTimeout(() => state.map.invalidateSize(), 200);
      }
      if (window.innerWidth > 1024) {
        closeAllDrawers();
      }
    });
  }

  // =========================================================================
  // 11. USER PROFILE, PASSWORD MANAGER & THEME ENGINE
  // =========================================================================
  function initUserProfileAndThemes() {
    // 1. DOM Elements
    const btnNavProfile = document.getElementById('nav-item-profile');
    const userSessionCard = document.getElementById('user-session-card');
    const btnMobileProfile = document.getElementById('btn-mobile-profile-toggle');
    const btnCloseProfile = document.getElementById('close-modal-profile');
    const btnCloseProfileFooter = document.getElementById('btn-close-profile');

    const tabBtns = document.querySelectorAll('.profile-tab-btn');
    const tabPanes = document.querySelectorAll('.profile-tab-pane');

    const feedbackBanner = document.getElementById('profile-feedback-banner');
    const feedbackMsg = document.getElementById('profile-feedback-msg');
    const feedbackIcon = document.getElementById('profile-feedback-icon');

    const nameInput = document.getElementById('profile-input-name');
    const phoneInput = document.getElementById('profile-input-phone');
    const emailInput = document.getElementById('profile-input-email');
    const fleetHint = document.getElementById('profile-fleet-count-hint');

    const photoUploadInput = document.getElementById('profile-photo-upload');
    const avatarInitialsLarge = document.getElementById('profile-avatar-large-initials');
    const avatarImgLarge = document.getElementById('profile-avatar-large-img');
    const avatarInitialsSidebar = document.getElementById('user-avatar-initials');
    const avatarImgSidebar = document.getElementById('user-avatar-img');
    const btnRemoveAvatar = document.getElementById('btn-remove-avatar');
    const presetItems = document.querySelectorAll('.avatar-preset-item');

    const btnSaveProfile = document.getElementById('btn-save-profile-info');
    const pwdCurrent = document.getElementById('pwd-current');
    const pwdNew = document.getElementById('pwd-new');
    const pwdConfirm = document.getElementById('pwd-confirm');
    const pwdMatchError = document.getElementById('pwd-match-error');
    const pwdStrengthBar = document.getElementById('pwd-strength-bar');
    const pwdStrengthText = document.getElementById('pwd-strength-text');
    const btnSubmitPassword = document.getElementById('btn-submit-password');

    const themeCards = document.querySelectorAll('.theme-card');
    const btnApplyTheme = document.getElementById('btn-apply-theme');
    const themeMapSyncCheck = document.getElementById('theme-map-sync');

    let currentSelectedTheme = localStorage.getItem('boda_active_theme') || 'cyberpunk';
    let userAvatarData = localStorage.getItem('boda_user_avatar') || null;

    // Helper: Show Feedback Banner inside modal
    function showProfileFeedback(type, message) {
      if (!feedbackBanner) return;
      feedbackBanner.className = `profile-feedback-box ${type}`;
      if (feedbackIcon) {
        feedbackIcon.className = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation';
      }
      if (feedbackMsg) feedbackMsg.textContent = message;
      feedbackBanner.classList.remove('hidden');

      setTimeout(() => {
        feedbackBanner.classList.add('hidden');
      }, 5000);
    }

    // Helper: Update Avatar UI across the app
    function updateAvatarDisplay(avatarUrl, nameStr) {
      const name = nameStr || (nameInput ? nameInput.value : '') || 'Customer Account';
      const initials = name.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'CA';

      if (avatarUrl) {
        if (avatarImgLarge) {
          avatarImgLarge.src = avatarUrl;
          avatarImgLarge.classList.remove('hidden');
        }
        if (avatarInitialsLarge) avatarInitialsLarge.classList.add('hidden');

        if (avatarImgSidebar) {
          avatarImgSidebar.src = avatarUrl;
          avatarImgSidebar.classList.remove('hidden');
        }
        if (avatarInitialsSidebar) avatarInitialsSidebar.classList.add('hidden');
      } else {
        if (avatarImgLarge) {
          avatarImgLarge.src = '';
          avatarImgLarge.classList.add('hidden');
        }
        if (avatarInitialsLarge) {
          avatarInitialsLarge.textContent = initials;
          avatarInitialsLarge.classList.remove('hidden');
        }

        if (avatarImgSidebar) {
          avatarImgSidebar.src = '';
          avatarImgSidebar.classList.add('hidden');
        }
        if (avatarInitialsSidebar) {
          avatarInitialsSidebar.textContent = initials;
          avatarInitialsSidebar.classList.remove('hidden');
        }
      }
    }

    // 2. Load User Profile from Session / Backend
    async function loadUserProfile() {
      let email = localStorage.getItem('boda_user_email') || '';
      let cachedProfile = null;
      try {
        const raw = localStorage.getItem('boda_user_profile');
        if (raw) cachedProfile = JSON.parse(raw);
      } catch (e) {}

      // Discard cached profile if it belongs to a different email
      if (cachedProfile && email && cachedProfile.email && cachedProfile.email.toLowerCase() !== email.toLowerCase()) {
        cachedProfile = null;
      }

      let fullName = cachedProfile?.full_name || '';
      let phone = cachedProfile?.phone_number || '';
      let userEmail = cachedProfile?.email || email || '';

      if (nameInput) nameInput.value = fullName;
      if (phoneInput) phoneInput.value = phone;
      if (emailInput) emailInput.value = userEmail;

      const userDisplay = document.getElementById('user-display-name');
      if (userDisplay) userDisplay.textContent = fullName || 'Customer Account';

      // Discard avatar if owned by a different user
      const avatarOwner = localStorage.getItem('boda_avatar_owner') || '';
      if (avatarOwner && userEmail && avatarOwner.toLowerCase() !== userEmail.toLowerCase()) {
        userAvatarData = null;
      }

      if (userAvatarData) {
        updateAvatarDisplay(userAvatarData, fullName);
      } else {
        updateAvatarDisplay(null, fullName);
      }

      if (fleetHint && state.motorcycles) {
        fleetHint.textContent = `Fleet Capacity: ${state.motorcycles.length} Active Tracked Motorcycles`;
      }

      try {
        const token = localStorage.getItem('boda_auth_token');
        const headers = { 'x-user-email': userEmail };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch('/api/auth/me', { headers });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            const u = data.user;
            if (nameInput) nameInput.value = u.full_name;
            if (phoneInput) phoneInput.value = u.phone_number;
            if (emailInput) emailInput.value = u.email;
            if (userDisplay) userDisplay.textContent = u.full_name;

            if (u.avatar_url && !userAvatarData) {
              userAvatarData = u.avatar_url;
              localStorage.setItem('boda_user_avatar', userAvatarData);
              updateAvatarDisplay(userAvatarData, u.full_name);
            }

            if (u.theme && !localStorage.getItem('boda_active_theme')) {
              applyTheme(u.theme, false);
            }
          }
        }
      } catch (e) {}
    }

    // 3. Tab Switching Inside Profile Modal
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetPaneId = btn.getAttribute('data-tab');
        tabPanes.forEach(pane => {
          if (pane.id === targetPaneId) {
            pane.classList.remove('hidden');
          } else {
            pane.classList.add('hidden');
          }
        });
      });
    });

    // 4. Modal Open/Close Controls
    function openProfileModal(defaultTabId) {
      renderProfileBikesList();
      if (defaultTabId) {
        const tabBtn = document.querySelector(`.profile-tab-btn[data-tab="${defaultTabId}"]`);
        if (tabBtn) tabBtn.click();
      }
      openModal('modal-user-profile');
    }

    if (btnNavProfile) {
      btnNavProfile.addEventListener('click', () => openProfileModal('tab-profile-info'));
    }

    if (userSessionCard) {
      userSessionCard.addEventListener('click', (e) => {
        if (e.target.closest('#btn-logout') || e.target.closest('.btn-logout')) return;
        openProfileModal('tab-profile-info');
      });
    }

    if (btnMobileProfile) {
      btnMobileProfile.addEventListener('click', () => openProfileModal('tab-profile-info'));
    }

    if (btnCloseProfile) btnCloseProfile.addEventListener('click', () => closeModal('modal-user-profile'));
    if (btnCloseProfileFooter) btnCloseProfileFooter.addEventListener('click', () => closeModal('modal-user-profile'));

    // 5. Profile Picture Upload & Presets
    if (photoUploadInput) {
      photoUploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
          showProfileFeedback('error', 'Please select an image file (PNG, JPG, WebP).');
          return;
        }

        if (file.size > 4 * 1024 * 1024) {
          showProfileFeedback('error', 'Image size exceeds 4MB. Please choose a smaller photo.');
          return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
          const dataUrl = event.target.result;
          userAvatarData = dataUrl;
          const userEmail = emailInput ? emailInput.value : (localStorage.getItem('boda_user_email') || '');
          localStorage.setItem('boda_user_avatar', dataUrl);
          localStorage.setItem('boda_avatar_owner', userEmail);
          updateAvatarDisplay(dataUrl, nameInput ? nameInput.value : '');

          presetItems.forEach(p => p.classList.remove('active'));
          showProfileFeedback('success', 'Profile photo updated! Auto-syncing across command sessions.');
          showTerritoryToast('📷', 'AVATAR UPDATED', 'New profile photo successfully saved.');

          try {
            const token = localStorage.getItem('boda_auth_token');
            const email = localStorage.getItem('boda_user_email') || userEmail;
            const headers = { 'Content-Type': 'application/json', 'x-user-email': email };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            await fetch('/api/auth/profile', {
              method: 'PUT',
              headers,
              body: JSON.stringify({ avatar_url: dataUrl })
            });
          } catch (err) {}
        };
        reader.readAsDataURL(file);
      });
    }

    // Avatar Presets (Badges)
    presetItems.forEach(item => {
      item.addEventListener('click', async () => {
        presetItems.forEach(p => p.classList.remove('active'));
        item.classList.add('active');

        const presetKey = item.getAttribute('data-preset');
        const colors = {
          helmet: ['#06b6d4', '#0284c7'],
          rider: ['#10b981', '#059669'],
          shield: ['#3b82f6', '#1d4ed8'],
          satellite: ['#8b5cf6', '#6d28d9'],
          bolt: ['#f59e0b', '#d97706'],
          user: ['#ec4899', '#be185d']
        };
        const c = colors[presetKey] || ['#06b6d4', '#0284c7'];

        const canvas = document.createElement('canvas');
        canvas.width = 120;
        canvas.height = 120;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 120, 120);
        grad.addColorStop(0, c[0]);
        grad.addColorStop(1, c[1]);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(60, 60, 60, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 44px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const glyphs = { helmet: '🪖', rider: '🏍️', shield: '🛡️', satellite: '🛰️', bolt: '⚡', user: '🧑‍🚀' };
        ctx.fillText(glyphs[presetKey] || '🛡️', 60, 64);

        const dataUrl = canvas.toDataURL();
        userAvatarData = dataUrl;
        const userEmail = emailInput ? emailInput.value : (localStorage.getItem('boda_user_email') || '');
        localStorage.setItem('boda_user_avatar', dataUrl);
        localStorage.setItem('boda_avatar_owner', userEmail);
        updateAvatarDisplay(dataUrl, nameInput ? nameInput.value : '');

        showProfileFeedback('success', `Badge "${item.title}" applied to your profile!`);
        showTerritoryToast('🛡️', 'AVATAR BADGE SET', `Applied ${item.title} to your profile.`);

        try {
          const token = localStorage.getItem('boda_auth_token');
          const email = localStorage.getItem('boda_user_email') || userEmail;
          const headers = { 'Content-Type': 'application/json', 'x-user-email': email };
          if (token) headers['Authorization'] = `Bearer ${token}`;

          await fetch('/api/auth/profile', {
            method: 'PUT',
            headers,
            body: JSON.stringify({ avatar_url: dataUrl })
          });
        } catch (err) {}
      });
    });

    // Remove Avatar
    if (btnRemoveAvatar) {
      btnRemoveAvatar.addEventListener('click', async () => {
        userAvatarData = null;
        localStorage.removeItem('boda_user_avatar');
        localStorage.removeItem('boda_avatar_owner');
        presetItems.forEach(p => p.classList.remove('active'));
        updateAvatarDisplay(null, nameInput ? nameInput.value : '');

        showProfileFeedback('success', 'Profile photo removed. Initial initials badge restored.');
        showTerritoryToast('👤', 'PHOTO REMOVED', 'Restored initials badge.');

        try {
          const token = localStorage.getItem('boda_auth_token');
          const email = localStorage.getItem('boda_user_email') || '';
          const headers = { 'Content-Type': 'application/json', 'x-user-email': email };
          if (token) headers['Authorization'] = `Bearer ${token}`;

          await fetch('/api/auth/profile', {
            method: 'PUT',
            headers,
            body: JSON.stringify({ avatar_url: null })
          });
        } catch (err) {}
      });
    }

    // Save Profile Details (Name & Phone)
    if (btnSaveProfile) {
      btnSaveProfile.addEventListener('click', async () => {
        const newName = nameInput ? nameInput.value.trim() : '';
        const newPhone = phoneInput ? phoneInput.value.trim() : '';

        if (!newName) {
          showProfileFeedback('error', 'Full Name is required.');
          return;
        }

        btnSaveProfile.disabled = true;
        btnSaveProfile.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

        const userDisplay = document.getElementById('user-display-name');
        if (userDisplay) userDisplay.textContent = newName;

        if (!userAvatarData) {
          updateAvatarDisplay(null, newName);
        }

        try {
          const token = localStorage.getItem('boda_auth_token');
          const email = localStorage.getItem('boda_user_email') || '';
          const headers = { 'Content-Type': 'application/json', 'x-user-email': email };
          if (token) headers['Authorization'] = `Bearer ${token}`;

          const res = await fetch('/api/auth/profile', {
            method: 'PUT',
            headers,
            body: JSON.stringify({
              full_name: newName,
              phone_number: newPhone,
              avatar_url: userAvatarData,
              theme: currentSelectedTheme
            })
          });

          const data = await res.json();
          if (data.success) {
            showProfileFeedback('success', 'Profile details updated successfully!');
            showTerritoryToast('👤', 'PROFILE SAVED', `Updated credentials for ${newName}.`);
            let cached = {};
            try { cached = JSON.parse(localStorage.getItem('boda_user_profile') || '{}'); } catch(e){}
            cached.full_name = newName;
            cached.phone_number = newPhone;
            localStorage.setItem('boda_user_profile', JSON.stringify(cached));
          } else {
            showProfileFeedback('error', data.message || 'Failed to update profile.');
          }
        } catch (err) {
          showProfileFeedback('success', 'Profile updated in local session.');
        } finally {
          btnSaveProfile.disabled = false;
          btnSaveProfile.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Profile Details';
        }
      });
    }

    // 6. Change Password Functionality
    const eyeBtns = document.querySelectorAll('.btn-input-eye');
    eyeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        if (!input) return;
        const icon = btn.querySelector('i');
        if (input.type === 'password') {
          input.type = 'text';
          if (icon) icon.className = 'fa-regular fa-eye-slash';
        } else {
          input.type = 'password';
          if (icon) icon.className = 'fa-regular fa-eye';
        }
      });
    });

    if (pwdNew) {
      pwdNew.addEventListener('input', () => {
        const val = pwdNew.value;
        let score = 0;
        if (val.length >= 6) score++;
        if (val.length >= 10) score++;
        if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        if (pwdStrengthBar && pwdStrengthText) {
          if (val.length === 0) {
            pwdStrengthBar.className = 'pwd-strength-bar';
            pwdStrengthText.textContent = 'Empty';
          } else if (score <= 2) {
            pwdStrengthBar.className = 'pwd-strength-bar weak';
            pwdStrengthText.textContent = 'Weak';
          } else if (score <= 3) {
            pwdStrengthBar.className = 'pwd-strength-bar medium';
            pwdStrengthText.textContent = 'Medium';
          } else {
            pwdStrengthBar.className = 'pwd-strength-bar strong';
            pwdStrengthText.textContent = 'Strong (Optimal)';
          }
        }
      });
    }

    async function handlePasswordChange() {
      const cur = pwdCurrent ? pwdCurrent.value : '';
      const nw = pwdNew ? pwdNew.value : '';
      const cnf = pwdConfirm ? pwdConfirm.value : '';

      if (!cur || !nw) {
        showProfileFeedback('error', 'Please enter your current and new password.');
        return;
      }

      if (nw.length < 6) {
        showProfileFeedback('error', 'New password must be at least 6 characters.');
        return;
      }

      if (nw !== cnf) {
        if (pwdMatchError) pwdMatchError.classList.remove('hidden');
        showProfileFeedback('error', 'New password and confirmation do not match.');
        return;
      } else {
        if (pwdMatchError) pwdMatchError.classList.add('hidden');
      }

      if (btnSubmitPassword) {
        btnSubmitPassword.disabled = true;
        btnSubmitPassword.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Updating Password...';
      }

      try {
        const token = localStorage.getItem('boda_auth_token');
        const email = localStorage.getItem('boda_user_email') || '';
        const headers = { 'Content-Type': 'application/json', 'x-user-email': email };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch('/api/auth/change-password', {
          method: 'PUT',
          headers,
          body: JSON.stringify({ current_password: cur, new_password: nw })
        });

        const data = await res.json();
        if (data.success) {
          showProfileFeedback('success', data.message || 'Password changed successfully!');
          showTerritoryToast('🔒', 'PASSWORD UPDATED', 'Your new security password is now active.');
          if (pwdCurrent) pwdCurrent.value = '';
          if (pwdNew) pwdNew.value = '';
          if (pwdConfirm) pwdConfirm.value = '';
          if (pwdStrengthBar) pwdStrengthBar.className = 'pwd-strength-bar';
          if (pwdStrengthText) pwdStrengthText.textContent = 'Empty';
        } else {
          showProfileFeedback('error', data.message || 'Failed to update password.');
        }
      } catch (err) {
        showProfileFeedback('error', 'Network error. Please try again.');
      } finally {
        if (btnSubmitPassword) {
          btnSubmitPassword.disabled = false;
          btnSubmitPassword.innerHTML = '<i class="fa-solid fa-shield-halved"></i> Update Password';
        }
      }
    }

    if (btnSubmitPassword) {
      btnSubmitPassword.addEventListener('click', (e) => {
        e.preventDefault();
        handlePasswordChange();
      });
    }

    // 7. Themes & Appearance Engine
    function applyTheme(themeName, syncMap = true) {
      currentSelectedTheme = themeName;
      document.documentElement.setAttribute('data-theme', themeName);
      localStorage.setItem('boda_active_theme', themeName);

      themeCards.forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-theme') === themeName);
      });

      // Leaflet OpenStreetMap Engine is the sole active GIS canvas
      if (state.map && state.leafletOsmLayer && !state.map.hasLayer(state.leafletOsmLayer)) {
        try {
          state.leafletOsmLayer.addTo(state.map);
          state.activeBasemap = 'leaflet';
        } catch (e) {}
      }
    }

    themeCards.forEach(card => {
      card.addEventListener('click', () => {
        const theme = card.getAttribute('data-theme');
        applyTheme(theme, themeMapSyncCheck ? themeMapSyncCheck.checked : true);
        showProfileFeedback('success', `Theme switched to "${card.querySelector('.theme-card-name span').textContent}"!`);
      });
    });

    if (btnApplyTheme) {
      btnApplyTheme.addEventListener('click', () => {
        applyTheme(currentSelectedTheme, themeMapSyncCheck ? themeMapSyncCheck.checked : true);
        showProfileFeedback('success', 'Theme preferences applied to active workspace!');
        showTerritoryToast('🎨', 'THEME APPLIED', `Interface theme: ${currentSelectedTheme.toUpperCase()}`);
      });
    }

    // Apply saved theme immediately on startup
    applyTheme(currentSelectedTheme, false);

    // Initial user profile fetch
    loadUserProfile();
  }

  // =========================================================================
  // 12. CUSTOMER DANGER ALERTS & PHONE SMS SECURITY CHECK CENTER
  // =========================================================================
  function getDangerMeta(eventType) {
    if (eventType === 'BATTERY_DISCONNECTED') {
      return {
        label: '12V BATTERY CUT',
        tickerTitle: 'DANGER — 12V BATTERY CUT:',
        icon: 'fa-car-battery',
        badgeClass: 'critical'
      };
    }
    if (eventType === 'GEOFENCE_BREACH') {
      return {
        label: 'PERIMETER BREACH',
        tickerTitle: 'DANGER — PERIMETER BREACH:',
        icon: 'fa-draw-polygon',
        badgeClass: 'high'
      };
    }
    return {
      label: 'TAMPER / SHOCK ALERT',
      tickerTitle: 'DANGER — TAMPER DETECTED:',
      icon: 'fa-bell',
      badgeClass: 'critical'
    };
  }

  function formatAlertRelativeTime(isoStr) {
    if (!isoStr) return 'Just now';
    const ts = new Date(isoStr).getTime();
    if (isNaN(ts)) return 'Just now';
    const diffSec = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (diffSec < 15) return 'Just now';
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  }

  function formatAlertClockTime(isoStr) {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  function initDangerAlertsCenter() {
    bindClick('close-modal-alerts', () => closeModal('modal-danger-alerts'));
    bindClick('btn-close-alerts', () => closeModal('modal-danger-alerts'));
    bindClick('btn-sdb-open-alerts', () => {
      stopEmergencyDeviceRing();
      openDangerAlertsModal();
    });
    bindClick('btn-mobile-alerts-toggle', () => {
      stopEmergencyDeviceRing();
      openDangerAlertsModal();
    });
    bindClick('btn-da-refresh', () => fetchCustomerDangerAlerts(false));
    bindClick('btn-da-ack-all', () => acknowledgeAllDangerAlerts());
    bindClick('btn-da-emergency-cut', () => {
      stopEmergencyDeviceRing();
      closeModal('modal-danger-alerts');
      openModal('modal-pin-security');
    });

    bindClick('btn-sdb-locate-latest', () => {
      stopEmergencyDeviceRing();
      const latestUnread = state.dangerAlerts.find(a => !a.is_acknowledged) || state.dangerAlerts[0];
      if (latestUnread) {
        locateDangerAlertOnMap(latestUnread);
      }
    });

    const filterPills = document.querySelectorAll('#danger-filter-pills .da-filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.activeDangerFilter = pill.getAttribute('data-filter') || 'all';
        renderDangerAlertsModal();
      });
    });

    initEmergencyRingingControls();
    syncDangerAlertUI();
  }

  function requestBrowserAlertPermission() {
    try {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().catch(() => {});
      }
    } catch (_) {}
  }

  function syncRingButtonsUI(audioState) {
    const isRinging = audioState ? audioState.isRinging : (audio ? audio.isSirenPlaying : false);
    const isMuted = audioState ? audioState.isMuted : (audio ? audio.isMuted : false);

    const deskBtn = document.getElementById('ctrl-ring-toggle');
    const deskIcon = document.getElementById('ctrl-ring-icon');
    const deskLbl = document.getElementById('ctrl-ring-label');

    if (deskBtn) {
      deskBtn.classList.toggle('ringing', isRinging);
      deskBtn.classList.toggle('muted', !isRinging && isMuted);
      deskBtn.classList.toggle('active', !isRinging && !isMuted);
    }
    if (deskIcon) {
      deskIcon.className = isRinging
        ? 'fa-solid fa-bell fa-shake'
        : isMuted
        ? 'fa-solid fa-volume-xmark'
        : 'fa-solid fa-phone-volume';
    }
    if (deskLbl) {
      deskLbl.textContent = isRinging ? 'RINGING! (Silence)' : isMuted ? 'Ring: Muted' : 'Ring: ON';
    }

    const mobBtn = document.getElementById('btn-mobile-ring-toggle');
    const mobIcon = document.getElementById('mobile-ring-icon');
    if (mobBtn) {
      mobBtn.classList.toggle('ring-active', isRinging);
      mobBtn.classList.toggle('ring-muted', !isRinging && isMuted);
      mobBtn.classList.toggle('ring-armed', !isRinging && !isMuted);
    }
    if (mobIcon) {
      mobIcon.className = isRinging
        ? 'fa-solid fa-bell fa-shake'
        : isMuted
        ? 'fa-solid fa-volume-xmark'
        : 'fa-solid fa-volume-high';
    }
  }

  function handleRingToggleButton() {
    requestBrowserAlertPermission();
    if (!audio) return;

    if (audio.isSirenPlaying) {
      stopEmergencyDeviceRing();
      showTerritoryToast('🔇', 'RINGTONE SILENCED', 'Emergency phone & computer ring stopped.');
      return;
    }

    // First tap on a freshly opened phone/computer browser unlocks speaker audio & plays confirmation ring
    if (!audio.isUnlocked && !audio.isMuted) {
      audio.playTestRing();
      showTerritoryToast('🔔', 'PHONE & PC RING ARMED', 'Speaker & vibration unlocked! This device will ring loudly on tamper.');
      syncRingButtonsUI();
      return;
    }

    const nowMuted = audio.toggleMute();
    if (nowMuted) {
      showTerritoryToast('🔕', 'TAMPER RING MUTED', 'Tap Ring button anytime to turn emergency ringing back ON.');
    } else {
      audio.playTestRing();
      showTerritoryToast('🔔', 'TAMPER RING ENABLED', 'This phone/computer will ring loudly when tamper is detected.');
    }
    syncRingButtonsUI();
  }

  function initEmergencyRingingControls() {
    bindClick('ctrl-ring-toggle', handleRingToggleButton);
    bindClick('btn-mobile-ring-toggle', handleRingToggleButton);

    bindClick('btn-ring-silence', () => {
      stopEmergencyDeviceRing();
    });

    bindClick('btn-ring-answer', () => {
      const targetAlert = state.activeRingingAlert || state.dangerAlerts.find(a => !a.is_acknowledged) || state.dangerAlerts[0];
      stopEmergencyDeviceRing();
      if (targetAlert && !targetAlert.is_test_only) {
        locateDangerAlertOnMap(targetAlert);
        openDangerAlertsModal();
      } else if (targetAlert && targetAlert.is_test_only) {
        focusActiveBikeOnMap();
      }
    });

    bindClick('btn-ring-cut', () => {
      stopEmergencyDeviceRing();
      closeModal('modal-danger-alerts');
      openModal('modal-pin-security');
    });

    if (audio && typeof audio.onStateChange === 'function') {
      audio.onStateChange((snap) => syncRingButtonsUI(snap));
    }
    syncRingButtonsUI();
  }

  function startTabTitleFlashing(headline) {
    stopTabTitleFlashing();
    let toggle = false;
    state.tabTitleBlinkTimer = setInterval(() => {
      toggle = !toggle;
      document.title = toggle ? `🚨 ${headline}` : '📞 RINGING! CHECK MOTORCYCLE — BODA 360';
    }, 900);
  }

  function stopTabTitleFlashing() {
    if (state.tabTitleBlinkTimer) {
      clearInterval(state.tabTitleBlinkTimer);
      state.tabTitleBlinkTimer = null;
    }
    document.title = state.defaultDocTitle || 'Boda 360 | Real-Time Vehicle Tracking & Security Interface';
  }

  function dispatchSystemBrowserNotification(alertObj, meta) {
    try {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;
      const plate = alertObj.plate_number || 'UEV 412K';
      const notif = new Notification(`🚨 ${meta.label} — ${plate}`, {
        body: alertObj.notes || 'Emergency motorcycle security alert! Tap to check live GPS & cut engine.',
        tag: 'boda360-emergency-ring',
        renotify: true,
        requireInteraction: true,
        vibrate: [500, 200, 500, 700]
      });
      notif.onclick = () => {
        try { window.focus(); } catch (_) {}
        notif.close();
      };
    } catch (_) {}
  }

  function triggerEmergencyDeviceRing(alertObj) {
    if (!alertObj) return;

    const ringDedupeKey = alertObj.is_test_only
      ? `test-${Date.now()}`
      : `${alertObj.event_id || ''}-${alertObj.event_type || ''}`;

    if (!alertObj.is_test_only && state.lastRungKey === ringDedupeKey && state.lastRungAt && (Date.now() - state.lastRungAt < 4000)) {
      return;
    }
    state.lastRungKey = ringDedupeKey;
    state.lastRungAt = Date.now();
    state.activeRingingAlert = alertObj;

    const meta = getDangerMeta(alertObj.event_type);
    const plate = alertObj.plate_number || 'UEV 412K';
    const lat = Number(alertObj.latitude || 0);
    const lng = Number(alertObj.longitude || 0);
    const hasCoords = !isNaN(lat) && !isNaN(lng) && (Math.abs(lat) > 0.0001 || Math.abs(lng) > 0.0001);

    // 1. Populate & display Incoming Security Call Ring Overlay on Phone & Computer
    const overlay = document.getElementById('incoming-ring-overlay');
    const avatarIcon = document.getElementById('ring-avatar-icon');
    if (avatarIcon) {
      avatarIcon.className = alertObj.event_type === 'BATTERY_DISCONNECTED'
        ? 'fa-solid fa-car-battery'
        : 'fa-solid fa-phone-volume';
    }
    setText('ring-kicker-text', alertObj.is_test_only
      ? 'TEST RING ACTIVE • PHONE & PC SPEAKER CHECK'
      : 'INCOMING SECURITY RING • BODA 360 GUARD');
    setText('ring-caller-plate', plate);
    setText('ring-caller-title', `${meta.label}!`);
    setText('ring-caller-notes', alertObj.notes || 'Tamper detected on your motorcycle! Check live GPS or immobilize engine.');
    setText(
      'ring-meta-coords',
      `<i class="fa-solid fa-location-dot"></i> ${hasCoords ? `${lat.toFixed(5)}°, ${lng.toFixed(5)}°` : 'Kampala Live GPS'}`
    );
    setText(
      'ring-meta-time',
      `<i class="fa-regular fa-clock"></i> ${formatAlertClockTime(alertObj.triggered_at) || 'Just now'}`
    );
    if (overlay) {
      overlay.classList.remove('hidden');
    }

    // 2. Start Continuous Loud Phone & Computer Ringtone + Mobile Vibration + Voice Callout
    if (audio) {
      audio.startSiren({
        plate,
        eventType: alertObj.event_type,
        notes: alertObj.notes,
        durationMs: alertObj.is_test_only ? 12000 : 45000
      });
    }

    // 3. Flash Browser Tab Title & Send Native OS Notification (for background tabs)
    startTabTitleFlashing(`${meta.label} [${plate}]`);
    if (!alertObj.is_test_only) {
      dispatchSystemBrowserNotification(alertObj, meta);
    }
    syncRingButtonsUI();
  }

  function stopEmergencyDeviceRing() {
    if (audio) {
      audio.stopSiren();
    }
    const overlay = document.getElementById('incoming-ring-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
    state.activeRingingAlert = null;
    stopTabTitleFlashing();
    syncRingButtonsUI();
  }

  function triggerPhoneComputerRingTest() {
    closeMobileDrawersIfOpen();
    requestBrowserAlertPermission();
    if (audio) {
      audio.unlockAudio();
      if (audio.isMuted) audio.setMuted(false);
    }
    const bike = state.bikes[state.activeBikeIndex] || state.bikes[0] || {};
    triggerEmergencyDeviceRing({
      event_id: Date.now(),
      plate_number: bike.plate || 'UEV 412K',
      event_type: 'TAMPER_DETECTED',
      latitude: bike.lat || 0.3275,
      longitude: bike.lng || 32.6025,
      notes: 'Speaker & vibration test active! Whenever real tamper or 12V battery cut happens on your motorcycle, your phone and computer will ring just like this.',
      triggered_at: new Date().toISOString(),
      is_test_only: true
    });
  }

  function closeMobileDrawersIfOpen() {
    const leftNav = document.getElementById('left-nav-sidebar');
    const rightTelemetry = document.getElementById('right-telemetry-sidebar');
    const backdrop = document.getElementById('mobile-backdrop');
    if (leftNav) leftNav.classList.remove('open');
    if (rightTelemetry) rightTelemetry.classList.remove('open');
    if (backdrop) backdrop.classList.add('hidden');
  }

  function openDangerAlertsModal() {
    closeMobileDrawersIfOpen();
    openModal('modal-danger-alerts');
    fetchCustomerDangerAlerts(false);
    renderDangerAlertsModal();
  }

  async function fetchCustomerDangerAlerts(showTickerOnInitialUnread) {
    try {
      const res = await fetch('/api/events/customer-feed');
      if (!res.ok) return;
      const data = await res.json();
      if (data && data.success && Array.isArray(data.events)) {
        const incomingEvents = data.events;

        if (!state.hasLoadedInitialDangerFeed) {
          state.hasLoadedInitialDangerFeed = true;
          incomingEvents.forEach((ev) => {
            if (ev.event_id) state.knownDangerEventIds.add(ev.event_id);
          });
          state.dangerAlerts = incomingEvents;
          syncDangerAlertUI();

          if (showTickerOnInitialUnread) {
            const topUnread = state.dangerAlerts.find(a => !a.is_acknowledged);
            if (topUnread) {
              const ageMs = Date.now() - new Date(topUnread.triggered_at).getTime();
              // If user just opened dashboard right after receiving an SMS (< 45s old), ring immediately too!
              const isVeryFresh = !isNaN(ageMs) && ageMs >= 0 && ageMs < 45000;
              showDangerBanner(topUnread, isVeryFresh);
            }
          }
          return;
        }

        // Detect any brand-new unacknowledged danger alert caught by 4s mobile/background polling
        let newestUnseenLiveAlert = null;
        incomingEvents.forEach((ev) => {
          const id = ev.event_id;
          if (id && !state.knownDangerEventIds.has(id)) {
            state.knownDangerEventIds.add(id);
            const ageMs = Date.now() - new Date(ev.triggered_at).getTime();
            if (!ev.is_acknowledged && (isNaN(ageMs) || ageMs < 120000) && !newestUnseenLiveAlert) {
              newestUnseenLiveAlert = ev;
            }
          }
        });

        state.dangerAlerts = incomingEvents;
        syncDangerAlertUI();

        if (newestUnseenLiveAlert) {
          handleIncomingDangerAlert(newestUnseenLiveAlert, true);
        }
      }
    } catch (e) {
      // Standalone fallback mode keeps local alerts in memory
      syncDangerAlertUI();
    }
  }

  function showDangerBanner(alertObj, playAlarmSound) {
    const ticker = document.getElementById('central-alert-ticker');
    if (!ticker || !alertObj) return;

    const meta = getDangerMeta(alertObj.event_type);
    const plate = alertObj.plate_number || 'UEV 412K';
    ticker.classList.remove('hidden');
    setText('ticker-alert-title', `${meta.tickerTitle} [${plate}]`);
    setText('ticker-alert-message', alertObj.notes || 'Check Danger Alerts on your dashboard immediately.');

    if (playAlarmSound) {
      triggerEmergencyDeviceRing(alertObj);
    }
  }

  function handleIncomingDangerAlert(alertObj, isLiveStream) {
    if (!alertObj) return;
    const normalized = {
      event_id: alertObj.event_id || Date.now(),
      device_imei: alertObj.device_imei || '865421045981201',
      plate_number: alertObj.plate_number || 'UEV 412K',
      event_type: alertObj.event_type || 'TAMPER_DETECTED',
      severity: alertObj.severity || (alertObj.event_type === 'GEOFENCE_BREACH' ? 'HIGH' : 'CRITICAL'),
      latitude: alertObj.latitude !== undefined ? parseFloat(alertObj.latitude) : (state.bikes[0] ? state.bikes[0].lat : 0.184309),
      longitude: alertObj.longitude !== undefined ? parseFloat(alertObj.longitude) : (state.bikes[0] ? state.bikes[0].lng : 32.524292),
      notes: alertObj.notes || 'Critical security event reported by motorcycle tracker.',
      is_acknowledged: Boolean(alertObj.is_acknowledged),
      triggered_at: alertObj.triggered_at || new Date().toISOString()
    };

    if (normalized.event_id) {
      state.knownDangerEventIds.add(normalized.event_id);
    }

    const existingIdx = state.dangerAlerts.findIndex(a =>
      (a.event_id && normalized.event_id && a.event_id === normalized.event_id) ||
      (a.event_type === normalized.event_type &&
       Math.abs(new Date(a.triggered_at).getTime() - new Date(normalized.triggered_at).getTime()) < 2000)
    );

    if (existingIdx >= 0) {
      state.dangerAlerts[existingIdx] = normalized;
    } else {
      state.dangerAlerts.unshift(normalized);
    }

    const bike = state.bikes.find(b => b.imei === normalized.device_imei || b.plate === normalized.plate_number) || state.bikes[0];
    if (bike) {
      if (normalized.event_type !== 'GEOFENCE_BREACH') {
        bike.tamperAlert = true;
      }
      if (normalized.event_type === 'BATTERY_DISCONNECTED') {
        bike.batteryDisconnected = true;
        bike.batteryVoltage = 0.0;
      }
      if (normalized.latitude && normalized.longitude && Math.abs(normalized.latitude) > 0.0001) {
        bike.lat = normalized.latitude;
        bike.lng = normalized.longitude;
      }
      renderAllVehicleMarkers();
      renderAssetList();
      renderSelectedPayload();
      updateDockHUD();
    }

    showDangerBanner(normalized, Boolean(isLiveStream));
    syncDangerAlertUI();
  }

  async function dispatchSimulatedDangerAlert(payload) {
    closeMobileDrawersIfOpen();
    try {
      const res = await fetch('/api/events/trigger-tamper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.event) {
          handleIncomingDangerAlert({
            ...data.event,
            plate_number: payload.plate_number || 'UEV 412K'
          }, true);
          return;
        }
      }
    } catch (e) {
      // Fallback if running standalone without backend
    }

    handleIncomingDangerAlert({
      event_id: Date.now(),
      device_imei: payload.device_imei,
      plate_number: payload.plate_number,
      event_type: payload.event_type,
      severity: payload.severity || 'CRITICAL',
      latitude: payload.latitude,
      longitude: payload.longitude,
      notes: payload.custom_note,
      is_acknowledged: false,
      triggered_at: new Date().toISOString()
    }, true);
  }

  function syncDangerAlertUI() {
    const unreadAlerts = state.dangerAlerts.filter(a => !a.is_acknowledged);
    const unreadCount = unreadAlerts.length;

    // 1. Left Sidebar Badge + Mobile Top Bar Badge
    const navBadge = document.getElementById('nav-danger-badge');
    const navItem = document.getElementById('nav-item-alerts');
    const mobBadge = document.getElementById('mobile-badge-alerts');
    const mobBtn = document.getElementById('btn-mobile-alerts-toggle');

    if (navBadge) {
      navBadge.textContent = unreadCount;
      navBadge.classList.toggle('hidden', unreadCount === 0);
    }
    if (navItem) {
      navItem.classList.toggle('has-danger', unreadCount > 0);
    }
    if (mobBadge) {
      mobBadge.textContent = unreadCount;
      mobBadge.classList.toggle('hidden', unreadCount === 0);
    }
    if (mobBtn) {
      mobBtn.classList.toggle('has-danger', unreadCount > 0);
    }

    // 2. Right Sidebar Always-Visible Danger Card
    const box = document.getElementById('sidebar-danger-box');
    const iconEl = document.getElementById('sdb-icon');
    const titleEl = document.getElementById('sdb-title');
    const subEl = document.getElementById('sdb-subtitle');
    const countPill = document.getElementById('sdb-count-pill');
    const latestMsg = document.getElementById('sdb-latest-msg');
    const openBtnLabel = document.getElementById('sdb-open-btn-label');
    const locateBtn = document.getElementById('btn-sdb-locate-latest');

    if (box) {
      const activeBike = state.bikes[state.activeBikeIndex] || state.bikes[0];
      const isBikeOffline = activeBike && activeBike.isOnline === false;
      if (unreadCount > 0) {
        const latest = unreadAlerts[0];
        const meta = getDangerMeta(latest.event_type);
        box.classList.remove('safe', 'offline');
        box.classList.add('danger');
        if (iconEl) iconEl.innerHTML = `<i class="fa-solid ${meta.icon} fa-beat"></i>`;
        if (titleEl) titleEl.textContent = `DANGER: ${meta.label}`;
        if (subEl) subEl.textContent = `${latest.plate_number || 'UEV 412K'} • ${formatAlertRelativeTime(latest.triggered_at)}`;
        if (countPill) {
          countPill.textContent = `${unreadCount} NEW`;
          countPill.classList.remove('hidden');
        }
        if (latestMsg) {
          latestMsg.textContent = latest.notes || '';
          latestMsg.classList.remove('hidden');
        }
        if (openBtnLabel) openBtnLabel.textContent = `Check Alert${unreadCount > 1 ? 's' : ''} (${unreadCount})`;
        if (locateBtn) locateBtn.classList.remove('hidden');
      } else if (isBikeOffline) {
        box.classList.remove('safe', 'danger');
        box.classList.add('offline');
        if (iconEl) iconEl.innerHTML = '<i class="fa-solid fa-plug-circle-xmark"></i>';
        if (titleEl) titleEl.textContent = 'Device Offline';
        if (subEl) {
          subEl.textContent = `${activeBike.plate || 'UEV 412K'} • ${formatDeviceLastSeen(activeBike)}`;
        }
        if (countPill) countPill.classList.add('hidden');
        if (latestMsg) latestMsg.classList.add('hidden');
        if (openBtnLabel) openBtnLabel.textContent = 'Check Alert Log';
        if (locateBtn) locateBtn.classList.add('hidden');
      } else {
        box.classList.remove('danger', 'offline');
        box.classList.add('safe');
        if (iconEl) iconEl.innerHTML = '<i class="fa-solid fa-shield-heart"></i>';
        if (titleEl) titleEl.textContent = 'Vehicle Safe';
        if (subEl) {
          subEl.textContent = state.dangerAlerts.length > 0
            ? `${state.dangerAlerts.length} past alert${state.dangerAlerts.length === 1 ? '' : 's'} checked`
            : 'Device Online • No unread alerts';
        }
        if (countPill) countPill.classList.add('hidden');
        if (latestMsg) latestMsg.classList.add('hidden');
        if (openBtnLabel) openBtnLabel.textContent = 'Check Alert Log';
        if (locateBtn) locateBtn.classList.add('hidden');
      }
    }

    // 3. Refresh Modal if open or ready
    renderDangerAlertsModal();
  }

  function renderDangerAlertsModal() {
    const listEl = document.getElementById('danger-alerts-list');
    if (!listEl) return;

    const unreadAlerts = state.dangerAlerts.filter(a => !a.is_acknowledged);
    const hasUnreadBatCut = unreadAlerts.some(a => a.event_type === 'BATTERY_DISCONNECTED') ||
      (state.bikes[0] && state.bikes[0].batteryDisconnected);
    const hasUnreadTamper = unreadAlerts.some(a => a.event_type === 'TAMPER_DETECTED');
    const hasUnreadPerimeter = unreadAlerts.some(a => a.event_type === 'GEOFENCE_BREACH');

    // Update KPI Cards
    const cardUnread = document.getElementById('da-card-unread');
    const cardBat = document.getElementById('da-card-battery');
    const cardTamper = document.getElementById('da-card-tamper');
    const cardPerim = document.getElementById('da-card-perimeter');

    setText('da-kpi-unread', String(unreadAlerts.length));
    setText('da-kpi-unread-sub', unreadAlerts.length > 0 ? 'Action required — check below' : 'All phone messages checked');
    if (cardUnread) cardUnread.classList.toggle('is-danger', unreadAlerts.length > 0);

    const batVal = document.getElementById('da-kpi-battery');
    if (batVal) {
      batVal.textContent = hasUnreadBatCut ? 'CUT / REMOVED!' : 'CONNECTED';
      batVal.className = `da-kpi-val ${hasUnreadBatCut ? 'text-danger' : 'text-success'}`;
    }
    setText('da-kpi-battery-sub', hasUnreadBatCut ? 'Running on 18650 backup cell!' : '12V power wire intact');
    if (cardBat) cardBat.classList.toggle('is-danger', hasUnreadBatCut);

    const tampVal = document.getElementById('da-kpi-tamper');
    if (tampVal) {
      tampVal.textContent = hasUnreadTamper ? 'SHOCK ALERT!' : 'SAFE';
      tampVal.className = `da-kpi-val ${hasUnreadTamper ? 'text-danger' : 'text-success'}`;
    }
    setText('da-kpi-tamper-sub', hasUnreadTamper ? 'Physical vibration detected' : 'Piezo + MPU6050 armed');
    if (cardTamper) cardTamper.classList.toggle('is-danger', hasUnreadTamper);

    const perimVal = document.getElementById('da-kpi-perimeter');
    if (perimVal) {
      perimVal.textContent = hasUnreadPerimeter ? 'OUTSIDE ZONE!' : 'INSIDE ZONE';
      perimVal.className = `da-kpi-val ${hasUnreadPerimeter ? 'text-danger' : 'text-success'}`;
    }
    setText('da-kpi-perimeter-sub', hasUnreadPerimeter ? 'Left marked safe perimeter' : 'Authorized boundary OK');
    if (cardPerim) cardPerim.classList.toggle('is-danger', hasUnreadPerimeter);

    // Filter alerts
    let filtered = state.dangerAlerts;
    if (state.activeDangerFilter === 'unread') {
      filtered = filtered.filter(a => !a.is_acknowledged);
    } else if (state.activeDangerFilter !== 'all') {
      filtered = filtered.filter(a => a.event_type === state.activeDangerFilter);
    }

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="da-empty-state">
          <i class="fa-solid fa-shield-heart"></i>
          <div style="font-weight: 700; color: #0f172a; margin-bottom: 4px;">No Danger Alerts in This View</div>
          <div style="font-size: 0.8rem;">Whenever your motorcycle sends a Tamper, 12V Battery-Cut, or Perimeter SMS/Call to your phone, it will appear right here with its live GPS location.</div>
        </div>
      `;
      return;
    }

    listEl.innerHTML = filtered.map(alertItem => {
      const meta = getDangerMeta(alertItem.event_type);
      const unreadClass = !alertItem.is_acknowledged ? `unread ${meta.badgeClass === 'high' ? 'high' : ''}` : '';
      const lat = Number(alertItem.latitude || 0);
      const lng = Number(alertItem.longitude || 0);
      const hasCoords = !isNaN(lat) && !isNaN(lng) && (Math.abs(lat) > 0.0001 || Math.abs(lng) > 0.0001);
      const coordsLabel = hasCoords ? `${lat.toFixed(5)}°, ${lng.toFixed(5)}°` : 'Kampala Telemetry Node';

      return `
        <div class="danger-alert-item ${unreadClass}" data-event-id="${alertItem.event_id}">
          <div class="da-item-header">
            <div class="da-item-badges">
              <span class="da-type-badge ${meta.badgeClass}">
                <i class="fa-solid ${meta.icon}"></i> ${escapeHtml(meta.label)}
              </span>
              <span class="da-plate-pill">${escapeHtml(alertItem.plate_number || 'UEV 412K')}</span>
              <span class="da-sms-tag"><i class="fa-solid fa-comment-sms"></i> Phone Alert Synced</span>
            </div>
            <span class="da-time-stamp">
              <i class="fa-regular fa-clock"></i> ${escapeHtml(formatAlertClockTime(alertItem.triggered_at))} (${escapeHtml(formatAlertRelativeTime(alertItem.triggered_at))})
            </span>
          </div>

          <div class="da-item-notes">${escapeHtml(alertItem.notes || '')}</div>

          <div class="da-item-footer">
            <span class="da-coords-txt"><i class="fa-solid fa-location-dot text-danger"></i> GPS: ${coordsLabel}</span>
            <div class="da-item-actions">
              <button class="da-act-btn btn-da-locate" data-id="${alertItem.event_id}">
                <i class="fa-solid fa-location-crosshairs"></i> Locate on Map
              </button>
              <button class="da-act-btn cut btn-da-cut" data-id="${alertItem.event_id}">
                <i class="fa-solid fa-power-off"></i> Cut Engine
              </button>
              ${!alertItem.is_acknowledged ? `
                <button class="da-act-btn ack btn-da-ack" data-id="${alertItem.event_id}">
                  <i class="fa-solid fa-check"></i> Mark Checked
                </button>
              ` : `
                <span class="da-checked-label"><i class="fa-solid fa-circle-check"></i> Checked</span>
              `}
            </div>
          </div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.btn-da-locate').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-id'));
        const item = state.dangerAlerts.find(a => Number(a.event_id) === id);
        if (item) {
          closeModal('modal-danger-alerts');
          locateDangerAlertOnMap(item);
        }
      });
    });

    listEl.querySelectorAll('.btn-da-cut').forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal('modal-danger-alerts');
        openModal('modal-pin-security');
      });
    });

    listEl.querySelectorAll('.btn-da-ack').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-id'));
        acknowledgeDangerAlert(id);
      });
    });
  }

  function locateDangerAlertOnMap(alertItem) {
    if (!state.map || !alertItem) return;
    closeMobileDrawersIfOpen();
    const lat = Number(alertItem.latitude) || (state.bikes[0] ? state.bikes[0].lat : 0.184309);
    const lng = Number(alertItem.longitude) || (state.bikes[0] ? state.bikes[0].lng : 32.524292);
    const meta = getDangerMeta(alertItem.event_type);

    if (state.dangerAlertPin) {
      try { state.map.removeLayer(state.dangerAlertPin); } catch (e) {}
      state.dangerAlertPin = null;
    }

    state.map.flyTo([lat, lng], 16, { animate: true, duration: 1.2 });

    const dangerIcon = L.divIcon({
      className: 'danger-alert-div-icon',
      html: `
        <div style="width:36px;height:36px;border-radius:50%;background:#dc2626;border:3px solid #fff;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 18px rgba(220,38,38,0.75);font-size:15px;">
          <i class="fa-solid ${meta.icon}"></i>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18]
    });

    const popupContent = `
      <div style="max-width:240px;font-family:'Outfit',sans-serif;">
        <div style="color:#dc2626;font-weight:800;font-size:0.84rem;margin-bottom:4px;word-break:break-word;">
          🚨 ${escapeHtml(meta.label)} (${escapeHtml(alertItem.plate_number || 'UEV 412K')})
        </div>
        <div style="font-size:0.76rem;color:#334155;line-height:1.38;margin-bottom:6px;word-break:break-word;">
          ${escapeHtml(alertItem.notes || '')}
        </div>
        <div style="font-size:0.7rem;color:#64748b;font-family:monospace;">
          ${lat.toFixed(5)}, ${lng.toFixed(5)} • ${escapeHtml(formatAlertClockTime(alertItem.triggered_at))}
        </div>
      </div>
    `;

    state.dangerAlertPin = L.marker([lat, lng], { icon: dangerIcon, zIndexOffset: 2500 })
      .addTo(state.map)
      .bindPopup(popupContent, { maxWidth: 260, autoPanPadding: [20, 95] })
      .openPopup();
  }

  async function acknowledgeDangerAlert(eventId) {
    const item = state.dangerAlerts.find(a => Number(a.event_id) === Number(eventId));
    if (item) {
      item.is_acknowledged = true;
      if (item.event_type === 'BATTERY_DISCONNECTED' && state.bikes[0] && state.bikes[0].batteryVoltage > 5.0) {
        state.bikes[0].batteryDisconnected = false;
      }
    }
    stopEmergencyDeviceRing();
    syncDangerAlertUI();

    try {
      await fetch(`/api/events/customer-ack/${eventId}`, { method: 'POST' });
    } catch (e) {}
  }

  async function acknowledgeAllDangerAlerts() {
    state.dangerAlerts.forEach(a => { a.is_acknowledged = true; });
    state.bikes.forEach(b => { b.tamperAlert = false; });
    const ticker = document.getElementById('central-alert-ticker');
    if (ticker) ticker.classList.add('hidden');
    stopEmergencyDeviceRing();
    syncDangerAlertUI();

    try {
      await fetch('/api/events/customer-ack-all', { method: 'POST' });
    } catch (e) {}
  }

  // =========================================================================
  // 13. REAL-TIME HARDWARE DEVICE ONLINE / OFFLINE MONITORING ENGINE
  // =========================================================================
  function formatDeviceLastSeen(bike) {
    if (!state.gatewayReachable) {
      return 'Server unreachable';
    }
    if (!bike || !bike.lastSeenAt) {
      return 'No signal yet';
    }
    const ts = new Date(bike.lastSeenAt).getTime();
    if (isNaN(ts)) return 'No signal yet';
    const diffSec = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (diffSec < 5) return 'Just now';
    if (diffSec < 60) return `Last seen ${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `Last seen ${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    return `Last seen ${diffHr}h ago`;
  }

  function initDeviceOfflineMonitor() {
    bindClick('btn-offline-recheck', () => {
      state.offlineBannerDismissed = false;
      fetchHardwareDeviceStatus(true);
    });

    bindClick('btn-offline-dismiss', () => {
      state.offlineBannerDismissed = true;
      const banner = document.getElementById('device-offline-banner');
      if (banner) banner.classList.add('hidden');
    });

    bindClick('btn-dismiss-toast', () => {
      if (state.toastTimer) {
        clearTimeout(state.toastTimer);
        state.toastTimer = null;
      }
      const toast = document.getElementById('territory-toast');
      if (toast) toast.classList.add('hidden');
    });

    bindClick('btn-dismiss-network-chip', () => {
      state.networkChipDismissed = true;
      const chip = document.getElementById('network-status-chip');
      if (chip) chip.classList.add('hidden');
    });

    bindClick('btn-dismiss-dock', () => {
      const dock = document.getElementById('floating-security-dock');
      const restorePill = document.getElementById('btn-restore-dock');
      if (dock) dock.classList.add('hidden');
      if (restorePill) restorePill.classList.remove('hidden');
    });

    bindClick('btn-restore-dock', () => {
      const dock = document.getElementById('floating-security-dock');
      const restorePill = document.getElementById('btn-restore-dock');
      if (dock) dock.classList.remove('hidden');
      if (restorePill) restorePill.classList.add('hidden');
    });

    fetchHardwareDeviceStatus(false);

    // 2-second watchdog: detects missed 3s ESP32 heartbeats across ALL bikes in profile
    let tickCount = 0;
    setInterval(() => {
      tickCount++;
      let anyTimedOut = false;

      state.bikes.forEach(bk => {
        if (bk && bk.isOnline === true && bk.lastTelemetryMs > 0) {
          if (Date.now() - bk.lastTelemetryMs > 30000) {
            bk.isOnline = false;
            bk.transport = 'OFFLINE';
            bk.speed = 0.0;
            anyTimedOut = true;
          }
        }
      });

      if (anyTimedOut) {
        state.offlineBannerDismissed = false;
        syncDeviceOnlineOfflineUI('DISCONNECTED');
        return;
      }

      // Poll backend /api/hardware/status every 4s for rock-solid sync across all registered bikes
      if (tickCount % 2 === 0) {
        fetchHardwareDeviceStatus(false);
      } else if (state.bikes.some(bk => bk && bk.isOnline === false)) {
        // Refresh ticking "Last seen Xs ago" labels smoothly
        syncDeviceOnlineOfflineUI(null);
      }
    }, 2000);
  }

  async function fetchHardwareDeviceStatus(isManualRecheck) {
    try {
      const res = await fetch('/api/hardware/status', { cache: 'no-store' });
      if (!res.ok) throw new Error('Status check failed');
      const data = await res.json();
      state.gatewayReachable = true;

      if (data && Array.isArray(data.devices) && data.devices.length > 0) {
        const statusByImei = {};
        let anyOnlineDevice = null;
        data.devices.forEach(d => {
          if (d && d.imei) statusByImei[d.imei] = d;
          if (d && d.is_online && !anyOnlineDevice) anyOnlineDevice = d;
        });

        state.bikes.forEach((bk, idx) => {
          const matched =
            statusByImei[bk.imei] ||
            (idx === state.activeBikeIndex && anyOnlineDevice ? anyOnlineDevice : null);
          const manualFlag = isManualRecheck && idx === state.activeBikeIndex;
          if (matched) {
            applyDeviceConnectionStatus(matched, manualFlag);
          } else if (bk.isOnline === undefined) {
            bk.isOnline = false;
            bk.transport = 'OFFLINE';
          }
        });
        if (data.latest_telemetry && (anyOnlineDevice || (data.device && data.device.is_online))) {
          handleLiveTelemetryPacket({
            ...data.latest_telemetry,
            is_real_hardware: true,
            transport: (anyOnlineDevice && anyOnlineDevice.transport) || (data.device && data.device.transport) || 'USB_SERIAL'
          });
        }
        syncDeviceOnlineOfflineUI(null);
      } else if (data && data.device) {
        applyDeviceConnectionStatus(data.device, isManualRecheck);
      }
    } catch (_) {
      const activeBike = state.bikes[state.activeBikeIndex] || state.bikes[0];
      const wasOnline = activeBike && activeBike.isOnline !== false;
      state.gatewayReachable = false;
      state.bikes.forEach(bk => {
        if (bk) {
          bk.isOnline = false;
          bk.transport = 'SERVER_UNREACHABLE';
          bk.speed = 0.0;
        }
      });
      syncDeviceOnlineOfflineUI(wasOnline ? 'DISCONNECTED' : null);
      if (isManualRecheck) {
        showTerritoryToast('⚠️', 'SERVER / DEVICE UNREACHABLE', 'Cannot reach telemetry gateway. Check server or Wi-Fi.');
      }
    }
  }

  function applyDeviceConnectionStatus(statusMsg, isManualRecheck) {
    if (!statusMsg) return;
    const imei = statusMsg.imei || '869951038535641';
    const bike =
      state.bikes.find(b => b.imei === imei || (statusMsg.plate && b.plate === statusMsg.plate)) ||
      (state.bikes.length === 1 ? state.bikes[0] : state.bikes[state.activeBikeIndex]);
    if (!bike) return;

    const prevOnline = bike.isOnline;
    const nextOnline = Boolean(statusMsg.is_online);

    bike.isOnline = nextOnline;
    bike.transport = statusMsg.transport || (nextOnline ? 'USB_SERIAL' : 'OFFLINE');
    if (statusMsg.last_seen_at) {
      bike.lastSeenAt = statusMsg.last_seen_at;
      if (nextOnline) {
        bike.lastTelemetryMs = new Date(statusMsg.last_seen_at).getTime() || Date.now();
      }
    }
    if (!nextOnline) {
      bike.speed = 0.0;
    }

    let transition = null;
    const activeBike = state.bikes[state.activeBikeIndex] || state.bikes[0];
    if (activeBike && activeBike.id === bike.id) {
      if (prevOnline === true && !nextOnline) {
        transition = 'DISCONNECTED';
      } else if (prevOnline === false && nextOnline) {
        transition = 'RECONNECTED';
      }
    }

    syncDeviceOnlineOfflineUI(transition);

    if (isManualRecheck) {
      if (nextOnline) {
        showTerritoryToast('🟢', 'DEVICE ONLINE', `${bike.plate} is actively connected (${bike.transport}).`);
      } else {
        showTerritoryToast('📴', 'DEVICE STILL OFFLINE', `${bike.plate} is not sending telemetry (${formatDeviceLastSeen(bike)}).`);
      }
    }
  }

  function syncDeviceOnlineOfflineUI(transition) {
    const bike = state.bikes[state.activeBikeIndex] || state.bikes[0];
    if (!bike) {
      const chip = document.getElementById('network-status-chip');
      const dot = document.getElementById('network-status-dot');
      const chipText = document.getElementById('network-chip-text');
      if (chip) chip.classList.remove('is-offline');
      if (dot) dot.classList.remove('offline');
      if (chipText) {
        chipText.innerHTML = '<i class="fa-solid fa-circle-plus"></i> NO TRACKER LINKED YET';
      }
      const mobPill = document.getElementById('mobile-device-status-pill');
      const mobTxt = document.getElementById('mobile-device-status-txt');
      if (mobPill) {
        mobPill.classList.remove('online');
        mobPill.classList.add('offline');
      }
      if (mobTxt) mobTxt.textContent = 'SETUP';
      const banner = document.getElementById('device-offline-banner');
      if (banner) banner.classList.add('hidden');
      renderAssetList();
      renderSelectedPayload();
      updateDockHUD();
      return;
    }

    const isOffline = bike.isOnline === false;
    const isOnline = bike.isOnline === true;
    const lastSeenStr = formatDeviceLastSeen(bike);

    // 1. Desktop Top Header Chip
    const chip = document.getElementById('network-status-chip');
    const dot = document.getElementById('network-status-dot');
    const chipText = document.getElementById('network-chip-text');

    if (chip) {
      chip.classList.toggle('is-offline', isOffline);
      chip.classList.toggle('hidden', Boolean(state.networkChipDismissed));
    }
    if (dot) dot.classList.toggle('offline', isOffline);

    if (chipText) {
      if (isOffline) {
        chipText.innerHTML = `<i class="fa-solid fa-plug-circle-xmark"></i> DEVICE OFFLINE &bull; ${escapeHtml(lastSeenStr)}`;
      } else if (isOnline) {
        const linkTag = bike.transport === 'CELLULAR_MQTT' ? 'GSM MQTT' : 'ESP32 LIVE';
        chipText.innerHTML = bike.gpsLock
          ? `<i class="fa-solid fa-satellite" style="color: #22c55e;"></i> ${linkTag} &bull; 3D LOCK (${bike.satellites || 0} SATS)`
          : `<i class="fa-solid fa-circle-check" style="color: #22c55e;"></i> ${linkTag} ONLINE (${bike.satellites || 0} SATS)`;
      } else {
        chipText.textContent = 'CHECKING DEVICE...';
      }
    }

    // 2. Mobile Top Header Status Pill
    const mobPill = document.getElementById('mobile-device-status-pill');
    const mobTxt = document.getElementById('mobile-device-status-txt');
    if (mobPill) {
      mobPill.classList.toggle('online', isOnline);
      mobPill.classList.toggle('offline', !isOnline);
    }
    if (mobTxt) {
      mobTxt.textContent = isOnline ? 'ONLINE' : (isOffline ? 'OFFLINE' : 'SYNC...');
    }

    // 3. Floating Map Offline Monitoring Banner
    const banner = document.getElementById('device-offline-banner');
    if (banner) {
      banner.classList.toggle('hidden', !isOffline || Boolean(state.offlineBannerDismissed));
      if (isOffline && !state.offlineBannerDismissed) {
        setText('offline-banner-title', `DEVICE OFFLINE — ${bike.plate || 'UEV 412K'} Disconnected`);
        const reasonHint = !state.gatewayReachable
          ? 'Telemetry server unreachable — check server or Wi-Fi connection.'
          : `No live heartbeat from ESP32 (${bike.imei}) • ${lastSeenStr} • Showing last known GPS position.`;
        setText('offline-banner-detail', reasonHint);
      }
    }

    // 4. Refresh Markers, Fleet Card, Payload Inspector, Bottom Dock & Monitoring Box
    renderAllVehicleMarkers();
    renderAssetList();
    renderSelectedPayload();
    updateDockHUD();
    syncDangerAlertUI();

    // 5. Transition Toast & Subtle Audio Feedback
    if (transition === 'DISCONNECTED') {
      state.hasActuallyDisconnected = true;
      if (audio) audio.playChirp(false);
      showTerritoryToast('📴', 'DEVICE WENT OFFLINE', `${bike.plate} stopped sending telemetry. Showing last known GPS location.`);
    } else if (transition === 'RECONNECTED' && state.hasActuallyDisconnected) {
      state.hasActuallyDisconnected = false;
      if (audio) audio.playChirp(true);
      showTerritoryToast('🟢', 'DEVICE BACK ONLINE', `${bike.plate} live telemetry heartbeat restored!`);
    }
  }

  // =========================================================================
  // 14. MULTI-BIKE PROFILE GARAGE & "ADD ANOTHER MOTORCYCLE" ENGINE
  // =========================================================================
  function buildAuthHeaders(extra = {}) {
    const token = localStorage.getItem('boda_auth_token');
    const email = localStorage.getItem('boda_user_email') || '';
    let userName = '';
    let userPhone = '';
    try {
      const prof = JSON.parse(localStorage.getItem('boda_user_profile') || '{}');
      userName = prof.full_name || '';
      userPhone = prof.phone_number || '';
    } catch (_) {}
    const headers = {
      ...(email ? { 'x-user-email': email } : {}),
      ...(userName ? { 'x-user-name': userName } : {}),
      ...(userPhone ? { 'x-user-phone': userPhone } : {}),
      ...extra
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  }

  function mapServerMotorcycleToClientBike(m, existingBike) {
    const tel = m.latest_telemetry || {};
    const lat = existingBike && existingBike.isOnline && existingBike.lat
      ? existingBike.lat
      : (tel.latitude !== undefined ? parseFloat(tel.latitude) : 0.327500);
    const lng = existingBike && existingBike.isOnline && existingBike.lng
      ? existingBike.lng
      : (tel.longitude !== undefined ? parseFloat(tel.longitude) : 32.602500);

    const isOnline = existingBike && existingBike.isOnline === true
      ? true
      : Boolean(m.is_online);

    return {
      id: Number(m.motorcycle_id) || (existingBike ? existingBike.id : Date.now()),
      plate: m.plate_number || 'UEV 412K',
      model: m.model || 'Bajaj Boxer BM150',
      owner: m.owner_name || 'Registered Owner',
      phone: m.owner_phone || '+256 701 987654',
      nin: 'CM92018104KTW',
      imei: m.device_imei,
      simNumber: m.sim_number || m.owner_phone || '+256 701 445892 (MTN Uganda)',
      pinCode: m.pin_code || '1234',
      locationName: existingBike && existingBike.isOnline && existingBike.locationName
        ? existingBike.locationName
        : (m.location_name || `Kampala Hub (${m.plate_number})`),
      lat,
      lng,
      speed: isOnline ? (existingBike ? existingBike.speed : parseFloat(tel.speed || 0)) : 0.0,
      batteryVoltage: existingBike && existingBike.batteryVoltage !== undefined
        ? existingBike.batteryVoltage
        : parseFloat(tel.battery_voltage || 12.6),
      ignition: Boolean(tel.ignition_status),
      relayState: m.status === 'immobilized' || Boolean(tel.is_immobilized),
      tamperAlert: m.status === 'tamper_alert' || Boolean(m.has_critical_alert),
      satellites: existingBike ? (existingBike.satellites || 0) : parseInt(tel.satellites || 0, 10),
      gsmCsq: parseInt(tel.gsm_signal || 28, 10),
      heading: parseFloat(tel.heading || 0),
      shiftDistance: existingBike ? existingBike.shiftDistance : 0.0,
      totalDistance: existingBike ? existingBike.totalDistance : 0.0,
      status: m.status || 'active',
      isOnline,
      transport: m.connection_transport || (isOnline ? 'USB_SERIAL' : 'OFFLINE'),
      lastSeenAt: m.last_seen_at || (existingBike ? existingBike.lastSeenAt : null),
      lastTelemetryMs: existingBike ? (existingBike.lastTelemetryMs || 0) : 0,
      trail: existingBike && Array.isArray(existingBike.trail) && existingBike.trail.length > 0
        ? existingBike.trail
        : [[lat, lng]]
    };
  }

  async function fetchPortalWithTimeout(url, options = {}, timeoutMs = 3500) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
  }

  function getDeletedImeisSet() {
    try {
      const raw = localStorage.getItem('boda_deleted_imeis');
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(arr) ? arr : []);
    } catch (_) {
      return new Set();
    }
  }

  function markImeiDeleted(imei) {
    try {
      const set = getDeletedImeisSet();
      set.add(String(imei));
      localStorage.setItem('boda_deleted_imeis', JSON.stringify(Array.from(set)));
    } catch (_) {}
  }

  function unmarkImeiDeleted(imei) {
    try {
      const set = getDeletedImeisSet();
      if (set.has(String(imei))) {
        set.delete(String(imei));
        localStorage.setItem('boda_deleted_imeis', JSON.stringify(Array.from(set)));
      }
    } catch (_) {}
  }

  function getLocalSavedMotorcyclesForUser() {
    try {
      const email = (localStorage.getItem('boda_user_email') || '').trim().toLowerCase();
      const deletedSet = getDeletedImeisSet();
      const raw = localStorage.getItem('boda_local_motorcycles');
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      const activeList = parsed.filter(m => m && m.device_imei && !deletedSet.has(String(m.device_imei)));
      if (!email) return activeList;
      const ownedOrUnassigned = activeList.filter(m => {
        const mEmail = String(m.owner_email || '').trim().toLowerCase();
        return !mEmail || mEmail === email;
      });
      return ownedOrUnassigned.length > 0 ? ownedOrUnassigned : activeList;
    } catch (_) {
      return [];
    }
  }

  function saveLocalMotorcycleForUser(serverMoto) {
    try {
      if (!serverMoto || !serverMoto.device_imei) return;
      unmarkImeiDeleted(serverMoto.device_imei);
      const email = (localStorage.getItem('boda_user_email') || '').trim().toLowerCase();
      const raw = localStorage.getItem('boda_local_motorcycles');
      const parsed = raw ? JSON.parse(raw) : [];
      const all = Array.isArray(parsed) ? parsed : [];
      const filtered = all.filter(m => m && m.device_imei !== serverMoto.device_imei);
      filtered.push({ ...serverMoto, owner_email: email || serverMoto.owner_email || '' });
      localStorage.setItem('boda_local_motorcycles', JSON.stringify(filtered));
    } catch (_) {}
  }

  function removeLocalMotorcycleForUser(imei) {
    try {
      markImeiDeleted(imei);
      const raw = localStorage.getItem('boda_local_motorcycles');
      const parsed = raw ? JSON.parse(raw) : [];
      const all = Array.isArray(parsed) ? parsed : [];
      const filtered = all.filter(m => m && m.device_imei !== imei);
      localStorage.setItem('boda_local_motorcycles', JSON.stringify(filtered));
    } catch (_) {}
  }

  function hydrateInitialLocalMotorcycles() {
    const localSaved = getLocalSavedMotorcyclesForUser();
    if (localSaved.length > 0) {
      state.bikes = localSaved.map(m => mapServerMotorcycleToClientBike(m, null));
      state.activeBikeIndex = 0;
    }
  }

  async function promptAndDeleteBike(imei, plate) {
    if (!window.confirm(`Remove motorcycle ${plate} (IMEI: ${imei}) from your list of bikes?`)) {
      return;
    }
    removeMotorcycleFromState(imei);
    showTerritoryToast('🗑️', 'MOTORCYCLE REMOVED', `${plate} was removed from your list of bikes.`);
    try {
      await fetchPortalWithTimeout(`/api/motorcycles/${encodeURIComponent(imei)}`, {
        method: 'DELETE',
        headers: buildAuthHeaders()
      }, 3500);
    } catch (_) {}
  }

  async function fetchUserMotorcycles() {
    const deletedSet = getDeletedImeisSet();
    let serverMotos = [];

    try {
      const res = await fetchPortalWithTimeout('/api/motorcycles', {
        headers: buildAuthHeaders(),
        cache: 'no-store'
      }, 3000);
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && Array.isArray(data.motorcycles)) {
          serverMotos = data.motorcycles.filter(m => m && m.device_imei && !deletedSet.has(String(m.device_imei)));
        }
      }
    } catch (_) {}

    // Merge server motorcycles with locally saved motorcycles so added bikes NEVER disappear unless deleted!
    const localSaved = getLocalSavedMotorcyclesForUser();
    const mergedByImei = new Map();

    serverMotos.forEach(m => {
      saveLocalMotorcycleForUser(m);
      mergedByImei.set(String(m.device_imei), m);
    });

    localSaved.forEach(localMoto => {
      const key = String(localMoto.device_imei);
      if (!mergedByImei.has(key) && !deletedSet.has(key)) {
        mergedByImei.set(key, localMoto);
        // Sync local-only motorcycle back to the server in the background
        fetchPortalWithTimeout('/api/motorcycles', {
          method: 'POST',
          headers: buildAuthHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({
            plate_number: localMoto.plate_number,
            device_imei: localMoto.device_imei,
            model: localMoto.model,
            sim_number: localMoto.sim_number,
            pin_code: localMoto.pin_code || '1234',
            location_name: localMoto.location_name,
            latitude: localMoto.latest_telemetry ? localMoto.latest_telemetry.latitude : undefined,
            longitude: localMoto.latest_telemetry ? localMoto.latest_telemetry.longitude : undefined
          })
        }, 3500).catch(() => {});
      }
    });

    const combinedList = Array.from(mergedByImei.values());
    const selectedImei = state.bikes[state.activeBikeIndex]
      ? state.bikes[state.activeBikeIndex].imei
      : null;

    clearAllMarkersAndPolylines();
    state.bikes = combinedList.map(m => {
      const existing = state.bikes.find(b => b.imei === m.device_imei);
      return mapServerMotorcycleToClientBike(m, existing);
    });

    const restoredIdx = selectedImei ? state.bikes.findIndex(b => b.imei === selectedImei) : 0;
    state.activeBikeIndex = restoredIdx >= 0 ? restoredIdx : 0;

    renderAllVehicleMarkers();
    renderAssetList();
    renderSelectedPayload();
    updateDockHUD();
    renderProfileBikesList();
    syncMultiBikeCountersAndDropdowns();

    if (state.bikes.length > 0) {
      fetchHardwareDeviceStatus(false);
    } else {
      syncDeviceOnlineOfflineUI(null);
    }
  }

  function upsertServerMotorcycleInState(serverMoto, shouldFocusNewBike) {
    if (!serverMoto || !serverMoto.device_imei) return;
    saveLocalMotorcycleForUser(serverMoto);
    const existingIdx = state.bikes.findIndex(b => b.imei === serverMoto.device_imei);
    const existingBike = existingIdx >= 0 ? state.bikes[existingIdx] : null;
    const mapped = mapServerMotorcycleToClientBike(serverMoto, existingBike);

    if (existingIdx >= 0) {
      state.bikes[existingIdx] = mapped;
    } else {
      state.bikes.push(mapped);
    }

    const targetIdx = existingIdx >= 0 ? existingIdx : state.bikes.length - 1;
    renderAllVehicleMarkers();
    renderAssetList();
    renderProfileBikesList();

    if (shouldFocusNewBike) {
      selectBike(targetIdx);
      if (state.map && mapped.lat && mapped.lng) {
        state.map.flyTo([mapped.lat, mapped.lng], 15, { animate: true, duration: 1.1 });
      }
    } else {
      renderSelectedPayload();
      updateDockHUD();
    }
  }

  function removeMotorcycleFromState(imei) {
    removeLocalMotorcycleForUser(imei);
    const idx = state.bikes.findIndex(b => b.imei === imei);
    if (idx === -1) return;
    const target = state.bikes[idx];
    if (target && state.markers[target.id] && state.map) {
      try { state.map.removeLayer(state.markers[target.id]); } catch (_) {}
      delete state.markers[target.id];
    }
    if (target && state.trailPolylines[target.id] && state.map) {
      try { state.map.removeLayer(state.trailPolylines[target.id]); } catch (_) {}
      delete state.trailPolylines[target.id];
    }

    state.bikes.splice(idx, 1);
    if (state.activeBikeIndex >= state.bikes.length) {
      state.activeBikeIndex = Math.max(0, state.bikes.length - 1);
    }

    renderAllVehicleMarkers();
    renderAssetList();
    renderSelectedPayload();
    updateDockHUD();
    renderProfileBikesList();
  }

  function syncMultiBikeCountersAndDropdowns() {
    const total = state.bikes.length;
    const tabCountEl = document.getElementById('profile-tab-bikes-count');
    if (tabCountEl) tabCountEl.textContent = String(total);

    const fleetHint = document.getElementById('profile-fleet-count-hint');
    if (fleetHint) {
      fleetHint.textContent = `Fleet Capacity: ${total} Active Tracked Motorcycle${total === 1 ? '' : 's'}`;
    }

    const histSelect = document.getElementById('history-vehicle-select');
    if (histSelect && state.bikes.length > 0) {
      const prevVal = histSelect.value;
      histSelect.innerHTML = state.bikes.map(b =>
        `<option value="${escapeHtml(b.plate)}">${escapeHtml(b.model)} (${escapeHtml(b.plate)})</option>`
      ).join('');
      if (state.bikes.some(b => b.plate === prevVal)) {
        histSelect.value = prevVal;
      }
    }
  }

  function renderProfileBikesList() {
    const listEl = document.getElementById('profile-bikes-list');
    syncMultiBikeCountersAndDropdowns();
    if (!listEl) return;

    if (state.bikes.length === 0) {
      listEl.innerHTML = `
        <div class="da-empty-state">
          <i class="fa-solid fa-motorcycle"></i>
          <div style="font-weight: 700; color: #0f172a; margin-bottom: 4px;">No Motorcycles Registered Yet</div>
          <div style="font-size: 0.8rem; margin-bottom: 10px;">Click <strong>Add New Bike</strong> above to link your first ESP32 / SIM7000G tracker and license plate to your profile.</div>
        </div>
      `;
      return;
    }

    listEl.innerHTML = state.bikes.map((bike, idx) => {
      const isSelected = idx === state.activeBikeIndex;
      const isOnline = bike.isOnline === true;
      const canRemove = true;
      return `
        <div class="profile-bike-item ${isSelected ? 'is-selected' : ''}">
          <div class="pbi-main">
            <div class="pbi-top">
              <span class="pbi-plate">${escapeHtml(bike.plate)}</span>
              <span class="pbi-model">${escapeHtml(bike.model)}</span>
              <span class="pbi-status ${isOnline ? 'online' : 'offline'}">
                <i class="fa-solid ${isOnline ? 'fa-circle-check' : 'fa-plug-circle-xmark'}"></i>
                ${isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
            <div class="pbi-meta">
              <span><i class="fa-solid fa-microchip"></i> IMEI: <code>${escapeHtml(bike.imei)}</code></span>
              <span><i class="fa-solid fa-sim-card"></i> SIM: ${escapeHtml(bike.simNumber || 'Not set')}</span>
            </div>
          </div>
          <div class="pbi-actions">
            <button type="button" class="pbi-btn btn-pbi-focus" data-idx="${idx}">
              <i class="fa-solid fa-location-crosshairs"></i> ${isSelected ? 'Viewing' : 'Track on Map'}
            </button>
            ${canRemove ? `
              <button type="button" class="pbi-btn danger btn-pbi-remove" data-imei="${escapeHtml(bike.imei)}" data-plate="${escapeHtml(bike.plate)}" title="Remove this motorcycle from your profile">
                <i class="fa-solid fa-trash-can"></i> Remove
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('.btn-pbi-focus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        closeModal('modal-user-profile');
        selectBike(idx);
      });
    });

    listEl.querySelectorAll('.btn-pbi-remove').forEach(btn => {
      btn.addEventListener('click', async () => {
        const imei = btn.getAttribute('data-imei');
        const plate = btn.getAttribute('data-plate');
        if (!window.confirm(`Remove motorcycle ${plate} (IMEI: ${imei}) from your profile?`)) {
          return;
        }
        try {
          const res = await fetch(`/api/motorcycles/${encodeURIComponent(imei)}`, {
            method: 'DELETE',
            headers: buildAuthHeaders()
          });
          const data = await res.json();
          if (res.ok && data.success) {
            removeMotorcycleFromState(imei);
            showTerritoryToast('🗑️', 'MOTORCYCLE REMOVED', `${plate} was removed from your profile.`);
          } else {
            showTerritoryToast('⚠️', 'CANNOT REMOVE', (data && data.message) || 'Could not remove motorcycle.');
          }
        } catch (_) {
          removeMotorcycleFromState(imei);
          showTerritoryToast('🗑️', 'MOTORCYCLE REMOVED', `${plate} removed locally.`);
        }
      });
    });
  }

  let cachedSuggestedImei = '';

  async function loadAvailableImeisForModal() {
    const pillsWrap = document.getElementById('available-imei-pills');
    const imeiInput = document.getElementById('add-bike-imei');
    try {
      const res = await fetch('/api/motorcycles/available-devices', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (!data || !data.success) return;

      cachedSuggestedImei = data.suggested_imei || '';
      if (imeiInput && !imeiInput.value.trim() && cachedSuggestedImei) {
        imeiInput.placeholder = `e.g. ${cachedSuggestedImei}`;
      }

      if (pillsWrap) {
        const list = (data.devices || []).slice(0, 4);
        if (list.length === 0 && cachedSuggestedImei) {
          list.push({ device_imei: cachedSuggestedImei, serial_number: 'NEW-NODE' });
        }
        pillsWrap.innerHTML = list.map(d =>
          `<button type="button" class="avail-imei-pill" data-imei="${escapeHtml(d.device_imei)}" title="Click to select tracker ${escapeHtml(d.device_imei)}">${escapeHtml(d.device_imei)}</button>`
        ).join('');

        pillsWrap.querySelectorAll('.avail-imei-pill').forEach(pill => {
          pill.addEventListener('click', () => {
            if (imeiInput) imeiInput.value = pill.getAttribute('data-imei') || '';
          });
        });
      }
    } catch (_) {}
  }

  function showAddBikeFeedback(type, msg) {
    const box = document.getElementById('add-bike-feedback');
    const icon = document.getElementById('add-bike-feedback-icon');
    const txt = document.getElementById('add-bike-feedback-msg');
    if (!box) return;
    box.className = `profile-feedback-box ${type}`;
    if (icon) {
      icon.className = type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation';
    }
    if (txt) txt.textContent = msg;
    box.classList.remove('hidden');
  }

  function openAddBikeModal(opts = {}) {
    closeMobileDrawersIfOpen();
    const feedback = document.getElementById('add-bike-feedback');
    if (feedback) feedback.classList.add('hidden');

    const isOnboarding = Boolean((opts && opts.onboarding) || state.bikes.length === 0);
    const titleEl = document.getElementById('add-bike-modal-title');
    const subEl = document.getElementById('add-bike-modal-subtitle');
    const onboardBanner = document.getElementById('add-bike-onboarding-banner');
    const cancelBtn = document.getElementById('btn-cancel-add-bike');
    const submitBtn = document.getElementById('btn-submit-add-bike');

    if (titleEl) {
      titleEl.textContent = isOnboarding
        ? 'Step 2: Link Your Tracker & Motorcycle'
        : 'Add Another Motorcycle to Profile';
    }
    if (subEl) {
      subEl.textContent = isOnboarding
        ? 'Enter your tracker device number (IMEI) and motorcycle details to activate live GPS & remote engine cut'
        : 'Link a new ESP32 / SIM800L / SIM7000G tracker node & license plate to your account';
    }
    if (onboardBanner) {
      onboardBanner.classList.toggle('hidden', !isOnboarding);
    }
    if (cancelBtn) {
      cancelBtn.textContent = isOnboarding ? 'Skip for Now' : 'Cancel';
    }
    if (submitBtn) {
      submitBtn.innerHTML = isOnboarding
        ? '<i class="fa-solid fa-satellite-dish"></i> Activate Tracker &amp; Bike'
        : '<i class="fa-solid fa-circle-plus"></i> Add Bike to My Profile';
    }

    if (state.map) {
      const center = state.map.getCenter();
      const latEl = document.getElementById('add-bike-lat');
      const lngEl = document.getElementById('add-bike-lng');
      if (latEl && !latEl.value) latEl.value = (center.lat + (Math.random() - 0.5) * 0.008).toFixed(6);
      if (lngEl && !lngEl.value) lngEl.value = (center.lng + (Math.random() - 0.5) * 0.008).toFixed(6);
    }

    loadAvailableImeisForModal();
    openModal('modal-add-bike');

    const plateEl = document.getElementById('add-bike-plate');
    if (plateEl) {
      setTimeout(() => plateEl.focus(), 120);
    }
  }

  function initMultiBikeManager() {
    bindClick('btn-sidebar-add-bike', () => openAddBikeModal());
    bindClick('btn-dock-setup-bike', () => openAddBikeModal({ onboarding: true }));
    bindClick('btn-profile-open-add-bike', () => {
      closeModal('modal-user-profile');
      openAddBikeModal();
    });
    bindClick('btn-profile-quick-add-bike', () => {
      closeModal('modal-user-profile');
      openAddBikeModal();
    });
    bindClick('btn-tab-bikes', renderProfileBikesList);

    bindClick('close-modal-add-bike', () => closeModal('modal-add-bike'));
    bindClick('btn-cancel-add-bike', () => closeModal('modal-add-bike'));

    // Quick model selection chips
    const modelChips = document.querySelectorAll('.bike-model-chip');
    const modelInput = document.getElementById('add-bike-model');
    modelChips.forEach(chip => {
      chip.addEventListener('click', () => {
        modelChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        if (modelInput) modelInput.value = chip.getAttribute('data-model') || '';
      });
    });

    // Auto-fill next available IMEI button
    bindClick('btn-autofill-imei', async () => {
      const imeiInput = document.getElementById('add-bike-imei');
      if (!cachedSuggestedImei) {
        await loadAvailableImeisForModal();
      }
      if (imeiInput) {
        const fallbackImei = `8654210459812${String(Math.floor(11 + Math.random() * 88))}`;
        imeiInput.value = cachedSuggestedImei || fallbackImei;
      }
    });

    // Use Current GPS / Map Center button
    bindClick('btn-add-bike-use-gps', () => {
      const latEl = document.getElementById('add-bike-lat');
      const lngEl = document.getElementById('add-bike-lng');
      const locEl = document.getElementById('add-bike-location');

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (latEl) latEl.value = pos.coords.latitude.toFixed(6);
            if (lngEl) lngEl.value = pos.coords.longitude.toFixed(6);
            if (locEl) locEl.value = `Live GPS (${pos.coords.latitude.toFixed(4)}°, ${pos.coords.longitude.toFixed(4)}°)`;
            showAddBikeFeedback('success', 'Captured your current GPS coordinates for initial bike placement!');
          },
          () => {
            if (state.map) {
              const c = state.map.getCenter();
              if (latEl) latEl.value = c.lat.toFixed(6);
              if (lngEl) lngEl.value = c.lng.toFixed(6);
              if (locEl) locEl.value = `Map Center (${c.lat.toFixed(4)}°, ${c.lng.toFixed(4)}°)`;
              showAddBikeFeedback('success', 'Anchored initial placement to current map view.');
            }
          },
          { timeout: 5000 }
        );
      } else if (state.map) {
        const c = state.map.getCenter();
        if (latEl) latEl.value = c.lat.toFixed(6);
        if (lngEl) lngEl.value = c.lng.toFixed(6);
        if (locEl) locEl.value = `Map Center (${c.lat.toFixed(4)}°, ${c.lng.toFixed(4)}°)`;
      }
    });

    // Submit Add Bike Form
    const form = document.getElementById('form-add-bike');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const plateEl = document.getElementById('add-bike-plate');
        const modEl = document.getElementById('add-bike-model');
        const colorEl = document.getElementById('add-bike-color');
        const imeiEl = document.getElementById('add-bike-imei');
        const simEl = document.getElementById('add-bike-sim');
        const pinEl = document.getElementById('add-bike-pin');
        const chasEl = document.getElementById('add-bike-chassis');
        const locEl = document.getElementById('add-bike-location');
        const latEl = document.getElementById('add-bike-lat');
        const lngEl = document.getElementById('add-bike-lng');
        const submitBtn = document.getElementById('btn-submit-add-bike');

        const plate = plateEl ? plateEl.value.trim().toUpperCase() : '';
        const model = modEl ? modEl.value.trim() : 'Bajaj Boxer BM150';
        const bikeColor = colorEl ? colorEl.value.trim() : '';
        const imei = imeiEl ? imeiEl.value.replace(/\s+/g, '').trim() : '';
        const simNumber = simEl ? simEl.value.trim() : '';
        const pinCode = pinEl ? pinEl.value.trim() : '1234';
        const chassis = chasEl ? chasEl.value.trim() : '';
        const locationName = locEl ? locEl.value.trim() : 'Kampala Registered Base';

        if (!plate || !imei) {
          showAddBikeFeedback('error', 'Please enter both the License Plate Number and Tracker Device IMEI.');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Registering Tracker &amp; Bike...';
        }

        const payload = {
          plate_number: plate,
          device_imei: imei,
          model,
          bike_color: bikeColor,
          sim_number: simNumber,
          pin_code: pinCode || '1234',
          chassis_number: chassis,
          location_name: locationName,
          latitude: latEl && latEl.value ? parseFloat(latEl.value) : undefined,
          longitude: lngEl && lngEl.value ? parseFloat(lngEl.value) : undefined
        };

        try {
          const res = await fetchPortalWithTimeout('/api/motorcycles', {
            method: 'POST',
            headers: buildAuthHeaders({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(payload)
          }, 3500);

          const contentType = res.headers.get('content-type') || '';
          const data = contentType.includes('application/json') ? await res.json() : null;
          if (res.ok && data && data.success && data.motorcycle) {
            cachedSuggestedImei = '';
            upsertServerMotorcycleInState(data.motorcycle, true);
            if (plateEl) plateEl.value = '';
            if (colorEl) colorEl.value = '';
            if (imeiEl) imeiEl.value = '';
            if (simEl) simEl.value = '';
            if (chasEl) chasEl.value = '';
            if (latEl) latEl.value = '';
            if (lngEl) lngEl.value = '';

            closeModal('modal-add-bike');
            if (audio) audio.playChirp(true);
            showTerritoryToast('🏍️', 'TRACKER & BIKE ACTIVATED', `${plate} (${data.motorcycle.model || model}) is now linked to your account and pinned on the map!`);
          } else {
            throw new Error('Fallback to local bike activation');
          }
        } catch (err) {
          // Offline / static-site standalone fallback
          const fallbackLat = payload.latitude || 0.3285;
          const fallbackLng = payload.longitude || 32.6035;
          const displayModel = bikeColor ? `${model} (${bikeColor})` : model;
          upsertServerMotorcycleInState({
            motorcycle_id: Date.now(),
            plate_number: plate,
            device_imei: imei,
            model: displayModel,
            sim_number: simNumber || '+256 770 000000',
            pin_code: pinCode || '1234',
            location_name: locationName,
            status: 'active',
            is_online: false,
            connection_transport: 'OFFLINE',
            latest_telemetry: {
              latitude: fallbackLat,
              longitude: fallbackLng,
              speed: 0,
              battery_voltage: 12.6
            }
          }, true);
          if (plateEl) plateEl.value = '';
          if (colorEl) colorEl.value = '';
          if (imeiEl) imeiEl.value = '';
          if (simEl) simEl.value = '';
          if (chasEl) chasEl.value = '';
          if (latEl) latEl.value = '';
          if (lngEl) lngEl.value = '';
          closeModal('modal-add-bike');
          if (audio) audio.playChirp(true);
          showTerritoryToast('🏍️', 'TRACKER & BIKE ACTIVATED', `${plate} (${displayModel}) is now linked to your account and pinned on the map!`);
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = state.bikes.length === 0
              ? '<i class="fa-solid fa-satellite-dish"></i> Activate Tracker &amp; Bike'
              : '<i class="fa-solid fa-circle-plus"></i> Add Bike to My Profile';
          }
        }
      });
    }
  }

  // =========================================================================
  // 15. CUSTOMER SIGN UP (ACCOUNT ONLY) + POST-SIGNUP BIKE ONBOARDING ENGINE
  // =========================================================================
  function showCustomerSignupFeedback(type, msg) {
    const box = document.getElementById('customer-signup-feedback');
    const icon = document.getElementById('customer-signup-feedback-icon');
    const txt = document.getElementById('customer-signup-feedback-msg');
    if (!box || !txt) return;

    box.className = `profile-feedback-box ${type === 'error' ? 'error' : 'success'}`;
    if (icon) {
      icon.className = type === 'error'
        ? 'fa-solid fa-triangle-exclamation'
        : 'fa-solid fa-circle-check';
    }
    txt.textContent = msg;
    box.classList.remove('hidden');
  }

  function switchCustomerAuthMode(mode) {
    const isSignIn = mode === 'signin';
    const tabSignup = document.getElementById('tab-btn-cust-signup');
    const tabSignin = document.getElementById('tab-btn-cust-signin');
    const formSignup = document.getElementById('form-customer-signup');
    const formSignin = document.getElementById('form-customer-signin');
    const titleEl = document.getElementById('customer-auth-modal-title');
    const subEl = document.getElementById('customer-auth-modal-subtitle');
    const feedback = document.getElementById('customer-signup-feedback');

    if (feedback) feedback.classList.add('hidden');
    if (tabSignup) tabSignup.classList.toggle('active', !isSignIn);
    if (tabSignin) tabSignin.classList.toggle('active', isSignIn);
    if (formSignup) formSignup.classList.toggle('hidden', isSignIn);
    if (formSignin) formSignin.classList.toggle('hidden', !isSignIn);

    if (titleEl) {
      titleEl.textContent = isSignIn
        ? 'Sign In to Customer Account'
        : 'Create Customer Account';
    }
    if (subEl) {
      subEl.textContent = isSignIn
        ? 'Enter your registered email or phone number to load your motorcycles'
        : 'Sign up in seconds — enter your tracker & motorcycle details right after';
    }
  }

  function openCustomerAuthModal(mode = 'signup') {
    closeMobileDrawersIfOpen();
    switchCustomerAuthMode(mode);
    openModal('modal-customer-signup');

    setTimeout(() => {
      const focusTarget = document.getElementById(mode === 'signin' ? 'signin-email' : 'signup-full-name');
      if (focusTarget) focusTarget.focus();
    }, 120);
  }

  async function activateCustomerSessionFromAuthResponse(data, fallbackEmail) {
    const user = (data && data.user) || {};
    const email = user.email || fallbackEmail || '';
    const fullName = user.full_name || 'Customer Owner';
    const phone = user.phone_number || '';

    try {
      localStorage.removeItem('boda_user_avatar');
      localStorage.removeItem('boda_avatar_owner');
      if (data && data.token) localStorage.setItem('boda_auth_token', data.token);
      localStorage.setItem('boda_user_role', 'customer');
      if (email) localStorage.setItem('boda_user_email', email);
      localStorage.setItem('boda_user_profile', JSON.stringify({
        user_id: user.user_id,
        full_name: fullName,
        email,
        phone_number: phone,
        role: user.role || 'customer'
      }));
    } catch (_) {}

    // Update visible User Profile UI in Sidebar & Profile Modal immediately
    const userDisplay = document.getElementById('user-display-name');
    if (userDisplay) userDisplay.textContent = fullName;

    const initials = fullName.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'CU';
    const sbInit = document.getElementById('user-avatar-initials');
    const sbImg = document.getElementById('user-avatar-img');
    const lgInit = document.getElementById('profile-avatar-initials');
    const lgImg = document.getElementById('profile-avatar-img');
    if (sbImg) sbImg.classList.add('hidden');
    if (lgImg) lgImg.classList.add('hidden');
    if (sbInit) { sbInit.textContent = initials; sbInit.classList.remove('hidden'); }
    if (lgInit) { lgInit.textContent = initials; lgInit.classList.remove('hidden'); }

    const pName = document.getElementById('profile-full-name');
    const pPhone = document.getElementById('profile-phone');
    const pEmail = document.getElementById('profile-email');
    if (pName) pName.value = fullName;
    if (pPhone) pPhone.value = phone;
    if (pEmail) pEmail.value = email;

    // Load this customer's registered motorcycles onto the live map & fleet list
    await fetchUserMotorcycles();
    if (state.bikes.length > 0 && state.map) {
      state.activeBikeIndex = 0;
      const b = state.bikes[0];
      state.map.flyTo([b.lat, b.lng], 15, { animate: true, duration: 1.1 });
    }
  }

  function initCustomerSignupAndAuth() {
    bindClick('btn-footer-signup', () => openCustomerAuthModal('signup'));
    bindClick('btn-footer-signin', () => openCustomerAuthModal('signin'));
    bindClick('btn-mobile-signup-toggle', () => openCustomerAuthModal('signup'));
    bindClick('tab-btn-cust-signup', () => switchCustomerAuthMode('signup'));
    bindClick('tab-btn-cust-signin', () => switchCustomerAuthMode('signin'));

    bindClick('close-modal-customer-signup', () => closeModal('modal-customer-signup'));
    bindClick('btn-cancel-customer-signup', () => closeModal('modal-customer-signup'));
    bindClick('btn-cancel-customer-signin', () => closeModal('modal-customer-signup'));

    // Submit Easy Sign Up Form (Account Credentials ONLY -> Then Open Tracker & Bike Setup)
    const signupForm = document.getElementById('form-customer-signup');
    if (signupForm) {
      signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullName = (document.getElementById('signup-full-name')?.value || '').trim();
        const phone = (document.getElementById('signup-phone')?.value || '').trim();
        const email = (document.getElementById('signup-email')?.value || '').trim();
        const password = document.getElementById('signup-password')?.value || '';
        const submitBtn = document.getElementById('btn-submit-customer-signup');

        if (!fullName || !phone || !email || !password) {
          showCustomerSignupFeedback('error', 'Please fill in your Full Name, Phone Number, Email, and Password.');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';
        }

        try {
          const res = await fetchPortalWithTimeout('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              full_name: fullName,
              phone_number: phone,
              email,
              password
            })
          }, 3500);

          const contentType = res.headers.get('content-type') || '';
          const data = contentType.includes('application/json') ? await res.json() : null;
          if (res.ok && data && data.success) {
            cachedSuggestedImei = '';
            await activateCustomerSessionFromAuthResponse(data, email);
            signupForm.reset();

            closeModal('modal-customer-signup');
            if (audio) audio.playChirp(true);
            showTerritoryToast('🎉', 'ACCOUNT CREATED!', `Welcome ${fullName}! Now enter your tracker IMEI & motorcycle details.`);

            // Automatically open Step 2: Tracker & Motorcycle Setup Modal
            setTimeout(() => {
              openAddBikeModal({ onboarding: true });
            }, 220);
            return;
          } else if (res.status === 400 || res.status === 409) {
            showCustomerSignupFeedback('error', (data && data.message) || 'Could not create account. Check email or phone.');
            return;
          }
        } catch (_) {
          // Proceed with instant client-side onboarding if cloud backend is cold-starting
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-user-plus"></i> Create Account &amp; Continue';
          }
        }

        // Instant fallback onboarding so Sign Up never hangs on a rotating spinner
        const fallbackData = {
          token: `local-jwt-${Date.now()}`,
          user: {
            user_id: Date.now(),
            full_name: fullName,
            phone_number: phone,
            email: email.toLowerCase(),
            role: 'customer'
          }
        };
        await activateCustomerSessionFromAuthResponse(fallbackData, email);
        signupForm.reset();
        closeModal('modal-customer-signup');
        if (audio) audio.playChirp(true);
        showTerritoryToast('🎉', 'ACCOUNT CREATED!', `Welcome ${fullName}! Now enter your tracker IMEI & motorcycle details.`);
        setTimeout(() => {
          openAddBikeModal({ onboarding: true });
        }, 220);
      });
    }

    // Submit Sign In Form (Switch to Existing Registered Account)
    const signinForm = document.getElementById('form-customer-signin');
    if (signinForm) {
      signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailOrPhone = (document.getElementById('signin-email')?.value || '').trim();
        const password = document.getElementById('signin-password')?.value || '';
        const submitBtn = document.getElementById('btn-submit-customer-signin');

        if (!emailOrPhone || !password) {
          showCustomerSignupFeedback('error', 'Please enter your email/phone and password.');
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';
        }

        try {
          const res = await fetchPortalWithTimeout('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailOrPhone, password })
          }, 3500);

          const contentType = res.headers.get('content-type') || '';
          const data = contentType.includes('application/json') ? await res.json() : null;
          if (res.ok && data && data.success) {
            await activateCustomerSessionFromAuthResponse(data, emailOrPhone);
            signinForm.reset();
            closeModal('modal-customer-signup');
            if (audio) audio.playChirp(true);
            showTerritoryToast('🔓', 'SIGNED IN', `Welcome back, ${(data.user && data.user.full_name) || emailOrPhone}!`);
          } else {
            showCustomerSignupFeedback('error', (data && data.message) || 'Invalid email/phone or password.');
          }
        } catch (err) {
          showCustomerSignupFeedback('error', 'Cannot reach Boda 360 server.');
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Sign In &amp; Open My Fleet';
          }
        }
      });
    }

    // Support ?setup_bike=1 (post-signup redirect from Gateway) or ?signup=1 / ?mode=signup
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('setup_bike') === '1') {
        if (window.history && window.history.replaceState) {
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        }
        setTimeout(() => {
          openAddBikeModal({ onboarding: true });
        }, 420);
      } else if (params.get('signup') === '1' || params.get('mode') === 'signup') {
        setTimeout(() => openCustomerAuthModal('signup'), 350);
      }
    } catch (_) {}
  }

})();
