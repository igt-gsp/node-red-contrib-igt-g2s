var EMDI_Module_Factory = function () {
  var EMDI = {
    name: 'EMDI',
    defaultElementNamespaceURI: 'http:\/\/mediaDisplay.igt.com',
    defaultAttributeNamespaceURI: 'http:\/\/mediaDisplay.igt.com',
    typeInfos: [{
        localName: 'CGetCabinetStatus',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/PLC',
          localPart: 'c_getCabinetStatus'
        },
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'MdContentToContent',
        typeName: null,
        baseTypeInfo: '.CBaseClass',
        propertyInfos: [{
            name: 'getActiveContent',
            required: true,
            elementName: {
              localPart: 'getActiveContent',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
            },
            typeInfo: '.GetActiveContent'
          }, {
            name: 'activeContentList',
            required: true,
            elementName: {
              localPart: 'activeContentList',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
            },
            typeInfo: '.ActiveContentList'
          }, {
            name: 'contentMessage',
            required: true,
            elementName: {
              localPart: 'contentMessage',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
            },
            typeInfo: '.ContentMessage'
          }, {
            name: 'contentMessageAck',
            required: true,
            elementName: {
              localPart: 'contentMessageAck',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
            },
            typeInfo: '.ContentMessageAck'
          }, {
            name: 'any',
            required: true,
            mixed: false,
            type: 'anyElement'
          }]
      }, {
        localName: 'CGetMeterSub',
        typeName: 'c_getMeterSub',
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'CGetPlayerSessionData',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/PSD',
          localPart: 'c_getPlayerSessionData'
        },
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'RaiseMediaDisplay',
        typeName: null,
        baseTypeInfo: '.CRaiseMediaDisplay',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CGetSupportedMeterList',
        typeName: 'c_getSupportedMeterList',
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'MdEventHandler',
        typeName: null,
        baseTypeInfo: '.CBaseClass',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'getSupportedEventList',
            required: true,
            typeInfo: '.GetSupportedEventList'
          }, {
            name: 'supportedEventList',
            required: true,
            typeInfo: '.SupportedEventList'
          }, {
            name: 'getEventSubList',
            required: true,
            typeInfo: '.GetEventSubList'
          }, {
            name: 'setEventSub',
            required: true,
            typeInfo: '.SetEventSub'
          }, {
            name: 'clearEventSub',
            required: true,
            typeInfo: '.ClearEventSub'
          }, {
            name: 'clearEventSubAck',
            required: true,
            typeInfo: '.ClearEventSubAck'
          }, {
            name: 'eventSubList',
            required: true,
            typeInfo: '.EventSubList'
          }, {
            name: 'eventReport',
            required: true,
            typeInfo: '.EventReport'
          }, {
            name: 'eventAck',
            required: true,
            typeInfo: '.EventAck'
          }, {
            name: 'logContentEvent',
            required: true,
            typeInfo: '.LogContentEvent'
          }, {
            name: 'logContentEventAck',
            required: true,
            typeInfo: '.LogContentEventAck'
          }, {
            name: 'any',
            required: true,
            mixed: false,
            type: 'anyElement'
          }]
      }, {
        localName: 'EventReport',
        typeName: null,
        baseTypeInfo: '.CEventReport',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'HostToContentMessage',
        typeName: null,
        baseTypeInfo: '.CHostToContentMessage',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CFunctionalGroup',
        typeName: 'c_functionalGroup',
        propertyInfos: [{
            name: 'commandItem',
            minOccurs: 0,
            collection: true,
            typeInfo: '.CommandItem'
          }, {
            name: 'groupName',
            required: true,
            type: 'attribute'
          }]
      }, {
        localName: 'CContentMessageAck',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI',
          localPart: 'c_contentMessageAck'
        },
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'ClearMeterSub',
        typeName: null,
        baseTypeInfo: '.CClearMeterSub',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'SupportedEventList',
        typeName: null,
        baseTypeInfo: '.CSupportedEventList',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CCallAttendantStatus',
        typeName: 'c_callAttendantStatus',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'callAttendantActive',
            required: true,
            typeInfo: 'Boolean',
            type: 'attribute'
          }]
      }, {
        localName: 'CEventSubList',
        typeName: 'c_eventSubList',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'eventSubscription',
            minOccurs: 0,
            collection: true,
            typeInfo: '.EventSubscription'
          }]
      }, {
        localName: 'EventSubList',
        typeName: null,
        baseTypeInfo: '.CEventSubList',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'ContentMessage',
        typeName: null,
        baseTypeInfo: '.CContentMessage',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'FunctionalGroupList',
        typeName: null,
        baseTypeInfo: '.CFunctionalGroupList',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'GetSupportedMeterList',
        typeName: null,
        baseTypeInfo: '.CGetSupportedMeterList',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CCommsOnLine',
        typeName: 'c_commsOnLine',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'mdAccessToken',
            required: true,
            typeInfo: 'Long',
            type: 'attribute'
          }]
      }, {
        localName: 'CSupportedEventList.SupportedEvent',
        typeName: null,
        baseTypeInfo: '.CSupportedEvent',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'ContentToHostMessageAck',
        typeName: null,
        baseTypeInfo: '.CContentToHostMessageAck',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'SetEventSub',
        typeName: null,
        baseTypeInfo: '.CSetEventSub',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CBaseCommand',
        typeName: 'c_baseCommand'
      }, {
        localName: 'CMeterInfo',
        typeName: 'c_meterInfo',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'meterName',
            required: true,
            type: 'attribute'
          }, {
            name: 'meterType',
            required: true,
            typeInfo: '.TMeterTypes',
            type: 'attribute'
          }, {
            name: 'meterValue',
            required: true,
            typeInfo: 'Long',
            type: 'attribute'
          }]
      }, {
        localName: 'GetEventSubList',
        typeName: null,
        baseTypeInfo: '.CGetEventSubList',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CMeterReportAck',
        typeName: 'c_meterReportAck',
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'SetCardRemoved',
        typeName: null,
        baseTypeInfo: '.CSetCardRemoved',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CHeartbeakAck',
        typeName: 'c_heartbeakAck',
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'CClearEventSubAck',
        typeName: 'c_clearEventSubAck',
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'CSupportedMeterList',
        typeName: 'c_supportedMeterList',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'supportedMeter',
            minOccurs: 0,
            collection: true,
            typeInfo: '.CMeterSubscription'
          }]
      }, {
        localName: 'CCardStatus',
        typeName: 'c_cardStatus',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'cardIn',
            typeInfo: 'Boolean',
            type: 'attribute'
          }, {
            name: 'idReaderType',
            required: true,
            type: 'attribute'
          }, {
            name: 'idNumber',
            type: 'attribute'
          }, {
            name: 'idValidExpired',
            typeInfo: 'Boolean',
            type: 'attribute'
          }]
      }, {
        localName: 'CPlayerSessionDataAck',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/PSD',
          localPart: 'c_playerSessionDataAck'
        },
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'idReaderId',
            required: true,
            typeInfo: 'Int',
            attributeName: {
              localPart: 'idReaderId',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/PSD'
            },
            type: 'attribute'
          }, {
            name: 'idNumber',
            required: true,
            attributeName: {
              localPart: 'idNumber',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/PSD'
            },
            type: 'attribute'
          }, {
            name: 'startDateTime',
            required: true,
            typeInfo: 'DateTime',
            attributeName: {
              localPart: 'startDateTime',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/PSD'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CLogContentEventAck',
        typeName: 'c_logContentEventAck',
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'CallAttendantStatus',
        typeName: null,
        baseTypeInfo: '.CCallAttendantStatus',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CHeartbeat',
        typeName: 'c_heartbeat',
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'CEventReport.EventItem',
        typeName: null,
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'cabinetStatus',
            required: true,
            typeInfo: '.CabinetStatus'
          }, {
            name: 'cardStatus',
            required: true,
            typeInfo: '.CardStatus'
          }, {
            name: 'any',
            required: true,
            mixed: false,
            type: 'anyElement'
          }, {
            name: 'eventCode',
            required: true,
            type: 'attribute'
          }, {
            name: 'eventText',
            type: 'attribute'
          }]
      }, {
        localName: 'CMdMsgBase',
        typeName: 'c_mdMsgBase',
        propertyInfos: [{
            name: 'mdComms',
            required: true,
            typeInfo: '.MdComms'
          }, {
            name: 'mdEventHandler',
            required: true,
            typeInfo: '.MdEventHandler'
          }, {
            name: 'mdCabinet',
            required: true,
            typeInfo: '.MdCabinet'
          }, {
            name: 'mdMeters',
            required: true,
            typeInfo: '.MdMeters'
          }, {
            name: 'any',
            required: true,
            mixed: false,
            type: 'anyElement'
          }]
      }, {
        localName: 'HeartbeatAck',
        typeName: null,
        baseTypeInfo: '.CHeartbeakAck',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'ClearEventSubAck',
        typeName: null,
        baseTypeInfo: '.CClearEventSubAck',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CActiveContent',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI',
          localPart: 'c_activeContent'
        },
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'mediaDisplayId',
            required: true,
            typeInfo: 'Int',
            attributeName: {
              localPart: 'mediaDisplayId',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
            },
            type: 'attribute'
          }, {
            name: 'contentId',
            required: true,
            typeInfo: 'Long',
            attributeName: {
              localPart: 'contentId',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CardStatusList',
        typeName: null,
        baseTypeInfo: '.CCardStatusList',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'MeterReport',
        typeName: null,
        baseTypeInfo: '.CMeterReport',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CHostToContentMessage',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/HCI',
          localPart: 'c_hostToContentMessage'
        },
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'instructionData',
            required: true,
            elementName: {
              localPart: 'instructionData',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/HCI'
            },
            typeInfo: '.InstructionData'
          }]
      }, {
        localName: 'CCommsOnLineAck',
        typeName: 'c_commsOnLineAck',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'sessionValid',
            required: true,
            typeInfo: 'Boolean',
            type: 'attribute'
          }]
      }, {
        localName: 'CInstructionData',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/HCI',
          localPart: 'c_instructionData'
        },
        propertyInfos: [{
            name: 'value',
            typeInfo: 'Base64Binary',
            type: 'value'
          }]
      }, {
        localName: 'CSetCardRemoved',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CPC',
          localPart: 'c_setCardRemoved'
        },
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'idReaderId',
            required: true,
            typeInfo: 'Int',
            attributeName: {
              localPart: 'idReaderId',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CPC'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'GetSupportedEventList',
        typeName: null,
        baseTypeInfo: '.CGetSupportedEventList',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CSupportedEvent',
        typeName: 'c_supportedEvent',
        propertyInfos: [{
            name: 'eventCode',
            required: true,
            type: 'attribute'
          }, {
            name: 'eventText',
            type: 'attribute'
          }]
      }, {
        localName: 'CGetMeterInfo',
        typeName: 'c_getMeterInfo',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'meterSubscription',
            required: true,
            collection: true,
            typeInfo: '.CMeterSubscription'
          }]
      }, {
        localName: 'CCabinetStatus',
        typeName: 'c_cabinetStatus',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'egmState',
            required: true,
            typeInfo: '.TEgmStates',
            type: 'attribute'
          }, {
            name: 'deviceClass',
            type: 'attribute'
          }]
      }, {
        localName: 'CMeterSubList',
        typeName: 'c_meterSubList',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'meterSubscription',
            minOccurs: 0,
            collection: true,
            typeInfo: '.CMeterSubscription'
          }]
      }, {
        localName: 'GetCardStateList',
        typeName: null,
        baseTypeInfo: '.CGetCardStateList',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CHostToContentMessageAck',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/HCI',
          localPart: 'c_hostToContentMessageAck'
        },
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'GetMeterInfo',
        typeName: null,
        baseTypeInfo: '.CGetMeterInfo',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'MdMsg',
        typeName: null,
        baseTypeInfo: '.CMdMsgBase'
      }, {
        localName: 'CGetCardStateList',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/MCS',
          localPart: 'c_getCardStateList'
        },
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'MeterSubList',
        typeName: null,
        baseTypeInfo: '.CMeterSubList',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CSupportedEventList',
        typeName: 'c_supportedEventList',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'supportedEvent',
            minOccurs: 0,
            collection: true,
            typeInfo: '.CSupportedEventList.SupportedEvent'
          }]
      }, {
        localName: 'CMeterReport',
        typeName: 'c_meterReport',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'meterInfo',
            required: true,
            collection: true,
            typeInfo: '.CMeterInfo'
          }]
      }, {
        localName: 'ActiveContentList',
        typeName: null,
        baseTypeInfo: '.CActiveContentList',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CommsOnLine',
        typeName: null,
        baseTypeInfo: '.CCommsOnLine',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'FunctionalGroup',
        typeName: null,
        baseTypeInfo: '.CFunctionalGroup',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CSetCallAttendantState',
        typeName: 'c_setCallAttendantState',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'enable',
            required: true,
            typeInfo: 'Boolean',
            type: 'attribute'
          }]
      }, {
        localName: 'CClearEventSub',
        typeName: 'c_clearEventSub',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'eventSubscription',
            required: true,
            collection: true,
            typeInfo: '.EventSubscription'
          }]
      }, {
        localName: 'MdComms',
        typeName: null,
        baseTypeInfo: '.CBaseClass',
        propertyInfos: [{
            name: 'commsOnLine',
            required: true,
            typeInfo: '.CommsOnLine'
          }, {
            name: 'commsOnLineAck',
            required: true,
            typeInfo: '.CommsOnLineAck'
          }, {
            name: 'heartbeat',
            required: true,
            typeInfo: '.Heartbeat'
          }, {
            name: 'heartbeatAck',
            required: true,
            typeInfo: '.HeartbeatAck'
          }, {
            name: 'getFunctionalGroups',
            required: true,
            typeInfo: '.GetFunctionalGroups'
          }, {
            name: 'functionalGroupList',
            required: true,
            typeInfo: '.FunctionalGroupList'
          }, {
            name: 'any',
            required: true,
            mixed: false,
            type: 'anyElement'
          }]
      }, {
        localName: 'RecallLog',
        typeName: null,
        baseTypeInfo: '.CRecallLog',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CSetEventSub',
        typeName: 'c_setEventSub',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'eventSubscription',
            required: true,
            collection: true,
            typeInfo: '.EventSubscription'
          }]
      }, {
        localName: 'ClearEventSub',
        typeName: null,
        baseTypeInfo: '.CClearEventSub',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CSetDeviceVisibleState',
        typeName: 'c_setDeviceVisibleState',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'deviceVisibleState',
            typeInfo: 'Boolean',
            type: 'attribute'
          }]
      }, {
        localName: 'CRecallLog',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL',
          localPart: 'c_recallLog'
        },
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'themeId',
            required: true,
            attributeName: {
              localPart: 'themeId',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL'
            },
            type: 'attribute'
          }, {
            name: 'paytableId',
            required: true,
            attributeName: {
              localPart: 'paytableId',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL'
            },
            type: 'attribute'
          }, {
            name: 'denomId',
            required: true,
            typeInfo: 'Long',
            attributeName: {
              localPart: 'denomId',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL'
            },
            type: 'attribute'
          }, {
            name: 'gameDateTime',
            required: true,
            typeInfo: 'DateTime',
            attributeName: {
              localPart: 'gameDateTime',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL'
            },
            type: 'attribute'
          }, {
            name: 'playResult',
            required: true,
            typeInfo: '.TPlayResults',
            attributeName: {
              localPart: 'playResult',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL'
            },
            type: 'attribute'
          }, {
            name: 'initialWager',
            required: true,
            typeInfo: 'Long',
            attributeName: {
              localPart: 'initialWager',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL'
            },
            type: 'attribute'
          }, {
            name: 'finalWager',
            required: true,
            typeInfo: 'Long',
            attributeName: {
              localPart: 'finalWager',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL'
            },
            type: 'attribute'
          }, {
            name: 'initialWin',
            required: true,
            typeInfo: 'Long',
            attributeName: {
              localPart: 'initialWin',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL'
            },
            type: 'attribute'
          }, {
            name: 'secondaryPlayed',
            typeInfo: 'Long',
            attributeName: {
              localPart: 'secondaryPlayed',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL'
            },
            type: 'attribute'
          }, {
            name: 'secondaryWager',
            typeInfo: 'Long',
            attributeName: {
              localPart: 'secondaryWager',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL'
            },
            type: 'attribute'
          }, {
            name: 'secondaryWin',
            typeInfo: 'Long',
            attributeName: {
              localPart: 'secondaryWin',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL'
            },
            type: 'attribute'
          }, {
            name: 'finalWin',
            required: true,
            typeInfo: 'Long',
            attributeName: {
              localPart: 'finalWin',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'InstructionData',
        typeName: null,
        baseTypeInfo: '.CInstructionData',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CFunctionalGroupList',
        typeName: 'c_functionalGroupList',
        propertyInfos: [{
            name: 'functionalGroup',
            minOccurs: 0,
            collection: true,
            typeInfo: '.FunctionalGroup'
          }]
      }, {
        localName: 'CGetFunctionalGroup',
        typeName: 'c_getFunctionalGroup',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'includeCommands',
            typeInfo: 'Boolean',
            type: 'attribute'
          }]
      }, {
        localName: 'SetCallAttendantState',
        typeName: null,
        baseTypeInfo: '.CSetCallAttendantState',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'MdMeters',
        typeName: null,
        baseTypeInfo: '.CBaseClass',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'clearMeterSub',
            required: true,
            typeInfo: '.ClearMeterSub'
          }, {
            name: 'getMeterSub',
            required: true,
            typeInfo: '.GetMeterSub'
          }, {
            name: 'getSupportedMeterList',
            required: true,
            typeInfo: '.GetSupportedMeterList'
          }, {
            name: 'supportedMeterList',
            required: true,
            typeInfo: '.SupportedMeterList'
          }, {
            name: 'meterReport',
            required: true,
            typeInfo: '.MeterReport'
          }, {
            name: 'meterReportAck',
            required: true,
            typeInfo: '.MeterReportAck'
          }, {
            name: 'meterSubList',
            required: true,
            typeInfo: '.MeterSubList'
          }, {
            name: 'setMeterSub',
            required: true,
            typeInfo: '.SetMeterSub'
          }, {
            name: 'getMeterInfo',
            required: true,
            typeInfo: '.GetMeterInfo'
          }, {
            name: 'any',
            required: true,
            mixed: false,
            type: 'anyElement'
          }]
      }, {
        localName: 'CEventAck',
        typeName: 'c_eventAck',
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'GetActiveContent',
        typeName: null,
        baseTypeInfo: '.CGetActiveContent',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CommsOnLineAck',
        typeName: null,
        baseTypeInfo: '.CCommsOnLineAck',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'LogContentEvent',
        typeName: null,
        baseTypeInfo: '.CLogContentEvent',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CMeterSubscription',
        typeName: 'c_meterSubscription',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'meterName',
            required: true,
            type: 'attribute'
          }, {
            name: 'meterType',
            required: true,
            typeInfo: '.TMeterTypes',
            type: 'attribute'
          }]
      }, {
        localName: 'Heartbeat',
        typeName: null,
        baseTypeInfo: '.CHeartbeat',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CContentMessage',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI',
          localPart: 'c_contentMessage'
        },
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'contentData',
            required: true,
            elementName: {
              localPart: 'contentData',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
            },
            typeInfo: '.ContentData'
          }, {
            name: 'mediaDisplayId',
            required: true,
            typeInfo: 'Int',
            attributeName: {
              localPart: 'mediaDisplayId',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
            },
            type: 'attribute'
          }, {
            name: 'contentId',
            required: true,
            typeInfo: 'Long',
            attributeName: {
              localPart: 'contentId',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MeterReportAck',
        typeName: null,
        baseTypeInfo: '.CMeterReportAck',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'DeviceVisibleStatus',
        typeName: null,
        baseTypeInfo: '.CDeviceVisibleStatus',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'modalDisplay',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'modalDisplay',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RMD'
            },
            type: 'attribute'
          }, {
            name: 'topMostWindow',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'topMostWindow',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RMD'
            },
            type: 'attribute'
          }, {
            name: 'gamePlaySuspended',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'gamePlaySuspended',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RMD'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'MdCabinet',
        typeName: null,
        baseTypeInfo: '.CBaseClass',
        propertyInfos: [{
            name: 'setCallAttendantState',
            required: true,
            typeInfo: '.SetCallAttendantState'
          }, {
            name: 'getCallAttendantState',
            required: true,
            typeInfo: '.GetCallAttendantState'
          }, {
            name: 'callAttendantStatus',
            required: true,
            typeInfo: '.CallAttendantStatus'
          }, {
            name: 'getDeviceVisibleState',
            required: true,
            typeInfo: '.GetDeviceVisibleState'
          }, {
            name: 'setDeviceVisibleState',
            required: true,
            typeInfo: '.SetDeviceVisibleState'
          }, {
            name: 'deviceVisibleStatus',
            required: true,
            typeInfo: '.DeviceVisibleStatus'
          }, {
            name: 'getCardState',
            required: true,
            typeInfo: '.GetCardState'
          }, {
            name: 'cardStatus',
            required: true,
            typeInfo: '.CardStatus'
          }, {
            name: 'cabinetStatus',
            required: true,
            typeInfo: '.CabinetStatus'
          }, {
            name: 'any',
            required: true,
            mixed: false,
            type: 'anyElement'
          }]
      }, {
        localName: 'ContentMessageAck',
        typeName: null,
        baseTypeInfo: '.CContentMessageAck',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'GetCardState',
        typeName: null,
        baseTypeInfo: '.CGetCardState',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'GetMeterSub',
        typeName: null,
        baseTypeInfo: '.CGetMeterSub',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CContentData',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI',
          localPart: 'c_contentData'
        },
        propertyInfos: [{
            name: 'value',
            typeInfo: 'Base64Binary',
            type: 'value'
          }]
      }, {
        localName: 'GetFunctionalGroups',
        typeName: null,
        baseTypeInfo: '.CGetFunctionalGroup',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CSetMeterSub',
        typeName: 'c_setMeterSub',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'meterSubscription',
            required: true,
            collection: true,
            typeInfo: '.CMeterSubscription'
          }]
      }, {
        localName: 'CGetDeviceVisibleState',
        typeName: 'c_getDeviceVisibleState',
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'CardStatus',
        typeName: null,
        baseTypeInfo: '.CCardStatus',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'idReaderId',
            typeInfo: 'Int',
            attributeName: {
              localPart: 'idReaderId',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CPC'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CabinetStatus',
        typeName: null,
        baseTypeInfo: '.CCabinetStatus',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'comboSelected',
            attributeName: {
              localPart: 'comboSelected',
              namespaceURI: 'http:\/\/mediaDisplay.igt.com\/GCS'
            },
            type: 'attribute'
          }, {
            name: 'selGamePlayId',
            typeInfo: 'Int',
            attributeName: {
              localPart: 'selGamePlayId',
              namespaceURI: 'http:\/\/mediaDisplay.igt.com\/GCS'
            },
            type: 'attribute'
          }, {
            name: 'selThemeId',
            attributeName: {
              localPart: 'selThemeId',
              namespaceURI: 'http:\/\/mediaDisplay.igt.com\/GCS'
            },
            type: 'attribute'
          }, {
            name: 'selPaytableId',
            attributeName: {
              localPart: 'selPaytableId',
              namespaceURI: 'http:\/\/mediaDisplay.igt.com\/GCS'
            },
            type: 'attribute'
          }, {
            name: 'selDenomId',
            typeInfo: 'Long',
            attributeName: {
              localPart: 'selDenomId',
              namespaceURI: 'http:\/\/mediaDisplay.igt.com\/GCS'
            },
            type: 'attribute'
          }, {
            name: 'localeId',
            attributeName: {
              localPart: 'localeId',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/PLC'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CGetSupportedEventList',
        typeName: 'c_getSupportedEventList',
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'EventAck',
        typeName: null,
        baseTypeInfo: '.CEventAck',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CGetCardState',
        typeName: 'c_getCardState',
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'CContentToHostMessageAck',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/HCI',
          localPart: 'c_contentToHostMessageAck'
        },
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'CBaseClass',
        typeName: 'c_baseClass',
        propertyInfos: [{
            name: 'cmdType',
            required: true,
            typeInfo: '.TCmdType',
            type: 'attribute'
          }, {
            name: 'sessionId',
            required: true,
            typeInfo: 'Long',
            type: 'attribute'
          }, {
            name: 'errorCode',
            typeInfo: 'Long',
            type: 'attribute'
          }]
      }, {
        localName: 'ContentData',
        typeName: null,
        baseTypeInfo: '.CContentData',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CEventSubscription',
        typeName: 'c_eventSubscription',
        propertyInfos: [{
            name: 'eventCode',
            required: true,
            type: 'attribute'
          }]
      }, {
        localName: 'ActiveContent',
        typeName: null,
        baseTypeInfo: '.CActiveContent',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'SetMeterSub',
        typeName: null,
        baseTypeInfo: '.CSetMeterSub',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'SetDeviceVisibleState',
        typeName: null,
        baseTypeInfo: '.CSetDeviceVisibleState',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }, {
            name: 'displayCondition',
            attributeName: {
              localPart: 'displayCondition',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RMD'
            },
            type: 'attribute'
          }, {
            name: 'modalWindow',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'modalWindow',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RMD'
            },
            type: 'attribute'
          }, {
            name: 'modalTimeout',
            typeInfo: 'Int',
            attributeName: {
              localPart: 'modalTimeout',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RMD'
            },
            type: 'attribute'
          }, {
            name: 'suspendGamePlay',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'suspendGamePlay',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RMD'
            },
            type: 'attribute'
          }, {
            name: 'suspendTimeout',
            typeInfo: 'Int',
            attributeName: {
              localPart: 'suspendTimeout',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RMD'
            },
            type: 'attribute'
          }, {
            name: 'autoHideOnPlay',
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'autoHideOnPlay',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RMD'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CCommandItem',
        typeName: 'c_commandItem',
        propertyInfos: [{
            name: 'commandName',
            required: true,
            type: 'attribute'
          }]
      }, {
        localName: 'HostToContentMessageAck',
        typeName: null,
        baseTypeInfo: '.CHostToContentMessageAck',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CGetCallAttendantState',
        typeName: 'c_getCallAttendantState',
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'CommandItem',
        typeName: null,
        baseTypeInfo: '.CCommandItem',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CGetActiveContent',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI',
          localPart: 'c_getActiveContent'
        },
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'GetCallAttendantState',
        typeName: null,
        baseTypeInfo: '.CGetCallAttendantState',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'GetCabinetStatus',
        typeName: null,
        baseTypeInfo: '.CGetCabinetStatus',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CDeviceVisibleStatus',
        typeName: 'c_deviceVisibleStatus',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'deviceVisibleState',
            typeInfo: 'Boolean',
            type: 'attribute'
          }]
      }, {
        localName: 'CActiveContentList',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI',
          localPart: 'c_activeContentList'
        },
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'activeContent',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'activeContent',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
            },
            typeInfo: '.ActiveContent'
          }]
      }, {
        localName: 'CContentToHostMessage',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/HCI',
          localPart: 'c_contentToHostMessage'
        },
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'instructionData',
            required: true,
            elementName: {
              localPart: 'instructionData',
              namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/HCI'
            },
            typeInfo: '.InstructionData'
          }]
      }, {
        localName: 'GetPlayerSessionData',
        typeName: null,
        baseTypeInfo: '.CGetPlayerSessionData',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CCardStatusList',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/MCS',
          localPart: 'c_cardStatusList'
        },
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'cardStatus',
            minOccurs: 0,
            collection: true,
            typeInfo: '.CardStatus'
          }]
      }, {
        localName: 'SupportedMeterList',
        typeName: null,
        baseTypeInfo: '.CSupportedMeterList',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'PlayerSessionDataAck',
        typeName: null,
        baseTypeInfo: '.CPlayerSessionDataAck',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CEventReport',
        typeName: 'c_eventReport',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'eventItem',
            required: true,
            collection: true,
            typeInfo: '.CEventReport.EventItem'
          }]
      }, {
        localName: 'CClearMeterSub',
        typeName: 'c_clearMeterSub',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'meterSubscription',
            required: true,
            collection: true,
            typeInfo: '.CMeterSubscription'
          }]
      }, {
        localName: 'EventSubscription',
        typeName: null,
        baseTypeInfo: '.CEventSubscription',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CLogContentEvent',
        typeName: 'c_logContentEvent',
        baseTypeInfo: '.CBaseCommand',
        propertyInfos: [{
            name: 'contentName',
            required: true,
            type: 'attribute'
          }, {
            name: 'eventName',
            required: true,
            type: 'attribute'
          }, {
            name: 'eventDescription',
            type: 'attribute'
          }]
      }, {
        localName: 'ContentToHostMessage',
        typeName: null,
        baseTypeInfo: '.CContentToHostMessage',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'GetDeviceVisibleState',
        typeName: null,
        baseTypeInfo: '.CGetDeviceVisibleState',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        localName: 'CRaiseMediaDisplay',
        typeName: {
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RMD',
          localPart: 'c_raiseMediaDisplay'
        },
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'CGetEventSubList',
        typeName: 'c_getEventSubList',
        baseTypeInfo: '.CBaseCommand'
      }, {
        localName: 'LogContentEventAck',
        typeName: null,
        baseTypeInfo: '.CLogContentEventAck',
        propertyInfos: [{
            name: 'otherAttributes',
            type: 'anyAttribute'
          }]
      }, {
        type: 'enumInfo',
        localName: 'TCmdType',
        values: ['request', 'response']
      }, {
        type: 'enumInfo',
        localName: 'TMeterTypes',
        values: ['IGT_count', 'IGT_amount', 'IGT_percent']
      }, {
        type: 'enumInfo',
        localName: 'TIdReaderTypesBase',
        values: ['G2S_magCard', 'G2S_proxCard', 'G2S_fingerScan', 'G2S_retinaScan', 'G2S_smartCard', 'G2S_barCode', 'G2S_keyPad', 'G2S_hollerith', 'G2S_none']
      }, {
        type: 'enumInfo',
        localName: 'TComboSelectedBase',
        values: ['G2S_notSupported', 'G2S_byPlayer', 'G2S_byEGM']
      }, {
        type: 'enumInfo',
        localName: 'TPlayResults',
        values: ['G2S_noResult', 'G2S_gameFailed', 'G2S_gameLost', 'G2S_gameTied', 'G2S_gameWon']
      }, {
        type: 'enumInfo',
        localName: 'TEgmStates',
        values: ['G2S_transportDisabled', 'G2S_operatorDisabled', 'G2S_hostDisabled', 'G2S_egmDisabled', 'G2S_enabled', 'G2S_operatorMode', 'G2S_demoMode', 'G2S_auditMode', 'G2S_operatorLocked', 'G2S_egmLocked', 'G2S_hostLocked']
      }, {
        type: 'enumInfo',
        localName: 'TGroupNameBase',
        values: ['IGT_Comms', 'IGT_Cabinet', 'IGT_EventHandler', 'IGT_Meters']
      }, {
        type: 'enumInfo',
        localName: 'TGroupNameExtCCI',
        values: ['G2S_ContentToContent']
      }, {
        type: 'enumInfo',
        localName: 'TDisplayConditionsBase',
        values: ['G2S_gameEnded', 'G2S_gameIdle']
      }],
    elementInfos: [{
        typeInfo: '.CommsOnLine',
        elementName: 'commsOnLine'
      }, {
        typeInfo: '.ClearMeterSub',
        elementName: 'clearMeterSub'
      }, {
        typeInfo: '.MeterReportAck',
        elementName: 'meterReportAck'
      }, {
        typeInfo: '.HostToContentMessage',
        elementName: {
          localPart: 'hostToContentMessage',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/HCI'
        }
      }, {
        typeInfo: '.MeterReport',
        elementName: 'meterReport'
      }, {
        typeInfo: '.PlayerSessionDataAck',
        elementName: {
          localPart: 'playerSessionDataAck',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/PSD'
        }
      }, {
        typeInfo: '.FunctionalGroupList',
        elementName: 'functionalGroupList'
      }, {
        typeInfo: '.SetMeterSub',
        elementName: 'setMeterSub'
      }, {
        typeInfo: '.EventSubList',
        elementName: 'eventSubList'
      }, {
        typeInfo: '.ContentToHostMessage',
        elementName: {
          localPart: 'contentToHostMessage',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/HCI'
        }
      }, {
        typeInfo: '.FunctionalGroup',
        elementName: 'functionalGroup'
      }, {
        typeInfo: '.RecallLog',
        elementName: {
          localPart: 'recallLog',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RCL'
        }
      }, {
        typeInfo: '.EventSubscription',
        elementName: 'eventSubscription'
      }, {
        typeInfo: '.LogContentEvent',
        elementName: 'logContentEvent'
      }, {
        typeInfo: '.GetCallAttendantState',
        elementName: 'getCallAttendantState'
      }, {
        typeInfo: '.SetCardRemoved',
        elementName: {
          localPart: 'setCardRemoved',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CPC'
        }
      }, {
        typeInfo: '.GetPlayerSessionData',
        elementName: {
          localPart: 'getPlayerSessionData',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/PSD'
        }
      }, {
        typeInfo: '.GetEventSubList',
        elementName: 'getEventSubList'
      }, {
        typeInfo: '.EventAck',
        elementName: 'eventAck'
      }, {
        typeInfo: '.ClearEventSubAck',
        elementName: 'clearEventSubAck'
      }, {
        typeInfo: '.CallAttendantStatus',
        elementName: 'callAttendantStatus'
      }, {
        typeInfo: '.HeartbeatAck',
        elementName: 'heartbeatAck'
      }, {
        typeInfo: '.MdContentToContent',
        elementName: {
          localPart: 'mdContentToContent',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
        }
      }, {
        typeInfo: '.CommsOnLineAck',
        elementName: 'commsOnLineAck'
      }, {
        typeInfo: '.ContentMessageAck',
        elementName: {
          localPart: 'contentMessageAck',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
        }
      }, {
        typeInfo: '.GetSupportedEventList',
        elementName: 'getSupportedEventList'
      }, {
        typeInfo: '.RaiseMediaDisplay',
        elementName: {
          localPart: 'raiseMediaDisplay',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/RMD'
        }
      }, {
        typeInfo: '.SupportedEventList',
        elementName: 'supportedEventList'
      }, {
        typeInfo: '.CMeterSubscription',
        elementName: 'supportedMeter'
      }, {
        typeInfo: '.GetCardState',
        elementName: 'getCardState'
      }, {
        typeInfo: '.SetEventSub',
        elementName: 'setEventSub'
      }, {
        typeInfo: '.MdMsg',
        elementName: 'mdMsg'
      }, {
        typeInfo: '.CommandItem',
        elementName: 'commandItem'
      }, {
        typeInfo: '.GetMeterInfo',
        elementName: 'getMeterInfo'
      }, {
        typeInfo: '.GetSupportedMeterList',
        elementName: 'getSupportedMeterList'
      }, {
        typeInfo: '.GetActiveContent',
        elementName: {
          localPart: 'getActiveContent',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
        }
      }, {
        typeInfo: '.MdEventHandler',
        elementName: 'mdEventHandler'
      }, {
        typeInfo: '.InstructionData',
        elementName: {
          localPart: 'instructionData',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/HCI'
        }
      }, {
        typeInfo: '.ContentData',
        elementName: {
          localPart: 'contentData',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
        }
      }, {
        typeInfo: '.Heartbeat',
        elementName: 'heartbeat'
      }, {
        typeInfo: '.HostToContentMessageAck',
        elementName: {
          localPart: 'hostToContentMessageAck',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/HCI'
        }
      }, {
        typeInfo: '.CardStatus',
        elementName: 'cardStatus'
      }, {
        typeInfo: '.ClearEventSub',
        elementName: 'clearEventSub'
      }, {
        typeInfo: '.GetFunctionalGroups',
        elementName: 'getFunctionalGroups'
      }, {
        typeInfo: '.CardStatusList',
        elementName: {
          localPart: 'cardStatusList',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/MCS'
        }
      }, {
        typeInfo: '.DeviceVisibleStatus',
        elementName: 'deviceVisibleStatus'
      }, {
        typeInfo: '.GetMeterSub',
        elementName: 'getMeterSub'
      }, {
        typeInfo: '.ActiveContentList',
        elementName: {
          localPart: 'activeContentList',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
        }
      }, {
        typeInfo: '.MdMeters',
        elementName: 'mdMeters'
      }, {
        typeInfo: '.MeterSubList',
        elementName: 'meterSubList'
      }, {
        typeInfo: '.EventReport',
        elementName: 'eventReport'
      }, {
        typeInfo: '.MdCabinet',
        elementName: 'mdCabinet'
      }, {
        typeInfo: '.GetCardStateList',
        elementName: {
          localPart: 'getCardStateList',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/MCS'
        }
      }, {
        typeInfo: '.CabinetStatus',
        elementName: 'cabinetStatus'
      }, {
        typeInfo: '.ContentMessage',
        elementName: {
          localPart: 'contentMessage',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
        }
      }, {
        typeInfo: '.ContentToHostMessageAck',
        elementName: {
          localPart: 'contentToHostMessageAck',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/HCI'
        }
      }, {
        typeInfo: '.ActiveContent',
        elementName: {
          localPart: 'activeContent',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/CCI'
        }
      }, {
        typeInfo: '.GetDeviceVisibleState',
        elementName: 'getDeviceVisibleState'
      }, {
        typeInfo: '.SetCallAttendantState',
        elementName: 'setCallAttendantState'
      }, {
        typeInfo: '.GetCabinetStatus',
        elementName: {
          localPart: 'getCabinetStatus',
          namespaceURI: 'http:\/\/www.gamingstandards.com\/emdi\/schemas\/v1b\/PLC'
        }
      }, {
        typeInfo: '.MdComms',
        elementName: 'mdComms'
      }, {
        typeInfo: '.CMeterSubscription',
        elementName: 'meterSubscription'
      }, {
        typeInfo: '.LogContentEventAck',
        elementName: 'logContentEventAck'
      }, {
        typeInfo: '.CMeterInfo',
        elementName: 'meterInfo'
      }, {
        typeInfo: '.SetDeviceVisibleState',
        elementName: 'setDeviceVisibleState'
      }, {
        typeInfo: '.SupportedMeterList',
        elementName: 'supportedMeterList'
      }]
  };
  return {
    EMDI: EMDI
  };
};
if (typeof define === 'function' && define.amd) {
  define([], EMDI_Module_Factory);
}
else {
  var EMDI_Module = EMDI_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.EMDI = EMDI_Module.EMDI;
  }
  else {
    var EMDI = EMDI_Module.EMDI;
  }
}