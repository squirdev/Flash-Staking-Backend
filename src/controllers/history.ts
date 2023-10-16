import { HistorySchema } from "../models";
import { priceUnits, provider } from "../utils/crypto";
import { FlashContract } from "../utils/crypto";
import { getValueOfUnits } from "../utils/crypto";
import { PriceUnit } from "../utils/crypto"
async function readContract() {
    try {
        // Call the read function
        const result = await FlashContract.poolInfo();

        // Do something with the resul
        console.log('Result:', result);
        return result.totalRewardDistributed;

        // You can also parse or decode the result if needed
        // e.g., const decodedResult = ethers.utils.defaultAbiCoder.decode([...], result);
    } catch (error) {
        console.error('Error:', error);
    }
}

const History = {
    create: async () => {
        var today = new Date(2017, 2, 7);
        try {
            let res = await readContract();
            const newData = new HistorySchema({
                date: today,
                value: res,
            });
            console.log("Save Data", newData)
            const saveData = await newData.save();

            if (!saveData) {
                throw new Error("Database Error");
            }

            return saveData;
        } catch (err: any) {
            throw new Error(err.message);
        }
    },
    find: async (props: any) => {
        const { filter } = props;


        try {
            const result = await HistorySchema.find(filter);

            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    },
};

export default History;
