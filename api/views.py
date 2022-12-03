from app import app
from flask import request, jsonify
from flask_api import status
from web3 import Web3
from web3.middleware import geth_poa_middleware

infura_url = "https://polygon-mumbai.infura.io/v3/e78c63f8d0004cbe98b088f2a2201701"
private_key = "a12e71ebe9a4bc009a99f6b0a99c8f24163ce13d39979100adb2a1a74c7519b7"
from_account = '0xB7E99669e9eDdD2975511FBF059d01969f43D409'

w3 = Web3(Web3.HTTPProvider(infura_url))
nonce = w3.eth.getTransactionCount(from_account)
w3.middleware_onion.inject(geth_poa_middleware, layer=0)

contractAbi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_currentStation",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_metaAbi",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_rfid",
				"type": "string"
			}
		],
		"name": "addNewBatteryToStation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_metaAbi",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_rfid",
				"type": "string"
			}
		],
		"name": "addNewBatteryToUser",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_latitude",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_longitude",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_isActive",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_isRenewable",
				"type": "bool"
			}
		],
		"name": "addNewStation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "scan",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_stationId",
				"type": "uint256"
			}
		],
		"name": "swapAllBatteries",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "toggleStationActivity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newEthPerCharge",
				"type": "uint256"
			}
		],
		"name": "updateEthPerCharge",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "batteries",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "batteryPercentage",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastBlocktimeQueried",
				"type": "uint256"
			},
			{
				"internalType": "enum BatterySwap.Status",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "currentStation",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "currentUser",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "metaAbi",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_users",
				"type": "address"
			}
		],
		"name": "check",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ethPerCharge",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllStations",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "latitude",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "longitude",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isRenewable",
						"type": "bool"
					}
				],
				"internalType": "struct Stations.Station[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_stationId",
				"type": "uint256"
			}
		],
		"name": "getBatteriesByStation",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getBatteriesByUser",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_batteryId",
				"type": "uint256"
			}
		],
		"name": "getBatteryById",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "batteryPercentage",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "lastBlocktimeQueried",
						"type": "uint256"
					},
					{
						"internalType": "enum BatterySwap.Status",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "uint256",
						"name": "currentStation",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "currentUser",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "metaAbi",
						"type": "string"
					}
				],
				"internalType": "struct BatterySwap.Battery",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_batteryId",
				"type": "uint256"
			}
		],
		"name": "getBatteryCurrentStation",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_batteryId",
				"type": "uint256"
			}
		],
		"name": "getBatteryCurrentUser",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_batteryId",
				"type": "uint256"
			}
		],
		"name": "getBatteryPercentage",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_batteryId",
				"type": "uint256"
			}
		],
		"name": "getBatteryStatus",
		"outputs": [
			{
				"internalType": "enum BatterySwap.Status",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getStation",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "location",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "latitude",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "longitude",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isRenewable",
						"type": "bool"
					}
				],
				"internalType": "struct Stations.Station",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "rfidToBattery",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "stations",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "latitude",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "longitude",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isRenewable",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "totalCostForUser",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userToLastScanned",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
address = "0x53b5aEca5C21cbd3F54016C720C3805fbACd2bD6"

contract_instance = w3.eth.contract(address=address, abi=contractAbi)
ethPerCharge = contract_instance.functions.ethPerCharge().call()


@app.route('/addBatteryStation', methods=['POST'])
def addBatteryStation():
  currentStation = request.json.get('currentStation')
  abi = request.json.get('abi')
  rfid = request.json.get('rfid')
  # payment = request.json.get('payment')

  nonce = w3.eth.getTransactionCount(from_account)
  gas = contract_instance.functions.addNewBatteryToStation(
    int(currentStation), abi, rfid).estimateGas()

  tx = contract_instance.functions.addNewBatteryToStation(
    int(currentStation), abi, rfid).buildTransaction({
      'chainId': 80001,
      'nonce': nonce,
    })

  gas = w3.eth.estimateGas(tx)
  tx['gas'] = gas

  signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
  tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
  print(tx_hash.hex())

  # get transaction receipt to get contract address

  tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
  return str(tx_receipt), status.HTTP_201_CREATED


@app.route('/addBatteryUser', methods=['POST'])
def addBatteryUser():
  user = request.json.get('user')
  abi = request.json.get('abi')
  rfid = request.json.get('rfid')
  # payment = request.json.get('payment')

  nonce = w3.eth.getTransactionCount(from_account)
  gas = contract_instance.functions.addNewBatteryToUser(user, abi,
                                                        rfid).estimateGas()

  tx = contract_instance.functions.addNewBatteryToUser(user, abi,
                                                       rfid).buildTransaction({
                                                         'chainId':
                                                         80001,
                                                         'nonce':
                                                         nonce,
                                                         "value":
                                                         10000000000000000,
                                                       })

  #contract_instance.functions.ethPerCharge().call() * 100,
  gas = w3.eth.estimateGas(tx)

  tx['gas'] = gas
  # tx['val'] = 10000000000000000

  signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
  tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
  print(tx_hash.hex())

  # get transaction receipt to get contract address

  tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
  return str(tx_receipt), status.HTTP_201_CREATED


@app.route('/swapAllBatteries', methods=['POST'])
def swapAllBatteries():
  currentStation = request.json.get('currentStation')

  nonce = w3.eth.getTransactionCount(from_account)
  gas = contract_instance.functions.swapAllBatteries(
    currentStation).estimateGas()

  tx = contract_instance.functions.swapAllBatteries(
    currentStation).buildTransaction({
      'chainId':
      80001,
      'nonce':
      nonce,
      'value':
      contract_instance.functions.totalCostForUser(from_account).call(),
    })

  gas = w3.eth.estimateGas(tx)
  tx['gas'] = gas

  signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
  tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
  print(tx_hash.hex())

  # get transaction receipt to get contract address

  tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
  return str(tx_receipt), status.HTTP_201_CREATED


@app.route('/getBatteryDetailsRFID', methods=['GET'])
def getBatteryDetailsRFID():
  args = request.args
  rfid = args.get('rfid')

  res = contract_instance.functions.rfidToBattery(rfid).call()
  res = contract_instance.functions.getBatteryById(res).call()
  return jsonify(res)



@app.route('/getBatteryPercent', methods=['GET'])
def getBatteryPercent():
  args = request.args
  battery_id = args.get('battery_id')
  res = contract_instance.functions.getBatteryPercentage(int(battery_id)).call()
  return jsonify(res)


@app.route('/scan', methods=['POST'])
def scan():
  user = request.json.get('user')

  nonce = w3.eth.getTransactionCount(from_account)
  gas = contract_instance.functions.scan(
    user).estimateGas()

  tx = contract_instance.functions.scan(
    user).buildTransaction({
      'chainId':
      80001,
      'nonce':
      nonce,
    })

  gas = w3.eth.estimateGas(tx)
  tx['gas'] = gas

  signed_tx = w3.eth.account.sign_transaction(tx, private_key=private_key)
  tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
  print(tx_hash.hex())

  # get transaction receipt to get contract address

  tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
  return str(tx_receipt), status.HTTP_201_CREATED
  
@app.route('/updateETHCharge', methods=['POST'])
def updateETHCharge():
  charge = request.json.get('charge')

  return jsonify({}), status.HTTP_201_CREATED
