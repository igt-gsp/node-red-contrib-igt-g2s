module.exports = function(RED) {
	var events = require('events').EventEmitter;

	function create_UUID(){
		var dt = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (dt + Math.random()*16)%16 | 0;
			dt = Math.floor(dt/16);
			return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	}

	function merge_json(data, payload){
		for (const key of Object.keys(payload)) {
			if (!(key in data)) {
				if(typeof(payload[key]) == 'object' && (key != 'data' && key != 'result')) // data is from results, we don't want to keep merging this in
					data[key] = JSON.parse(JSON.stringify(payload[key]));
				else if(key != 'data' && key != 'result')
					data[key] = payload[key];
			}
		}
		
		return data;
	}

	function map_replacer(key, value) {
	  if(value instanceof Map) {
		return {
		  dataType: 'Map',
		  value: Array.from(value.entries()), // or with spread: value: [...value]
		};
	  } else {
		return value;
	  }
	}
	function map_reviver(key, value) {
	  if(typeof value === 'object' && value !== null) {
		if (value.dataType === 'Map') {
		  return new Map(value.value);
		}
	  }
	  return value;
	}

	// Data mergers are when the user is able to put a g2s dfata node in the flow to prime the flow
	// with a specific set of data. Example if the flow represents a game play cycle, or a loop of games, 
	// priming the flow with the game itself saves the user from filling that info out on every game play
	// nodes in the flow.
	// Merging only merges data in the g2s_data at the msg layer if there isn't a value set in the payload itself. 
	// The payload is how you set a specific value.
	var data_merge_map = new Map();

	function merge_game_info(msg_data, g2s_data, node){
		// let game_info_data = msg_data.get("game_info");
		// if(game_info_data !== undefined){
			// let merged_data = JSON.parse(JSON.stringify(g2s_data));			
			// merged_data.game_info = {...game_info_data.game_info};
			// return merged_data;
		// }
		
		let game_info_data = msg_data.get("game_info");
		if(game_info_data !== undefined){
			let merged_data = JSON.parse(JSON.stringify(g2s_data));	
			for (const key of Object.keys(game_info_data)) {
				if (!(key in merged_data.game_info)) {
					merged_data.game_info[key] = game_info_data[key];
				}
			}

			return merged_data;
		}
		
		return g2s_data;
	}

	function merge_bonus_info(msg_data, g2s_data, node){
		let bonus_info_data = msg_data.get("bonus_award_info");
		if(bonus_info_data !== undefined){
			let merged_data = JSON.parse(JSON.stringify(g2s_data));	
			for (const key of Object.keys(bonus_info_data)) {
				if (!(key in merged_data.bonus_award_info)) {
					merged_data.bonus_award_info[key] = bonus_info_data[key];
				}
			}

			return merged_data;
		}
		
		return g2s_data;
	}
	
	function merge_mystery_info(msg_data, g2s_data, node){
		let mystery_info_data = msg_data.get("mystery_award_info");
		if(mystery_info_data !== undefined){
			let merged_data = JSON.parse(JSON.stringify(g2s_data));
			for (const key of Object.keys(mystery_info_data)) {
				if (!(key in merged_data.mystery_award_info)) {
					merged_data.mystery_award_info[key] = mystery_info_data[key];
				}
			}

			return merged_data;
		}
		
		return g2s_data;
	}

	function merge_note_acceptor_stack_info(msg_data, g2s_data, node){
		let egm_tx_id_val = msg_data.get("egm_tx_id");
		if(egm_tx_id_val !== undefined){
			let merged_data = JSON.parse(JSON.stringify(g2s_data));
			if(merged_data.egm_tx_id === undefined || merged_data.egm_tx_id == -1)
				merged_data.egm_tx_id = egm_tx_id_val;

			return merged_data;
		}
		
		return g2s_data;
	}

	function merge_voucher_issued_info(msg_data, g2s_data, node){
		let merged_data = undefined;
		node.log("*********merge_voucher_issued_info**********");
		node.log("Action Data:" + JSON.stringify(g2s_data));
		// see if there is known validation info
		let voucher_info_data = msg_data.get("validation");		
		if(voucher_info_data !== undefined){
			merged_data = JSON.parse(JSON.stringify(g2s_data));
			
			if(merged_data.validation.id === undefined || merged_data.validation.id == "")
				merged_data.validation = {};
			else
				node.log("Found Voucher val in g2s_map");
			
			for (const key of Object.keys(voucher_info_data)) {
				node.log("Found '" + key + "' in val object");
				if (!(key in merged_data.validation)) {
					merged_data.validation[key] = JSON.parse(JSON.stringify(voucher_info_data[key]));
				}
			}
		}
		else
			node.log("Found Voucher val in msg");
		node.log("Voucher Val:" + JSON.stringify(voucher_info_data));
		node.log("Merged:" + JSON.stringify(merged_data));

		// see if there is cash information (how much is being issued)
		let amount_info_data = msg_data.get("amounts");		
		if(amount_info_data === undefined){			
			amount_info_data = msg_data.get("requested_amts");
			if(amount_info_data !== undefined)
				node.log("Found requested_amts in g2s map");
			else
				node.log("Did not find any amounts in g2s map");
		}
		else
			node.log("Found amounts in msg");
		
		node.log("Amounts:" + JSON.stringify(amount_info_data));

		if(amount_info_data !== undefined){
			if(merged_data === undefined)
				merged_data = JSON.parse(JSON.stringify(g2s_data));
			
			if(merged_data.amounts == undefined || (merged_data.amounts.cash == 0 && merged_data.amounts.promo == 0 && merged_data.amounts.non_cash == 0))
				merged_data.amounts = {}
			
			node.log("Merged:" + JSON.stringify(merged_data));

			for (const key of Object.keys(amount_info_data)) {
				if (!(key in merged_data.amounts)) {
					merged_data.amounts[key] = JSON.parse(JSON.stringify(amount_info_data[key]));
				}
			}
		}		
		
		let seq_num = 0;		
		if(g2s_data.sequence_num == undefined || g2s_data.sequence_num == -1){
			let context_data = node.context().global;
			seq_num = context_data.get("voucher_sequence_num")||0;				
			seq_num = seq_num + 1;
			if(seq_num > 9999)
				seq_num = 1;
			context_data.set("voucher_sequence_num", seq_num);			
		}
		
		let g2s_tx_id_val = msg_data.get("g2s_tx_id");
		if(g2s_tx_id_val !== undefined){			
			if(merged_data.src_ref_id === undefined || merged_data.src_ref_id == -1 || merged_data.src_ref_id == 0)
				merged_data.src_ref_id = Number(g2s_tx_id_val);
		}
		node.log("Merged:" + JSON.stringify(merged_data));

		if(merged_data !== undefined){
			if(seq_num > 0)
				merged_data.sequence_num = seq_num;
			return merged_data;
		}
		
		if(seq_num < 0)
			g2s_data.sequence_num = seq_num;
		
		return g2s_data;
	}
	
	function merge_voucher_inserted_info(msg_data, g2s_data, node){
		let merged_data = undefined;
		
		// see if there is known validation info
		let voucher_info_data = msg_data.get("validation");
		if(voucher_info_data !== undefined){
			merged_data = JSON.parse(JSON.stringify(g2s_data));
			
			if(merged_data.validation === undefined)
				merged_data.validation = {};
			
			for (const key of Object.keys(voucher_info_data)) {
				if (!(key in merged_data.validation)) {
					merged_data.validation[key] = JSON.parse(JSON.stringify(voucher_info_data[key]));
				}
			}
			
			return merged_data;
		}
		
		return g2s_data;
	}

	function merge_voucher_stack_info(msg_data, g2s_data, node){
		let egm_tx_id_val = msg_data.get("egm_tx_id");
		if(egm_tx_id_val !== undefined){
			let merged_data = JSON.parse(JSON.stringify(g2s_data));
			if(merged_data.egm_tx_id === undefined || merged_data.egm_tx_id == -1 || merged_data.g2s_tx_id == 0)
				merged_data.egm_tx_id = egm_tx_id_val;

			return merged_data;
		}
		
		return g2s_data;
	}

	function merge_print_result_info(msg_data, g2s_data, node){
		let g2s_tx_id_val = msg_data.get("g2s_tx_id");
		if(g2s_tx_id_val !== undefined){
			let merged_data = JSON.parse(JSON.stringify(g2s_data));
			if(merged_data.g2s_tx_id === undefined || merged_data.g2s_tx_id == -1 || merged_data.g2s_tx_id == 0)
				merged_data.g2s_tx_id = Number(g2s_tx_id_val);

			return merged_data;
		}
		
		return g2s_data;
	}
	
	function merge_handpay_keyoff_info(msg_data, g2s_data, node){
		let req_amts = msg_data.get("requested_amts");
		if(req_amts !== undefined){
			let merged_data = JSON.parse(JSON.stringify(g2s_data));
			if(merged_data.req_amts === undefined)
				merged_data.requested_amts = req_amts;

			return merged_data;
		}
		
		return g2s_data;
	}

	function merge_handpay_lock_info(msg_data, g2s_data, node){
		let g2s_tx_id_val = msg_data.get("g2s_tx_id");
		if(g2s_tx_id_val !== undefined){
			let merged_data = JSON.parse(JSON.stringify(g2s_data));
			if(merged_data.g2s_tx_id === undefined || merged_data.g2s_tx_id == -1 || merged_data.g2s_tx_id == 0)
				merged_data.g2s_tx_id = Number(g2s_tx_id_val);

			return merged_data;
		}
		
		return g2s_data;
	}
	
	data_merge_map.set("g2s.egm.G2S_cabinet.selected_game_change", {merge: merge_game_info});
	data_merge_map.set("g2s.egm.G2S_gamePlay.primary_game_started", {merge: merge_game_info});
	data_merge_map.set("g2s.egm.G2S_gamePlay.primary_game_ended", {merge: merge_game_info});
	data_merge_map.set("g2s.egm.G2S_gamePlay.sec_game_choice", {merge: merge_game_info});
	data_merge_map.set("g2s.egm.G2S_gamePlay.sec_game_started", {merge: merge_game_info});
	data_merge_map.set("g2s.egm.G2S_gamePlay.sec_game_ended", {merge: merge_game_info});
	data_merge_map.set("g2s.egm.G2S_gamePlay.pay_game_result", {merge: merge_game_info});
	data_merge_map.set("g2s.egm.G2S_gamePlay.game_ended", {merge: merge_game_info});
	data_merge_map.set("g2s.egm.G2S_gamePlay.game_idle", {merge: merge_game_info});
	data_merge_map.set("g2s.egm.G2S_bonus.award.awarded", {merge: merge_bonus_info});
	data_merge_map.set("g2s.egm.G2S_bonus.award.failed", {merge: merge_bonus_info});
	data_merge_map.set("g2s.egm.G2S_mystery.award.awarded", {merge: merge_mystery_info});
	data_merge_map.set("g2s.egm.G2S_mystery.award.failed", {merge: merge_mystery_info});
	data_merge_map.set("g2s.egm.G2S_noteAcceptor.note.stacked", {merge: merge_note_acceptor_stack_info});
	data_merge_map.set("g2s.egm.G2S_voucher.on_validation_id_issued", {merge: merge_voucher_issued_info});
	data_merge_map.set("g2s.egm.G2S_voucher.on_validation_id_inserted", {merge: merge_voucher_inserted_info});
	data_merge_map.set("g2s.egm.G2S_voucher.on_validation_id_stacked", {merge: merge_voucher_stack_info});
	data_merge_map.set("g2s.egm.G2S_printer.print_complete", {merge: merge_print_result_info});
	data_merge_map.set("g2s.egm.G2S_printer.print_failed", {merge: merge_print_result_info});
	data_merge_map.set("g2s.egm.G2S_printer.print_transfer_failed", {merge: merge_print_result_info});
	data_merge_map.set("g2s.egm.G2S_handpay.keyoff", {merge: merge_handpay_keyoff_info});
	data_merge_map.set("g2s.egm.G2S_handpay.lock", {merge: merge_handpay_lock_info});
	
	//////// END of DATA mergers/////////

	function g2sEGMGroupConfigNode(config) {
		RED.nodes.createNode(this,config);

		this.group_name = config.group_name;
		this.egm_list = config.egm_list;
		this.sync_with_group = config.sync_with_group;
		this.enroll_pki = config.enroll_pki;
		this.pki_scep_url = config.pki_scep_url;
		this.pki_nonce = config.pki_nonce;
		this.egm_config_name = config.egm_config_name;
		this.g2s_cc_override = config.g2s_cc_override;
		this.use_batch_egm_mngr = config.use_batch_egm_mngr;
		var node = this;
		
		// if batch manager is being used, let it know to start the group
		if(config.use_batch_egm_mngr){			
			this.broker = RED.nodes.getNode(config.mqtt_config);
			this.broker.register(this);			

			function publish_run(){
				let data = {
					egm:{
						id_list:[],
						group: node.group_name,
						config: node.egm_config_name,
						g2sCC: node.g2s_cc_override
					},
					pki:{
						use: node.enroll_pki					
					}
				};
	
				node.egm_list.forEach(function(id){
					data.egm.id_list.push({egm_id:id});
				});
	
				if(config.enroll_pki){
					data.pki.scep_addr = node.pki_scep_url;
					data.pki.key_size = node.pki_key_size;
					data.pki.nonce_required = (node.pki_nonce.length > 0);
					data.pki.nonce = node.pki_nonce;					
				}
	
				let new_msg = {
					qos: 1,
					retain: false,
					topic: "proto/egm_mngr/rpc_api/g2s/batch/egm/start",
					payload: JSON.stringify(data)
				};
				
				node.broker.publish(new_msg);
			}

			this.broker.subscribe("proto/egm_mngr/rpc_api/g2s/batch/ready", 0, function(mtopic, mpayload, mpacket){				
		    	publish_run();
		   	});

			this.broker.client.on('connect', function () {
				// Since the built MQTT config node can be configure in the editor for the closing messages
				// we can change it here. We assume the broker is only for G2S API interaction...
				// Ideally we'd be able to publish a message when this node is removed/closed but the built in MQTT node
				// disconnects when nodes are closing, hence the message never makes it out. If some ordering of node closing
				// Or a change in the build it MQTT node is made to allow us to publish on close, then we should make the switch

				// We will add an array of group names to the broker. then rebuild the payload for the close messages
				// this way when the close occurs the built in mqtt config will fire the close for us, containing all the groups
				// assigned to this broker, not a bad solution, but we are tying ourselfves to mqtt internals.

				if(node.broker.g2s_egm_group === undefined)
					node.broker.g2s_egm_group = [];

				node.broker.g2s_egm_group.push({group:node.group_name});

				node.broker.closeMessage = {
					topic: "proto/egm_mngr/rpc_api/g2s/batch/egm/stop",
					payload: JSON.stringify({groups:node.broker.g2s_egm_group})
				};

				node.broker.client.options.will = {
					topic: "proto/egm_mngr/rpc_api/g2s/batch/egm/stop",
					payload: JSON.stringify({groups:node.broker.g2s_egm_group})
				};

				publish_run();
			});
			this.broker.client.on('reconnect', function () {
				publish_run();
			});

			this.on('close', function(done){				
				if(node.use_batch_egm_mngr){				
					node.broker.unsubscribe("proto/egm_mngr/rpc_api/g2s/batch/ready", null, true);
					node.broker.deregister(node, done());					
				}
			});
		}
	};
	RED.nodes.registerType("g2sEGMGroupConfig", g2sEGMGroupConfigNode);

	function g2sActionDataNode(config) {
		RED.nodes.createNode(this,config);
		this.g2s_data = config.g2s_data;
		this.data_type = config.data_type;
		var node = this;

		node.on('input', function(msg, send, done) {
			if(msg.g2s_data === undefined)
				msg.g2s_data = new Map();
			msg.g2s_data.set(node.data_type, node.g2s_data);
			send(msg);
			done();
		});
	};
	RED.nodes.registerType("g2sActionData", g2sActionDataNode);

	function g2sRPCTransportNode(config) {
		RED.nodes.createNode(this,config);
		this.use_mqtt = config.use_mqtt || false;
		this.sel_xmlrpc_config = config.xmlrpc_config;
		
		this.mqtt_qos = config.mqtt_qos;
        this.mqtt_retain = config.mqtt_retain || false;
		this.mqtt_egm_group = config.mqtt_egm_group;
		this.sel_mqtt_config = config.mqtt_config;
		this.sync_with_group = config.sync_with_group;
		this.sync_with_group_timeout = config.sync_with_group_timeout || 5;

		this.save_to_flow = config.save_to_flow;
		var node = this;

		if(this.use_mqtt){
			this.status({fill:"red",shape:"ring",text:"node-red:common.status.disconnected"});
			
			this.mqtt_config = RED.nodes.getNode(this.sel_mqtt_config);
			
			if(this.mqtt_config){
				this.mqtt_config.register(node);
				
				if(this.mqtt_config.connected)
					node.status({fill:"green",shape:"dot",text:"node-red:common.status.connected"});

				this.on('close', function(done) {
					this.mqtt_config.deregister(node,done);
				});
			}
			else
				this.error(RED._("g2s.errors.missing-config"));
		}
		
		let this_g2s_transport = {
			use_mqtt : node.use_mqtt,
			xml_rpc:{
				config: node.sel_xmlrpc_config
			},
			mqtt:{
				config: node.sel_mqtt_config,
				qos: Number(node.mqtt_qos),
				retain: node.mqtt_retain,
				egm_group: node.mqtt_egm_group,
				sync_with_group: node.sync_with_group,
				sync_timeout: Number(node.sync_with_group_timeout)
			}
		}

		if(node.save_to_flow){			
			var flow_context = this.context().flow;
			flow_context.set("g2s_transport", this_g2s_transport);
		}

		node.on('input', function(msg, send, done) {
			if(msg.g2s_data === undefined)
				msg.g2s_data = {
					g2s_transport: this_g2s_transport
				};

			send(msg);
			done();
		});
	};
	RED.nodes.registerType("g2sRPCTransport", g2sRPCTransportNode);

	function g2sActionNode(config) {
		RED.nodes.createNode(this,config);		
		this.action_data = config.action_data;
		this.action = config.action;

		this.use_mqtt = config.use_mqtt;
		this.sel_xmlrpc_config = config.xmlrpc_config;
		
		this.mqtt_qos = config.mqtt_qos;
        this.mqtt_retain = config.mqtt_retain;
		this.mqtt_egm_group = config.mqtt_egm_group;
		this.sel_mqtt_config = config.mqtt_config;
		this.sync_with_group = config.sync_with_group;
		this.sync_with_group_timeout = config.sync_with_group_timeout;
		if(this.sync_with_group_timeout === undefined || this.sync_with_group_timeout == 0)
			this.sync_with_group_timeout = 5
		this.action_map = new Map();
		this.use_this_transport = config.use_this_transport;
		
		// Not 100% sure this is needed... but I do know that a node can be re-entered if the flow loops around
		// Hence it's posible that this node is renetered, and resends a new query. Each query has it's own 
		// GUID. Hence we need to map these to better handle the request, and node states
		// Each entry is keyed by the session id (GUID) and contais a Set of pending EGM id which have yet to respond
		this.pending_sessions = new Map();

		var node = this;		

		if(config.use_this_transport){
			if(this.use_mqtt){
				this.mqtt_config = RED.nodes.getNode(this.sel_mqtt_config);
				
				if(this.mqtt_config){
					this.mqtt_config.register(node);
					
					this.on('close', function(done) {
						node.mqtt_config.deregister(node,done);
						node.status({});
					});
				}
				else
					this.error(RED._("g2s.errors.missing-config"));
			}
		}
		
        node.on('input', function(msg, send, done) {			
			let merged_data = {};
			
			var this_msg = msg;
			if(msg.g2s_data !== undefined){				
				// Now that we got the action and data from the client, we need to see
				// if there is some overrides to it. Things like data from wihtin the
				// msg passed in. Example, the game information may have been predefined 
				// for the flow where multiple G2S actions will use.
				// To allow for this, Above is a map of actions with a function to merge the msg
				// with the action data, returning the actual payload to send to the transport
				let merger = data_merge_map.get(node.action.action_method);
				if(merger !== undefined){					
					merged_data = merger.merge(msg.g2s_data, node.action_data, node);
				}
				else{
					merged_data = JSON.parse(JSON.stringify(node.action_data));	
				}
			}
			else{
			 	merged_data = JSON.parse(JSON.stringify(node.action_data));
			}
					
			// We allow the user to specify that an egm_tx_id can be -1, to allow us to use some internal one... check it now
			if(merged_data.egm_tx_id !== undefined){				
				if(merged_data.egm_tx_id == -1){
					var context_data = node.context().global;
					var tx_id = context_data.get("egm_tx_id")||0;				
					tx_id = tx_id + 1;
					merged_data.egm_tx_id = tx_id;
					context_data.set("egm_tx_id", tx_id);
				}
				
				if(msg.g2s_data === undefined)
					this_msg.g2s_data = new Map();
				
				msg.g2s_data.set("egm_tx_id", merged_data.egm_tx_id);
			}
			
			if(msg.payload !== undefined && typeof(msg.payload) == 'object')
				merged_data = merge_json(merged_data, msg.payload); // users can pass in info manually
			
			// The user can set a flow wide settign to set the transport
			var this_g2s_transport;
			
			if(!node.use_this_transport){
				node.log("Not Using Action transport");
				this_g2s_transport = node.context().flow.get("g2s_transport");
				if(this_g2s_transport === undefined){
					node.log("flow context not set");
					if(this_msg.g2s_data.g2s_transport !== undefined){
						node.log("using message defined transport");
						this_g2s_transport = this_msg.g2s_data.g2s_transport;
					}
				}
				else{
					node.log("Using Flow transport");
					this_g2s_transport = flow_context.get("g2s_transport");
					node.log(JSON.stringify(this_g2s_transport));
				}
			}
			
			if(this_g2s_transport === undefined){
				node.log("Using Action transport");
				this_g2s_transport = {
					use_mqtt : node.use_mqtt,
					xml_rpc:{
						config: node.sel_xmlrpc_config
					},
					mqtt:{
						config: node.sel_mqtt_config,
						qos: node.mqtt_qos,
						retain: node.mqtt_retain,
						egm_group: node.mqtt_egm_group,
						sync_with_group:node.sync_with_group,
						sync_timeout: node.sync_with_group_timeout
					}
				}
			}

			// MQTT topic format [proto]['group'][rpc_api]['rpc_api_name']
			if(this_g2s_transport.use_mqtt){	
				let mqtt_egm_group = RED.nodes.getNode(this_g2s_transport.mqtt.egm_group);

				var new_msg = {};
				new_msg.qos = Number(this_g2s_transport.mqtt.qos);
				new_msg.retain = this_g2s_transport.mqtt.retain;
				new_msg.topic = "proto/" + mqtt_egm_group.group_name + "/rpc_api/" + node.action.action_method.replace(/\./g, "/");
				
				if(this_g2s_transport.mqtt.sync_with_group){
					let this_session_uid = create_UUID();
					let response_topic = "proto/rpc_api_response/" + this_session_uid;
					merged_data.response_topic = response_topic;

					let pending_egms = new Set(mqtt_egm_group.egm_list);
					node.pending_sessions.set(this_session_uid, pending_egms);
					var sync_timeout_timer = setTimeout(function(this_session_uid){
						let pending_session = node.pending_sessions.get(this_session_uid);
						node.error("Action (" + node.action.class_name + "." + node.action.class_action + ") failed waiting on the following EGMs " +  Array.from(pending_session.values()));

						delete pending_session;
						node.pending_sessions.delete(this_session_uid);
						mqtt_client.unsubscribe("proto/rpc_api_response/" + this_session_uid, null, true);
						done();
					}, this_g2s_transport.mqtt.sync_timeout*1000, this_session_uid);

					var mqtt_client = RED.nodes.getNode(this_g2s_transport.mqtt.config);
					mqtt_client.subscribe(response_topic, 1, function(mtopic, mpayload, mpacket){
						let json_payload = mpayload.toString();
						try { 
							let json_results = JSON.parse(json_payload);

							// The format for responses to query is that they are all in sub nodes. 
							// We want to copy those into the msg, and not payload. This will allow 
							// for the msg to carry the information accross the entire flow like a g2s data node
							// payload will include anything not in a group..typically single use response like a single value or result
							let this_egm = this_msg[json_results.from];
								if(this_egm === undefined)
									this_egm = {};
							for(var key in json_results){
								if(json_results[key] !== null && typeof(json_results[key]) == "object")
									this_egm[key] = JSON.parse(JSON.stringify(json_results[key]))
							}
							
							// TODO What should we do with itms not in a seperate node, i.e. plain results (true false?)
							// remove this sender for the pending session
							let sender_session_uid = mtopic.split('/').pop();
							let pending_session = node.pending_sessions.get(sender_session_uid);
							if(pending_session !== undefined){
								pending_session.delete(json_results.from);
								
								if(pending_session.size == 0){
									clearTimeout(sync_timeout_timer);
									delete pending_session;
									node.pending_sessions.delete(sender_session_uid);
									mqtt_client.unsubscribe(mtopic, null, true);
									send(this_msg);
									done();
								}
							}
							else{
								node.error(RED._("g2sQuery response to uknown session "),{payload:json_payload, topic:mtopic}); return
							}
						}
						catch(e) { 
							node.error(RED._("mqtt.errors.invalid-json-parse"),{payload:json_payload, topic:mtopic}); return
						}
					});
				}
				
				new_msg.payload = JSON.stringify(merged_data);

				mqtt_client.publish(new_msg, function(){
					if(!this_g2s_transport.use_mqtt || !this_g2s_transport.mqtt.sync_with_group){						
						send(msg);
						done();
					}
				});
			}
            else{
				var params = [].concat( JSON.stringify(merged_data) );
				let xmlrpc = RED.nodes.getNode(this_g2s_transport.xml_rpc.config)
				xmlrpc.methodCall(node.action.action_method, params, function(error, value){
					if(error) {
						node.error(RED._(error.message));
						return;
					}
					
					let json_results = value;
					
					if(typeof(value) === 'string'){
						json_results = JSON.parse(value);
					}	
					
					this_msg.payload = {};
					if(this_msg.g2s_data === undefined)
						this_msg.g2s_data = new Map();
					
					node.log("json_results" + json_results);
					
					//see if the EGM response includes a g2s transaction id, if so, put it in the map for later use in the flows
					if(json_results.g2s_tx_id !== undefined)
						this_msg.g2s_data.set("g2s_tx_id", json_results.g2s_tx_id);
					
					// The format for responses to query is that they are all in sub nodes. 
					// We want to copy those into the msg, and not payload. This will allow 
					// for the msg to carry the information accross the entire flow like a g2s data node
					// payload will include anything not in a group..typically single use response like a single value or result
					for(var key in json_results){
						if(json_results[key] !== null && typeof(json_results[key]) == "object"){
							this_msg.g2s_data.set(key, JSON.parse(JSON.stringify(json_results[key])));
						}
					}
					
					this_msg.payload = {
						data: merged_data,
						result:json_results
					};
					
					send(this_msg);
					done();
				});
			}
        });
	};
	RED.nodes.registerType("g2sAction", g2sActionNode);

	function g2sEgmEventMngrConfigNode(n) {
		RED.nodes.createNode(this,n);
				
		this.event_emitter = new events.EventEmitter();
		this.event_defs = new Set(); //Use a set to remove duplicates. This is the set we register with the EGM.
		this.event_cbs = new Map();
		this.use_mqtt = n.use_mqtt;

		this.sel_xmlrpc_client_config = n.xmlrpc_client_config;
		this.sel_xmlrpc_server_config = n.xmlrpc_server_config;
		
		this.mqtt_qos = n.mqtt_qos;
        this.mqtt_retain = n.mqtt_retain;
		this.mqtt_egm_group = n.mqtt_egm_group;
		this.sel_mqtt_config = n.mqtt_config;
		
		this.client_count = 0;
		
		var mngr_node = this;
		
		function handeEventFromEGM(json_payload){
			var evt_id = json_payload.event.source.class + "." + json_payload.event.source.device_id + "." + json_payload.event.code;

			mngr_node.event_emitter.emit(evt_id, json_payload);
			
			evt_id = json_payload.event.source.class + "." + json_payload.event.source.device_id + ".G2S_all";
			mngr_node.event_emitter.emit(evt_id, json_payload);
			
			evt_id = json_payload.event.source.class + ".-1.G2S_all";
			mngr_node.event_emitter.emit(evt_id, json_payload);
			
			evt_id = json_payload.event.source.class + ".-1." + json_payload.event.code;
			mngr_node.event_emitter.emit(evt_id, json_payload);
			
			evt_id = "G2S_all." + json_payload.event.source.device_id + "." + json_payload.event.code;
			mngr_node.event_emitter.emit(evt_id, json_payload);
			
			evt_id = "G2S_all.-1." + json_payload.event.code;
			mngr_node.event_emitter.emit(evt_id, json_payload);
			
			evt_id = "G2S_all.-1.G2S_all";
			mngr_node.event_emitter.emit(evt_id, json_payload);

		};

		this.register = function(node){
			if(mngr_node.use_mqtt){				
				var mqtt_client = RED.nodes.getNode(mngr_node.sel_mqtt_config);
				mqtt_client.register(node);
				if(mqtt_client.connected)
					node.status({fill:"green",shape:"dot",text:"ready"});
				var mqtt_egm_group = RED.nodes.getNode(mngr_node.mqtt_egm_group);

				function doMQTTSubs(){
					// We only need to subscribe to the topics once, the event handler will all be called					
					if(mngr_node.client_count == 0){						
						// for every egm in the group, we need to subscribe to the EGM's proto ready message
						// The message will contain the EGM id in the topic
						mqtt_egm_group.egm_list.forEach(function(egm){							
							mqtt_client.subscribe("g2s/" + egm + "/egm_event", 1, function(mtopic, mpayload, mpacket){
								try { 
									node.log(mpayload.toString());
									json_payload = JSON.parse(mpayload.toString());
									handeEventFromEGM(json_payload);
								}catch(e) { 
									mngr_node.error(RED._("mqtt.errors.invalid-json-parse"),{payload:json_payload, topic:mtopic});
								}
							});
						});

						mngr_node.egms_subbed = true;
					}
				}

				if(node.mqtt_reg === undefined || !node.mqtt_reg)
				{
					node.mqtt_reg = true;
					if(mqtt_client.connected){
						doMQTTSubs();
						mngr_node.client_count++;
					}
	
					mqtt_client.client.on("connect", function(){
						doMQTTSubs();
						mngr_node.client_count++;
					});
				}
			}
			else
				node.status({fill:"green",shape:"dot",text:"ready"});
		}

		this.unregister = function(node, done){
			if(node.mqtt_reg !== undefined){
				var mqtt_client = RED.nodes.getNode(mngr_node.sel_mqtt_config);
				mngr_node.client_count--;
				if(mngr_node.client_count == 0){
					if(!mngr_node.closing){
						var mqtt_egm_group = RED.nodes.getNode(mngr_node.mqtt_egm_group);
						mqtt_egm_group.egm_list.forEach(function(egm){
							mqtt_client.unsubscribe("g2s/" + egm + "/egm_event", null, true);							
						});
					}			
				}else if(!mngr_node.closing){
					node.status({fill:"red",shape:"ring",text:"disconnected"});
						
					mqtt_client.deregister(node, function(){					
						node.mqtt_reg = false;							
						return done();
					});
				}
				done();
			}
			else{
				node.status({fill:"red",shape:"ring",text:"disconnected"});
				done();
			}
		}

		if(!mngr_node.use_mqtt){			
			try{				
				mngr_node.serverConn = RED.nodes.getNode(mngr_node.sel_xmlrpc_server_config);
				mngr_node.serverConn.listen("proto.xml_rpc_client_ready", function(err, params, cb){
					if(err) {
						mngr_node.error(RED._(err.message));
						return;
					}
					
					var evt_sub_data = {
						server:{
							ip: mngr_node.serverConn.host,
							port: mngr_node.serverConn.port
						},
						events:Array.from(mngr_node.event_defs)				
					};

					var params = [].concat( JSON.stringify(evt_sub_data) );
					mngr_node.clientConn = RED.nodes.getNode(mngr_node.sel_xmlrpc_client_config);					
					mngr_node.clientConn.methodCall("g2s.egm.rpc.sub_event", params, function(error, value){
						if(error) {
							mngr_node.error(RED._(error.message));
							return;
						}
						mngr_node.emit('evt_subs_ready');
					});
					
					cb(null,"ok");
				});
				
				mngr_node.serverConn.listen("g2s.egm_event", function(err, params, cb){
					if(err) {
						mngr_node.error(RED._(err.message));
						return;
					}
					
					handeEventFromEGM(JSON.parse(params));

					cb(null,"ok");		  
				});
			}
			catch(err){
				this.log("g2sEgmConfigNode caught exception while setting up server listenners\n" + err); 
			}
		}
		
		this.remEvtObsvr = function(class_name, dev_id, event_code, cb){
			mngr_node.event_defs.delete({"event":{"code":event_code,"dev":{"class_name":class_name,"device_id":dev_id}}});
			mngr_node.event_emitter.off(class_name + "." + dev_id + "." + event_code, cb);

			// TODO... if using xml rpc... we should ask the EGM to stop sending the event...
		};

		this.addEvtObsvr = function(class_name, dev_id, event_code, cb){
			let evt_def = {"event":{"code":event_code,"dev":{"class_name":class_name,"device_id":dev_id}}};
			mngr_node.event_defs.add(evt_def);
			mngr_node.event_emitter.on(class_name + "." + dev_id + "." + event_code, cb);
			
			if(!mngr_node.use_mqtt){
				// try to register for the events now, i.e. the flows restarted and EGM already running...
				// duplicate registration has no adverse affect either...
				var evt_sub_data = {
					server:{
						ip: mngr_node.serverConn.host,
						port: mngr_node.serverConn.port
					},
					events:Array.from(mngr_node.event_defs)				
				};				
				var params = [].concat( JSON.stringify(evt_sub_data) );
				let clientConn = RED.nodes.getNode(mngr_node.sel_xmlrpc_client_config);
				clientConn.methodCall("g2s.egm.rpc.sub_event", params, function(error, value){
					if(error) {
						mngr_node.error(RED._(error.message));
						return;
					}
					mngr_node.emit('evt_subs_ready');
				});
			}
		}
		
		this.on('close', function(done){
			this.closing = true;
			if(mngr_node.use_mqtt){
				//let mqtt_client = RED.nodes.getNode(mngr_node.sel_mqtt_config);
				//let mqtt_egm_group = RED.nodes.getNode(mngr_node.mqtt_egm_group);

				// mqtt_egm_group.egm_list.forEach(function(egm){
				// 	mqtt_client.unsubscribe("g2s/" + egm + "/egm_event", null, true);
				// 	//mqtt_client.unsubscribe("proto/xml_rpc_client_ready/" + egm, null, true);
				// });
			}
			else{
				serverConn = RED.nodes.getNode(mngr_node.sel_xml_rpc_client_config);
				if(serverConn) {
					serverConn.removeListener("proto.xml_rpc_client_ready");
					serverConn.removeListener("g2s.egm_event");
				}
			}
			
			mngr_node.emit('evt_subs_lost');

			done();
		});
	}
	RED.nodes.registerType('g2sEgmEventMngrConfig', g2sEgmEventMngrConfigNode);
	
	function g2sOnEGMEventNode(n) {
		RED.nodes.createNode(this,n);
		
		this.event_id = n.event_id;
		this.device_class = n.device_class;
		this.device_id = n.device_id;
		this.g2s_egm_evt_mngr = n.g2s_egm_evt_mngr;
		
		this.g2s_egmConn = RED.nodes.getNode(this.g2s_egm_evt_mngr);

		this.status({fill:"red",shape:"ring",text:"disconnected"});

		this.g2s_egmConn.register(this);

		var node = this;

		if(!this.g2s_egmConn) {
		  this.error(RED._('missing g2s egm config'));
		  return;
		}

		this.evt_handler = function(param){
			var msg = {payload: param};
			node.send(msg);
		};

		this.g2s_egmConn.addEvtObsvr(this.device_class, this.device_id, this.event_id, this.evt_handler);
		
		this.g2s_egmConn.on('evt_subs_ready', function(){
			node.status({fill:"green",shape:"dot",text:"ready"});
		});

		this.g2s_egmConn.on('evt_subs_lost', function(){
			node.status({fill:"red",shape:"ring",text:"disconnected"});
		});
		
		this.on('close', function(done){
			node.g2s_egmConn.remEvtObsvr(node.device_class, node.device_id, node.event_id, node.evt_handler);
			node.g2s_egmConn.unregister(node, done);
		});
	}
	RED.nodes.registerType('g2sOnEGMEvent', g2sOnEGMEventNode);

	function g2sCtrlEGMEventNode(n) {
		RED.nodes.createNode(this,n);
		
		this.event_id = n.event_id;
		this.device_class = n.device_class;
		this.device_id = n.device_id;
		this.g2s_egm_evt_mngr = n.g2s_egm_evt_mngr;
		this.g2s_egmConn = RED.nodes.getNode(this.g2s_egm_evt_mngr);
		this.running = false;
		this.status({fill:"red",shape:"ring",text:"disconnected"});

		this.evt_handler = function(param){
			var msg = {payload: param};
			node.send(msg);
		};

		var node = this;

		node.on('input', function(msg, send, done) {
			if(msg.payload == "start"){
				node.g2s_egmConn.register(node);

				if(!node.g2s_egmConn) {
					node.error(RED._('missing g2s egm config'));
					return;
				}
				node.running = true;
				node.g2s_egmConn.addEvtObsvr(node.device_class, node.device_id, node.event_id, node.evt_handler);
				done();
			}else if(msg.payload == "stop"){
				node.running = false;
				node.g2s_egmConn.remEvtObsvr(node.device_class, node.device_id, node.event_id, node.evt_handler);
				node.g2s_egmConn.unregister(node, done);
			}
		});
		
		this.on('close', function(done){
			if(node.running){
				node.g2s_egmConn.remEvtObsvr(node.device_class, node.device_id, node.event_id, node.evt_handler);			
				node.g2s_egmConn.unregister(node, done);
			}
			else 
				done();
		});
	}
	RED.nodes.registerType('g2sCtrlEGMEvent', g2sCtrlEGMEventNode);

	function g2sEgmGameLinkMngrConfigNode(n) {
		RED.nodes.createNode(this,n);
				
		this.topics_emitter = new events.EventEmitter();
		this.topics_defs = new Set(); //Use a set to remove duplicates. This is the set we register with the EGM.
		this.topics_cbs = new Map();
		this.use_mqtt = n.use_mqtt;

		this.sel_xmlrpc_client_config = n.xmlrpc_client_config;
		this.sel_xmlrpc_server_config = n.xmlrpc_server_config;
		
		this.mqtt_qos = n.mqtt_qos;
        this.mqtt_retain = n.mqtt_retain;
		this.mqtt_egm_group = n.mqtt_egm_group;
		this.sel_mqtt_config = n.mqtt_config;
		
		this.client_count = 0;
		
		var mngr_node = this;
		
		function handeTopicFromEGM(json_payload){
			var topic = json_payload.destination;

			// iterate through the listenner names. If the topic contains that listenner name from the begining,
			// then emit for that listener

			mngr_node.topics_emitter.eventNames().forEach(item => {
				if(topic.startsWith(item))
					mngr_node.topics_emitter.emit(item, json_payload.data);
			});
		};

		this.register = function(node){
			if(mngr_node.use_mqtt){				
				var mqtt_client = RED.nodes.getNode(mngr_node.sel_mqtt_config);
				mqtt_client.register(node);
				if(mqtt_client.connected)
					node.status({fill:"green",shape:"dot",text:"ready"});
				var mqtt_egm_group = RED.nodes.getNode(mngr_node.mqtt_egm_group);

				function doMQTTSubs(){
					// We only need to subscribe to the topics once, the event handler will all be called					
					if(mngr_node.client_count == 0){						
						// for every egm in the group, we need to subscribe to the EGM's proto ready message
						// The message will contain the EGM id in the topic
						mqtt_egm_group.egm_list.forEach(function(egm){							
							mqtt_client.subscribe("g2s/" + egm + "/G2S_gameLink/host_msg", 1, function(mtopic, mpayload, mpacket){
								try { 
									json_payload = JSON.parse(mpayload.toString());
									handeTopicFromEGM(json_payload);
								}catch(e) { 
									mngr_node.error(RED._("mqtt.errors.invalid-json-parse"),{payload:json_payload, topic:mtopic});
								}
							});
						});

						mngr_node.egms_subbed = true;
					}
				}

				if(node.mqtt_reg === undefined || !node.mqtt_reg)
				{
					node.mqtt_reg = true;
					if(mqtt_client.connected){
						doMQTTSubs();
						mngr_node.client_count++;
					}
	
					mqtt_client.client.on("connect", function(){
						doMQTTSubs();
						mngr_node.client_count++;
					});
				}
			}
			else
				node.status({fill:"green",shape:"dot",text:"ready"});
		}

		this.unregister = function(node, done){
			if(node.mqtt_reg !== undefined){
				var mqtt_client = RED.nodes.getNode(mngr_node.sel_mqtt_config);
				mngr_node.client_count--;
				if(mngr_node.client_count == 0){
					if(!mngr_node.closing){
						var mqtt_egm_group = RED.nodes.getNode(mngr_node.mqtt_egm_group);
						mqtt_egm_group.egm_list.forEach(function(egm){
							mqtt_client.unsubscribe("g2s/" + egm + "/G2S_gameLink/host_msg", null, true);							
						});
					}			
				}else if(!mngr_node.closing){
					node.status({fill:"red",shape:"ring",text:"disconnected"});
						
					mqtt_client.deregister(node, function(){					
						node.mqtt_reg = false;							
						return done();
					});
				}
				done();
			}
			else{
				node.status({fill:"red",shape:"ring",text:"disconnected"});
				done();
			}
		}

		if(!mngr_node.use_mqtt){			
			try{				
				mngr_node.serverConn = RED.nodes.getNode(mngr_node.sel_xmlrpc_server_config);
				mngr_node.serverConn.listen("proto.xml_rpc_client_ready", function(err, params, cb){
					if(err) {
						mngr_node.error(RED._(err.message));
						return;
					}
					
					var topic_sub_data = {
						server:{
							ip: mngr_node.serverConn.host,
							port: mngr_node.serverConn.port
						},
						destinations:Array.from(mngr_node.topic_sub_data)				
					};

					mngr_node.clientConn = RED.nodes.getNode(mngr_node.sel_xmlrpc_client_config);					
					mngr_node.clientConn.methodCall("g2s.egm.G2S_gameLink.reg_host_msg", params, function(error, value){
						if(error) {
							mngr_node.error(RED._(error.message));
							return;
						}
						mngr_node.emit('game_link_subs_ready');
					});
					
					cb(null,"ok");
				});
				
				mngr_node.serverConn.listen("g2s.egm.G2S_gameLink.host_msg", function(err, params, cb){
					if(err) {
						mngr_node.error(RED._(err.message));
						return;
					}
					
					handeEventFromEGM(params);

					cb(null,"ok");		  
				});
			}
			catch(err){
				this.log("g2sEgmGameLinkMngrConfigNode caught exception while setting up server listenners\n" + err); 
			}
		}
		
		this.remTopicObsvr = function(topic, cb){
			mngr_node.topic_defs.delete(topic);
			mngr_node.topic_emitter.off(topic, cb);

			// TODO... if using xml rpc... we should ask the EGM to stop sending the topic...
		};

		this.addTopicObsvr = function(topic, cb){
			mngr_node.topic_defs.add(topic);
			mngr_node.topic_emitter.on(topic, cb);
			
			if(!mngr_node.use_mqtt){
				// try to register for the events now, i.e. the flows restarted and EGM already running...
				// duplicate registration has no adverse affect either...
				var evt_sub_data = {
					server:{
						ip: mngr_node.serverConn.host,
						port: mngr_node.serverConn.port
					},
					destinations:Array.from(mngr_node.topic_defs)				
				};				
				let clientConn = RED.nodes.getNode(mngr_node.sel_xmlrpc_client_config);
				clientConn.methodCall("g2s.egm.G2S_gameLink.reg_host_msg", params, function(error, value){
					if(error) {
						mngr_node.error(RED._(error.message));
						return;
					}
					mngr_node.emit('game_link_subs_ready');
				});
			}
		}
		
		this.on('close', function(done){
			this.closing = true;
			if(mngr_node.use_mqtt){
				//let mqtt_client = RED.nodes.getNode(mngr_node.sel_mqtt_config);
				//let mqtt_egm_group = RED.nodes.getNode(mngr_node.mqtt_egm_group);

				// mqtt_egm_group.egm_list.forEach(function(egm){
				// 	mqtt_client.unsubscribe("g2s/" + egm + "/egm_event", null, true);
				// 	//mqtt_client.unsubscribe("proto/xml_rpc_client_ready/" + egm, null, true);
				// });
			}
			else{
				serverConn = RED.nodes.getNode(mngr_node.sel_xml_rpc_client_config);
				if(serverConn) {
					serverConn.removeListener("proto.xml_rpc_client_ready");
					serverConn.removeListener("g2s.egm.G2S_gameLink.host_msg");
				}
			}
			
			mngr_node.emit('game_link_subs_lost');

			done();
		});
	}
	RED.nodes.registerType('g2sEgmGameLinkMngrConfig', g2sEgmGameLinkMngrConfigNode);
	
	function g2sOnEGMGameLinkTopicNode(n) {
		RED.nodes.createNode(this,n);
		
		this.topic = n.topic;
		this.g2s_gl_topic_mngr = n.g2s_gl_topic_mngr;
		
		this.g2s_egmConn = RED.nodes.getNode(this.g2s_gl_topic_mngr);

		this.status({fill:"red",shape:"ring",text:"disconnected"});

		this.g2s_egmConn.register(this);

		var node = this;

		if(!this.g2s_egmConn) {
		  this.error(RED._('missing g2s egm config'));
		  return;
		}

		this.topic_handler = function(param){
			var msg = {payload: param};
			node.send(msg);
		};

		this.g2s_egmConn.addTopicObsvr(this.topic, this.topic_handler);
		
		this.g2s_egmConn.on('game_link_subs_ready', function(){
			node.status({fill:"green",shape:"dot",text:"ready"});
		});

		this.g2s_egmConn.on('game_link_subs_lost', function(){
			node.status({fill:"red",shape:"ring",text:"disconnected"});
		});
		
		this.on('close', function(done){
			node.g2s_egmConn.remTopicObsvr(node.topic, node.topic_handler);
			node.g2s_egmConn.unregister(node, done);
		});
	}
	RED.nodes.registerType('g2sOnEGMGameLinkTopic', g2sOnEGMGameLinkTopicNode);

	function g2sCtrlGameLinkTopicNode(n) {
		RED.nodes.createNode(this,n);
		
		this.topic = n.topic;		
		this.g2s_egm_gl_topic_mngr = n.g2s_egm_gl_topic_mngr;
		this.g2s_egmConn = RED.nodes.getNode(this.g2s_egm_gl_topic_mngr);
		this.running = false;
		this.status({fill:"red",shape:"ring",text:"disconnected"});

		this.evt_handler = function(param){
			var msg = {payload: param};
			node.send(msg);
		};

		var node = this;

		node.on('input', function(msg, send, done) {
			if(msg.payload == "start"){
				node.g2s_egmConn.register(node);

				if(!node.g2s_egmConn) {
					node.error(RED._('missing g2s egm config'));
					return;
				}
				node.running = true;
				node.g2s_egmConn.addTopicObsvr(node.topic, node.topic_handler);
				done();
			}else if(msg.payload == "stop"){
				node.running = false;
				node.g2s_egmConn.remTopicObsvr(node.topic, node.topic_handler);
				node.g2s_egmConn.unregister(node, done);
			}
		});
		
		this.on('close', function(done){
			if(node.running){
				node.g2s_egmConn.remTopicObsvr(node.topic, node.topic_handler);			
				node.g2s_egmConn.unregister(node, done);
			}
			else 
				done();
		});
	}
	RED.nodes.registerType('g2sCtrlGameLinkTopic', g2sCtrlGameLinkTopicNode);
	

	function EMDIMsgNode(config) {
		RED.nodes.createNode(this,config);		
		this.to_xml = config.to_xml;
		var node = this;		
		
        node.on('input', function(msg) {
			if(msg.payload && msg.payload != ""){				
				var context = new Jsonix.Context([ emdiSchema ]);
				
				if(!node.to_xml){
					// xml to json					
					var unmarshaller = context.createUnmarshaller();
					
					var new_msg = {payload: unmarshaller.unmarshalString(msg.payload)};
					node.send(new_msg);
				}
				else{
					// json to xml
					var marshaller = context.createMarshaller();
					
					var new_msg = {payload: marshaller.marshalString(msg.payload)};
					node.send(new_msg);
				}					
			}
			else
				node.log("No data defined or passed as payload into this node");
        });
	};
	RED.nodes.registerType("EMDIMsg", EMDIMsgNode);
	
	RED.httpNode.get("/gen_egm_list", function(req,res) {
		var broker = RED.nodes.getNode(req.query.mqtt_config);
		if(broker === undefined){
			console.log("Oops that didn't work");
		}
		else{			
			var data = {
				egm_id_count:req.query.count,
				gsa_prefix:req.query.gsa_prefix,
				response_topic:"nodered/response/" + create_UUID()
			};			
			var sync_timeout_timer = setTimeout(function(){
				console.log("Failed to get EGM ID list from batch EGM Manager");

				broker.unsubscribe(data.response_topic, null, true);
				res.send({status: 404});
			}, 10000);

			broker.subscribe(data.response_topic, 1, function(mtopic, mpayload, mpacket){				
				let json_payload = "";
				try { 
					clearTimeout(sync_timeout_timer);									
					res.send(mpayload.toString());
				}catch(e) { 
					console.log(e);
				}
			});
			var new_msg = {
				qos: 1,
				retain: false,
				topic: "proto/egm_mngr/rpc_api/g2s/batch/egm/gen_id_list",
				payload: JSON.stringify(data)
			};
			
			broker.publish(new_msg);
		}
	});
	
	RED.httpNode.get("/reserve_egm_group", function(req,res) {
		var broker = RED.nodes.getNode(req.query.mqtt_config);		
		if(broker === undefined){
			console.log("Oops that didn't work");
			res.send({status: 404});
		}
		else{			
			var data = {				
				group_id:req.query.group_id,
				response_topic:"nodered/response/" + create_UUID()
			};			
			var sync_timeout_timer = setTimeout(function(){
				console.log("Failed to reserve EGM group id from batch EGM Manager");

				broker.unsubscribe(data.response_topic, null, true);
				res.send({status: 404});
			}, 10000);

			broker.subscribe(data.response_topic, 1, function(mtopic, mpayload, mpacket){				
				let json_payload = "";				
				try { 
					clearTimeout(sync_timeout_timer);					
					res.send(mpayload.toString());
				}catch(e) { 
					console.log(e);
				}
			});
			var new_msg = {
				qos: 1,
				retain: false,
				topic: "proto/egm_mngr/rpc_api/g2s/batch/egm/reserve_egm_group_id",
				payload: JSON.stringify(data)
			};
			
			broker.publish(new_msg);
		}
	});
	
	RED.httpNode.get("/get_available_egm_configs", function(req,res) {
		var broker = RED.nodes.getNode(req.query.mqtt_config);		
		if(broker === undefined || broker == null){
			console.log("Oops that didn't work");
			res.send({status: 404});
		}
		else{			
			var data = {				
				response_topic:"nodered/response/" + create_UUID()
			};
			
			var sync_timeout_timer = setTimeout(function(){
				console.log("Failed to retrieve available EGM configs from batch EGM Manager");

				broker.unsubscribe(data.response_topic, null, true);
				res.send({status: 404});
			}, 10000);

			broker.subscribe(data.response_topic, 1, function(mtopic, mpayload, mpacket){				
				let json_payload = "";				
				try { 
					clearTimeout(sync_timeout_timer);					
					res.send(mpayload.toString());
				}catch(e) { 
					console.log(e);
				}
			});
			var new_msg = {
				qos: 1,
				retain: false,
				topic: "proto/egm_mngr/rpc_api/g2s/batch/egm/get_available_configs",
				payload: JSON.stringify(data)
			};
			
			broker.publish(new_msg);
		}
    });
}