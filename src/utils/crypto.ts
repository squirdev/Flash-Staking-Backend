/** @format */

const ethUtil = require('ethereumjs-util');
import { BigNumberish, ethers, utils } from 'ethers';
// const FlashContractAbi = require("../abi/flash_transfer_abi.json");
// const  OracleContractAbi = require("../abi/oracle_contract_abi.json");
import FlashContractAbi from '../abi/staking.json';

export enum ServiceType {
    Cron = 'Cron',
    PastEvent = 'PastEvent',
    Contract = 'Contract',
}
export enum PriceUnit {
    Wei = 'wei',
    Eth = 'eth',
    Usd = 'usd',
}
export const priceUnits = {
    [PriceUnit.Wei]: 18,
    [PriceUnit.Eth]: 1,
    [PriceUnit.Usd]: 8,
};
export const levelBar = [30, 70, 150, 350, 500, 1200, 1600, 2000, 3000];

export function getLevel(point: number) {
    for (var i = 0; i < levelBar.length; i++) {
        if (point <= levelBar[i]) return i + 1;
        if (i === levelBar.length - 1) return 10;
    }
}
export function getPercentProgressLevel(point: number) {
    for (var i = 0; i < levelBar.length; i++) {
        if (point <= levelBar[i]) {
            if (i === 0) {
                return (100 * point) / levelBar[i];
            } else
                return (
                    (100 * (point - levelBar[i - 1])) / (levelBar[i] - levelBar[i - 1])
                );
        }
        if (i === levelBar.length - 1) return 100;
    }
}

const NETWORK = process.env.NETWORK || 'testnet';

const FLASH_CONTRACT_ADDRESS: {
    [key: string]: string;
} = {
    mainnet: '',
    testnet: "0xD7b1F29c52E7E09D916c4d6915656455af53399E",
};


export const node_url: {
    [key: string]: {
        [key: string]: string;
    };
} = {
    testnet: {
        rpcUrl: 'https://rpc.testnet.fantom.network',
    },
    mainnet: {
        providerUrl: 'wss://bsc-dataseed.binance.org/',
        rpcUrl: 'https://bsc-dataseed.binance.org/',
    },
};

export const provider = new ethers.providers.JsonRpcBatchProvider(
    node_url[NETWORK].rpcUrl
);
export const FlashContract = new ethers.Contract(
    FLASH_CONTRACT_ADDRESS[NETWORK],
    FlashContractAbi,
    provider
);


export const getValueOfUnits = (value: BigNumberish, type: PriceUnit) => {
    return ethers.utils.formatUnits(value, priceUnits[type]);
};

export function checkAddress(str: string): boolean {
    return ethers.utils.isAddress(str);
}
